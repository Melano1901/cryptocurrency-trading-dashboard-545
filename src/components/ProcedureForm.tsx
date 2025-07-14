
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Settings, Save, Wand2, Plus, Trash2, ClipboardList, Scan, FileImage } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { OCRScanner } from '@/components/common/OCRScanner';

interface ProcedureFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

interface ProcedureStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  responsible: string;
}

export function ProcedureForm({ onClose, onSubmit }: ProcedureFormProps) {
  const { toast } = useToast();
  const [inputMethod, setInputMethod] = useState<'manual' | 'ocr'>('manual');
  const [showOCRScanner, setShowOCRScanner] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    department: '',
    duration: '',
    complexity: '',
    cost: '',
    digitalizable: false,
    publicAccess: false,
    requiredDocs: [] as string[],
    complementaryDocs: [] as string[],
    steps: [] as ProcedureStep[],
    conditions: '',
    exceptions: '',
    legalBasis: '',
    contact: '',
    notes: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: 'requiredDocs' | 'complementaryDocs', value: string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addStep = () => {
    const newStep: ProcedureStep = {
      id: `step-${Date.now()}`,
      title: '',
      description: '',
      duration: '',
      responsible: ''
    };
    setFormData(prev => ({ ...prev, steps: [...prev.steps, newStep] }));
  };

  const removeStep = (id: string) => {
    setFormData(prev => ({ ...prev, steps: prev.steps.filter(step => step.id !== id) }));
  };

  const updateStep = (id: string, field: keyof ProcedureStep, value: string) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === id ? { ...step, [field]: value } : step
      )
    }));
  };

  const handleOCRTextExtracted = (extractedText: string) => {
    // Essayer d'extraire les données structurées, sinon utiliser le texte brut
    import('@/utils/ocrFormFiller').then(({ extractProcedureData }) => {
      const extractedData = extractProcedureData(extractedText);
      console.log('Données extraites par OCR:', extractedData);
      setFormData(prev => ({ ...prev, ...extractedData }));
    }).catch(() => {
      // Fallback simple si le module n'existe pas
      setFormData(prev => ({ ...prev, description: extractedText }));
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
    console.log('Données de la procédure:', formData);
    onSubmit(formData);
    toast({
      title: "Procédure ajoutée",
      description: `La procédure "${formData.title}" a été ajoutée avec succès.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onClose} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Settings className="w-8 h-8 text-blue-600" />
                Ajouter une nouvelle procédure
              </h1>
              <p className="text-gray-600 mt-1">Configuration complète d'une procédure administrative</p>
            </div>
          </div>
          <Button onClick={handleAutoFill} variant="outline" className="gap-2 bg-purple-50 border-purple-200 hover:bg-purple-100">
            <Wand2 className="w-4 h-4 text-purple-600" />
            Auto-remplissage IA
          </Button>
        </div>

        {/* Méthode de saisie */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-8">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-emerald-50">
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
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
                Scanner pour Générer une Procédure
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {!showOCRScanner ? (
                <div className="text-center py-8">
                  <FileImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2">Scanner un Document</h4>
                  <p className="text-gray-600 mb-4">
                    Utilisez l'OCR pour extraire automatiquement les informations de votre document de procédure
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
                  title="Scanner pour Générer une Procédure"
                />
              )}
            </CardContent>
          </Card>
        )}

        {/* Formulaire manuel */}
        {inputMethod === 'manual' && (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Section 1: Informations générales */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-emerald-50">
                  <CardTitle className="text-xl text-gray-900">Informations générales</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">Titre de la procédure *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Ex: Demande de permis de construire"
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Description détaillée de la procédure..."
                    rows={4}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium text-gray-700">Catégorie *</Label>
                    <Select onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urbanisme">Urbanisme</SelectItem>
                        <SelectItem value="etat-civil">État civil</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="fiscal">Fiscal</SelectItem>
                        <SelectItem value="commerce">Commerce</SelectItem>
                        <SelectItem value="environnement">Environnement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-sm font-medium text-gray-700">Service responsable *</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      placeholder="Ex: Service urbanisme"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-sm font-medium text-gray-700">Durée estimée</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      placeholder="Ex: 30 jours"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="complexity" className="text-sm font-medium text-gray-700">Complexité</Label>
                    <Select onValueChange={(value) => handleInputChange('complexity', value)}>
                      <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simple">Simple</SelectItem>
                        <SelectItem value="moyenne">Moyenne</SelectItem>
                        <SelectItem value="complexe">Complexe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cost" className="text-sm font-medium text-gray-700">Coût (DA)</Label>
                    <Input
                      id="cost"
                      value={formData.cost}
                      onChange={(e) => handleInputChange('cost', e.target.value)}
                      placeholder="Ex: 5000"
                      type="number"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 2: Conditions et modalités */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-green-50">
                <CardTitle className="text-xl text-gray-900">Conditions et modalités</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="conditions" className="text-sm font-medium text-gray-700">Conditions d'éligibilité</Label>
                  <Textarea
                    id="conditions"
                    value={formData.conditions}
                    onChange={(e) => handleInputChange('conditions', e.target.value)}
                    placeholder="Conditions requises pour cette procédure..."
                    rows={4}
                    className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exceptions" className="text-sm font-medium text-gray-700">Exceptions et cas particuliers</Label>
                  <Textarea
                    id="exceptions"
                    value={formData.exceptions}
                    onChange={(e) => handleInputChange('exceptions', e.target.value)}
                    placeholder="Cas d'exception et situations particulières..."
                    rows={3}
                    className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="legalBasis" className="text-sm font-medium text-gray-700">Base légale</Label>
                  <Input
                    id="legalBasis"
                    value={formData.legalBasis}
                    onChange={(e) => handleInputChange('legalBasis', e.target.value)}
                    placeholder="Ex: Loi n° 90-29 du 1er décembre 1990"
                    className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-sm font-medium text-gray-700">Contact/Responsable</Label>
                  <Input
                    id="contact"
                    value={formData.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                    placeholder="Email ou téléphone du responsable"
                    className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.digitalizable}
                      onChange={(e) => handleInputChange('digitalizable', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Numérisable</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.publicAccess}
                      onChange={(e) => handleInputChange('publicAccess', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Accès public</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section 3: Étapes de la procédure */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-gray-900">Étapes de la procédure</CardTitle>
                <Button type="button" onClick={addStep} variant="outline" className="gap-2 bg-blue-50 border-blue-200 hover:bg-blue-100">
                  <Plus className="w-4 h-4" />
                  Ajouter une étape
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {formData.steps.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Settings className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Aucune étape définie. Cliquez sur "Ajouter une étape" pour commencer.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.steps.map((step, index) => (
                    <div key={step.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">Étape {index + 1}</h4>
                        <Button
                          type="button"
                          onClick={() => removeStep(step.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          placeholder="Titre de l'étape"
                          value={step.title}
                          onChange={(e) => updateStep(step.id, 'title', e.target.value)}
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <Input
                          placeholder="Responsable"
                          value={step.responsible}
                          onChange={(e) => updateStep(step.id, 'responsible', e.target.value)}
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        <div className="md:col-span-3">
                          <Textarea
                            placeholder="Description de l'étape"
                            value={step.description}
                            onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                            rows={2}
                            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <Input
                          placeholder="Durée"
                          value={step.duration}
                          onChange={(e) => updateStep(step.id, 'duration', e.target.value)}
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Section 4: Notes additionnelles */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardTitle className="text-xl text-gray-900">Notes et informations complémentaires</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Informations complémentaires, remarques, conseils pour les usagers..."
                rows={4}
                className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6">
            <Button type="button" variant="outline" onClick={onClose} className="px-8">
              Annuler
            </Button>
            <Button type="submit" className="px-8 bg-blue-600 hover:bg-blue-700 gap-2">
              <Save className="w-4 h-4" />
              Enregistrer la procédure
            </Button>
          </div>
          </form>
        )}
      </div>
    </div>
  );
}
