
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Wand2, Database, Scan } from 'lucide-react';
import { OCRScanner } from '@/components/common/OCRScanner';
import { useGlobalActions } from '@/hooks/useGlobalActions';

interface LegalTextsEnrichmentTabProps {
  onAddLegalText: () => void;
  onOCRTextExtracted?: (text: string) => void;
}

export function LegalTextsEnrichmentTab({ onAddLegalText, onOCRTextExtracted }: LegalTextsEnrichmentTabProps) {
  const [showOCRScanner, setShowOCRScanner] = useState(false);
  const actions = useGlobalActions();

  const handleOCRExtracted = (text: string) => {
    console.log('Texte OCR extrait:', text);
    if (onOCRTextExtracted) {
      onOCRTextExtracted(text);
    }
    setShowOCRScanner(false);
  };

  if (showOCRScanner) {
    return (
      <OCRScanner
        title="Scanner un document juridique"
        onTextExtracted={handleOCRExtracted}
        onClose={() => setShowOCRScanner(false)}
      />
    );
  }

  const handleImportCSVExcel = () => {
    actions.handleImport(['.csv', '.xlsx', '.xls']);
  };

  const handleAutoFill = () => {
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'ai-generation',
        title: 'Auto-remplissage intelligent',
        data: { feature: 'auto-fill', context: 'legal-texts' }
      }
    });
    window.dispatchEvent(event);
  };

  const handleAutoExtraction = () => {
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'extraction',
        title: 'Extraction automatique',
        data: { feature: 'auto-extraction', context: 'legal-texts' }
      }
    });
    window.dispatchEvent(event);
  };

  const actionsConfig = [
    {
      icon: Plus,
      title: "Ajouter un texte juridique",
      description: "Saisir manuellement un nouveau texte juridique algérien",
      buttonText: "Nouveau texte",
      color: "emerald",
      onClick: onAddLegalText
    },
    {
      icon: Scan,
      title: "Scanner un document",
      description: "Numériser et extraire le texte d'un document avec OCR",
      buttonText: "Scanner OCR",
      color: "blue",
      onClick: () => setShowOCRScanner(true)
    },
    {
      icon: Upload,
      title: "Import en lot",
      description: "Importer plusieurs textes depuis un fichier Excel/CSV",
      buttonText: "Import CSV/Excel",
      color: "blue",
      onClick: handleImportCSVExcel
    },
    {
      icon: Wand2,
      title: "Auto-remplissage intelligent",
      description: "Remplissage automatique avec IA",
      buttonText: "Auto-remplissage",
      color: "purple",
      onClick: handleAutoFill
    },
    {
      icon: Database,
      title: "Extraction automatique",
      description: "Importer et traiter automatiquement des textes juridiques",
      buttonText: "Extraction auto",
      color: "orange",
      onClick: handleAutoExtraction
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actionsConfig.map((action, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={action.onClick}>
            <CardHeader className="text-center">
              <action.icon className={`w-12 h-12 mx-auto text-${action.color}-600 mb-4`} />
              <CardTitle>{action.title}</CardTitle>
              <CardDescription>
                {action.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className={`w-full bg-${action.color}-600 hover:bg-${action.color}-700`} onClick={action.onClick}>
                <action.icon className="w-4 h-4 mr-2" />
                {action.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
