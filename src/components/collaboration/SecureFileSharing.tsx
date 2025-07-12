
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TabFormField } from '@/components/common/TabFormField';
import { Shield, Upload, Download, Users, Lock } from 'lucide-react';

export function SecureFileSharing() {
  return (
    <div className="space-y-6">
      {/* Champ de formulaire avec fonctionnalités */}
      <TabFormField
        placeholder="Rechercher dans les ressources partagées..."
        onSearch={(query) => console.log('Recherche ressources:', query)}
        onAdd={() => console.log('Ajouter ressource')}
        onFilter={() => console.log('Filtrer ressources')}
        onSort={() => console.log('Trier ressources')}
        onExport={() => console.log('Exporter ressources')}
        onRefresh={() => console.log('Actualiser ressources')}
        showActions={true}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Sécurité Avancée
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Chiffrement end-to-end et contrôle d'accès granulaire
            </p>
            <Button className="w-full">
              <Lock className="w-4 h-4 mr-2" />
              Configurer la sécurité
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-green-600" />
              Partage de Fichiers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Partage sécurisé de documents entre équipes
            </p>
            <Button className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Partager un fichier
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Gestion des Équipes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Organisation et permissions par équipe
            </p>
            <Button className="w-full">
              <Users className="w-4 h-4 mr-2" />
              Gérer les équipes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
