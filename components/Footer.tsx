import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-12 bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-10 md:space-y-0">
          {/* Logo & About */}
          <div className="max-w-sm space-y-4">
            <div className="flex items-center space-x-2">
              
              <Link href="/">
                <Image
                  src="/cordelia-logo.png"
                  alt="Logo"
                  width={200}
                  height={70}
                  
                />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Reimagine the Healthcare IT by using our SaaS product. CordeLiaKare
              is a scalable product for all different sizes of healthcare
              providers to manage the operations in a patient centric way.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Menu</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a
                  href="https://www.cordeliatech.com/contact-us/"
                  className="hover:underline"
                  target={"_blank"}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <p className="text-sm flex items-center space-x-2">
              <FaMapMarkerAlt />
              <span>
                GF13 Ajantha Meadows, Third Cross, <br></br>AkshayaNagar,
                Bangalore - 560068, Karnataka, India
              </span>
            </p>
            <a
              className="text-sm flex items-center space-x-2 mb-11"
              href="mailto:contactus@cordeliatech.com"
              target={"_blank"}
            >
              <FaEnvelope />
              <span> contactus@cordeliatech.com</span>
            </a>
          </div>

          {/* Social */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4 text-xl text-muted-foreground">
              <a
                href="https://www.facebook.com/profile.php?id=61550846105323"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/test?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/p/C8JQm-ESn1q/?igsh=MTRqdXB1MjkydXZsag%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/company/cordelia-technology/posts"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 mb-20"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom links */}
        <div className="mt-6 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 text-sm ">
          <a href="/pricing" className="hover:underline">
            Pricing
          </a>
          <a
            href="https://prod.cordeliakare.com/hospitals"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Our Customers
          </a>
          <a href="/partner" className="hover:underline">
            Be a Partner
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-sm ">
          © {new Date().getFullYear()} Cordelia Technology Private Limited. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}