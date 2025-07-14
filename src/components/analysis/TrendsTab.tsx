
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, BarChart3, LineChart, Users, FileText, Activity, Eye } from 'lucide-react';

export function TrendsTab() {
  const trendsData = [
    {
      title: "Consultations de textes juridiques",
      value: "+23%",
      trend: "up",
      description: "Augmentation par rapport au mois dernier",
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Nouvelles procédures ajoutées",
      value: "+15%",
      trend: "up",
      description: "Croissance continue de la base de données",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Utilisateurs actifs",
      value: "+8%",
      trend: "up",
      description: "Engagement utilisateur en hausse",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Temps de session moyen",
      value: "-3%",
      trend: "down",
      description: "Légère diminution du temps passé",
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const topSearchTrends = [
    { term: "Droit du travail", searches: 1245, growth: "+18%" },
    { term: "Code civil", searches: 989, growth: "+12%" },
    { term: "Procédures administratives", searches: 756, growth: "+25%" },
    { term: "Droit commercial", searches: 623, growth: "+8%" },
    { term: "Fiscalité", searches: 445, growth: "+15%" }
  ];

  const monthlyTrends = [
    { month: "Jan", consultations: 1200, procedures: 45 },
    { month: "Fév", consultations: 1450, procedures: 52 },
    { month: "Mar", consultations: 1680, procedures: 48 },
    { month: "Avr", consultations: 1920, procedures: 61 },
    { month: "Mai", consultations: 2150, procedures: 58 },
    { month: "Juin", consultations: 2380, procedures: 67 }
  ];

  return (
    <div className="space-y-8">
      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendsData.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${item.bgColor}`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                {item.trend === 'up' ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className={`text-2xl font-bold mb-1 ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {item.value}
              </p>
              <p className="text-sm text-gray-600">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tendances de recherche */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Tendances de recherche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSearchTrends.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.term}</p>
                    <p className="text-sm text-gray-600">{item.searches} recherches</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">{item.growth}</p>
                    <p className="text-xs text-gray-500">vs mois dernier</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Évolution mensuelle */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5 text-purple-600" />
              Évolution mensuelle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 p-4">
              <div className="h-full relative">
                {/* Graphique simplifié */}
                <div className="absolute bottom-0 left-0 w-full h-full border-l-2 border-b-2 border-gray-300">
                  {/* Lignes de grille */}
                  {[0, 25, 50, 75, 100].map((percent) => (
                    <div
                      key={percent}
                      className="absolute w-full border-t border-gray-200"
                      style={{ bottom: `${percent}%` }}
                    >
                      <span className="absolute -left-12 text-xs text-gray-500 -translate-y-1/2">
                        {Math.round((percent / 100) * 2500)}
                      </span>
                    </div>
                  ))}
                  
                  {/* Barres de données */}
                  <div className="absolute bottom-0 w-full h-full flex items-end justify-between px-4">
                    {monthlyTrends.map((data, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="flex gap-1 items-end">
                          <div 
                            className="bg-blue-500 w-4 rounded-t"
                            style={{ height: `${(data.consultations / 2500) * 100}%`, minHeight: '8px' }}
                          />
                          <div 
                            className="bg-green-500 w-4 rounded-t"
                            style={{ height: `${(data.procedures / 70) * 100}%`, minHeight: '4px' }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Légende */}
                <div className="absolute top-0 right-0 text-xs space-y-1">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span>Consultations</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Procédures</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prédictions et insights */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-orange-600" />
            Insights et prédictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Prédiction du mois prochain</h4>
              <p className="text-sm text-blue-800">
                Augmentation prévue de 12% des consultations basée sur les tendances actuelles.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Domaine en croissance</h4>
              <p className="text-sm text-green-800">
                Le droit du travail montre la plus forte croissance avec +25% ce mois.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Recommandation</h4>
              <p className="text-sm text-purple-800">
                Enrichir le contenu sur les procédures administratives pour répondre à la demande.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
