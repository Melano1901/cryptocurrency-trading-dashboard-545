
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Brain, FileText, Search, Sparkles, Check, Copy, RefreshCw } from 'lucide-react';

interface AIAutoFillModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: 'legal-texts' | 'procedures' | 'general';
}

export function AIAutoFillModal({ isOpen, onClose, context }: AIAutoFillModalProps) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [inputData, setInputData] = useState({
    reference: '',
    keywords: '',
    description: '',
    documentType: ''
  });
  const [generatedContent, setGeneratedContent] = useState({
    title: '',
    summary: '',
    keywords: [],
    category: '',
    fullContent: ''
  });

  const handleStartAutoFill = async () => {
    setIsProcessing(true);
    setStep(2);
    
    // Simulation du processus d'auto-remplissage
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Générer du contenu simulé basé sur le contexte
    const mockContent = {
      'legal-texts': {
        title: `Analyse juridique - ${inputData.reference || 'Document juridique'}`,
        summary: `Ce texte juridique traite des aspects réglementaires liés aux ${inputData.keywords || 'dispositions légales'}. Il établit le cadre normatif applicable et précise les conditions d'application.`,
        keywords: ['réglementation', 'dispositions', 'cadre juridique', 'application'],
        category: 'Texte réglementaire',
        fullContent: `Article 1er : Les présentes dispositions s'appliquent à l'ensemble des ${inputData.keywords || 'entités concernées'}.\n\nArticle 2 : Les modalités d'application sont définies par voie réglementaire.\n\nArticle 3 : Le présent texte entre en vigueur à compter de sa publication.`
      },
      'procedures': {
        title: `Procédure administrative - ${inputData.reference || 'Nouvelle procédure'}`,
        summary: `Cette procédure définit les étapes à suivre pour ${inputData.description || 'accomplir les démarches administratives'}. Elle précise les documents requis et les délais applicables.`,
        keywords: ['procédure', 'démarches', 'documents', 'délais'],
        category: 'Procédure administrative',
        fullContent: `Étape 1 : Préparation des documents requis\nÉtape 2 : Dépôt de la demande\nÉtape 3 : Instruction du dossier\nÉtape 4 : Notification de la décision`
      },
      'general': {
        title: `Document généré - ${inputData.reference || 'Nouveau document'}`,
        summary: `Contenu généré automatiquement basé sur les informations fournies concernant ${inputData.keywords || 'le sujet traité'}.`,
        keywords: ['document', 'contenu', 'automatique'],
        category: 'Document général',
        fullContent: `Contenu principal du document généré automatiquement par l'IA...`
      }
    };
    
    setGeneratedContent(mockContent[context]);
    setIsProcessing(false);
    setStep(3);
  };

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleUseContent = () => {
    // Émettre un événement avec le contenu généré
    const event = new CustomEvent('ai-content-generated', {
      detail: { content: generatedContent, context }
    });
    window.dispatchEvent(event);
    onClose();
  };

  const handleRegenerate = () => {
    setStep(1);
    setProgress(0);
    setGeneratedContent({
      title: '',
      summary: '',
      keywords: [],
      category: '',
      fullContent: ''
    });
  };

  const getContextTitle = () => {
    const titles = {
      'legal-texts': 'Auto-remplissage pour Textes Juridiques',
      'procedures': 'Auto-remplissage pour Procédures',
      'general': 'Auto-remplissage Intelligent'
    };
    return titles[context];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-purple-600" />
            {getContextTitle()}
          </DialogTitle>
          <DialogDescription>
            Utilisez l'intelligence artificielle pour générer automatiquement le contenu de vos documents
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  Informations de base
                </CardTitle>
                <CardDescription>
                  Fournissez quelques informations pour guider la génération automatique
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Référence/Titre</label>
                    <Input
                      placeholder={context === 'legal-texts' ? "Ex: Décret n°24-15" : "Ex: Demande de permis"}
                      value={inputData.reference}
                      onChange={(e) => setInputData({...inputData, reference: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Type de document</label>
                    <Select value={inputData.documentType} onValueChange={(value) => setInputData({...inputData, documentType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type" />
                      </SelectTrigger>
                      <SelectContent>
                        {context === 'legal-texts' ? (
                          <>
                            <SelectItem value="decree">Décret</SelectItem>
                            <SelectItem value="law">Loi</SelectItem>
                            <SelectItem value="regulation">Règlement</SelectItem>
                            <SelectItem value="circular">Circulaire</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="administrative">Procédure administrative</SelectItem>
                            <SelectItem value="permit">Demande de permis</SelectItem>
                            <SelectItem value="registration">Inscription/Enregistrement</SelectItem>
                            <SelectItem value="certification">Certification</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Mots-clés principaux</label>
                  <Input
                    placeholder="Entrez les mots-clés séparés par des virgules"
                    value={inputData.keywords}
                    onChange={(e) => setInputData({...inputData, keywords: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Description/Contexte</label>
                  <Textarea
                    placeholder="Décrivez brièvement le contenu souhaité..."
                    value={inputData.description}
                    onChange={(e) => setInputData({...inputData, description: e.target.value})}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button onClick={handleStartAutoFill} className="flex-1">
                <Sparkles className="w-4 h-4 mr-2" />
                Générer avec IA
              </Button>
              <Button variant="outline" onClick={onClose}>
                Annuler
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 text-center py-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Brain className="w-8 h-8 text-purple-600 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Génération en cours...</h3>
              <p className="text-gray-600 mb-4">L'IA analyse vos informations et génère le contenu</p>
              <Progress value={progress} className="w-full max-w-md mx-auto" />
              <p className="text-sm text-gray-500 mt-2">{progress}% complété</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-lg font-semibold">Contenu généré avec succès</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleRegenerate}>
                <RefreshCw className="w-4 h-4 mr-1" />
                Régénérer
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Métadonnées générées</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Titre</label>
                    <div className="flex items-center gap-2">
                      <Input value={generatedContent.title} readOnly />
                      <Button size="sm" variant="outline" onClick={() => handleCopyContent(generatedContent.title)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Catégorie</label>
                    <Badge variant="secondary">{generatedContent.category}</Badge>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Mots-clés suggérés</label>
                    <div className="flex flex-wrap gap-2">
                      {generatedContent.keywords.map((keyword, idx) => (
                        <Badge key={idx} variant="outline">{keyword}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Résumé</label>
                    <Textarea value={generatedContent.summary} readOnly rows={4} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contenu principal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Textarea 
                      value={generatedContent.fullContent} 
                      readOnly 
                      rows={12}
                      className="mb-2"
                    />
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="absolute top-2 right-2"
                      onClick={() => handleCopyContent(generatedContent.fullContent)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleUseContent} className="flex-1">
                <Check className="w-4 h-4 mr-2" />
                Utiliser ce contenu
              </Button>
              <Button variant="outline" onClick={onClose}>
                Fermer
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
