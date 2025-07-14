
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Book, 
  Search, 
  Play, 
  FileText, 
  User, 
  Settings, 
  HelpCircle,
  ChevronRight,
  Clock,
  Star
} from 'lucide-react';

export function UserGuideSection() {
  const [searchTerm, setSearchTerm] = useState('');

  const guideCategories = [
    {
      title: "Premiers pas",
      icon: User,
      articles: [
        { title: "Créer votre compte", duration: "5 min", difficulty: "Débutant" },
        { title: "Configuration initiale", duration: "10 min", difficulty: "Débutant" },
        { title: "Navigation dans l'interface", duration: "8 min", difficulty: "Débutant" },
        { title: "Personnaliser votre tableau de bord", duration: "12 min", difficulty: "Intermédiaire" }
      ]
    },
    {
      title: "Recherche et consultation",
      icon: Search,
      articles: [
        { title: "Recherche simple de textes juridiques", duration: "6 min", difficulty: "Débutant" },
        { title: "Utiliser les filtres avancés", duration: "15 min", difficulty: "Intermédiaire" },
        { title: "Recherche sémantique avec IA", duration: "20 min", difficulty: "Avancé" },
        { title: "Sauvegarder vos recherches", duration: "5 min", difficulty: "Débutant" }
      ]
    },
    {
      title: "Gestion des documents",
      icon: FileText,
      articles: [
        { title: "Organiser vos favoris", duration: "8 min", difficulty: "Débutant" },
        { title: "Créer des collections", duration: "12 min", difficulty: "Intermédiaire" },
        { title: "Partager des documents", duration: "10 min", difficulty: "Intermédiaire" },
        { title: "Annotations et commentaires", duration: "15 min", difficulty: "Intermédiaire" }
      ]
    },
    {
      title: "Outils avancés",
      icon: Settings,
      articles: [
        { title: "Assistant IA juridique", duration: "25 min", difficulty: "Avancé" },
        { title: "Analyse comparative", duration: "30 min", difficulty: "Avancé" },
        { title: "Génération de rapports", duration: "20 min", difficulty: "Avancé" },
        { title: "Intégrations externes", duration: "35 min", difficulty: "Expert" }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800';
      case 'Avancé': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <Book className="w-8 h-8 text-blue-600" />
          Guide utilisateur
        </h2>
        <p className="text-gray-600 text-lg">
          Apprenez à utiliser toutes les fonctionnalités de Dalil.dz
        </p>
      </div>

      {/* Barre de recherche */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              placeholder="Rechercher dans le guide..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button>
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-blue-600">45+</div>
            <div className="text-sm text-gray-600">Articles</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-green-600">12h</div>
            <div className="text-sm text-gray-600">Temps total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-orange-600">4.8</div>
            <div className="text-sm text-gray-600">Note moyenne</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-purple-600">1,250+</div>
            <div className="text-sm text-gray-600">Utilisateurs</div>
          </CardContent>
        </Card>
      </div>

      {/* Catégories de guides */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {guideCategories.map((category, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className="w-6 h-6 text-blue-600" />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.articles.map((article, articleIndex) => (
                  <div key={articleIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{article.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">{article.duration}</span>
                        <Badge className={`text-xs ${getDifficultyColor(article.difficulty)}`}>
                          {article.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Articles populaires */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Articles les plus consultés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Recherche simple de textes juridiques", views: "2,450", rating: 4.9 },
              { title: "Créer votre compte", views: "1,890", rating: 4.8 },
              { title: "Assistant IA juridique", views: "1,650", rating: 4.7 }
            ].map((popular, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <h4 className="font-medium mb-2">{popular.title}</h4>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{popular.views} vues</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{popular.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
