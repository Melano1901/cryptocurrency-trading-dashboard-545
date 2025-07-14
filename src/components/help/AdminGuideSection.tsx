
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Users, 
  Settings, 
  Database, 
  BarChart, 
  Lock, 
  FileText, 
  Search,
  ChevronRight,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export function AdminGuideSection() {
  const [searchTerm, setSearchTerm] = useState('');

  const adminSections = [
    {
      title: "Gestion des utilisateurs",
      icon: Users,
      color: "text-blue-600",
      articles: [
        { title: "Créer et gérer les comptes utilisateurs", duration: "10 min", priority: "Haute" },
        { title: "Attribution des rôles et permissions", duration: "15 min", priority: "Haute" },
        { title: "Gestion des groupes d'utilisateurs", duration: "12 min", priority: "Moyenne" },
        { title: "Audit des connexions", duration: "8 min", priority: "Moyenne" }
      ]
    },
    {
      title: "Configuration système",
      icon: Settings,
      color: "text-green-600",
      articles: [
        { title: "Paramètres généraux du système", duration: "20 min", priority: "Haute" },
        { title: "Configuration de la sécurité", duration: "25 min", priority: "Critique" },
        { title: "Intégrations et API", duration: "30 min", priority: "Moyenne" },
        { title: "Sauvegardes automatiques", duration: "15 min", priority: "Haute" }
      ]
    },
    {
      title: "Gestion du contenu",
      icon: FileText,
      color: "text-purple-600",
      articles: [
        { title: "Validation des textes juridiques", duration: "18 min", priority: "Haute" },
        { title: "Workflow d'approbation", duration: "22 min", priority: "Haute" },
        { title: "Modération des contributions", duration: "15 min", priority: "Moyenne" },
        { title: "Archivage et suppression", duration: "10 min", priority: "Moyenne" }
      ]
    },
    {
      title: "Surveillance et analytics",
      icon: BarChart,
      color: "text-orange-600",
      articles: [
        { title: "Tableaux de bord administrateur", duration: "12 min", priority: "Moyenne" },
        { title: "Rapports d'utilisation", duration: "16 min", priority: "Moyenne" },
        { title: "Monitoring des performances", duration: "20 min", priority: "Haute" },
        { title: "Alertes et notifications", duration: "14 min", priority: "Haute" }
      ]
    }
  ];

  const securityChecklist = [
    { item: "Configuration HTTPS/SSL", status: "completed" },
    { item: "Authentification multi-facteurs", status: "completed" },
    { item: "Politique de mots de passe", status: "completed" },
    { item: "Chiffrement des données", status: "completed" },
    { item: "Audit de sécurité", status: "pending" },
    { item: "Formation sécurité équipe", status: "pending" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critique': return 'bg-red-100 text-red-800';
      case 'Haute': return 'bg-orange-100 text-orange-800';
      case 'Moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'Basse': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <Shield className="w-8 h-8 text-red-600" />
          Guide administrateur
        </h2>
        <p className="text-gray-600 text-lg">
          Documentation complète pour l'administration de la plateforme
        </p>
      </div>

      {/* Barre de recherche */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              placeholder="Rechercher dans la documentation admin..."
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

      <Tabs defaultValue="guides" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="space-y-6">
          {/* Sections principales */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {adminSections.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <section.icon className={`w-6 h-6 ${section.color}`} />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.articles.map((article, articleIndex) => (
                      <div key={articleIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{article.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-500">{article.duration}</span>
                            <Badge className={`text-xs ${getPriorityColor(article.priority)}`}>
                              {article.priority}
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
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-600" />
                Liste de contrôle sécurité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityChecklist.map((check, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {check.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                      )}
                      <span className="font-medium">{check.item}</span>
                    </div>
                    <Badge className={check.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                      {check.status === 'completed' ? 'Terminé' : 'En attente'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Protocoles de sécurité</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Gestion des incidents de sécurité",
                  "Procédures de sauvegarde d'urgence",
                  "Plan de continuité d'activité",
                  "Audit et conformité RGPD"
                ].map((protocol, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <h4 className="font-medium">{protocol}</h4>
                    <p className="text-sm text-gray-600 mt-1">Documentation détaillée disponible</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-600" />
                Tâches de maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { task: "Sauvegarde quotidienne", frequency: "Quotidienne", lastRun: "Aujourd'hui 02:00" },
                  { task: "Optimisation base de données", frequency: "Hebdomadaire", lastRun: "Dimanche 23:00" },
                  { task: "Nettoyage des logs", frequency: "Mensuelle", lastRun: "1er du mois" },
                  { task: "Mise à jour sécurité", frequency: "Selon disponibilité", lastRun: "Il y a 3 jours" }
                ].map((maintenance, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{maintenance.task}</h4>
                      <p className="text-sm text-gray-600">Fréquence: {maintenance.frequency}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Dernière exécution</p>
                      <p className="text-xs text-gray-600">{maintenance.lastRun}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
