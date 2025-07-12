
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalizedDashboards } from '@/components/analytics/PersonalizedDashboards';
import { 
  BarChart3, 
  FileText, 
  Activity, 
  Users,
  PieChart,
  LineChart
} from 'lucide-react';

interface DashboardsSectionProps {
  dashboardStats: Array<{
    label: string;
    value: string;
    icon: any;
    color: string;
  }>;
  recentReports: Array<{
    id: number;
    title: string;
    type: string;
    generated: string;
    size: string;
    status: string;
    downloads: number;
  }>;
}

export function DashboardsSection({ dashboardStats, recentReports }: DashboardsSectionProps) {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
        <TabsTrigger value="personalized">Tableaux Personnalisés</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tableaux de Bord Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Tableau Principal</div>
                      <div className="text-sm text-gray-500">Vue d'ensemble générale</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Ouvrir</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <PieChart className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium">Statistiques d'Usage</div>
                      <div className="text-sm text-gray-500">Métriques d'utilisation</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Ouvrir</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <LineChart className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium">Tendances Temporelles</div>
                      <div className="text-sm text-gray-500">Évolution dans le temps</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Ouvrir</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rapports Récents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReports.map((report) => (
                  <div key={report.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{report.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{report.type}</Badge>
                          <span className="text-xs text-gray-500">{report.generated}</span>
                        </div>
                      </div>
                      <Badge className={
                        report.status === 'Terminé' ? 'bg-green-100 text-green-800' :
                        report.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {report.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{report.size}</span>
                      <span>{report.downloads} téléchargements</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="personalized">
        <PersonalizedDashboards />
      </TabsContent>
    </Tabs>
  );
}
