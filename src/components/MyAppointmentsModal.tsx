import React from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, Sparkles, ArrowRight, User } from 'lucide-react';
import { useAuth, type Appointment } from '../context/AuthContext';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNew: () => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
  onBookNew
}) => {
  const { user, appointments, cancelAppointment } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="appointments-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="appointments-modal-header">
          <div>
            <span className="section-tag">Patient Portal</span>
            <h3 className="appointments-modal-title">My Appointments</h3>
            {user && (
              <p className="appointments-user-sub">
                <User size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                Logged in as <strong>{user.fullName}</strong> ({user.email})
              </p>
            )}
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="appointments-modal-body">
          {appointments.length === 0 ? (
            <div className="empty-appointments">
              <div className="empty-calendar-icon">
                <Calendar size={36} color="#0A369D" />
              </div>
              <h4>You don't have any appointments yet.</h4>
              <p>Schedule your routine cleaning, checkup, or consultation in just a few clicks.</p>
              <button
                onClick={() => {
                  onClose();
                  onBookNew();
                }}
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
              >
                <Sparkles size={16} />
                <span>Book an Appointment</span>
              </button>
            </div>
          ) : (
            <div className="appointments-list">
              {appointments.map((apt: Appointment) => (
                <div key={apt.id} className="appointment-card-item">
                  <div className="appointment-item-main">
                    <div className="apt-badge-row">
                      <span className={`apt-status-badge ${apt.status.toLowerCase()}`}>
                        {apt.status === 'Confirmed' && <CheckCircle2 size={13} />}
                        {apt.status === 'Cancelled' && <AlertCircle size={13} />}
                        {apt.status}
                      </span>
                      <span className="apt-id-tag">#{apt.id.slice(-6)}</span>
                    </div>

                    <h4 className="apt-service-title">{apt.service}</h4>
                    {apt.doctor && (
                      <p className="apt-doctor-name">Doctor: <strong>{apt.doctor}</strong></p>
                    )}

                    <div className="apt-datetime-row">
                      <div className="apt-dt-item">
                        <Calendar size={15} color="#00A896" />
                        <span>{apt.date}</span>
                      </div>
                      <div className="apt-dt-item">
                        <Clock size={15} color="#00A896" />
                        <span>{apt.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="appointment-item-actions">
                    {apt.status === 'Confirmed' && (
                      <button
                        onClick={() => cancelAppointment(apt.id)}
                        className="btn btn-sm apt-cancel-btn"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="appointments-modal-footer">
          <button
            onClick={() => {
              onClose();
              onBookNew();
            }}
            className="btn btn-primary"
          >
            <span>Book New Appointment</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
