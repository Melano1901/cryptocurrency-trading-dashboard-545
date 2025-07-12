import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { 
  Wand2, 
  FileText, 
  ClipboardList,
  Plus,
  Eye,
  Download,
  Settings,
  Code,
  BookOpen,
  Save,
  Edit,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  Type,
  Calendar,
  Hash,
  ToggleLeft,
  List,
  Upload,
  Mail,
  Phone,
  MapPin,
  User,
  Building,
  Scan,
  FileImage
} from "lucide-react";
import { OCRScanner } from "@/components/common/OCRScanner";

interface FormField {
  id: string;
  name: string;
  label: string;
  type: string;
  required: boolean;
  placeholder?: string;
  description?: string;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  defaultValue?: string;
}

export function FormGeneratorTab() {
  const [selectedFormType, setSelectedFormType] = useState("");
  const [selectedFormList, setSelectedFormList] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [generatedFields, setGeneratedFields] = useState<FormField[]>([]);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showOCRScanner, setShowOCRScanner] = useState(false);
  const [generationMethod, setGenerationMethod] = useState<'manual' | 'ocr'>('manual');

  const formTypes = [
    { value: "textes_juridiques", label: "Textes Juridiques" },
    { value: "procedures_administratives", label: "Procédures Administratives" }
  ];

  const formLists = {
    textes_juridiques: [
      { value: "loi", label: "Loi", fields: ["titre", "numero", "date_promulgation", "journal_officiel", "contenu", "domaine_juridique", "status", "auteur"] },
      { value: "decret", label: "Décret exécutif", fields: ["titre", "numero", "date_signature", "signataire", "contenu", "texte_reference", "ministere", "application"] },
      { value: "code", label: "Code", fields: ["titre", "type_code", "derniere_modification", "livre", "titre_livre", "chapitre", "section", "article"] },
      { value: "ordonnance", label: "Ordonnance", fields: ["titre", "numero", "date_signature", "president", "contexte", "domaine", "ratification", "effet"] },
      { value: "arrete", label: "Arrêté ministériel", fields: ["titre", "numero", "ministere", "date_signature", "objet", "application", "abrogation", "publication"] }
    ],
    procedures_administratives: [
      { value: "etat_civil", label: "État Civil", fields: ["nom_procedure", "documents_requis", "delai_traitement", "cout", "lieu_depot", "conditions", "pieces_jointes", "observations"] },
      { value: "urbanisme", label: "Urbanisme", fields: ["type_permis", "surface", "localisation", "documents_techniques", "frais", "commission", "zone", "contraintes"] },
      { value: "commerce", label: "Commerce", fields: ["forme_juridique", "capital_social", "activite", "associes", "siege_social", "duree", "immatriculation", "taxes"] },
      { value: "transport", label: "Transport", fields: ["type_permis", "categorie_vehicule", "examen_medical", "formation", "cout_total", "validite", "restrictions", "renouvellement"] }
    ]
  };

  const fieldTypes = [
    { value: "text", label: "Texte", icon: Type },
    { value: "textarea", label: "Zone de texte", icon: FileText },
    { value: "number", label: "Nombre", icon: Hash },
    { value: "date", label: "Date", icon: Calendar },
    { value: "email", label: "Email", icon: Mail },
    { value: "tel", label: "Téléphone", icon: Phone },
    { value: "url", label: "URL", icon: MapPin },
    { value: "select", label: "Liste déroulante", icon: List },
    { value: "checkbox", label: "Case à cocher", icon: ToggleLeft },
    { value: "file", label: "Fichier", icon: Upload }
  ];

  const handleGenerateForm = () => {
    const selectedType = selectedFormType as keyof typeof formLists;
    const selectedForm = formLists[selectedType]?.find(form => form.value === selectedFormList);
    
    if (selectedForm) {
      const fields: FormField[] = selectedForm.fields.map((field, index) => ({
        id: `field_${index}`,
        name: field,
        label: field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        type: getFieldType(field),
        required: isRequiredField(field),
        placeholder: `Saisir ${field.replace(/_/g, ' ').toLowerCase()}`,
        description: getFieldDescription(field)
      }));
      setGeneratedFields(fields);
    }
  };

  const handleOCRTextExtracted = (extractedText: string) => {
    // Analyser le texte extrait pour générer des champs de formulaire
    const generatedFieldsFromOCR = parseTextToFormFields(extractedText);
    setGeneratedFields(generatedFieldsFromOCR);
    setShowOCRScanner(false);
  };

  const parseTextToFormFields = (text: string): FormField[] => {
    const lines = text.split('\n').filter(line => line.trim());
    const fields: FormField[] = [];
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine.length > 0) {
        // Détecter les types de champs basés sur le contenu
        let fieldType = 'text';
        let fieldName = trimmedLine.toLowerCase().replace(/[^a-z0-9]/g, '_');
        
        if (trimmedLine.toLowerCase().includes('date')) fieldType = 'date';
        else if (trimmedLine.toLowerCase().includes('email')) fieldType = 'email';
        else if (trimmedLine.toLowerCase().includes('téléphone') || trimmedLine.toLowerCase().includes('tel')) fieldType = 'tel';
        else if (trimmedLine.toLowerCase().includes('nombre') || /\d+/.test(trimmedLine)) fieldType = 'number';
        else if (trimmedLine.length > 50) fieldType = 'textarea';
        
        fields.push({
          id: `ocr_field_${index}`,
          name: fieldName,
          label: trimmedLine,
          type: fieldType,
          required: false,
          placeholder: `Saisir ${trimmedLine.toLowerCase()}`,
          description: `Champ généré à partir du texte: "${trimmedLine}"`
        });
      }
    });
    
    return fields;
  };

  const getFieldType = (fieldName: string) => {
    if (fieldName.includes('date')) return 'date';
    if (fieldName.includes('numero') || fieldName.includes('cout') || fieldName.includes('capital')) return 'number';
    if (fieldName.includes('contenu') || fieldName.includes('description') || fieldName.includes('observations')) return 'textarea';
    if (fieldName.includes('email')) return 'email';
    if (fieldName.includes('tel') || fieldName.includes('phone')) return 'tel';
    if (fieldName.includes('url') || fieldName.includes('site')) return 'url';
    return 'text';
  };

  const isRequiredField = (fieldName: string) => {
    const requiredFields = ['titre', 'nom_procedure', 'numero', 'date'];
    return requiredFields.some(req => fieldName.includes(req));
  };

  const getFieldDescription = (fieldName: string) => {
    const descriptions: { [key: string]: string } = {
      'titre': 'Titre officiel du document',
      'numero': 'Numéro d\'identification unique',
      'date_promulgation': 'Date de promulgation officielle',
      'journal_officiel': 'Référence du Journal Officiel',
      'contenu': 'Contenu complet du texte',
      'domaine_juridique': 'Domaine juridique concerné',
      'nom_procedure': 'Nom de la procédure administrative',
      'documents_requis': 'Liste des documents nécessaires',
      'delai_traitement': 'Délai de traitement estimé',
      'cout': 'Coût de la procédure en DA'
    };
    return descriptions[fieldName] || `Information relative à ${fieldName.replace(/_/g, ' ')}`;
  };

  const addCustomField = () => {
    const newField: FormField = {
      id: `custom_${Date.now()}`,
      name: 'nouveau_champ',
      label: 'Nouveau Champ',
      type: 'text',
      required: false,
      placeholder: 'Entrez votre valeur'
    };
    setGeneratedFields([...generatedFields, newField]);
    setEditingField(newField.id);
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setGeneratedFields(fields => 
      fields.map(field => 
        field.id === fieldId ? { ...field, ...updates } : field
      )
    );
  };

  const removeField = (fieldId: string) => {
    setGeneratedFields(fields => fields.filter(field => field.id !== fieldId));
  };

  const duplicateField = (fieldId: string) => {
    const fieldToDuplicate = generatedFields.find(field => field.id === fieldId);
    if (fieldToDuplicate) {
      const newField: FormField = {
        ...fieldToDuplicate,
        id: `copy_${Date.now()}`,
        name: `${fieldToDuplicate.name}_copie`,
        label: `${fieldToDuplicate.label} (Copie)`
      };
      setGeneratedFields([...generatedFields, newField]);
    }
  };

  const moveField = (fieldId: string, direction: 'up' | 'down') => {
    const currentIndex = generatedFields.findIndex(field => field.id === fieldId);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= generatedFields.length) return;
    
    const newFields = [...generatedFields];
    [newFields[currentIndex], newFields[newIndex]] = [newFields[newIndex], newFields[currentIndex]];
    setGeneratedFields(newFields);
  };

  const getAvailableForms = () => {
    if (!selectedFormType) return [];
    return formLists[selectedFormType as keyof typeof formLists] || [];
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
          <Wand2 className="w-6 h-6 text-purple-600" />
          Générateur de Formulaires Avancé
        </h3>
        <p className="text-gray-600">
          Créez, personnalisez et exportez des formulaires sophistiqués pour chaque type de contenu
        </p>
      </div>

      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generator">Générateur</TabsTrigger>
          <TabsTrigger value="preview">Prévisualisation</TabsTrigger>
          <TabsTrigger value="library">Bibliothèque</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          {/* Méthode de génération */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                Méthode de Génération
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant={generationMethod === 'manual' ? 'default' : 'outline'}
                  onClick={() => setGenerationMethod('manual')}
                  className="h-20 flex flex-col gap-2"
                >
                  <ClipboardList className="w-6 h-6" />
                  <span>Génération Manuelle</span>
                  <span className="text-xs opacity-80">À partir des modèles prédéfinis</span>
                </Button>
                
                <Button
                  variant={generationMethod === 'ocr' ? 'default' : 'outline'}
                  onClick={() => setGenerationMethod('ocr')}
                  className="h-20 flex flex-col gap-2"
                >
                  <Scan className="w-6 h-6" />
                  <span>Génération OCR</span>
                  <span className="text-xs opacity-80">À partir d'un document scanné</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Configuration manuelle */}
          {generationMethod === 'manual' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  Configuration du Formulaire
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="form-type">Type de Formulaire *</Label>
                    <Select value={selectedFormType} onValueChange={setSelectedFormType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        {formTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="form-list">Liste des formulaires *</Label>
                    <Select 
                      value={selectedFormList} 
                      onValueChange={setSelectedFormList}
                      disabled={!selectedFormType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un formulaire" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableForms().map((form) => (
                          <SelectItem key={form.value} value={form.value}>
                            <div className="flex items-center gap-2">
                              {selectedFormType === 'textes_juridiques' ? (
                                <FileText className="w-4 h-4" />
                              ) : (
                                <ClipboardList className="w-4 h-4" />
                              )}
                              {form.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="form-description">Description du formulaire</Label>
                  <Textarea
                    id="form-description"
                    placeholder="Description détaillée du formulaire et de son utilisation..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <Button 
                  onClick={handleGenerateForm} 
                  disabled={!selectedFormType || !selectedFormList}
                  className="w-full md:w-auto"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Générer le Formulaire de Base
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Configuration OCR */}
          {generationMethod === 'ocr' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scan className="w-5 h-5 text-green-600" />
                  Génération par OCR
                </CardTitle>
                <CardDescription>
                  Uploadez un document (Image, PDF, Word, Excel) pour générer automatiquement un formulaire
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!showOCRScanner ? (
                  <div className="text-center py-8">
                    <FileImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold mb-2">Scanner un Document</h4>
                    <p className="text-gray-600 mb-4">
                      Utilisez l'OCR pour extraire automatiquement les champs de votre document
                    </p>
                    <Button onClick={() => setShowOCRScanner(true)} className="bg-green-600 hover:bg-green-700">
                      <Scan className="w-4 h-4 mr-2" />
                      Commencer le Scan
                    </Button>
                  </div>
                ) : (
                  <OCRScanner
                    onTextExtracted={handleOCRTextExtracted}
                    onClose={() => setShowOCRScanner(false)}
                    title="Scanner pour Générer un Formulaire"
                  />
                )}
              </CardContent>
            </Card>
          )}

          {/* Éditeur de champs */}
          {generatedFields.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Edit className="w-5 h-5 text-green-600" />
                    Éditeur de Champs ({generatedFields.length} champs)
                    {generationMethod === 'ocr' && (
                      <Badge className="bg-green-100 text-green-800">Généré par OCR</Badge>
                    )}
                  </div>
                  <Button onClick={addCustomField} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un champ
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {generatedFields.map((field, index) => (
                    <div key={field.id} className="border rounded-lg p-4 space-y-4">
                      {editingField === field.id ? (
                        // Mode édition
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Nom du champ</Label>
                            <Input
                              value={field.name}
                              onChange={(e) => updateField(field.id, { name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Libellé</Label>
                            <Input
                              value={field.label}
                              onChange={(e) => updateField(field.id, { label: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Type de champ</Label>
                            <Select 
                              value={field.type} 
                              onValueChange={(value) => updateField(field.id, { type: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {fieldTypes.map((type) => {
                                  const IconComponent = type.icon;
                                  return (
                                    <SelectItem key={type.value} value={type.value}>
                                      <div className="flex items-center gap-2">
                                        <IconComponent className="w-4 h-4" />
                                        {type.label}
                                      </div>
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Placeholder</Label>
                            <Input
                              value={field.placeholder || ''}
                              onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                            />
                          </div>
                          <div className="col-span-full space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              value={field.description || ''}
                              onChange={(e) => updateField(field.id, { description: e.target.value })}
                              rows={2}
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={field.required}
                              onCheckedChange={(checked) => updateField(field.id, { required: checked })}
                            />
                            <Label>Champ obligatoire</Label>
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={() => setEditingField(null)} size="sm">
                              Terminer
                            </Button>
                          </div>
                        </div>
                      ) : (
                        // Mode affichage
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{field.label}</h4>
                              {field.required && <Badge className="bg-red-100 text-red-800 text-xs">Obligatoire</Badge>}
                              <Badge variant="outline" className="text-xs">{field.type}</Badge>
                            </div>
                            <p className="text-sm text-gray-600">{field.description || field.placeholder}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveField(field.id, 'up')}
                              disabled={index === 0}
                            >
                              <ArrowUp className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveField(field.id, 'down')}
                              disabled={index === generatedFields.length - 1}
                            >
                              <ArrowDown className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingField(field.id)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => duplicateField(field.id)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeField(field.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          {generatedFields.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Sauvegarder le Formulaire
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Exporter JSON
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Exporter HTML
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="preview">
          {generatedFields.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-green-600" />
                  Prévisualisation: {generationMethod === 'ocr' ? 'Formulaire généré par OCR' : getAvailableForms().find(f => f.value === selectedFormList)?.label}
                </CardTitle>
                <CardDescription>
                  {formDescription || 'Formulaire généré automatiquement'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  {generatedFields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label className="flex items-center gap-2">
                        {field.label}
                        {field.required && <Badge className="bg-red-100 text-red-800 text-xs">Obligatoire</Badge>}
                      </Label>
                      {field.type === 'textarea' ? (
                        <Textarea 
                          placeholder={field.placeholder}
                          rows={3}
                        />
                      ) : field.type === 'select' ? (
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder={field.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                            <SelectItem value="option2">Option 2</SelectItem>
                            <SelectItem value="option3">Option 3</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input 
                          type={field.type}
                          placeholder={field.placeholder}
                        />
                      )}
                      {field.description && (
                        <p className="text-sm text-gray-500">{field.description}</p>
                      )}
                    </div>
                  ))}
                  <Button type="button" className="w-full">
                    Aperçu de soumission
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-12">
              <Wand2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun formulaire à prévisualiser</h3>
              <p className="text-gray-500">Générez d'abord un formulaire pour voir l'aperçu</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="library">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-orange-600" />
                Bibliothèque de Formulaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { 
                    name: "Formulaire Loi Ordinaire", 
                    type: "Loi", 
                    fields: 8, 
                    created: "Il y a 2 jours",
                    description: "Formulaire complet pour l'ajout de lois ordinaires"
                  },
                  { 
                    name: "Formulaire Décret Exécutif", 
                    type: "Décret", 
                    fields: 10, 
                    created: "Il y a 1 semaine",
                    description: "Formulaire détaillé pour les décrets exécutifs"
                  },
                  { 
                    name: "Formulaire Procédure État Civil", 
                    type: "Procédure", 
                    fields: 6, 
                    created: "Il y a 3 jours",
                    description: "Formulaire simplifié pour les procédures d'état civil"
                  }
                ].map((form, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{form.name}</h4>
                        <Badge variant="outline">{form.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{form.description}</p>
                      <p className="text-xs text-gray-500 mb-1">{form.fields} champs configurés</p>
                      <p className="text-xs text-gray-500 mb-3">{form.created}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          Voir
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-3 h-3 mr-1" />
                          Utiliser
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="w-3 h-3 mr-1" />
                          Modifier
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
