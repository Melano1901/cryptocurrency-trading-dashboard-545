
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { StepIndicator } from './procedure-form/StepIndicator';
import { Step1GeneralInfo } from './procedure-form/Step1GeneralInfo';
import { Step2StepsConditions } from './procedure-form/Step2StepsConditions';
import { Step3DocumentsRequired } from './procedure-form/Step3DocumentsRequired';
import { Step4ModalsDelays } from './procedure-form/Step4ModalsDelays';
import { Step5DigitizationModalities } from './procedure-form/Step5DigitizationModalities';
import { Step6AdditionalInfo } from './procedure-form/Step6AdditionalInfo';
import { defaultFormValues, ProcedureStep } from './procedure-form/types';

interface ProcedureFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function ProcedureForm({ onClose, onSubmit }: ProcedureFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [procedureSteps, setProcedureSteps] = useState<ProcedureStep[]>([]);
  const [requiredDocs, setRequiredDocs] = useState<string[]>([]);
  const [complementaryDocs, setComplementaryDocs] = useState<string[]>([]);

  const form = useForm({
    defaultValues: defaultFormValues
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    const stepProps = {
      form,
      procedureSteps,
      setProcedureSteps,
      requiredDocs,
      setRequiredDocs,
      complementaryDocs,
      setComplementaryDocs
    };

    switch (currentStep) {
      case 1: return <Step1GeneralInfo {...stepProps} />;
      case 2: return <Step2StepsConditions {...stepProps} />;
      case 3: return <Step3DocumentsRequired {...stepProps} />;
      case 4: return <Step4ModalsDelays {...stepProps} />;
      case 5: return <Step5DigitizationModalities {...stepProps} />;
      case 6: return <Step6AdditionalInfo {...stepProps} />;
      default: return <Step1GeneralInfo {...stepProps} />;
    }
  };

  const handleSubmit = () => {
    const formData = form.getValues();
    const procedureData = {
      ...formData,
      procedureSteps,
      requiredDocs,
      complementaryDocs
    };
    
    console.log('Form submitted', procedureData);
    onSubmit(procedureData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onClose} className="gap-2 text-emerald-600">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold">Ajouter une nouvelle procédure</h1>
      </div>

      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      
      <Card>
        <CardContent className="p-8">
          {renderCurrentStep()}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Précédent
            </Button>
            
            {currentStep === totalSteps ? (
              <Button
                onClick={handleSubmit}
                className="bg-emerald-600 hover:bg-emerald-700 gap-2"
              >
                Enregistrer la procédure
                <CheckCircle className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-emerald-600 hover:bg-emerald-700 gap-2"
              >
                Suivant
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
