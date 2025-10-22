"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Phone, Mail, Globe, Users } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useTranslation } from "@/context/TranslationContext";
import { getTranslation, type LanguageCode } from "@/lib/translations";

// Static contact info and location data (not translated - proper nouns and contact details)
const ngoContactData = [
  {
    category: "Training & Support",
    state: "Multiple States",
    city: "New Delhi",
    contact: {
      phone: "+91 11 2653 7456",
      email: "pradan@pradan.net",
      website: "www.pradan.net",
    },
    established: "1983",
  },
  {
    category: "Organic Farming",
    state: "Maharashtra",
    city: "Pune",
    contact: {
      phone: "+91 20 2528 7803",
      email: "baif@baif.org.in",
      website: "www.baif.org.in",
    },
    established: "1967",
  },
  {
    category: "Community Development",
    state: "Karnataka",
    city: "Bangalore",
    contact: {
      phone: "+91 80 2666 5110",
      email: "myrada@myrada.org",
      website: "www.myrada.org",
    },
    established: "1968",
  },
  {
    category: "Women Empowerment",
    state: "Gujarat",
    city: "Ahmedabad",
    contact: {
      phone: "+91 79 2550 6444",
      email: "mail@sewa.org",
      website: "www.sewa.org",
    },
    established: "1972",
  },
  {
    category: "Technology & Innovation",
    state: "Multiple States",
    city: "New Delhi",
    contact: {
      phone: "+91 11 4050 4747",
      email: "info@digitalgreen.org",
      website: "www.digitalgreen.org",
    },
    established: "2008",
  },
  {
    category: "Water Management",
    state: "Gujarat",
    city: "Ahmedabad",
    contact: {
      phone: "+91 281 238 2821",
      email: "akrspi@akrsp.org",
      website: "www.akrsp.org.in",
    },
    established: "1984",
  },
];

export default function NGOsPage() {
  const { t, language } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get translated NGO data
  const ngosDataRaw = getTranslation(language as LanguageCode, 'ngosPage.ngos');
  const ngosData = Array.isArray(ngosDataRaw) ? ngosDataRaw : [];
  const ngos = ngosData.map((ngo: any, index: number) => ({
    id: index + 1,
    ...ngo,
    ...ngoContactData[index]
  }));

  const categories = [t('ngosPage.allCategories'), ...Array.from(new Set(ngos.map(ngo => ngo.category || ngo.focus)))];

  const filteredNGOs = ngos.filter((ngo) => {
    const matchesSearch = 
      ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || selectedCategory === t('ngosPage.allCategories') || ngo.category === selectedCategory || ngo.focus === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactClick = (ngoName: string, phone: string) => {
    toast.success(`${t('ngosPage.contactNGO')}: ${ngoName}`, {
      description: `${t('ngosPage.phone')}: ${phone}`
    });
  };

  return (
    <div className="min-h-screen flex flex-col">

      <div className="bg-green-700 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('ngosPage.title')}</h1>
          <p className="text-xl text-green-100">
            {t('ngosPage.subtitle')}
          </p>
        </div>
      </div>

      <div className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Search className="inline w-4 h-4 mr-1" />
                  {t('ngosPage.searchPlaceholder')}
                </label>
                <Input
                  placeholder={t('ngosPage.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('ngosPage.filterByCategory')}
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat === "All Categories" ? "all" : cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-green-700">{filteredNGOs.length}</span> NGOs
            </p>
          </div>

          {/* NGO Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNGOs.map((ngo) => (
              <Card key={ngo.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{ngo.name}</CardTitle>
                      <CardDescription className="flex items-center space-x-1 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{ngo.city}, {ngo.state}</span>
                      </CardDescription>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <Badge className="bg-green-600 w-fit mt-2">{ngo.category || ngo.focus}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{ngo.description}</p>

                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">{t('ngosPage.services')}:</h4>
                    <div className="flex flex-wrap gap-1">
                      {ngo.services && Array.isArray(ngo.services) ? (
                        ngo.services.map((service: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          {ngo.focus || ngo.category || 'General Support'}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{ngo.contact?.phone || ngo.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700 break-all">{ngo.contact?.email || ngo.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <a 
                        href={`https://${ngo.contact?.website || ngo.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        {ngo.contact?.website || ngo.website}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-xs text-gray-500">Est. {ngo.established}</span>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleContactClick(ngo.name, ngo.contact?.phone || ngo.phone)}
                    >
                      {t('ngosPage.contactNGO')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNGOs.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No NGOs Found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      <Toaster />
      <Footer />
    </div>
  );
}