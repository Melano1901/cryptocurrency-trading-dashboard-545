
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

  const handleImportCSVExcel = () => {
    console.log('Import CSV/Excel pour procédures');
  };

  const handleAutoFill = () => {
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'ai-generation',
        title: 'Auto-remplissage intelligent',
        data: { feature: 'auto-fill', context: 'procedures' }
      }
    });
    window.dispatchEvent(event);
  };

  const handleAutoExtraction = () => {
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'extraction',
        title: 'Extraction automatique',
        data: { feature: 'auto-extraction', context: 'procedures' }
      }
    });
    window.dispatchEvent(event);
  };

  const actionsConfig = [
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
      description: "Importer et traiter automatiquement des procédures",
      buttonText: "Extraction auto",
      color: "orange",
      onClick: handleAutoExtraction
    }
  ];

  return (
    <div className="space-y-8">
      {/* Section principale avec les 2 choix principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Option Manuelle */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={onAddProcedure}>
          <CardHeader className="text-center p-8">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
              <Plus className="w-10 h-10 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl text-gray-900 mb-2">Saisie Manuelle</CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Saisir manuellement une nouvelle procédure administrative via le formulaire complet
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <Button 
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium" 
              onClick={onAddProcedure}
            >
              <Plus className="w-5 h-5 mr-3" />
              Formulaire Manuel
            </Button>
          </CardContent>
        </Card>

        {/* Option OCR */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={() => setShowOCRScanner(true)}>
          <CardHeader className="text-center p-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
              <Scan className="w-10 h-10 text-blue-600" />
            </div>
            <CardTitle className="text-2xl text-gray-900 mb-2">Scan OCR</CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Scanner et extraire automatiquement le texte d'un document avec reconnaissance optique
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <Button 
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium" 
              onClick={() => setShowOCRScanner(true)}
            >
              <Scan className="w-5 h-5 mr-3" />
              Scanner Document
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Autres options d'enrichissement */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Options d'enrichissement avancées</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actionsConfig.slice(2).map((action, index) => (
            <Card key={index + 2} className="hover:shadow-md transition-shadow cursor-pointer border-gray-200" onClick={action.onClick}>
              <CardHeader className="text-center">
                <action.icon className={`w-12 h-12 mx-auto text-${action.color}-600 mb-4`} />
                <CardTitle className="text-lg">{action.title}</CardTitle>
                <CardDescription>
                  {action.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline"
                  className={`w-full border-${action.color}-300 text-${action.color}-700 hover:bg-${action.color}-50`} 
                  onClick={action.onClick}
                >
                  <action.icon className="w-4 h-4 mr-2" />
                  {action.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
