"use client";

import Link from "next/link";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";

import { useTheme } from "next-themes";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  TwitterIcon,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Footer() {
  return (
    <footer className="py-8 md:py-12 bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 lg:gap-12">
          {/* Logo & About */}
          <div className="flex-1 lg:max-w-md xl:max-w-lg">
            <div className="flex items-center mb-4">
              <Link href="/">
                <div className="relative w-[60px] h-[34px] md:w-[80px] md:h-[45px]">
                  <Image
                    src="/cordelia-logo.png"
                    alt="Logo"
                    width={80}
                    height={45}
                    className="block dark:hidden"
                  />
                  <Image
                    src="/dark5.jpg"
                    alt="Logo"
                    width={80}
                    height={45}
                    className="hidden dark:block"
                  />
                </div>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground text-justify leading-relaxed">
              CordeLiakare is a cutting-edge HealthTech platform developed by
              Cordelia Technology Pvt. Ltd., a pioneering next-generation
              company committed to transforming healthcare delivery. Designed to
              empower healthcare providers, CordeLiakare bridges the gaps
              between patients, providers, and care networks through its
              integrated Hospital Information Management System (HIMS) and
              mobile health (mHealth) platform. Leveraging advanced technologies
              such as AI, data analytics, and mobile innovation, these solutions
              ensure the delivery of reliable, efficient, and compassionate
              healthcare services.
            </p>
          </div>

          {/* Right Side - Menu, Contact, Social */}
          <div className="flex flex-col md:flex-row lg:flex-row gap-8 md:gap-12 lg:gap-16">
            {/* Menu */}
            <div className="flex-shrink-0">
              <h2 className="text-lg font-semibold mb-4">Menu</h2>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/"
                    className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="https://prod.cordeliakare.com/about-us"
                    className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li onClick={() => toast("Not available now.", { icon: "ℹ️" })}>
                  <a className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.cordeliatech.com/contact-us/"
                    className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="flex-shrink-0">
              <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    GF13 Ajantha Meadows, Third Cross,
                    <br />
                    AkshayaNagar, Bangalore - 560068,
                    <br />
                    Karnataka, India
                  </span>
                </div>
                <a
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  href="mailto:contactus@cordeliatech.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>contactus@cordeliatech.com</span>
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="flex-shrink-0">
              <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/people/Cordelia-Technology/61550846105323/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-blue-600 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/test?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-blue-400 transition-colors"
                >
                  <FaXTwitter className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/cordelia_technology/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-pink-500 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/cordelia-technology/posts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-blue-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border/40">
          {/* Bottom Links */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-4">
            <a
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="https://prod.cordeliakare.com/hospitals"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
            >
              Our Customers
            </a>
            <a
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
            >
              Terms & Conditions
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Cordelia Technology Private Limited.
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
