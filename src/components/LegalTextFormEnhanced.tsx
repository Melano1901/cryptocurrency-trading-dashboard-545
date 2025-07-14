
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { LegalTextFormHeader } from './legal/LegalTextFormHeader';
import { LegalTextFormInputMethodSelector } from './legal/LegalTextFormInputMethodSelector';
import { LegalTextFormOCRSection } from './legal/LegalTextFormOCRSection';
import { LegalTextFormContainer } from './legal/LegalTextFormContainer';
import { LegalTextFormProvider } from './legal/LegalTextFormProvider';

interface LegalTextFormEnhancedProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialOCRText?: string;
  initialInputMethod?: 'manual' | 'ocr';
}

export function LegalTextFormEnhanced({ 
  onClose, 
  onSubmit, 
  initialOCRText,
  initialInputMethod = 'manual'
}: LegalTextFormEnhancedProps) {
  const { toast } = useToast();
  const [inputMethod, setInputMethod] = useState<'manual' | 'ocr'>(initialInputMethod);
  const [showOCRScanner, setShowOCRScanner] = useState(false);
  const [initialFormData, setInitialFormData] = useState<any>({});

  useEffect(() => {
    if (initialOCRText) {
      import('@/utils/ocrFormFiller').then(({ extractLegalTextData }) => {
        const extractedData = extractLegalTextData(initialOCRText);
        console.log('Pré-remplissage avec OCR:', extractedData);
        setInitialFormData(extractedData);
      }).catch(() => {
        setInitialFormData({ content: initialOCRText });
      });
    }
  }, [initialOCRText]);

  const handleOCRTextExtracted = (extractedText: string) => {
    import('@/utils/ocrFormFiller').then(({ extractLegalTextData }) => {
      const extractedData = extractLegalTextData(extractedText);
      console.log('Données extraites par OCR:', extractedData);
      setInitialFormData(extractedData);
    }).catch(() => {
      setInitialFormData({ content: extractedText });
    });
    setShowOCRScanner(false);
    setInputMethod('manual');
  };

  const handleAutoFill = () => {
    toast({
      title: "Auto-remplissage intelligent",
      description: "Fonction d'auto-remplissage IA en cours de développement...",
    });
  };

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    toast({
      title: "Texte juridique ajouté",
      description: `Le texte "${data.title}" a été ajouté avec succès.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <LegalTextFormHeader onClose={onClose} onAutoFill={handleAutoFill} />
        
        <LegalTextFormInputMethodSelector 
          inputMethod={inputMethod}
          onInputMethodChange={setInputMethod}
        />

        {inputMethod === 'ocr' && (
          <LegalTextFormOCRSection
            showOCRScanner={showOCRScanner}
            onShowOCRScanner={setShowOCRScanner}
            onOCRTextExtracted={handleOCRTextExtracted}
          />
        )}

        {inputMethod === 'manual' && (
          <LegalTextFormProvider initialData={initialFormData}>
            <LegalTextFormContainer 
              onClose={onClose}
              onSubmit={handleFormSubmit}
            />
          </LegalTextFormProvider>
        )}
      </div>
    </div>
  );
}
