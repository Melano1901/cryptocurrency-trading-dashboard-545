
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot } from 'lucide-react';
import { UnifiedSectionHeader } from '@/components/common/UnifiedSectionHeader';
import { TabFormField } from '@/components/common/TabFormField';
import { AICapabilitiesOverview } from './AICapabilitiesOverview';
import { AIInsightsAndHistory } from './AIInsightsAndHistory';
import { PredictiveAnalysisTab } from './PredictiveAnalysisTab';
import { NLPAnalysisTab } from './NLPAnalysisTab';
import { ConversationTab } from './ConversationTab';
import { SearchTab } from './SearchTab';
import { RecommendationsTab } from './RecommendationsTab';

export function EnhancedAILegalAssistant() {
  const [activeTab, setActiveTab] = useState('conversation');

  // Effet pour s'assurer que la page démarre en haut
  useEffect(() => {
    // Forcer le scroll vers le haut lors du montage du composant
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header unifié repositionné */}
      <UnifiedSectionHeader
        icon={Bot}
        title="Assistant IA Juridique Avancé"
        description="Suite complète d'outils d'intelligence artificielle pour l'analyse juridique"
        iconColor="text-green-600"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="conversation">Assistant IA</TabsTrigger>
          <TabsTrigger value="predictive">Analyse Prédictive</TabsTrigger>
          <TabsTrigger value="nlp">NLP Avancé</TabsTrigger>
          <TabsTrigger value="search">Recherche IA</TabsTrigger>
          <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
        </TabsList>

        <TabsContent value="conversation" className="space-y-6">
          <ConversationTab />
        </TabsContent>

        <TabsContent value="predictive" className="space-y-6">
          <PredictiveAnalysisTab />
        </TabsContent>

        <TabsContent value="nlp" className="space-y-6">
          <NLPAnalysisTab />
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          <SearchTab />
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <RecommendationsTab />
        </TabsContent>
      </Tabs>

      {/* Footer récapitulatif */}
      <AICapabilitiesOverview />
    </div>
  );
}
