import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="contact-section section-padding">
      <div className="container">
        <div className="text-center mx-auto" style={{ maxWidth: '600px', marginBottom: '3.5rem' }}>
          <span className="section-tag">Find & Visit Us</span>
          <h2 className="section-title">Visit SmileCare Clinic</h2>
          <p className="section-subtitle mx-auto">
            Conveniently located with dedicated patient parking and wheelchair accessibility.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Details Cards */}
          <div className="contact-info-cards">
            {/* Address */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <MapPin size={22} color="#0A369D" />
              </div>
              <div>
                <h3 className="contact-card-title">Clinic Address</h3>
                <p className="contact-card-text">
                  SmileCare Dental Clinic<br />
                  124 Health Care Avenue, Medical Hub Plaza, Suite 302<br />
                  <span className="sample-label">Demo Address (Near City Center Metro)</span>
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm contact-action-btn"
                >
                  <Navigation size={14} />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <Phone size={22} color="#0A369D" />
              </div>
              <div>
                <h3 className="contact-card-title">Contact Lines</h3>
                <p className="contact-card-text">
                  General Inquiries: <a href="tel:+919876543210" className="link-hover"><strong>+91 98765 43210</strong></a><br />
                  Email Support: <a href="mailto:hello@smilecare.example" className="link-hover"><strong>hello@smilecare.example</strong></a>
                </p>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <Clock size={22} color="#0A369D" />
              </div>
              <div>
                <h3 className="contact-card-title">Clinic Opening Hours</h3>
                <ul className="hours-list">
                  <li>
                    <span>Monday – Saturday</span>
                    <span className="hours-val">9:00 AM – 7:00 PM</span>
                  </li>
                  <li>
                    <span>Sunday</span>
                    <span className="hours-closed">Closed (Emergency On-Call)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Map UI & Visual Location Card */}
          <div className="map-container">
            <div className="map-placeholder">
              <div className="map-overlay">
                <div className="map-pin-pulse">
                  <MapPin size={28} color="#FF7A00" />
                </div>
                <div className="map-pin-card">
                  <h4>SmileCare Dental Clinic</h4>
                  <p>124 Health Care Avenue, Medical Hub</p>
                  <span className="status-open">● Open Today until 7:00 PM</span>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm map-directions-btn"
                >
                  <Navigation size={14} /> Open in Google Maps
                </a>
              </div>
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
                alt="Clinic Map & Surroundings"
                className="map-bg-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
