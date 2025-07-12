
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Edit3, 
  MessageSquare, 
  Eye, 
  Clock,
  Users,
  GitBranch,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Share2,
  Network,
  FileText,
  CheckCircle,
  XCircle,
  Play,
  Pause
} from 'lucide-react';

export function AdvancedCollaborativeTools() {
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
  const [debateArgument, setDebateArgument] = useState('');

  const realtimeAnnotations = [
    {
      id: 1,
      document: "Projet de loi sur l'investissement 2025",
      text: "Article 15 - Incitations fiscales",
      annotation: "Cette disposition pourrait créer des inégalités entre secteurs",
      author: "Dr. Amina Benali",
      timestamp: "Il y a 5 minutes",
      status: "active",
      collaborators: ["Me. Karim", "Prof. Ahmed"]
    },
    {
      id: 2,
      document: "Code du travail - Révision",
      text: "Durée légale du travail",
      annotation: "Alignement nécessaire avec les standards internationaux",
      author: "Me. Fatima Zahra",
      timestamp: "Il y a 12 minutes",
      status: "resolved",
      collaborators: ["Dr. Hassan", "Me. Omar"]
    }
  ];

  const structuredDebates = [
    {
      id: 1,
      topic: "Réforme du droit des sociétés : Impact sur les PME",
      status: "En cours",
      participants: 12,
      arguments: {
        for: 8,
        against: 4
      },
      moderator: "Prof. Mohamed Cherif",
      deadline: "25 janvier 2025",
      phase: "Arguments initiaux"
    },
    {
      id: 2,
      topic: "Digitalisation des procédures judiciaires",
      status: "Vote final",
      participants: 18,
      arguments: {
        for: 14,
        against: 4
      },
      moderator: "Dr. Leila Mansouri",
      deadline: "20 janvier 2025",
      phase: "Synthèse finale"
    }
  ];

  const surveillanceItems = [
    {
      id: 1,
      domain: "Droit fiscal",
      assignedTo: "Équipe Fiscalité",
      alerts: 3,
      lastUpdate: "Hier",
      priority: "Haute",
      sources: ["Journal Officiel", "Circulaires DGI", "Jurisprudence"]
    },
    {
      id: 2,
      domain: "Droit du travail",
      assignedTo: "Cabinet Social",
      alerts: 1,
      lastUpdate: "Il y a 2 jours",
      priority: "Moyenne",
      sources: ["Code du travail", "Conventions collectives"]
    }
  ];

  const knowledgeGraphs = [
    {
      id: 1,
      title: "Réforme du Code de Commerce 2024-2025",
      contributors: 15,
      nodes: 156,
      connections: 234,
      lastUpdate: "Il y a 1 heure",
      completeness: 78,
      domains: ["Commerce", "Sociétés", "Contrats"]
    },
    {
      id: 2,
      title: "Jurisprudence Administrative Récente",
      contributors: 8,
      nodes: 89,
      connections: 145,
      lastUpdate: "Il y a 3 heures",
      completeness: 65,
      domains: ["Administratif", "Contentieux", "Procédures"]
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="annotations" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="annotations">Annotation Temps Réel</TabsTrigger>
          <TabsTrigger value="debates">Débats Structurés</TabsTrigger>
          <TabsTrigger value="surveillance">Veille Collaborative</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Graphs</TabsTrigger>
        </TabsList>

        <TabsContent value="annotations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="w-5 h-5" />
                Annotation Collaborative en Temps Réel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {realtimeAnnotations.map((annotation) => (
                  <div key={annotation.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{annotation.document}</Badge>
                          <Badge className={
                            annotation.status === 'active' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {annotation.status === 'active' ? 'Actif' : 'Résolu'}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-blue-600">{annotation.text}</h4>
                        <p className="text-gray-700 mt-2">{annotation.annotation}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span>Par {annotation.author}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {annotation.timestamp}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{annotation.collaborators.length} collaborateurs</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">
                <Edit3 className="w-4 h-4 mr-2" />
                Créer une nouvelle annotation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="debates" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {structuredDebates.map((debate) => (
              <Card key={debate.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{debate.topic}</CardTitle>
                      <p className="text-gray-600 mt-1">Modéré par {debate.moderator}</p>
                    </div>
                    <Badge className={
                      debate.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }>
                      {debate.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <ThumbsUp className="w-4 h-4 text-green-600" />
                        <span className="font-medium">Pour</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">{debate.arguments.for}</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <ThumbsDown className="w-4 h-4 text-red-600" />
                        <span className="font-medium">Contre</span>
                      </div>
                      <div className="text-2xl font-bold text-red-600">{debate.arguments.against}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{debate.participants} participants</span>
                    <span>Phase: {debate.phase}</span>
                  </div>

                  <div className="text-sm">
                    <span className="text-gray-500">Échéance: </span>
                    <span className="font-medium">{debate.deadline}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Participer
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Observer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lancer un nouveau débat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Sujet du débat..." />
              <Textarea placeholder="Description et contexte..." />
              <div className="flex gap-2">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Créer le débat
                </Button>
                <Button variant="outline">
                  Sauvegarder en brouillon
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="surveillance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {surveillanceItems.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>{item.domain}</CardTitle>
                    <Badge className={
                      item.priority === 'Haute' ? 'bg-red-100 text-red-800' :
                      item.priority === 'Moyenne' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }>
                      {item.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Assigné à :</span>
                      <div className="font-medium">{item.assignedTo}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Alertes :</span>
                      <div className="font-medium flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                        {item.alerts}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-500 text-sm">Sources surveillées :</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.sources.map((source, index) => (
                        <Badge key={index} variant="outline">{source}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    Dernière mise à jour : {item.lastUpdate}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Voir alertes
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Déléguer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {knowledgeGraphs.map((graph) => (
              <Card key={graph.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="w-5 h-5 text-purple-600" />
                    {graph.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Contributeurs :</span>
                      <div className="font-medium">{graph.contributors}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Noeuds :</span>
                      <div className="font-medium">{graph.nodes}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Connexions :</span>
                      <div className="font-medium">{graph.connections}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Complétude :</span>
                      <div className="font-medium">{graph.completeness}%</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progression</span>
                      <span>{graph.completeness}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${graph.completeness}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-500 text-sm">Domaines :</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {graph.domains.map((domain, index) => (
                        <Badge key={index} variant="outline">{domain}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    Dernière mise à jour : {graph.lastUpdate}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                      <Network className="w-4 h-4 mr-2" />
                      Explorer
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Contribuer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
