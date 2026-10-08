import React from 'react';
import { Sparkles, Phone, Mail, MapPin, Heart, Shield, Clock } from 'lucide-react';

interface FooterProps {
  onNavClick: (sectionId: string) => void;
  onBookClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onBookClick }) => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="logo-brand footer-logo">
              <div className="logo-icon-wrapper">
                <Sparkles className="logo-icon" size={22} />
              </div>
              <span className="logo-text">Smile<span>Care</span></span>
            </div>
            <p className="footer-tagline">
              "Your Smile Deserves the Best Care."
            </p>
            <p className="footer-desc">
              Providing modern, compassionate, and affordable dental healthcare for families, professionals, and seniors across the local community.
            </p>
            <div className="footer-cert-badge">
              <Shield size={16} color="#00A896" />
              <span>Certified Hygiene & Clinical Standards</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Quick Navigation</h4>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); onNavClick('home'); }}>Home</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); onNavClick('services'); }}>Dental Services</a></li>
              <li><a href="#why-us" onClick={(e) => { e.preventDefault(); onNavClick('why-us'); }}>Why Choose Us</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); onNavClick('about'); }}>About Clinic</a></li>
              <li><a href="#doctors" onClick={(e) => { e.preventDefault(); onNavClick('doctors'); }}>Our Doctors</a></li>
              <li><a href="#reviews" onClick={(e) => { e.preventDefault(); onNavClick('reviews'); }}>Patient Reviews</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); onNavClick('contact'); }}>Contact & Location</a></li>
            </ul>
          </div>

          {/* Key Dental Services */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Dental Treatments</h4>
            <ul className="footer-links">
              <li><a href="#services" onClick={(e) => { e.preventDefault(); onNavClick('services'); }}>General Dentistry</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); onNavClick('services'); }}>Teeth Whitening</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); onNavClick('services'); }}>Dental Cleaning & Scaling</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); onNavClick('services'); }}>Ceramic Dental Crowns</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); onNavClick('services'); }}>Clear Aligners & Orthodontics</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); onNavClick('services'); }}>Emergency Pain Relief</a></li>
            </ul>
          </div>

          {/* Contact Details & Hours */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title">Clinic Hours & Contact</h4>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={18} className="footer-icon" />
                <span>124 Health Care Ave, Medical Plaza, Suite 302 (Demo Address)</span>
              </li>
              <li>
                <Phone size={18} className="footer-icon" />
                <a href="tel:+919876543210">+91 98765 43210</a>
              </li>
              <li>
                <Mail size={18} className="footer-icon" />
                <a href="mailto:hello@smilecare.example">hello@smilecare.example</a>
              </li>
              <li>
                <Clock size={18} className="footer-icon" />
                <span>Mon – Sat: 9:00 AM – 7:00 PM<br />Sun: Closed (Emergency On-Call)</span>
              </li>
            </ul>

            <button onClick={onBookClick} className="btn btn-primary footer-book-btn">
              Book Online Now
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} SmileCare Dental Clinic. All Rights Reserved. (Portfolio UI/UX Design Challenge Demonstration).
          </p>
          <div className="footer-extra-links">
            <span className="footer-extra-tag">
              Designed with <Heart size={13} fill="#EF4444" color="#EF4444" style={{ display: 'inline', verticalAlign: 'middle' }} /> for Patient Care & Trust
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
