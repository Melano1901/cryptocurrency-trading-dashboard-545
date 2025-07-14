
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LegalTextFormHeader } from './legal/LegalTextFormHeader';
import { LegalTextFormInputMethodSelector } from './legal/LegalTextFormInputMethodSelector';
import { LegalTextFormOCRSection } from './legal/LegalTextFormOCRSection';
import { LegalTextFormMainInfo } from './legal/LegalTextFormMainInfo';
import { LegalTextFormMetadata } from './legal/LegalTextFormMetadata';
import { LegalTextFormContent } from './legal/LegalTextFormContent';

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
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    domain: '',
    reference: '',
    date: '',
    content: '',
    source: '',
    keywords: '',
    description: '',
    status: 'draft'
  });

  useEffect(() => {
    if (initialOCRText) {
      import('@/utils/ocrFormFiller').then(({ extractLegalTextData }) => {
        const extractedData = extractLegalTextData(initialOCRText);
        console.log('Pré-remplissage avec OCR:', extractedData);
        setFormData(prev => ({ ...prev, ...extractedData }));
      }).catch(() => {
        setFormData(prev => ({ ...prev, content: initialOCRText }));
      });
    }
  }, [initialOCRText]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOCRTextExtracted = (extractedText: string) => {
    import('@/utils/ocrFormFiller').then(({ extractLegalTextData }) => {
      const extractedData = extractLegalTextData(extractedText);
      console.log('Données extraites par OCR:', extractedData);
      setFormData(prev => ({ ...prev, ...extractedData }));
    }).catch(() => {
      setFormData(prev => ({ ...prev, content: extractedText }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Données finales du formulaire:', formData);
    onSubmit(formData);
    toast({
      title: "Texte juridique ajouté",
      description: `Le texte "${formData.title}" a été ajouté avec succès.`,
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
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <LegalTextFormMainInfo 
                  formData={formData}
                  onInputChange={handleInputChange}
                />
              </div>

              <div className="space-y-6">
                <LegalTextFormMetadata 
                  formData={formData}
                  onInputChange={handleInputChange}
                />
              </div>
            </div>

            <LegalTextFormContent 
              formData={formData}
              onInputChange={handleInputChange}
            />

            <div className="flex justify-end gap-4 pt-6">
              <Button type="button" variant="outline" onClick={onClose} className="px-8">
                Annuler
              </Button>
              <Button type="submit" className="px-8 bg-emerald-600 hover:bg-emerald-700 gap-2">
                <Save className="w-4 h-4" />
                Enregistrer le texte
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
