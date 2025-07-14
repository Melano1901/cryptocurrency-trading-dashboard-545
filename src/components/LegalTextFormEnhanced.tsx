import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, FileText, Save, Wand2, ClipboardList, Scan, FileImage } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { OCRScanner } from '@/components/common/OCRScanner';

interface LegalTextFormEnhancedProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialOCRText?: string;
  defaultActiveTab?: string;
}

export function LegalTextFormEnhanced({ onClose, onSubmit, initialOCRText, defaultActiveTab }: LegalTextFormEnhancedProps) {
  const { toast } = useToast();
  const [inputMethod, setInputMethod] = useState<'manual' | 'ocr'>(defaultActiveTab === 'ocr' ? 'ocr' : 'manual');
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
      // Pré-remplir avec les données OCR
      import('@/utils/ocrFormFiller').then(({ extractLegalTextData }) => {
        const extractedData = extractLegalTextData(initialOCRText);
        console.log('Pré-remplissage avec OCR:', extractedData);
        setFormData(prev => ({ ...prev, ...extractedData }));
      }).catch(() => {
        // Fallback simple si le module n'existe pas
        setFormData(prev => ({ ...prev, content: initialOCRText }));
      });
    }
  }, [initialOCRText]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOCRTextExtracted = (extractedText: string) => {
    // Essayer d'extraire les données structurées, sinon utiliser le texte brut
    import('@/utils/ocrFormFiller').then(({ extractLegalTextData }) => {
      const extractedData = extractLegalTextData(extractedText);
      console.log('Données extraites par OCR:', extractedData);
      setFormData(prev => ({ ...prev, ...extractedData }));
    }).catch(() => {
      // Fallback simple si le module n'existe pas
      setFormData(prev => ({ ...prev, content: extractedText }));
    });
    setShowOCRScanner(false);
    setInputMethod('manual'); // Passer en mode manuel après extraction
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onClose} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FileText className="w-8 h-8 text-emerald-600" />
                Ajout d'un Texte Juridique Algérien
              </h1>
              <p className="text-gray-600 mt-1">Saisie complète des informations juridiques</p>
            </div>
          </div>
          <Button onClick={handleAutoFill} variant="outline" className="gap-2 bg-purple-50 border-purple-200 hover:bg-purple-100">
            <Wand2 className="w-4 h-4 text-purple-600" />
            Auto-remplissage IA
          </Button>
        </div>

        {/* Méthode de saisie */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-8">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-blue-50">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              Méthode de Saisie
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                type="button"
                variant={inputMethod === 'manual' ? 'default' : 'outline'}
                onClick={() => setInputMethod('manual')}
                className="h-20 flex flex-col gap-2"
              >
                <ClipboardList className="w-6 h-6" />
                <span>Insertion Manuelle</span>
                <span className="text-xs opacity-80">Saisie via le formulaire</span>
              </Button>
              
              <Button
                type="button"
                variant={inputMethod === 'ocr' ? 'default' : 'outline'}
                onClick={() => setInputMethod('ocr')}
                className="h-20 flex flex-col gap-2"
              >
                <Scan className="w-6 h-6" />
                <span>Insertion OCR</span>
                <span className="text-xs opacity-80">Scan de document</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Section OCR */}
        {inputMethod === 'ocr' && (
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-8">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-2">
                <Scan className="w-5 h-5 text-green-600" />
                Scanner pour Générer un Texte Juridique
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {!showOCRScanner ? (
                <div className="text-center py-8">
                  <FileImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2">Scanner un Document</h4>
                  <p className="text-gray-600 mb-4">
                    Utilisez l'OCR pour extraire automatiquement le contenu de votre document juridique
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                    <Button 
                      onClick={() => setShowOCRScanner(true)} 
                      className="bg-blue-600 hover:bg-blue-700 h-16 flex flex-col gap-1"
                    >
                      <FileImage className="w-5 h-5" />
                      <span>Importer un fichier</span>
                      <span className="text-xs opacity-80">Images ou PDF</span>
                    </Button>
                    <Button 
                      onClick={() => setShowOCRScanner(true)} 
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 h-16 flex flex-col gap-1"
                    >
                      <Scan className="w-5 h-5" />
                      <span>Prendre une photo</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <OCRScanner
                  onTextExtracted={handleOCRTextExtracted}
                  onClose={() => setShowOCRScanner(false)}
                  title="Scanner pour Générer un Texte Juridique"
                />
              )}
            </CardContent>
          </Card>
        )}

        {/* Formulaire manuel */}
        {inputMethod === 'manual' && (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Section 1: Informations principales */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-blue-50">
                    <CardTitle className="text-xl text-gray-900">Informations principales</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-medium text-gray-700">Titre du texte *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Ex: Loi n° 08-09 du 25 février 2008"
                        className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reference" className="text-sm font-medium text-gray-700">Référence officielle *</Label>
                      <Input
                        id="reference"
                        value={formData.reference}
                        onChange={(e) => handleInputChange('reference', e.target.value)}
                        placeholder="Ex: J.O. n° 12 du 02/03/2008"
                        className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-sm font-medium text-gray-700">Type de texte *</Label>
                      <Select onValueChange={(value) => handleInputChange('type', value)}>
                        <SelectTrigger className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="loi">Loi</SelectItem>
                          <SelectItem value="decret">Décret</SelectItem>
                          <SelectItem value="arrete">Arrêté</SelectItem>
                          <SelectItem value="ordonnance">Ordonnance</SelectItem>
                          <SelectItem value="circulaire">Circulaire</SelectItem>
                          <SelectItem value="instruction">Instruction</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="domain" className="text-sm font-medium text-gray-700">Domaine juridique *</Label>
                      <Select onValueChange={(value) => handleInputChange('domain', value)}>
                        <SelectTrigger className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="civil">Droit civil</SelectItem>
                          <SelectItem value="penal">Droit pénal</SelectItem>
                          <SelectItem value="commercial">Droit commercial</SelectItem>
                          <SelectItem value="administratif">Droit administratif</SelectItem>
                          <SelectItem value="travail">Droit du travail</SelectItem>
                          <SelectItem value="famille">Droit de la famille</SelectItem>
                          <SelectItem value="environnement">Droit de l'environnement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-sm font-medium text-gray-700">Date de publication *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description/Objet</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Résumé de l'objet du texte juridique..."
                      rows={3}
                      className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section 2: Métadonnées */}
            <div className="space-y-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                  <CardTitle className="text-lg text-gray-900">Métadonnées</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="source" className="text-sm font-medium text-gray-700">Source/Origine</Label>
                    <Input
                      id="source"
                      value={formData.source}
                      onChange={(e) => handleInputChange('source', e.target.value)}
                      placeholder="Ex: Ministère de la Justice"
                      className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="keywords" className="text-sm font-medium text-gray-700">Mots-clés</Label>
                    <Textarea
                      id="keywords"
                      value={formData.keywords}
                      onChange={(e) => handleInputChange('keywords', e.target.value)}
                      placeholder="Mots-clés séparés par des virgules"
                      rows={3}
                      className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-medium text-gray-700">Statut</Label>
                    <Select onValueChange={(value) => handleInputChange('status', value)} defaultValue="draft">
                      <SelectTrigger className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Brouillon</SelectItem>
                        <SelectItem value="active">Actif</SelectItem>
                        <SelectItem value="archived">Archivé</SelectItem>
                        <SelectItem value="abrogated">Abrogé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section 3: Contenu du texte */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-green-50">
              <CardTitle className="text-xl text-gray-900">Contenu du texte juridique</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
                <Label htmlFor="content" className="text-sm font-medium text-gray-700">Texte intégral *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Saisir ou coller le contenu complet du texte juridique..."
                  rows={12}
                  className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 font-mono text-sm"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
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
