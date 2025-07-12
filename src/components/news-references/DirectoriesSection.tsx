
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, MapPin, Phone, Mail, Globe, Users, Gavel, Scale, Plus, Upload } from 'lucide-react';

export function DirectoriesSection() {
  const institutionsData = [
    {
      id: 1,
      name: "Conseil d'État",
      type: "Institution judiciaire",
      address: "Alger, Algérie",
      phone: "+213 21 XX XX XX",
      email: "contact@conseil-etat.dz",
      website: "www.conseil-etat.dz",
      description: "Haute juridiction administrative",
      icon: <Scale className="w-8 h-8 text-blue-600" />
    },
    {
      id: 2,
      name: "Ministère de la Justice",
      type: "Ministère",
      address: "Alger, Algérie",
      phone: "+213 21 XX XX XX",
      email: "contact@mjustice.dz",
      website: "www.mjustice.dz",
      description: "Ministère de la Justice, Garde des Sceaux",
      icon: <Building className="w-8 h-8 text-purple-600" />
    }
  ];

  const facultesData = [
    {
      id: 1,
      name: "Faculté de Droit - Université d'Alger 1",
      type: "Faculté de Droit",
      address: "Alger, Algérie",
      phone: "+213 21 XX XX XX",
      email: "contact@fdroit-alger.dz",
      website: "www.fdroit-alger.dz",
      description: "Formation juridique supérieure",
      icon: <Building className="w-8 h-8 text-green-600" />
    }
  ];

  const professionnelsData = [
    {
      id: 1,
      name: "Ordre des Avocats d'Alger",
      type: "Ordre professionnel",
      address: "Alger, Algérie",
      phone: "+213 21 XX XX XX",
      email: "contact@barreau-alger.dz",
      website: "www.barreau-alger.dz",
      description: "Ordre des avocats de la région d'Alger",
      icon: <Gavel className="w-8 h-8 text-red-600" />
    }
  ];

  const organismesData = [
    {
      id: 1,
      name: "Chambre Nationale des Notaires",
      type: "Organisme professionnel",
      address: "Alger, Algérie",
      phone: "+213 21 XX XX XX",
      email: "contact@notaires.dz",
      website: "www.notaires.dz",
      description: "Organisation des notaires d'Algérie",
      icon: <Users className="w-8 h-8 text-orange-600" />
    }
  ];

  const handleAdd = (type: string) => {
    console.log(`Opening add form for: ${type}`);
    
    const event = new CustomEvent('open-library-form', {
      detail: { resourceType: 'directory', category: type }
    });
    window.dispatchEvent(event);
  };

  const handleEnrich = (type: string) => {
    console.log(`Opening enrichment for: ${type}`);
    
    const event = new CustomEvent('open-modal', {
      detail: {
        type: 'import',
        title: 'Enrichir les données',
        data: { acceptedTypes: ['.pdf', '.doc', '.docx', '.csv', '.xlsx'], category: type }
      }
    });
    window.dispatchEvent(event);
  };

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleWebsiteClick = (website: string) => {
    window.open(`https://${website}`, '_blank');
  };

  const handlePhoneClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const renderDirectoryCards = (data: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((directory) => (
        <Card key={directory.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {directory.icon}
                <div>
                  <CardTitle className="text-lg">{directory.name}</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    {directory.type}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CardDescription>{directory.description}</CardDescription>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{directory.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <button 
                  onClick={() => handlePhoneClick(directory.phone)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  {directory.phone}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <button 
                  onClick={() => handleEmailClick(directory.email)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  {directory.email}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <button 
                  onClick={() => handleWebsiteClick(directory.website)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  {directory.website}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderTabButtons = (tabType: string) => (
    <div className="flex justify-center gap-3 mb-6">
      <Button 
        className="gap-2 bg-teal-600 hover:bg-teal-700" 
        onClick={() => handleAdd(tabType)}
      >
        <Plus className="w-4 h-4" />
        Ajouter
      </Button>
      <Button 
        variant="outline" 
        className="gap-2 border-teal-200 text-teal-700 hover:bg-teal-50" 
        onClick={() => handleEnrich(tabType)}
      >
        <Upload className="w-4 h-4" />
        Enrichir
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="institutions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="institutions">Institutions</TabsTrigger>
          <TabsTrigger value="facultes">Facultés de droit</TabsTrigger>
          <TabsTrigger value="professionnels">Professionnels du droit</TabsTrigger>
          <TabsTrigger value="organismes">Organismes juridiques</TabsTrigger>
        </TabsList>

        <TabsContent value="institutions" className="mt-6">
          {renderTabButtons('institutions')}
          {renderDirectoryCards(institutionsData)}
        </TabsContent>

        <TabsContent value="facultes" className="mt-6">
          {renderTabButtons('facultes')}
          {renderDirectoryCards(facultesData)}
        </TabsContent>

        <TabsContent value="professionnels" className="mt-6">
          {renderTabButtons('professionnels')}
          {renderDirectoryCards(professionnelsData)}
        </TabsContent>

        <TabsContent value="organismes" className="mt-6">
          {renderTabButtons('organismes')}
          {renderDirectoryCards(organismesData)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
