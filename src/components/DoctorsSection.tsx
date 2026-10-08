import React from 'react';
import { DOCTORS } from '../data/content';
import { Calendar, CheckCircle2, Award } from 'lucide-react';

interface DoctorsSectionProps {
  onBookWithDoctor: (doctorName: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onBookWithDoctor }) => {
  return (
    <section id="doctors" className="doctors-section section-padding">
      <div className="container">
        <div className="text-center mx-auto" style={{ maxWidth: '640px', marginBottom: '3.5rem' }}>
          <span className="section-tag">Expert Medical Team</span>
          <h2 className="section-title">Meet Our Experienced Doctors</h2>
          <p className="section-subtitle mx-auto">
            Our certified specialists combine clinical precision with a gentle touch to give you the highest standard of dental care.
          </p>
          <div className="demo-disclaimer-badge">
            <Award size={14} />
            <span>Sample Demo Profiles • Verified Clinical Standards</span>
          </div>
        </div>

        <div className="doctors-grid">
          {DOCTORS.map((doc) => (
            <div key={doc.id} className="doctor-card">
              <div className="doctor-image-container">
                <img src={doc.image} alt={`Photo of ${doc.name}`} className="doctor-img" loading="lazy" />
                <div className="doctor-exp-badge">
                  <span>{doc.experience}</span>
                </div>
              </div>

              <div className="doctor-info">
                <h3 className="doctor-name">{doc.name}</h3>
                <p className="doctor-role">{doc.role}</p>
                <p className="doctor-bio">{doc.bio}</p>

                <div className="doctor-credentials">
                  {doc.credentials.map((cred, i) => (
                    <div key={i} className="doctor-cred-item">
                      <CheckCircle2 size={14} color="#00A896" className="cred-icon" />
                      <span>{cred}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onBookWithDoctor(doc.name)}
                  className="btn btn-outline doctor-book-btn"
                >
                  <Calendar size={16} />
                  <span>Book with {doc.name.split(' ')[1]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
