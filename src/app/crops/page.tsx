"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Calendar, Droplet, Sun, Sprout } from "lucide-react";
import { useTranslation } from "@/context/TranslationContext";
import { getTranslation, type LanguageCode } from "@/lib/translations";

// Import local crop images
import riceImg from "@/images/rice.jpg";
import wheatImg from "@/images/wheat.jpg";
import cottonImg from "@/images/cotton.webp";
import sugarcaneImg from "@/images/sugarcane.jpg";
import cornImg from "@/images/corn.jpg";
import pulsesImg from "@/images/pulses.jpg";

// State lists remain static as they're proper nouns
const statesList = ["Punjab", "Haryana", "West Bengal", "Uttar Pradesh", "Andhra Pradesh", "Maharashtra", "Telangana", "Gujarat", "Karnataka", "Tamil Nadu", "Madhya Pradesh", "Rajasthan", "Bihar"];

// Using local images from src/images folder
const cropsImages = [
  riceImg.src,        // Rice paddy
  wheatImg.src,       // Wheat field
  cottonImg.src,      // Cotton plant
  sugarcaneImg.src,   // Sugarcane
  cornImg.src,        // Maize/corn
  pulsesImg.src       // Pulses/legumes
];


export default function CropsPage() {
  const { t, language } = useTranslation();
  
  // Get translated crops data
  const cropsData = getTranslation(language as LanguageCode, 'cropsPage.crops') as any;
  const crops = Array.isArray(cropsData) ? cropsData.map((crop, index) => ({
    id: index + 1,
    ...crop,
    states: statesList.slice(0, 5), // Using static state lists
    image: cropsImages[index] || ""
  })) : [];
  
  const [selectedState, setSelectedState] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState(crops[0]);

  const states = [t('cropsPage.allStates'), ...statesList];
  const categories = [t('cropsPage.allCategories'), t('cropsPage.categories.cereal'), t('cropsPage.categories.pulses'), t('cropsPage.categories.fiber'), t('cropsPage.categories.cashCrop')];

  const filteredCrops = crops.filter((crop) => {
    const matchesState = selectedState === "all" || selectedState === t('cropsPage.allStates');
    const matchesCategory = selectedCategory === "all" || selectedCategory === t('cropsPage.allCategories') || crop.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesState && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">

      <div className="bg-green-700 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('cropsPage.title')}</h1>
          <p className="text-xl text-green-100">
            {t('cropsPage.subtitle')}
          </p>
        </div>
      </div>

      <div className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Search className="inline w-4 h-4 mr-1" />
                  {t('cropsPage.searchPlaceholder')}
                </label>
                <Input
                  placeholder={t('cropsPage.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} />

              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  {t('cropsPage.filterByState')}
                </label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) =>
                    <SelectItem key={state} value={state === "All States" ? "all" : state}>
                        {state}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) =>
                    <SelectItem key={cat} value={cat === "All Categories" ? "all" : cat}>
                        {cat}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Crop List */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Crops ({filteredCrops.length})
              </h2>
              <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2">
                {filteredCrops.map((crop) =>
                <Card
                  key={crop.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedCrop.id === crop.id ? "border-green-600 border-2" : ""}`
                  }
                  onClick={() => setSelectedCrop(crop)}>

                    <CardHeader className="p-4">
                      <div className="flex items-start space-x-3">
                        <img
                        src={crop.image || wheatImg.src}
                        alt={crop.name}
                        className="w-16 h-16 object-cover rounded" />

                        <div className="flex-1">
                          <CardTitle className="text-lg">{crop.name}</CardTitle>
                          <div className="flex flex-wrap gap-1 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {crop.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {crop.season}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                )}
              </div>
            </div>

            {/* Crop Details */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <img
                      src={selectedCrop.image}
                      alt={selectedCrop.name}
                      className="w-32 h-32 object-cover rounded-lg" />

                    <div className="flex-1">
                      <CardTitle className="text-3xl">{selectedCrop.name}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        {selectedCrop.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge className="bg-green-600">{selectedCrop.category}</Badge>
                        <Badge variant="outline">{selectedCrop.season}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">{t('cropsPage.viewDetails')}</TabsTrigger>
                      <TabsTrigger value="cultivation">{t('cropsPage.cultivationGuide')}</TabsTrigger>
                      <TabsTrigger value="states">{t('cropsPage.suitableStates')}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                          <Calendar className="w-6 h-6 text-green-600 mt-1" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Duration</h4>
                            <p className="text-gray-600">{selectedCrop.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                          <Droplet className="w-6 h-6 text-blue-600 mt-1" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Water Requirement</h4>
                            <p className="text-gray-600">{selectedCrop.water}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                          <Sun className="w-6 h-6 text-orange-600 mt-1" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Temperature</h4>
                            <p className="text-gray-600">{selectedCrop.temperature}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-lg">
                          <Sprout className="w-6 h-6 text-amber-600 mt-1" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Soil Type</h4>
                            <p className="text-gray-600">{selectedCrop.soil}</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="cultivation" className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">{t('cropsPage.cultivationGuide')}</h4>
                        <p className="text-gray-700 leading-relaxed">{selectedCrop.cultivation}</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">{t('cropsPage.season')}</h4>
                        <p className="text-green-700">{selectedCrop.season}</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="states" className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          {t('cropsPage.suitableStates')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedCrop.states.map((state: string) =>
                          <Badge key={state} variant="outline" className="text-sm">
                              <MapPin className="w-3 h-3 mr-1" />
                              {state}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>);

}