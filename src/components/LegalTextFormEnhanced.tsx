import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import { LegalTextStep1Enhanced } from '@/components/legal/LegalTextStep1Enhanced';
import { LegalTextStep2Enhanced } from '@/components/legal/LegalTextStep2Enhanced';
import { LegalTextStep3Enhanced } from '@/components/legal/LegalTextStep3Enhanced';
import { LegalTextStep4Enhanced } from '@/components/legal/LegalTextStep4Enhanced';

interface LegalTextFormEnhancedProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialOCRText?: string;
}

export function LegalTextFormEnhanced({ onClose, onSubmit, initialOCRText }: LegalTextFormEnhancedProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialOCRText) {
      // Pré-remplir avec les données OCR
      import('@/utils/ocrFormFiller').then(({ extractLegalTextData }) => {
        const extractedData = extractLegalTextData(initialOCRText);
        console.log('Pré-remplissage avec OCR:', extractedData);
        setFormData(extractedData);
      });
    }
  }, [initialOCRText]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Données finales du formulaire:', formData);
      onSubmit(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepUpdate = (stepData: any) => {
    const updatedData = { ...formData, ...stepData };
    setFormData(updatedData);
    console.log('Données mises à jour:', updatedData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <LegalTextStep1Enhanced
            data={formData}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 2:
        return (
          <LegalTextStep2Enhanced
            data={formData}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <LegalTextStep3Enhanced
            data={formData}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <LegalTextStep4Enhanced
            data={formData}
            onUpdate={handleStepUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={onClose}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-emerald-600" />
                Ajout d'un Texte Juridique Algérien
              </CardTitle>
            </div>
            <div className="text-sm text-gray-500">
              Étape {currentStep} sur 4
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    step <= currentStep
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="flex">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`flex-1 h-2 mx-1 rounded ${
                    step < currentStep
                      ? 'bg-emerald-600'
                      : step === currentStep
                      ? 'bg-emerald-300'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  );
}
