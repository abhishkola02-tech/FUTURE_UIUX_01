import React from 'react';
import { Phone, Calendar } from 'lucide-react';

interface MobileStickyCtaProps {
  onBookClick: () => void;
}

export const MobileStickyCta: React.FC<MobileStickyCtaProps> = ({ onBookClick }) => {
  return (
    <aside className="mobile-sticky-cta" aria-label="Quick Actions">
      <div className="mobile-cta-wrapper">
        <a href="tel:+919876543210" className="mobile-cta-btn mobile-call-btn" id="mobile-sticky-call">
          <Phone size={18} />
          <span>Call Now</span>
        </a>
        <button onClick={onBookClick} className="mobile-cta-btn mobile-book-btn" id="mobile-sticky-book">
          <Calendar size={18} />
          <span>Book Appointment</span>
        </button>
      </div>
    </aside>
  );
};
