
import { Search } from 'lucide-react';
import { UnifiedSectionHeader } from './common/UnifiedSectionHeader';
import { UnifiedAIAssistant } from './ai/UnifiedAIAssistant';

interface AISearchSectionProps {
  language?: string;
}

export function AISearchSection({ language = "fr" }: AISearchSectionProps) {
  return (
    <div className="space-y-6">
      <UnifiedSectionHeader
        icon={Search}
        title="Recherche IA"
        description="Recherche intelligente assistée par Intelligence Artificielle avec analyse contextuelle"
        iconColor="text-blue-600"
      />
      <UnifiedAIAssistant />
    </div>
  );
}
