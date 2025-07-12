
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface UnifiedSectionHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  children?: React.ReactNode;
}

export function UnifiedSectionHeader({ 
  icon: Icon, 
  title, 
  description, 
  iconColor = "text-teal-600",
  children 
}: UnifiedSectionHeaderProps) {
  return (
    <Card className="mb-6 border-l-4 border-l-teal-500">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <Icon className={`w-12 h-12 ${iconColor}`} />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        {children && (
          <div className="mt-6">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
