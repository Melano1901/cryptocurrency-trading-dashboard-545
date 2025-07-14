import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bell, Search, FileText, Scale, Users, TrendingUp, Clock, Bot, BookOpen, Building2, BarChart3, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

interface DashboardProps {
  language: string;
}

export function Dashboard({ language }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleAIAssistantRedirect = () => {
    const event = new CustomEvent('navigate-to-section', { detail: 'ai-assistant' });
    window.dispatchEvent(event);
  };

  const stats = [
    { title: "Textes juridiques", value: "2,547", icon: <FileText className="w-8 h-8 text-blue-600" />, change: "+12%" },
    { title: "Procédures", value: "1,234", icon: <Scale className="w-8 h-8 text-green-600" />, change: "+8%" },
    { title: "Utilisateurs actifs", value: "456", icon: <Users className="w-8 h-8 text-purple-600" />, change: "+15%" },
    { title: "Recherches mensuelles", value: "8,921", icon: <TrendingUp className="w-8 h-8 text-orange-600" />, change: "+23%" }
  ];

  const quickActions = [
    { title: "Recherche avancée", icon: <Search className="w-6 h-6" />, color: "bg-blue-100 text-blue-600" },
    { title: "Ajouter un texte", icon: <FileText className="w-6 h-6" />, color: "bg-green-100 text-green-600" },
    { title: "Nouvelle procédure", icon: <Scale className="w-6 h-6" />, color: "bg-purple-100 text-purple-600" },
    { title: "Tableau de bord", icon: <BarChart3 className="w-6 h-6" />, color: "bg-orange-100 text-orange-600" }
  ];

  const recentActivity = [
    { action: "Nouveau décret ajouté", time: "Il y a 2 heures", type: "legal" },
    { action: "Procédure mise à jour", time: "Il y a 4 heures", type: "procedure" },
    { action: "Utilisateur connecté", time: "Il y a 6 heures", type: "user" },
  ];

  const trends = [
    { topic: "Droit commercial", searches: 245, change: "+18%" },
    { topic: "Procédures fiscales", searches: 189, change: "+12%" },
    { topic: "Droit du travail", searches: 156, change: "+25%" }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section - Zone verte */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-8 text-white">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold mb-4">
            Bienvenue sur dalil.dz
          </h1>
          <p className="text-green-100 mb-6 text-lg">
            Votre plateforme complète de veille juridique et réglementaire algérienne. 
            Explorez, recherchez et gérez l'ensemble des textes juridiques et procédures administratives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Rechercher dans la base juridique..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/90 border-white/20 text-gray-900 placeholder:text-gray-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                onClick={handleAIAssistantRedirect}
              >
                <Bot className="w-4 h-4 mr-2" />
                Poser une question
              </Button>
              <Button 
                variant="secondary" 
                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Explorer
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Actions rapides
          </CardTitle>
          <CardDescription>
            Accédez rapidement aux fonctionnalités principales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button key={index} variant="outline" className="h-20 flex flex-col gap-2 hover:shadow-md transition-all">
                <div className={`p-2 rounded-lg ${action.color}`}>
                  {action.icon}
                </div>
                <span className="text-sm font-medium">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600" />
              Activité récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              Tendances de recherche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{trend.topic}</p>
                    <p className="text-xs text-gray-500">{trend.searches} recherches</p>
                  </div>
                  <Badge variant="secondary" className="text-green-600 bg-green-100">
                    {trend.change}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
