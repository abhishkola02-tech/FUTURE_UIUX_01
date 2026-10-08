import React from 'react';
import { Calendar, Phone, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface LeadGenCtaProps {
  onBookClick: () => void;
}

export const LeadGenCta: React.FC<LeadGenCtaProps> = ({ onBookClick }) => {
  return (
    <section className="lead-cta-section">
      <div className="container">
        <div className="lead-cta-card">
          <div className="lead-cta-glow"></div>
          
          <div className="lead-cta-content">
            <div className="lead-cta-badge">
              <Sparkles size={16} />
              <span>Priority Consultation Available</span>
            </div>

            <h2 className="lead-cta-title">Ready to Take Care of Your Smile?</h2>
            <p className="lead-cta-desc">
              Book your consultation today and take the first step toward healthier, brighter teeth. Friendly doctors, modern equipment, and transparent pricing.
            </p>

            <div className="lead-cta-features">
              <div className="lead-feat">
                <Clock size={16} />
                <span>Instant Confirmation</span>
              </div>
              <div className="lead-feat">
                <ShieldCheck size={16} />
                <span>Zero Cancellation Fees</span>
              </div>
            </div>

            <div className="lead-cta-actions">
              <button onClick={onBookClick} className="btn btn-primary lead-cta-main-btn">
                <Calendar size={18} />
                <span>Book My Appointment</span>
              </button>
              <a href="tel:+919876543210" className="btn btn-white lead-cta-call-btn">
                <Phone size={18} />
                <span>Call +91 98765 43210</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
