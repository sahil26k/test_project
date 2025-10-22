"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useTranslation } from "@/context/TranslationContext";

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", message: t('chatbot.greeting') }
  ]);
  const [chatInput, setChatInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('contactPage.successMessage'));
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages([...chatMessages, 
      { type: "user", message: chatInput },
      { type: "bot", message: "Thank you for your message. Our team will assist you shortly. For immediate help, please call our helpline at +91 1800-XXX-XXXX." }
    ]);
    setChatInput("");
  };

  return (
    <div className="min-h-screen flex flex-col">

      <div className="bg-green-700 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('contactPage.title')}</h1>
          <p className="text-xl text-green-100">
            {t('contactPage.subtitle')}
          </p>
        </div>
      </div>

      <div className="flex-1 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{t('contactPage.formTitle')}</CardTitle>
                  <CardDescription>
                    {t('contactPage.formSubtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">{t('contactPage.form.name')} *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={t('contactPage.form.namePlaceholder')}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">{t('contactPage.form.email')} *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={t('contactPage.form.emailPlaceholder')}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">{t('contactPage.form.phone')} *</Label>
                        <Input
                          id="phone"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder={t('contactPage.form.phonePlaceholder')}
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">{t('contactPage.form.subject')} *</Label>
                        <Input
                          id="subject"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder={t('contactPage.form.subjectPlaceholder')}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">{t('contactPage.form.message')} *</Label>
                      <Textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t('contactPage.form.messagePlaceholder')}
                      />
                    </div>

                    <Button type="submit" className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
                      <Send className="w-4 h-4 mr-2" />
                      {t('contactPage.form.submit')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('contactPage.contactInfo.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('contactPage.contactInfo.address')}</h4>
                      <p className="text-gray-600 text-sm">
                        123 Agriculture Street<br />
                        New Delhi, 110001<br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('contactPage.contactInfo.phone')}</h4>
                      <p className="text-gray-600 text-sm">
                        Toll Free: 1800-XXX-XXXX<br />
                        Mobile: +91 98765 43210
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('contactPage.contactInfo.email')}</h4>
                      <p className="text-gray-600 text-sm">
                        info@annadataa.in<br />
                        support@annadataa.in
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('contactPage.contactInfo.hours')}</h4>
                      <p className="text-gray-600 text-sm">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('contactPage.quickSupport')}</CardTitle>
                  <CardDescription>
                    {t('contactPage.quickSupportDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Phone className="w-4 h-4 mr-2" />
                    {t('contactPage.callHelpline')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{t('contactPage.ourLocation')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">{t('contactPage.mapView')}</p>
                  <p className="text-sm text-gray-500">123 Agriculture Street, New Delhi</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Chatbot */}
      {chatOpen && (
        <div className="fixed bottom-24 right-4 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
          <div className="bg-green-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <h3 className="font-semibold">ANNADATAA Assistant</h3>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-green-700"
              onClick={() => setChatOpen(false)}
            >
              ✕
            </Button>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
              />
              <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg z-40"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      <Toaster />
      <Footer />
    </div>
  );
}