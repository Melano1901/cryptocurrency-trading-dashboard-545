
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Wand2, Database, Scan } from 'lucide-react';
import { OCRScanner } from '@/components/common/OCRScanner';

interface EnrichmentTabProps {
  onAddProcedure: () => void;
  onOCRTextExtracted?: (text: string) => void;
}

export function EnrichmentTab({ onAddProcedure, onOCRTextExtracted }: EnrichmentTabProps) {
  const [showOCRScanner, setShowOCRScanner] = useState(false);

  const handleOCRExtracted = (text: string) => {
    console.log('Texte OCR extrait pour procédure:', text);
    if (onOCRTextExtracted) {
      onOCRTextExtracted(text);
    }
    setShowOCRScanner(false);
  };

  if (showOCRScanner) {
    return (
      <OCRScanner
        title="Scanner un document de procédure"
        onTextExtracted={handleOCRExtracted}
        onClose={() => setShowOCRScanner(false)}
      />
    );
  }

  const actions = [
    {
      icon: Plus,
      title: "Ajouter une procédure",
      description: "Saisir manuellement une nouvelle procédure administrative",
      buttonText: "Nouvelle procédure",
      color: "emerald",
      onClick: onAddProcedure
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
      description: "Importer plusieurs procédures depuis un fichier Excel/CSV",
      buttonText: "Import CSV/Excel",
      color: "blue",
      onClick: () => console.log('Import CSV/Excel')
    },
    {
      icon: Wand2,
      title: "Auto-remplissage intelligent",
      description: "Remplissage automatique avec IA",
      buttonText: "Auto-remplissage",
      color: "purple",
      onClick: () => console.log('Auto-remplissage')
    },
    {
      icon: Database,
      title: "Extraction automatique",
      description: "Importer et traiter automatiquement des procédures",
      buttonText: "Extraction auto",
      color: "orange",
      onClick: () => console.log('Extraction auto')
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actions.map((action, index) => (
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
