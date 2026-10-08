import React from 'react';
import { HOW_IT_WORKS } from '../data/content';
import { Calendar, Stethoscope, UserCheck } from 'lucide-react';

const stepIcons = [
  <Stethoscope key="1" size={28} color="#0A369D" />,
  <Calendar key="2" size={28} color="#0A369D" />,
  <UserCheck key="3" size={28} color="#0A369D" />
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="how-it-works-section section-padding">
      <div className="container">
        <div className="text-center mx-auto" style={{ maxWidth: '600px', marginBottom: '3.5rem' }}>
          <span className="section-tag">Simple & Seamless</span>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle mx-auto">
            Booking your dental visit takes less than 60 seconds with our hassle-free process.
          </p>
        </div>

        <div className="steps-container">
          {HOW_IT_WORKS.map((step, idx) => (
            <div key={step.step} className="step-card">
              <div className="step-header">
                <span className="step-number">{step.step}</span>
                <div className="step-icon-bubble">
                  {stepIcons[idx]}
                </div>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
