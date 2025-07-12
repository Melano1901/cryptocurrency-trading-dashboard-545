
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageSquare, 
  Search, 
  Plus, 
  User,
  Clock,
  Pin,
  Eye,
  Reply,
  ThumbsUp,
  Star,
  Filter,
  TrendingUp,
  Award,
  Bookmark,
  Flag,
  Share2
} from 'lucide-react';

export function EnhancedForum() {
  const [searchTerm, setSearchTerm] = useState('');

  const expertTopics = [
    {
      id: 1,
      title: "Intelligence artificielle et droit : enjeux éthiques",
      author: "Prof. Rachid Alami",
      role: "Expert IA & Droit",
      expertise: "AI Law",
      replies: 34,
      views: 892,
      upvotes: 67,
      lastActivity: "Il y a 1 heure",
      tags: ["IA", "éthique", "innovation"],
      isPinned: true,
      isExpertVerified: true,
      difficulty: "Avancé"
    },
    {
      id: 2,
      title: "Blockchain et smart contracts : cadre juridique",
      author: "Me. Aicha Benkirane",
      role: "Avocate spécialisée Fintech",
      expertise: "Blockchain Law",
      replies: 28,
      views: 567,
      upvotes: 45,
      lastActivity: "Il y a 3 heures",
      tags: ["blockchain", "contrats", "fintech"],
      isPinned: false,
      isExpertVerified: true,
      difficulty: "Expert"
    },
    {
      id: 3,
      title: "Protection des données personnelles : GDPR vs législation nationale",
      author: "Dr. Youssef Bennani",
      role: "Consultant en droit numérique",
      expertise: "Data Privacy",
      replies: 42,
      views: 1203,
      upvotes: 89,
      lastActivity: "Il y a 2 heures",
      tags: ["GDPR", "données", "privacy"],
      isPinned: false,
      isExpertVerified: true,
      difficulty: "Intermédiaire"
    }
  ];

  const liveDiscussions = [
    {
      id: 1,
      title: "Session live : Réforme du code du commerce",
      participants: 15,
      duration: "45 min",
      status: "en cours",
      expert: "Prof. Hassan Benali",
      topic: "Droit commercial"
    },
    {
      id: 2,
      title: "Débat : Droit du travail post-COVID",
      participants: 8,
      duration: "30 min",
      status: "démarrage dans 10 min",
      expert: "Me. Fatima Zahra",
      topic: "Droit du travail"
    }
  ];

  const weeklyExperts = [
    {
      name: "Prof. Ahmed Bennani",
      specialty: "Droit constitutionnel",
      contributions: 156,
      rating: 4.9,
      badge: "Contributeur du mois"
    },
    {
      name: "Me. Sarah Kadiri",
      specialty: "Droit des affaires",
      contributions: 134,
      rating: 4.8,
      badge: "Expert vérifié"
    },
    {
      name: "Dr. Omar Alaoui",
      specialty: "Droit pénal",
      contributions: 98,
      rating: 4.7,
      badge: "Mentor"
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
      {/* Sessions live */}
      <Card className="border-emerald-200 bg-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <TrendingUp className="w-5 h-5" />
            Sessions Live en Cours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {liveDiscussions.map((session) => (
              <div key={session.id} className="p-4 bg-white rounded-lg border border-emerald-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-emerald-900">{session.title}</h4>
                    <p className="text-sm text-emerald-700 mb-2">Animé par {session.expert}</p>
                    <div className="flex items-center gap-4 text-sm text-emerald-600">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {session.participants} participants
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.duration}
                      </span>
                      <Badge className="bg-emerald-100 text-emerald-800">{session.topic}</Badge>
                    </div>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    {session.status === 'en cours' ? 'Rejoindre' : 'S\'inscrire'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experts de la semaine */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-600" />
            Experts de la Semaine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weeklyExperts.map((expert, index) => (
              <div key={index} className="p-4 border rounded-lg text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg">
                  {expert.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h4 className="font-semibold mb-1">{expert.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{expert.specialty}</p>
                <Badge className="mb-2 bg-yellow-100 text-yellow-800">{expert.badge}</Badge>
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span>{expert.contributions} contributions</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current text-yellow-500" />
                    {expert.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Discussions d'experts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Discussions d'Experts
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtres avancés
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle discussion
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expertTopics.map((topic) => (
              <div key={topic.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {topic.isPinned && <Pin className="w-4 h-4 text-red-500" />}
                      {topic.isExpertVerified && (
                        <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          Expert vérifié
                        </Badge>
                      )}
                      <Badge className={getDifficultyColor(topic.difficulty)}>
                        {topic.difficulty}
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">{topic.title}</h3>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-medium">
                          {topic.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <span className="font-medium">{topic.author}</span>
                          <div className="text-xs text-gray-500">{topic.role}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {topic.expertise}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-1 mb-3">
                      {topic.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Reply className="w-4 h-4" />
                      {topic.replies} réponses
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {topic.views} vues
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {topic.upvotes} votes
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {topic.lastActivity}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Flag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Outils de recherche avancée */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-purple-600" />
            Recherche Intelligente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par sujet, expert, ou mots-clés juridiques..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                Droit des affaires
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                Droit numérique
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                Propriété intellectuelle
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                Compliance
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                + Plus de sujets
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
