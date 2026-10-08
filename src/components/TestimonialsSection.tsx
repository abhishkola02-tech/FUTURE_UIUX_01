import React from 'react';
import { TESTIMONIALS } from '../data/content';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="testimonials-section section-padding">
      <div className="container">
        <div className="text-center mx-auto" style={{ maxWidth: '640px', marginBottom: '3.5rem' }}>
          <span className="section-tag">Patient Experiences</span>
          <h2 className="section-title">What Our Patients Say</h2>
          <p className="section-subtitle mx-auto">
            Real stories and reviews from local families who trust SmileCare Dental Clinic for their smiles.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((review) => (
            <div key={review.id} className="testimonial-card">
              <div className="testimonial-top">
                <div className="testimonial-stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <Quote size={28} className="quote-icon" />
              </div>

              <p className="testimonial-comment">"{review.comment}"</p>

              <div className="testimonial-author">
                <div className="author-avatar">{review.avatarText}</div>
                <div className="author-meta">
                  <strong className="author-name">{review.name}</strong>
                  <div className="author-tag">
                    <span className="treatment-badge">{review.treatment}</span>
                    {review.verified && (
                      <span className="verified-badge">
                        <CheckCircle size={12} /> Verified Patient
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate Social Proof Banner */}
        <div className="aggregate-review-banner">
          <div className="banner-stat">
            <span className="banner-num">5,000+</span>
            <span className="banner-lbl">Smiles Restored</span>
          </div>
          <div className="banner-divider"></div>
          <div className="banner-stat">
            <span className="banner-num">4.9 / 5.0</span>
            <span className="banner-lbl">Average Google Rating</span>
          </div>
          <div className="banner-divider"></div>
          <div className="banner-stat">
            <span className="banner-num">99.4%</span>
            <span className="banner-lbl">Patient Satisfaction Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
};
