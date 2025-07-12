
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { SemanticSearchSection } from './SemanticSearchSection';
import { ImmersiveSearchInterface } from './ImmersiveSearchInterface';
import { Brain, Globe, Zap, TestTube, Sparkles } from 'lucide-react';
import { UnifiedSectionHeader } from '@/components/common/UnifiedSectionHeader';
import { TabFormField } from '@/components/common/TabFormField';

export function NextGenSearchSection() {
  const [activeTab, setActiveTab] = useState("semantic");

  return (
    <div className="space-y-6">
      <UnifiedSectionHeader
        icon={Zap}
        title="Fonctionnalités de Recherche Nouvelle Génération"
        description="Explorez le droit avec des technologies d'IA avancées et des interfaces immersives"
        iconColor="text-emerald-600"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="semantic" className="gap-2">
            <Brain className="w-4 h-4" />
            Recherche Sémantique & Conceptuelle
          </TabsTrigger>
          <TabsTrigger value="immersive" className="gap-2">
            <Globe className="w-4 h-4" />
            Interface de Recherche Immersive
          </TabsTrigger>
        </TabsList>

        <TabsContent value="semantic">
          {/* Champ de formulaire avec fonctionnalités */}
          <TabFormField
            placeholder="Recherche sémantique et conceptuelle..."
            onSearch={(query) => console.log('Recherche sémantique:', query)}
            onAdd={() => console.log('Nouveau concept')}
            onFilter={() => console.log('Filtrer concepts')}
            onSort={() => console.log('Trier concepts')}
            onExport={() => console.log('Exporter résultats')}
            onRefresh={() => console.log('Actualiser recherche')}
            showActions={true}
          />
          <SemanticSearchSection />
        </TabsContent>

        <TabsContent value="immersive">
          {/* Champ de formulaire avec fonctionnalités */}
          <TabFormField
            placeholder="Interface de recherche immersive..."
            onSearch={(query) => console.log('Recherche immersive:', query)}
            onAdd={() => console.log('Nouvelle vue')}
            onFilter={() => console.log('Filtrer vues')}
            onSort={() => console.log('Trier vues')}
            onExport={() => console.log('Exporter visualisation')}
            onRefresh={() => console.log('Actualiser interface')}
            showActions={true}
          />
          <ImmersiveSearchInterface />
        </TabsContent>
      </Tabs>

      {/* Footer avec informations techniques */}
      <Card className="bg-gradient-to-r from-emerald-50 to-indigo-50 border-2 border-emerald-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              Technologies Intégrées de Nouvelle Génération
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-800">Recherche Sémantique & Conceptuelle</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Badge className="bg-purple-500 text-white justify-center">Concepts Juridiques</Badge>
                  <Badge className="bg-blue-500 text-white justify-center">Citations Croisées</Badge>
                  <Badge className="bg-green-500 text-white justify-center">Recherche Visuelle</Badge>
                  <Badge className="bg-orange-500 text-white justify-center">Cas Similaires</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-indigo-800">Interface de Recherche Immersive</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Badge className="bg-indigo-500 text-white justify-center">Carte Conceptuelle</Badge>
                  <Badge className="bg-green-500 text-white justify-center">Timeline Intelligente</Badge>
                  <Badge className="bg-red-500 text-white justify-center">Géolocalisation</Badge>
                  <Badge className="bg-purple-500 text-white justify-center">Recherche Multimodale</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
