"use client";

import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sprout, Users, BookOpen, Phone, TrendingUp, Shield, Droplet, Sun, MessageCircle, Send } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { useTranslation } from "@/context/TranslationContext";

export default function Home() {
  const { t } = useTranslation();
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", message: t('chatbot.greeting') }
  ]);
  const [chatInput, setChatInput] = useState("");

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.toLowerCase();
    setChatMessages((prev) => [...prev, { type: "user", message: chatInput }]);

    let botResponse = t('chatbot.defaultResponse');
    if (userMessage.includes("crop") || userMessage.includes("farming")) {
      botResponse = t('chatbot.cropResponse');
    } else if (userMessage.includes("ngo") || userMessage.includes("support")) {
      botResponse = t('chatbot.ngoResponse');
    } else if (userMessage.includes("help") || userMessage.includes("contact")) {
      botResponse = t('chatbot.contactResponse');
    } else if (userMessage.includes("hello") || userMessage.includes("hi") || userMessage.includes("namaste")) {
      botResponse = t('chatbot.greetingResponse');
    } else if (userMessage.includes("weather") || userMessage.includes("climate")) {
      botResponse = t('chatbot.weatherResponse');
    } else if (userMessage.includes("price") || userMessage.includes("market")) {
      botResponse = t('chatbot.priceResponse');
    }

    setTimeout(() => {
      setChatMessages((prev) => [...prev, { type: "bot", message: botResponse }]);
    }, 500);

    setChatInput("");
  };

  const features = [
    {
      icon: Sprout,
      title: t('features.cropInfo.title'),
      description: t('features.cropInfo.description'),
      link: "/crops",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Users,
      title: t('features.ngoDirectory.title'),
      description: t('features.ngoDirectory.description'),
      link: "/ngos",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: BookOpen,
      title: t('features.knowledgeHub.title'),
      description: t('features.knowledgeHub.description'),
      link: "/blog",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Phone,
      title: t('features.support.title'),
      description: t('features.support.description'),
      link: "/contact",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: t('benefits.productivity.title'),
      description: t('benefits.productivity.description')
    },
    {
      icon: Shield,
      title: t('benefits.riskManagement.title'),
      description: t('benefits.riskManagement.description')
    },
    {
      icon: Droplet,
      title: t('benefits.waterConservation.title'),
      description: t('benefits.waterConservation.description')
    },
    {
      icon: Sun,
      title: t('benefits.climateAdaptation.title'),
      description: t('benefits.climateAdaptation.description')
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 !bg-transparent !bg-none !bg-cover !bg-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                🌾 {t('hero.tagline')}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {t('hero.title').split('ANNADATAA')[0]}
                <span className="text-green-200">ANNADATAA</span>
                {t('hero.title').split('ANNADATAA')[1]}
              </h1>
              <p className="text-xl md:text-2xl text-green-100 mb-8">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/crops">
                  <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 w-full sm:w-auto">
                    <Sprout className="w-5 h-5 mr-2" />
                    {t('hero.exploreCrops')}
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="hover:bg-white/10 w-full sm:w-auto !opacity-100 !border-white !text-[#0f7800]">
                    <Phone className="w-5 h-5 mr-2" />
                    {t('hero.getSupport')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8c7aca3c-7574-4f11-af54-208b636c54a2/visual-edit-uploads/1760943492340-daq9ry4ajb4.jpg"
                alt="Farmer in field"
                className="rounded-lg shadow-2xl !w-full !h-full !max-w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{t('stats_numbers.crops')}</div>
              <div className="text-gray-600">{t('stats.cropVarieties')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{t('stats_numbers.ngos')}</div>
              <div className="text-gray-600">{t('stats.ngoPartners')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{t('stats_numbers.farmers')}</div>
              <div className="text-gray-600">{t('stats.farmerHelped')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{t('stats_numbers.support')}</div>
              <div className="text-gray-600">{t('stats.supportAvailable')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 bg-gray-50 !bg-none !bg-cover !bg-center">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) =>
              <Link key={index} href={feature.link}>
                <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('benefits.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('benefits.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) =>
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-green-100 mb-8">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/crops">
              <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 w-full sm:w-auto">
                {t('cta.getStarted')}
              </Button>
            </Link>
            <Link href="/ngos">
              <Button
                size="lg"
                variant="outline"
                className="hover:bg-white/10 w-full sm:w-auto !text-[#0f8400] !border-white">
                {t('cta.findNGO')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Latest from Blog */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t('blog.title')}
            </h2>
            <Link href="/blog">
              <Button variant="outline" className="hidden md:flex">
                {t('blog.viewAll')}
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: t('blog.articles.0.title'),
                image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
                category: t('blog.articles.0.category')
              },
              {
                title: t('blog.articles.1.title'),
                image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
                category: t('blog.articles.1.category')
              },
              {
                title: t('blog.articles.2.title'),
                image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80",
                category: t('blog.articles.2.category')
              }
            ].map((article, index) =>
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover" />
                <CardHeader>
                  <div className="text-sm text-green-600 font-medium mb-2">{article.category}</div>
                  <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                </CardHeader>
              </Card>
            )}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/blog">
              <Button variant="outline">{t('blog.viewAll')}</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Chatbot */}
      {chatOpen &&
        <div className="fixed bottom-24 right-4 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
          <div className="bg-green-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-semibold">{t('chatbot.title')}</h3>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-green-700 h-6 w-6 p-0"
              onClick={() => setChatOpen(false)}>
              ✕
            </Button>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {chatMessages.map((msg, idx) =>
              <div
                key={idx}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] p-3 rounded-lg ${
                    msg.type === "user" ?
                      "bg-green-600 text-white rounded-br-none" :
                      "bg-white text-gray-900 border border-gray-200 rounded-bl-none"
                  }`
                }>
                  <p className="text-sm whitespace-pre-line">{msg.message}</p>
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleChatSubmit} className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t('chatbot.placeholder')}
                className="flex-1" />
              <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      }

      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg z-40 flex items-center justify-center text-white transition-all hover:scale-110"
        aria-label="Open chat">
        {chatOpen ?
          <span className="text-2xl">✕</span> :
          <MessageCircle className="w-6 h-6" />
        }
      </button>

      <Toaster />
      <Footer />
    </div>
  );
}