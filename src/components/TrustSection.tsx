import React from 'react';
import { TRUST_POINTS } from '../data/content';
import { Award, ShieldCheck, Star, CalendarClock, Wallet } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award size={28} className="trust-card-icon" />,
  ShieldCheck: <ShieldCheck size={28} className="trust-card-icon" />,
  Star: <Star size={28} className="trust-card-icon" />,
  CalendarClock: <CalendarClock size={28} className="trust-card-icon" />,
  Wallet: <Wallet size={28} className="trust-card-icon" />
};

export const TrustSection: React.FC = () => {
  return (
    <section id="why-us" className="trust-section section-padding">
      <div className="container">
        <div className="text-center mx-auto" style={{ maxWidth: '680px', marginBottom: '3.5rem' }}>
          <span className="section-tag">Why Choose SmileCare?</span>
          <h2 className="section-title">Designed for Your Comfort, Safety & Long-term Health</h2>
          <p className="section-subtitle mx-auto">
            We eliminate dental anxiety by blending compassionate, personalized care with state-of-the-art painless technology.
          </p>
        </div>

        <div className="trust-grid">
          {TRUST_POINTS.map((item) => (
            <div key={item.id} className="trust-card">
              <div className="trust-icon-box">
                {iconMap[item.iconName]}
              </div>
              <h3 className="trust-card-title">{item.title}</h3>
              <p className="trust-card-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
