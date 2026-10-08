import React, { useState } from 'react';
import { SERVICES, type Service } from '../data/content';
import { Stethoscope, Sparkles, Smile, Shield, CheckCircle2, AlertCircle, ArrowRight, X, Calendar } from 'lucide-react';

const serviceIcons: Record<string, React.ReactNode> = {
  Stethoscope: <Stethoscope size={26} />,
  Sparkles: <Sparkles size={26} />,
  Smile: <Smile size={26} />,
  Shield: <Shield size={26} />,
  CheckCircle2: <CheckCircle2 size={26} />,
  AlertCircle: <AlertCircle size={26} />
};

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [selectedModalService, setSelectedModalService] = useState<Service | null>(null);

  return (
    <section id="services" className="services-section section-padding">
      <div className="container">
        <div className="services-header-row">
          <div>
            <span className="section-tag">Comprehensive Care</span>
            <h2 className="section-title">Our Dental Services</h2>
            <p className="section-subtitle">
              From routine maintenance to smile redesigns, we provide gentle and comprehensive oral health solutions.
            </p>
          </div>
          <button
            onClick={() => onSelectService('General Dentistry')}
            className="btn btn-outline services-top-cta"
          >
            <span>View All Services</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="services-grid">
          {SERVICES.map((service) => (
            <div key={service.id} className={`service-card ${service.popular ? 'featured' : ''}`}>
              {service.popular && <span className="service-popular-badge">Popular Choice</span>}
              
              <div className="service-img-wrap">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-card-img"
                  loading="lazy"
                />
                <div className="service-icon-overlay">
                  {serviceIcons[service.iconName]}
                </div>
              </div>

              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              
              <div className="service-card-actions">
                <button
                  onClick={() => setSelectedModalService(service)}
                  className="service-learn-more"
                >
                  Learn More
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => onSelectService(service.title)}
                  className="btn btn-secondary service-book-quick"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Service Details */}
        {selectedModalService && (
          <div className="modal-backdrop" onClick={() => setSelectedModalService(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setSelectedModalService(null)}
                aria-label="Close details"
              >
                <X size={20} />
              </button>
              
              <div className="modal-header">
                <div className="service-icon-wrap modal-icon">
                  {serviceIcons[selectedModalService.iconName]}
                </div>
                <div>
                  <h3 className="modal-title">{selectedModalService.title}</h3>
                  <p className="modal-subtitle">{selectedModalService.description}</p>
                </div>
              </div>

              <div className="modal-body">
                <h4>What does this procedure involve?</h4>
                <p>{selectedModalService.details}</p>
                
                <div className="modal-benefits">
                  <div className="modal-benefit-item">
                    <CheckCircle2 size={16} color="#00A896" />
                    <span>Painless, computer-guided treatment</span>
                  </div>
                  <div className="modal-benefit-item">
                    <CheckCircle2 size={16} color="#00A896" />
                    <span>Zero hidden costs with upfront price quote</span>
                  </div>
                  <div className="modal-benefit-item">
                    <CheckCircle2 size={16} color="#00A896" />
                    <span>Follow-up checkup included at no cost</span>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-outline"
                  onClick={() => setSelectedModalService(null)}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    const title = selectedModalService.title;
                    setSelectedModalService(null);
                    onSelectService(title);
                  }}
                >
                  <Calendar size={16} />
                  <span>Book for {selectedModalService.title}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
