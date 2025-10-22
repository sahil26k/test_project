import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">🌾 ANNADATAA</h3>
            <p className="text-green-200">
              Empowering farmers with knowledge, resources, and support for sustainable agriculture.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/crops" className="text-green-200 hover:text-white transition-colors">
                  Crop Information
                </Link>
              </li>
              <li>
                <Link href="/ngos" className="text-green-200 hover:text-white transition-colors">
                  NGO Directory
                </Link>
              </li>
              {/* <li>
                <Link href="/blog" className="text-green-200 hover:text-white transition-colors">
                  Blog
                </Link>
              </li> */}
              <li>
                <Link href="/contact" className="text-green-200 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span className="text-green-200">123 Agriculture Street, New Delhi, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-green-200">+91 1800-XXX-XXXX</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-green-200">info@annadataa.in</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-green-200 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
          <p className="!whitespace-pre-line">© 2025 ANNADATAA. All rights reserved. Empowering farmers across India.</p>
        </div>
      </div>
    </footer>);

}