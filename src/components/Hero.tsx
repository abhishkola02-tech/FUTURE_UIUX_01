import React from 'react';
import { Calendar, Phone, Star, ShieldCheck, Clock, MapPin } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Value Proposition & CTAs */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            <span>Welcoming New Patients & Emergency Cases</span>
          </div>

          <h1 className="hero-title">
            Your Smile Deserves <br />
            <span className="text-gradient">The Best Care.</span>
          </h1>

          <p className="hero-description">
            Professional, affordable dental care for you and your family — conveniently located near you with advanced technology and gentle specialists.
          </p>

          <div className="hero-cta-group">
            <button onClick={onBookClick} className="btn btn-primary hero-main-btn" id="hero-book-btn">
              <Calendar size={18} />
              <span>Book an Appointment</span>
            </button>
            <a href="tel:+919876543210" className="btn btn-outline hero-call-btn" id="hero-call-btn">
              <Phone size={18} />
              <span>Call Now</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="hero-trust-bar">
            <div className="trust-item">
              <div className="star-rating">
                <Star size={16} fill="#F59E0B" color="#F59E0B" />
                <Star size={16} fill="#F59E0B" color="#F59E0B" />
                <Star size={16} fill="#F59E0B" color="#F59E0B" />
                <Star size={16} fill="#F59E0B" color="#F59E0B" />
                <Star size={16} fill="#F59E0B" color="#F59E0B" />
              </div>
              <div className="trust-text">
                <strong>4.9/5 Rating</strong>
                <span>Over 5,000+ happy smiles</span>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <div className="trust-icon-badge">
                <ShieldCheck size={20} color="#00A896" />
              </div>
              <div className="trust-text">
                <strong>100% Painless Tech</strong>
                <span>Certified sterilization</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Showcase Card */}
        <div className="hero-visual">
          <div className="hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
              alt="Friendly Dentist with Patient at SmileCare Clinic"
              className="hero-main-img"
              loading="eager"
            />
            
            {/* Floating Quick Feature Cards */}
            <div className="floating-badge floating-badge-top">
              <div className="floating-badge-icon bg-secondary-light">
                <Clock size={20} color="#00A896" />
              </div>
              <div>
                <p className="floating-label">Instant Response</p>
                <p className="floating-value">Same-Day Slots Available</p>
              </div>
            </div>

            <div className="floating-badge floating-badge-bottom">
              <div className="floating-badge-icon bg-primary-light">
                <MapPin size={20} color="#0A369D" />
              </div>
              <div>
                <p className="floating-label">Central Location</p>
                <p className="floating-value">Main Street, Medical Hub</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
