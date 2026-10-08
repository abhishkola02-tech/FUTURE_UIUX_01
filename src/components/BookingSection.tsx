import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, ShieldAlert, ArrowLeft, Lock } from 'lucide-react';
import { SERVICES, DOCTORS } from '../data/content';
import { useAuth } from '../context/AuthContext';

interface BookingSectionProps {
  initialService?: string;
  initialDoctor?: string;
  onBackToHome: () => void;
  onOpenSignIn: () => void;
  onOpenRegister: () => void;
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  service?: string;
  date?: string;
  time?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  initialService = 'General Dentistry',
  initialDoctor = '',
  onBackToHome,
  onOpenSignIn,
  onOpenRegister
}) => {
  const { user, addAppointment } = useAuth();

  const [formData, setFormData] = useState<FormState>({
    fullName: user ? user.fullName : '',
    phone: user ? user.phone : '',
    email: user ? user.email : '',
    service: initialService,
    doctor: initialDoctor,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '10:00 AM',
    message: ''
  });

  // Keep form data synced with logged in user
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || user.fullName,
        phone: prev.phone || user.phone,
        email: prev.email || user.email
      }));
    }
  }, [user]);

  // Keep service/doctor in sync with external clicks
  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialDoctor) {
      setFormData(prev => ({ ...prev, doctor: initialDoctor }));
    }
  }, [initialDoctor]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedData, setConfirmedData] = useState<FormState | null>(null);

  const timeSlots = [
    '09:30 AM', '10:30 AM', '11:30 AM',
    '02:00 PM', '03:30 PM', '04:30 PM', '06:00 PM'
  ];

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required for SMS confirmation';
    } else if (!/^[0-9+ -]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required for appointment receipt';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a dental service';
    }

    if (!formData.date) {
      newErrors.date = 'Please pick a preferred appointment date';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a preferred time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setTimeout(() => {
        // Save appointment to user profile
        addAppointment({
          service: formData.service,
          doctor: formData.doctor || 'Assigned Specialist',
          date: formData.date,
          time: formData.time
        });

        setIsSubmitting(false);
        setIsSubmitted(true);
        setConfirmedData({ ...formData });
      }, 700);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted && confirmedData) {
    return (
      <section id="booking-confirmation" className="booking-section section-padding">
        <div className="container">
          <div className="confirmation-card">
            <div className="success-icon-wrap">
              <CheckCircle2 size={56} className="success-check-icon" />
            </div>

            <span className="badge badge-secondary" style={{ marginBottom: '0.75rem' }}>
              Booking Confirmed
            </span>

            <h2 className="confirmation-title">Appointment Request Received!</h2>
            <p className="confirmation-desc">
              Thank you, <strong>{confirmedData.fullName}</strong>. Our clinic team has received your appointment request and will contact you via phone/SMS within 15 minutes to finalize the schedule.
            </p>

            <div className="booking-summary-box">
              <div className="summary-row">
                <span className="summary-label">Selected Service:</span>
                <span className="summary-value">{confirmedData.service}</span>
              </div>
              {confirmedData.doctor && (
                <div className="summary-row">
                  <span className="summary-label">Preferred Doctor:</span>
                  <span className="summary-value">{confirmedData.doctor}</span>
                </div>
              )}
              <div className="summary-row">
                <span className="summary-label">Date & Time:</span>
                <span className="summary-value">{confirmedData.date} at {confirmedData.time}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Contact Phone:</span>
                <span className="summary-value">{confirmedData.phone}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Clinic Location:</span>
                <span className="summary-value">SmileCare Dental Clinic, 124 Medical Hub</span>
              </div>
            </div>

            <div className="confirmation-actions">
              <button onClick={onBackToHome} className="btn btn-primary">
                <ArrowLeft size={16} />
                <span>Back to Home</span>
              </button>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    fullName: user ? user.fullName : '',
                    phone: user ? user.phone : '',
                    email: user ? user.email : '',
                    service: 'General Dentistry',
                    doctor: '',
                    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                    time: '10:00 AM',
                    message: ''
                  });
                }}
                className="btn btn-outline"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="book-appointment" className="booking-section section-padding">
      <div className="container">
        <div className="booking-wrapper">
          {/* Left Column: Form Guidelines & Clinic Guarantees */}
          <div className="booking-info-sidebar">
            <span className="section-tag">Direct Scheduling</span>
            <h2 className="booking-sidebar-title">Book Your Appointment</h2>
            <p className="booking-sidebar-desc">
              Schedule your consultation with zero friction. Same-day emergency appointments and flexible family hours available.
            </p>

            <div className="sidebar-perks">
              <div className="perk-item">
                <div className="perk-icon"><CheckCircle2 size={18} color="#00A896" /></div>
                <div>
                  <strong>No Upfront Prepayment</strong>
                  <p>Pay only at the clinic after your consultation.</p>
                </div>
              </div>

              <div className="perk-item">
                <div className="perk-icon"><CheckCircle2 size={18} color="#00A896" /></div>
                <div>
                  <strong>Fast & Gentle Care</strong>
                  <p>Minimal waiting room time with scheduled slots.</p>
                </div>
              </div>

              <div className="perk-item">
                <div className="perk-icon"><CheckCircle2 size={18} color="#00A896" /></div>
                <div>
                  <strong>Emergency Support</strong>
                  <p>Urgent tooth pain? Call directly for immediate intake.</p>
                </div>
              </div>
            </div>

            <div className="emergency-callout">
              <ShieldAlert size={22} className="alert-icon" />
              <div>
                <strong>Need Immediate Assistance?</strong>
                <p>Call our 24/7 dental helpline directly:</p>
                <a href="tel:+919876543210" className="callout-phone">+91 98765 43210</a>
              </div>
            </div>
          </div>

          {/* Right Column: Appointment Form (Protected by Authentication) */}
          <div className="booking-form-card">
            {!user ? (
              <div className="booking-auth-protect-card">
                <div className="auth-lock-icon">
                  <Lock size={32} color="#0A369D" />
                </div>
                <h3 className="auth-protect-title">Please sign in or create an account to book an appointment.</h3>
                <p className="auth-protect-desc">
                  Having an account ensures your dental appointments are securely stored, easy to manage, and synced with SMS & email reminders.
                </p>
                <div className="auth-protect-actions">
                  <button
                    onClick={onOpenSignIn}
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={onOpenRegister}
                    className="btn btn-outline"
                    style={{ flex: 1 }}
                  >
                    Create Account
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-grid">
                  {/* Full Name */}
                  <div className="form-group">
                    <label htmlFor="fullName" className="form-label">
                      Full Name <span className="req">*</span>
                    </label>
                    <div className="input-with-icon">
                      <User size={18} className="input-icon" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Ramesh Kumar"
                        className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                      />
                    </div>
                    {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                  </div>

                  {/* Phone Number */}
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone Number <span className="req">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Phone size={18} className="input-icon" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className={`form-input ${errors.phone ? 'has-error' : ''}`}
                      />
                    </div>
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address <span className="req">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Mail size={18} className="input-icon" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ramesh@example.com"
                        className={`form-input ${errors.email ? 'has-error' : ''}`}
                      />
                    </div>
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>

                  {/* Select Service */}
                  <div className="form-group">
                    <label htmlFor="service" className="form-label">
                      Select Service <span className="req">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`form-input form-select ${errors.service ? 'has-error' : ''}`}
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                    {errors.service && <span className="form-error">{errors.service}</span>}
                  </div>

                  {/* Preferred Doctor (Optional) */}
                  <div className="form-group">
                    <label htmlFor="doctor" className="form-label">
                      Preferred Doctor (Optional)
                    </label>
                    <select
                      id="doctor"
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleChange}
                      className="form-input form-select"
                    >
                      <option value="">Any Available Specialist</option>
                      {DOCTORS.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name} ({d.role})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div className="form-group">
                    <label htmlFor="date" className="form-label">
                      Preferred Date <span className="req">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Calendar size={18} className="input-icon" />
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={handleChange}
                        className={`form-input ${errors.date ? 'has-error' : ''}`}
                      />
                    </div>
                    {errors.date && <span className="form-error">{errors.date}</span>}
                  </div>
                </div>

                {/* Preferred Time Slot */}
                <div className="form-group" style={{ marginTop: '0.5rem' }}>
                  <label className="form-label">
                    Preferred Time Slot <span className="req">*</span>
                  </label>
                  <div className="time-slot-grid">
                    {timeSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, time: slot }));
                          if (errors.time) setErrors((prev) => ({ ...prev, time: undefined }));
                        }}
                        className={`time-slot-btn ${formData.time === slot ? 'selected' : ''}`}
                      >
                        <Clock size={14} />
                        <span>{slot}</span>
                      </button>
                    ))}
                  </div>
                  {errors.time && <span className="form-error">{errors.time}</span>}
                </div>

                {/* Additional Message */}
                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label htmlFor="message" className="form-label">
                    Additional Message or Symptoms (Optional)
                  </label>
                  <div className="input-with-icon textarea-wrap">
                    <FileText size={18} className="input-icon textarea-icon" />
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Briefly describe any tooth pain, sensitivity, or questions you have..."
                      className="form-input form-textarea"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary booking-submit-btn"
                  disabled={isSubmitting}
                  id="submit-booking-btn"
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Appointment'}
                </button>

                <p className="privacy-guarantee">
                  🔒 Your medical information is strictly confidential. We will never share your contact details.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
