
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Plus, Tag, Calendar, BarChart3, Users, Search, Sparkles } from 'lucide-react';

export function TrendsEnrichmentTab() {
  const [newTrend, setNewTrend] = useState({
    title: '',
    category: '',
    description: '',
    keywords: '',
    priority: 'medium'
  });

  const [existingTrends, setExistingTrends] = useState([
    {
      id: 1,
      title: "Réforme du Code du Commerce",
      category: "Droit Commercial",
      searches: 245,
      growth: "+18%",
      keywords: ["commerce", "réforme", "entreprise"],
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      title: "Nouvelles Procédures Fiscales",
      category: "Fiscalité",
      searches: 189,
      growth: "+12%",
      keywords: ["fiscalité", "impôts", "procédures"],
      lastUpdated: "2024-01-14"
    },
    {
      id: 3,
      title: "Évolutions du Droit du Travail",
      category: "Droit Social",
      searches: 156,
      growth: "+25%",
      keywords: ["travail", "salarié", "contrat"],
      lastUpdated: "2024-01-13"
    }
  ]);

  const handleAddTrend = () => {
    if (newTrend.title && newTrend.category) {
      const trend = {
        id: Date.now(),
        title: newTrend.title,
        category: newTrend.category,
        searches: Math.floor(Math.random() * 200) + 50,
        growth: `+${Math.floor(Math.random() * 30) + 5}%`,
        keywords: newTrend.keywords.split(',').map(k => k.trim()),
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      
      setExistingTrends([trend, ...existingTrends]);
      setNewTrend({
        title: '',
        category: '',
        description: '',
        keywords: '',
        priority: 'medium'
      });
    }
  };

  const handleEnrichTrend = (trendId: number) => {
    console.log('Enrichissement de la tendance:', trendId);
    // Logique d'enrichissement automatique avec IA
    const enrichedData = {
      additionalKeywords: ['nouveauté', 'jurisprudence', 'application'],
      relatedTopics: ['Droit des contrats', 'Réglementation'],
      suggestedCategories: ['Actualité juridique', 'Veille réglementaire']
    };
    
    setExistingTrends(trends => 
      trends.map(trend => 
        trend.id === trendId 
          ? { 
              ...trend, 
              searches: trend.searches + Math.floor(Math.random() * 50),
              keywords: [...trend.keywords, ...enrichedData.additionalKeywords.slice(0, 2)]
            }
          : trend
      )
    );
  };

  const categories = [
    "Droit Commercial",
    "Droit du Travail", 
    "Fiscalité",
    "Droit Administratif",
    "Droit Pénal",
    "Droit Civil"
  ];

  return (
    <div className="space-y-6">
      {/* Formulaire d'ajout */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-green-600" />
            Ajouter une nouvelle tendance
          </CardTitle>
          <CardDescription>
            Identifiez et ajoutez de nouvelles tendances juridiques à surveiller
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Titre de la tendance</label>
              <Input
                placeholder="Ex: Nouveau décret sur les marchés publics"
                value={newTrend.title}
                onChange={(e) => setNewTrend({...newTrend, title: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Catégorie</label>
              <Select value={newTrend.category} onValueChange={(value) => setNewTrend({...newTrend, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <Textarea
              placeholder="Description détaillée de la tendance..."
              value={newTrend.description}
              onChange={(e) => setNewTrend({...newTrend, description: e.target.value})}
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Mots-clés (séparés par des virgules)</label>
              <Input
                placeholder="décret, marchés publics, réglementation"
                value={newTrend.keywords}
                onChange={(e) => setNewTrend({...newTrend, keywords: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Priorité</label>
              <Select value={newTrend.priority} onValueChange={(value) => setNewTrend({...newTrend, priority: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Faible</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="high">Élevée</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={handleAddTrend} className="w-full md:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter la tendance
          </Button>
        </CardContent>
      </Card>

      {/* Liste des tendances existantes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Tendances surveillées ({existingTrends.length})
          </CardTitle>
          <CardDescription>
            Gérez et enrichissez les tendances juridiques identifiées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {existingTrends.map((trend) => (
              <div key={trend.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-lg mb-1">{trend.title}</h4>
                    <Badge variant="secondary" className="mb-2">{trend.category}</Badge>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Search className="w-4 h-4" />
                        {trend.searches} recherches
                      </span>
                      <span className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        {trend.growth}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        MAJ: {trend.lastUpdated}
                      </span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEnrichTrend(trend.id)}
                    className="ml-4"
                  >
                    <Sparkles className="w-4 h-4 mr-1" />
                    Enrichir
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {trend.keywords.map((keyword, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
