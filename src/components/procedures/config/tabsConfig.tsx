
import { ProcedureHistoryTab } from '../ProcedureHistoryTab';
import { ProceduresPendingApprovalTab } from '../ProceduresPendingApprovalTab';
import { ProcedureCatalogTab } from '../ProcedureCatalogTab';
import { ProcedureResourcesSection } from '../../ProcedureResourcesSection';
import { ProcedureSearchSection } from '../../ProcedureSearchSection';
import { TimelineTab } from '../tabs/TimelineTab';
import { EnrichmentTab } from '../tabs/EnrichmentTab';

interface TabConfig {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface TabsConfigResult {
  defaultValue: string;
  tabs: TabConfig[];
}

interface GetTabsConfigProps {
  section: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAddProcedure: () => void;
  onOpenApprovalQueue: () => void;
  onOCRTextExtracted: (text: string) => void;
}

export function getTabsConfig({
  section,
  searchTerm,
  setSearchTerm,
  onAddProcedure,
  onOpenApprovalQueue,
  onOCRTextExtracted
}: GetTabsConfigProps): TabsConfigResult {
  switch (section) {
    case 'procedures-catalog':
      return {
        defaultValue: 'catalogue',
        tabs: [
          { 
            value: 'catalogue', 
            label: 'Catalogue', 
            content: (
              <ProcedureCatalogTab 
                onAddProcedure={onAddProcedure}
                onOpenApprovalQueue={onOpenApprovalQueue}
              />
            )
          },
          { 
            value: 'timeline', 
            label: 'Timeline des procédures', 
            content: <TimelineTab />
          },
          { 
            value: 'historiques', 
            label: 'Historiques des versions', 
            content: <ProcedureHistoryTab />
          }
        ]
      };

    case 'procedures-enrichment':
      return {
        defaultValue: 'enrichment',
        tabs: [
          { 
            value: 'enrichment', 
            label: 'Alimentation', 
            content: (
              <EnrichmentTab 
                onAddProcedure={onAddProcedure}
                onOCRTextExtracted={onOCRTextExtracted}
              />
            )
          },
          { 
            value: 'pending-approval', 
            label: 'Procédures administratives en attente de publication', 
            content: <ProceduresPendingApprovalTab />
          }
        ]
      };

    case 'procedures-search':
      return {
        defaultValue: 'search',
        tabs: [
          { 
            value: 'search', 
            label: 'Recherche', 
            content: <ProcedureSearchSection />
          }
        ]
      };

    case 'procedures-resources':
      return {
        defaultValue: 'resources',
        tabs: [
          { 
            value: 'resources', 
            label: 'Ressources', 
            content: <ProcedureResourcesSection />
          }
        ]
      };

    default:
      return {
        defaultValue: 'catalogue',
        tabs: [
          { 
            value: 'catalogue', 
            label: 'Catalogue', 
            content: (
              <ProcedureCatalogTab 
                onAddProcedure={onAddProcedure}
                onOpenApprovalQueue={onOpenApprovalQueue}
              />
            )
          }
        ]
      };
  }
}
