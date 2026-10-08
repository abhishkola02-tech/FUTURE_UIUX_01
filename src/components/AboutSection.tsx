import React from 'react';
import { ShieldCheck, HeartPulse, Sparkles, Users } from 'lucide-react';

interface AboutSectionProps {
  onMeetDoctorsClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onMeetDoctorsClick }) => {
  return (
    <section id="about" className="about-section section-padding">
      <div className="container about-container">
        {/* Visual Showcase */}
        <div className="about-visual">
          <div className="about-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
              alt="State of the art dental clinic interior at SmileCare"
              className="about-image"
              loading="lazy"
            />
            <div className="about-stat-card">
              <span className="stat-number">12+</span>
              <span className="stat-label">Years of Caring for Community Smiles</span>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="about-content">
          <span className="section-tag">About SmileCare Clinic</span>
          <h2 className="section-title">Patient-First Dental Care in a Modern, Relaxing Environment</h2>
          <p className="about-desc">
            SmileCare Dental Clinic was founded with a singular purpose: to replace dental fear with comfort, clarity, and genuine warmth. We believe everyone deserves access to top-tier oral healthcare without anxiety or unexpected costs.
          </p>

          <div className="about-features-list">
            <div className="about-feature-item">
              <div className="feature-icon"><Users size={20} color="#00A896" /></div>
              <div>
                <strong>Experienced Specialists</strong>
                <p>Team of dedicated dentists, pediatric specialists, and oral surgeons.</p>
              </div>
            </div>

            <div className="about-feature-item">
              <div className="feature-icon"><Sparkles size={20} color="#00A896" /></div>
              <div>
                <strong>Modern Equipment</strong>
                <p>Low-radiation 3D imaging, laser dentistry, and sterilization protocols.</p>
              </div>
            </div>

            <div className="about-feature-item">
              <div className="feature-icon"><HeartPulse size={20} color="#00A896" /></div>
              <div>
                <strong>Patient-First Approach</strong>
                <p>We listen carefully, explain options in plain language, and prioritize comfort.</p>
              </div>
            </div>

            <div className="about-feature-item">
              <div className="feature-icon"><ShieldCheck size={20} color="#00A896" /></div>
              <div>
                <strong>Transparent Pricing</strong>
                <p>Clear, itemized treatment estimates before starting any procedure.</p>
              </div>
            </div>
          </div>

          <div className="about-action">
            <button onClick={onMeetDoctorsClick} className="btn btn-primary">
              Meet Our Doctors
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
