
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wand2, Loader, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIAutoFillModalProps {
  isOpen: boolean;
  onClose: () => void;
  context?: 'legal-text' | 'procedure' | 'general';
}

export function AIAutoFillModal({ isOpen, onClose, context = 'general' }: AIAutoFillModalProps) {
  const { toast } = useToast();
  const [formType, setFormType] = useState(context);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir une description pour l'auto-remplissage.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulation de génération IA
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Auto-remplissage généré",
        description: "Les données ont été générées avec succès. Elles seront appliquées au formulaire.",
      });
      onClose();
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-purple-600" />
            Auto-remplissage IA
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Type de formulaire</Label>
            <Select value={formType} onValueChange={setFormType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="legal-text">Texte juridique</SelectItem>
                <SelectItem value="procedure">Procédure administrative</SelectItem>
                <SelectItem value="general">Général</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Description du contenu à générer</Label>
            <Textarea
              placeholder="Décrivez le type de contenu que vous souhaitez générer automatiquement..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Fonctionnalités IA disponibles :</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Génération automatique de titres et descriptions</li>
              <li>• Extraction de mots-clés pertinents</li>
              <li>• Classification automatique par domaine juridique</li>
              <li>• Suggestions de références officielles</li>
            </ul>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} disabled={isGenerating}>
              Annuler
            </Button>
            <Button onClick={handleGenerate} disabled={isGenerating} className="bg-purple-600 hover:bg-purple-700">
              {isGenerating ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Générer avec IA
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
