"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Phone, Mail, Globe, Users } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const ngos = [
  {
    id: 1,
    name: "Farmer Support Foundation",
    category: "Training & Support",
    state: "Maharashtra",
    city: "Mumbai",
    description: "Providing comprehensive training programs and financial support to small-scale farmers across Maharashtra.",
    services: ["Training Programs", "Financial Aid", "Equipment Support"],
    contact: {
      phone: "+91 22 1234 5678",
      email: "contact@farmersupport.org",
      website: "www.farmersupport.org",
    },
    established: "2010",
  },
  {
    id: 2,
    name: "Green Agriculture Initiative",
    category: "Organic Farming",
    state: "Punjab",
    city: "Ludhiana",
    description: "Promoting organic farming practices and sustainable agriculture methods in Punjab region.",
    services: ["Organic Certification", "Seeds Supply", "Market Linkage"],
    contact: {
      phone: "+91 161 2345 6789",
      email: "info@greenagri.org",
      website: "www.greenagri.org",
    },
    established: "2015",
  },
  {
    id: 3,
    name: "Rural Development Society",
    category: "Community Development",
    state: "Uttar Pradesh",
    city: "Lucknow",
    description: "Working towards holistic rural development with focus on agriculture, education, and healthcare.",
    services: ["Community Training", "Infrastructure", "Healthcare"],
    contact: {
      phone: "+91 522 3456 7890",
      email: "support@ruraldevelopment.org",
      website: "www.ruraldevelopment.org",
    },
    established: "2008",
  },
  {
    id: 4,
    name: "Kisan Welfare Trust",
    category: "Financial Assistance",
    state: "Karnataka",
    city: "Bangalore",
    description: "Providing micro-loans, insurance support, and financial literacy programs for farmers.",
    services: ["Micro Finance", "Insurance", "Financial Literacy"],
    contact: {
      phone: "+91 80 4567 8901",
      email: "help@kisanwelfare.org",
      website: "www.kisanwelfare.org",
    },
    established: "2012",
  },
  {
    id: 5,
    name: "Agricultural Technology Center",
    category: "Technology & Innovation",
    state: "Tamil Nadu",
    city: "Chennai",
    description: "Introducing modern agricultural technologies and innovative farming techniques to farmers.",
    services: ["Technology Training", "Equipment Demo", "Research Support"],
    contact: {
      phone: "+91 44 5678 9012",
      email: "contact@agritech.org",
      website: "www.agritech.org",
    },
    established: "2016",
  },
  {
    id: 6,
    name: "Water Conservation Alliance",
    category: "Water Management",
    state: "Rajasthan",
    city: "Jaipur",
    description: "Focusing on water conservation, rainwater harvesting, and efficient irrigation systems.",
    services: ["Drip Irrigation", "Rainwater Harvesting", "Water Testing"],
    contact: {
      phone: "+91 141 6789 0123",
      email: "info@wateralliance.org",
      website: "www.wateralliance.org",
    },
    established: "2011",
  },
  {
    id: 7,
    name: "Crop Insurance Network",
    category: "Insurance Services",
    state: "Gujarat",
    city: "Ahmedabad",
    description: "Facilitating crop insurance and providing support during natural calamities and crop failures.",
    services: ["Crop Insurance", "Claim Support", "Risk Assessment"],
    contact: {
      phone: "+91 79 7890 1234",
      email: "support@cropinsurance.org",
      website: "www.cropinsurance.org",
    },
    established: "2014",
  },
  {
    id: 8,
    name: "Women Farmers Association",
    category: "Women Empowerment",
    state: "West Bengal",
    city: "Kolkata",
    description: "Empowering women farmers through skill development, self-help groups, and market access.",
    services: ["Skill Training", "SHG Formation", "Market Access"],
    contact: {
      phone: "+91 33 8901 2345",
      email: "contact@womenfarmers.org",
      website: "www.womenfarmers.org",
    },
    established: "2013",
  },
];

export default function NGOsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["All Categories", ...Array.from(new Set(ngos.map(ngo => ngo.category)))];

  const filteredNGOs = ngos.filter((ngo) => {
    const matchesSearch = 
      ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || ngo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactClick = (ngoName: string, phone: string) => {
    toast.success(`Contacting ${ngoName}`, {
      description: `Please call ${phone} or visit the Contact Us page for more options.`
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <div className="bg-green-700 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">NGO Directory</h1>
          <p className="text-xl text-green-100">
            Connect with agricultural NGOs for support, training, and resources
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
                  Search NGOs
                </label>
                <Input
                  placeholder="Search by name, location, or services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Category
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
                  <Badge className="bg-green-600 w-fit mt-2">{ngo.category}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{ngo.description}</p>

                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Services Offered:</h4>
                    <div className="flex flex-wrap gap-1">
                      {ngo.services.map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{ngo.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700 break-all">{ngo.contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <a 
                        href={`https://${ngo.contact.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        {ngo.contact.website}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-xs text-gray-500">Est. {ngo.established}</span>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleContactClick(ngo.name, ngo.contact.phone)}
                    >
                      Contact NGO
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