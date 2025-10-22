"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Calendar, User, ArrowRight, TrendingUp } from "lucide-react";
import { useTranslation } from "@/context/TranslationContext";

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Tips for Successful Organic Farming",
    excerpt: "Discover the key principles and practices that can help you transition to organic farming and increase your crop yield naturally.",
    author: "Dr. Rajesh Kumar",
    date: "2024-01-15",
    category: "Organic Farming",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Modern Irrigation Techniques for Water Conservation",
    excerpt: "Learn about drip irrigation, sprinkler systems, and other modern techniques that can save water while maximizing crop productivity.",
    author: "Priya Sharma",
    date: "2024-01-12",
    category: "Water Management",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Soil Health Management: A Complete Guide",
    excerpt: "Understanding soil composition, pH levels, and nutrient management for optimal crop growth and sustainable farming.",
    author: "Dr. Amit Patel",
    date: "2024-01-10",
    category: "Soil Management",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80",
    readTime: "8 min read",
  },
  {
    id: 4,
    title: "Integrated Pest Management Strategies",
    excerpt: "Effective pest control methods that minimize chemical usage and promote ecological balance in your farm.",
    author: "Suresh Reddy",
    date: "2024-01-08",
    category: "Pest Control",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
    readTime: "6 min read",
  },
  {
    id: 5,
    title: "Climate-Smart Agriculture: Adapting to Change",
    excerpt: "How farmers can adapt their practices to cope with climate change and ensure sustainable food production.",
    author: "Dr. Meera Singh",
    date: "2024-01-05",
    category: "Climate Change",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
    readTime: "10 min read",
  },
  {
    id: 6,
    title: "Maximizing Profits Through Crop Diversification",
    excerpt: "Learn how growing multiple crops can reduce risk, improve soil health, and increase your farm income.",
    author: "Ramesh Gupta",
    date: "2024-01-03",
    category: "Farm Management",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80",
    readTime: "5 min read",
  },
  {
    id: 7,
    title: "Understanding Government Agricultural Schemes",
    excerpt: "A comprehensive guide to various government schemes and subsidies available for Indian farmers in 2024.",
    author: "Kavita Desai",
    date: "2024-01-01",
    category: "Government Schemes",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    readTime: "9 min read",
  },
  {
    id: 8,
    title: "The Future of Smart Farming Technology",
    excerpt: "Exploring IoT, drones, and AI technologies that are revolutionizing modern agriculture practices.",
    author: "Anil Verma",
    date: "2023-12-28",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80",
    readTime: "7 min read",
  },
];

export default function BlogPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Category translation mapping
  const translateCategory = (category: string): string => {
    const categoryMap: Record<string, string> = {
      "Organic Farming": t('blogPage.categories.organic'),
      "Water Management": t('blogPage.categories.water'),
      "Soil Management": t('blogPage.categories.soil'),
      "Technology": t('blogPage.categories.technology'),
      "Pest Control": t('blogPage.categories.pest'),
      "Climate Change": t('blogPage.categories.climate'),
      "Farm Management": t('blogPage.categories.management'),
      "Government Schemes": t('blogPage.categories.government'),
    };
    return categoryMap[category] || category;
  };

  const uniqueCategories = Array.from(new Set(blogPosts.map(post => post.category)));
  const categories = [t('blogPage.allCategories'), ...uniqueCategories];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || selectedCategory === t('blogPage.allCategories') || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen flex flex-col">

      <div className="bg-green-700 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('blogPage.title')}</h1>
          <p className="text-xl text-green-100">
            {t('blogPage.subtitle')}
          </p>
        </div>
      </div>

      <div className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Featured Post */}
          <Card className="mb-8 overflow-hidden border-2 border-green-200">
            <div className="grid md:grid-cols-2 gap-0">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center space-x-2 mb-3">
                  <Badge className="bg-green-600">{t('blogPage.featuredArticle')}</Badge>
                  <Badge variant="outline">{translateCategory(featuredPost.category)}</Badge>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 w-fit">
                  {t('blogPage.readMore')} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Search and Filter */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Search className="inline w-4 h-4 mr-1" />
                  Search Articles
                </label>
                <Input
                  placeholder="Search by title, content, or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('blogPage.filterByCategory')}
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat === t('blogPage.allCategories') ? "all" : cat}>
                      {cat === t('blogPage.allCategories') ? cat : translateCategory(cat)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-green-700">{filteredPosts.length}</span> articles
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span>Trending Topics</span>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-green-600">
                    {translateCategory(post.category)}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl line-clamp-2 group-hover:text-green-600 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <Button size="sm" variant="ghost" className="text-green-600 hover:text-green-700">
                      {t('blogPage.readMore')} <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Articles Found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Newsletter Section */}
          <Card className="mt-12 bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardContent className="py-8">
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-3">Subscribe to Our Newsletter</h3>
                <p className="text-green-100 mb-6">
                  Get the latest agricultural news, tips, and updates delivered to your inbox
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white text-gray-900"
                  />
                  <Button className="bg-white text-green-700 hover:bg-green-50">
                    Subscribe
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}