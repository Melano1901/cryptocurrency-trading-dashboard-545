
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { 
  BookOpen, 
  ExternalLink, 
  Database, 
  Globe, 
  Search,
  Plus,
  Edit,
  Trash2,
  Settings
} from "lucide-react";

interface ComplementaryResourcesSectionProps {
  language?: string;
}

export function ComplementaryResourcesSection({ language = "fr" }: ComplementaryResourcesSectionProps) {
  const [sourcesFilter, setSourcesFilter] = useState("");
  const [databasesFilter, setDatabasesFilter] = useState("");
  const [templatesFilter, setTemplatesFilter] = useState("");
  const [modelsFilter, setModelsFilter] = useState("");

  const juridicalSources = [
    { name: "Légifrance", url: "www.legifrance.gouv.fr", description: "Droit français", status: "Actif", type: "Externe" },
    { name: "EUR-Lex", url: "eur-lex.europa.eu", description: "Droit européen", status: "Actif", type: "Externe" },
    { name: "UN Treaty Collection", url: "treaties.un.org", description: "Traités internationaux", status: "Actif", type: "Externe" },
    { name: "World Bank Law", url: "projects.worldbank.org", description: "Droit du développement", status: "Actif", type: "Externe" },
    { name: "OHCHR", url: "www.ohchr.org", description: "Droits de l'homme", status: "Actif", type: "Externe" },
    { name: "ICC-CPI", url: "www.icc-cpi.int", description: "Cour pénale internationale", status: "Actif", type: "Externe" }
  ].filter(source => 
    source.name.toLowerCase().includes(sourcesFilter.toLowerCase()) ||
    source.description.toLowerCase().includes(sourcesFilter.toLowerCase())
  );

  const databases = [
    { name: "Base Textes Juridiques", type: "PostgreSQL", size: "2.5 GB", records: "125,000", status: "Actif" },
    { name: "Base Procédures", type: "MongoDB", size: "1.8 GB", records: "89,000", status: "Actif" },
    { name: "Base Jurisprudence", type: "Elasticsearch", size: "5.2 GB", records: "234,000", status: "Actif" },
    { name: "Base Documents", type: "MinIO", size: "45.7 GB", records: "567,000", status: "Actif" },
    { name: "Base Utilisateurs", type: "PostgreSQL", size: "156 MB", records: "12,500", status: "Actif" },
    { name: "Base Audit", type: "InfluxDB", size: "892 MB", records: "2,340,000", status: "Actif" }
  ].filter(db => 
    db.name.toLowerCase().includes(databasesFilter.toLowerCase()) ||
    db.type.toLowerCase().includes(databasesFilter.toLowerCase())
  );

  const documentTemplates = [
    { name: "Modèle de Loi", category: "Législatif", usage: 245, lastUpdate: "2024-12-15", status: "Actif" },
    { name: "Modèle de Décret", category: "Réglementaire", usage: 189, lastUpdate: "2024-12-10", status: "Actif" },
    { name: "Modèle d'Arrêté", category: "Administratif", usage: 567, lastUpdate: "2024-12-08", status: "Actif" },
    { name: "Modèle de Circulaire", category: "Instruction", usage: 123, lastUpdate: "2024-12-05", status: "Actif" },
    { name: "Modèle de Contrat", category: "Civil", usage: 789, lastUpdate: "2024-12-03", status: "Actif" },
    { name: "Modèle de Procédure", category: "Administrative", usage: 345, lastUpdate: "2024-12-01", status: "Actif" }
  ].filter(template => 
    template.name.toLowerCase().includes(templatesFilter.toLowerCase()) ||
    template.category.toLowerCase().includes(templatesFilter.toLowerCase())
  );

  const workflowModels = [
    { name: "Validation Texte Juridique", steps: 8, duration: "15 jours", usage: 234, status: "Actif" },
    { name: "Processus de Publication", steps: 5, duration: "7 jours", usage: 567, status: "Actif" },
    { name: "Révision Procédure", steps: 12, duration: "30 jours", usage: 123, status: "Actif" },
    { name: "Approbation Réglementaire", steps: 10, duration: "21 jours", usage: 345, status: "Actif" },
    { name: "Contrôle Qualité", steps: 6, duration: "10 jours", usage: 789, status: "Actif" },
    { name: "Archivage Document", steps: 4, duration: "3 jours", usage: 456, status: "Actif" }
  ].filter(model => 
    model.name.toLowerCase().includes(modelsFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">

      <Tabs defaultValue="sources" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sources">Sources Juridiques</TabsTrigger>
          <TabsTrigger value="databases">Bases de Données</TabsTrigger>
          <TabsTrigger value="templates">Modèles Documents</TabsTrigger>
          <TabsTrigger value="workflows">Modèles Workflow</TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher une source..."
                className="pl-10"
                value={sourcesFilter}
                onChange={(e) => setSourcesFilter(e.target.value)}
              />
            </div>
            <Button className="ml-4">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une Source
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {juridicalSources.map((source, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{source.name}</h4>
                        <Badge variant="outline">{source.type}</Badge>
                        <Badge className="bg-green-100 text-green-800">{source.status}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{source.description}</p>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-blue-600">{source.url}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="databases" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher une base de données..."
                className="pl-10"
                value={databasesFilter}
                onChange={(e) => setDatabasesFilter(e.target.value)}
              />
            </div>
            <Button className="ml-4">
              <Plus className="w-4 h-4 mr-2" />
              Configurer Base
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {databases.map((db, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold text-gray-900">{db.name}</h4>
                        <Badge className="bg-green-100 text-green-800">{db.status}</Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Type:</span> {db.type}</p>
                        <p><span className="font-medium">Taille:</span> {db.size}</p>
                        <p><span className="font-medium">Enregistrements:</span> {db.records}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Database className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un modèle..."
                className="pl-10"
                value={templatesFilter}
                onChange={(e) => setTemplatesFilter(e.target.value)}
              />
            </div>
            <Button className="ml-4">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Modèle
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documentTemplates.map((template, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{template.name}</h4>
                        <Badge variant="outline">{template.category}</Badge>
                        <Badge className="bg-green-100 text-green-800">{template.status}</Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Utilisations:</span> {template.usage}</p>
                        <p><span className="font-medium">Dernière MAJ:</span> {template.lastUpdate}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un workflow..."
                className="pl-10"
                value={modelsFilter}
                onChange={(e) => setModelsFilter(e.target.value)}
              />
            </div>
            <Button className="ml-4">
              <Plus className="w-4 h-4 mr-2" />
              Créer Workflow
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workflowModels.map((model, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{model.name}</h4>
                        <Badge className="bg-green-100 text-green-800">{model.status}</Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Étapes:</span> {model.steps}</p>
                        <p><span className="font-medium">Durée:</span> {model.duration}</p>
                        <p><span className="font-medium">Utilisations:</span> {model.usage}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
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
