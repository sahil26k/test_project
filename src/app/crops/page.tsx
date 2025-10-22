"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Calendar, Droplet, Sun, Sprout } from "lucide-react";

const crops = [
{
  id: 1,
  name: "Rice (Paddy)",
  category: "Cereal",
  states: ["Punjab", "Haryana", "West Bengal", "Uttar Pradesh", "Andhra Pradesh"],
  season: "Kharif",
  duration: "120-150 days",
  water: "High",
  temperature: "20-35°C",
  soil: "Clay loam, Silty clay",
  image: "https://3000-9938b188-6593-439c-b78c-3162017a5a8b.orchids.page/crops",
  description: "Rice is the staple food crop of India. It requires high water and temperature for cultivation.",
  cultivation: "Prepare land by plowing. Transplant seedlings at 20-25 days. Maintain water level at 5-7 cm."
},
{
  id: 2,
  name: "Wheat",
  category: "Cereal",
  states: ["Punjab", "Haryana", "Uttar Pradesh", "Madhya Pradesh", "Rajasthan"],
  season: "Rabi",
  duration: "120-140 days",
  water: "Medium",
  temperature: "10-25°C",
  soil: "Clay loam, Sandy loam",
  image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80",
  description: "Wheat is the second most important cereal crop in India after rice.",
  cultivation: "Sow seeds in rows. Apply fertilizers at sowing and tillering stages. Irrigate 4-6 times."
},
{
  id: 3,
  name: "Cotton",
  category: "Fiber",
  states: ["Gujarat", "Maharashtra", "Telangana", "Punjab", "Haryana"],
  season: "Kharif",
  duration: "150-180 days",
  water: "Medium",
  temperature: "21-30°C",
  soil: "Black cotton soil, Alluvial",
  image: "",
  description: "Cotton is the most important fiber crop and cash crop in India.",
  cultivation: "Deep plowing required. Sow seeds at 45-60 cm spacing. Apply fertilizers in splits."
},
{
  id: 4,
  name: "Sugarcane",
  category: "Cash Crop",
  states: ["Uttar Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat"],
  season: "Year-round",
  duration: "10-12 months",
  water: "High",
  temperature: "20-35°C",
  soil: "Deep loamy soil",
  image: "https://images.unsplash.com/photo-1591108781995-c5481c0c32cc?w=400&q=80",
  description: "Sugarcane is a major cash crop used for sugar production.",
  cultivation: "Plant setts in furrows. Maintain adequate moisture. Apply fertilizers regularly."
},
{
  id: 5,
  name: "Maize",
  category: "Cereal",
  states: ["Karnataka", "Madhya Pradesh", "Bihar", "Maharashtra", "Rajasthan"],
  season: "Kharif & Rabi",
  duration: "90-110 days",
  water: "Medium",
  temperature: "21-27°C",
  soil: "Well-drained loamy soil",
  image: "https://images.unsplash.com/photo-1603022878525-443afbc21ac3?w=400&q=80",
  description: "Maize is an important cereal crop used for food, feed, and industrial purposes.",
  cultivation: "Sow seeds at proper spacing. Apply balanced fertilizers. Control weeds timely."
},
{
  id: 6,
  name: "Pulses (Gram)",
  category: "Pulses",
  states: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Karnataka", "Andhra Pradesh"],
  season: "Rabi",
  duration: "95-120 days",
  water: "Low",
  temperature: "10-25°C",
  soil: "Well-drained loam",
  image: "https://images.unsplash.com/photo-1589880266225-3e8f9bc3e9d5?w=400&q=80",
  description: "Gram (chickpea) is an important pulse crop rich in protein.",
  cultivation: "Sow seeds with seed treatment. Requires minimal irrigation. Apply phosphorus fertilizers."
}];


export default function CropsPage() {
  const [selectedState, setSelectedState] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState(crops[0]);

  const states = ["All States", "Punjab", "Haryana", "Uttar Pradesh", "Maharashtra", "Gujarat", "Karnataka", "Tamil Nadu", "West Bengal", "Madhya Pradesh", "Rajasthan", "Andhra Pradesh", "Telangana", "Bihar"];
  const categories = ["All Categories", "Cereal", "Pulses", "Fiber", "Cash Crop"];

  const filteredCrops = crops.filter((crop) => {
    const matchesState = selectedState === "all" || crop.states.some((s) => s.toLowerCase().includes(selectedState.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || crop.category === selectedCategory;
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesState && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="bg-green-700 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Crop Information</h1>
          <p className="text-xl text-green-100">
            Comprehensive cultivation guides for various crops across different states of India
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
                  Search Crops
                </label>
                <Input
                  placeholder="Search by crop name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} />

              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Select State
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
                        src={crop.image}
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
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="cultivation">Cultivation</TabsTrigger>
                      <TabsTrigger value="states">Suitable States</TabsTrigger>
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
                        <h4 className="font-semibold text-gray-900 mb-2">Cultivation Practices</h4>
                        <p className="text-gray-700 leading-relaxed">{selectedCrop.cultivation}</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">Best Season</h4>
                        <p className="text-green-700">{selectedCrop.season} season is most suitable for cultivation</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="states" className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Suitable States for Cultivation
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedCrop.states.map((state) =>
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