
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { TabFormField } from '@/components/common/TabFormField';
import { PredictiveJuridicalAnalysis } from './PredictiveJuridicalAnalysis';
import { AICapabilitiesGrid } from './AICapabilitiesGrid';

export function PredictiveAnalysisTab() {
  return (
    <div className="space-y-6">
      <TabFormField
        placeholder="Analyser un document pour prédiction juridique..."
        onSearch={(query) => console.log('Analyse prédictive:', query)}
        onAdd={() => console.log('Nouvelle analyse')}
        onFilter={() => console.log('Filtrer analyses')}
        onSort={() => console.log('Trier analyses')}
        onExport={() => console.log('Exporter analyse')}
        onRefresh={() => console.log('Actualiser prédictions')}
        showActions={true}
      />

      <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            Analyse des Algorithmes Prédictifs
          </CardTitle>
          <p className="text-gray-600">
            Algorithmes avancés d'Intelligence Artificielle pour l'analyse prédictive en droit
          </p>
        </CardHeader>
        <CardContent>
          <AICapabilitiesGrid type="prediction" />
        </CardContent>
      </Card>
      
      <PredictiveJuridicalAnalysis />
    </div>
  );
}
