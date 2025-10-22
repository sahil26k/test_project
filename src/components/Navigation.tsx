"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
"@/components/ui/select";
import { toast } from "sonner";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en");

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("annadataa_language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Handle language change
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    localStorage.setItem("annadataa_language", value);

    const languageNames: {[key: string]: string;} = {
      en: "English",
      hi: "हिंदी (Hindi)",
      te: "తెలుగు (Telugu)",
      ta: "தமிழ் (Tamil)",
      bn: "বাংলা (Bengali)"
    };

    toast.success(`Language changed to ${languageNames[value]}`);
  };

  const navLinks = [
  { href: "/", label: "Home" },
  { href: "/crops", label: "Crop Information" },
  { href: "/ngos", label: "NGO Directory" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" }];


  return (
    <nav className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold !bg-none !bg-cover !bg-center">🌾 ANNADATAA</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) =>
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-green-200 transition-colors font-medium">

                {link.label}
              </Link>
            )}
            
            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[100px] bg-green-600 border-green-500 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                  <SelectItem value="te">తెలుగు</SelectItem>
                  <SelectItem value="ta">தமிழ்</SelectItem>
                  <SelectItem value="bn">বাংলা</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-green-600">

              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen &&
        <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) =>
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-green-200 transition-colors font-medium"
              onClick={() => setIsOpen(false)}>

                  {link.label}
                </Link>
            )}
              <div className="flex items-center space-x-2 pt-2">
                <Globe className="w-5 h-5" />
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-[120px] bg-green-600 border-green-500 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिंदी</SelectItem>
                    <SelectItem value="te">తెలుగు</SelectItem>
                    <SelectItem value="ta">தமிழ்</SelectItem>
                    <SelectItem value="bn">বাংলা</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        }
      </div>
    </nav>);

}