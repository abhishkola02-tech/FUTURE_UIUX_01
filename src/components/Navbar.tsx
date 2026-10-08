import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Phone, Menu, X, Sparkles, User, ChevronDown, LogOut, CalendarCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onBookClick: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenSignIn: () => void;
  onOpenAppointments: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onBookClick,
  currentPage,
  onNavigate,
  onOpenSignIn,
  onOpenAppointments
}) => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Doctors', id: 'doctors' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, pageId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getFirstName = (fullName: string) => {
    return fullName.trim().split(' ')[0] || fullName;
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Brand Logo */}
        <a href="#home" className="logo-brand">
          <div className="logo-icon-wrapper">
            <Sparkles className="logo-icon" size={22} />
          </div>
          <span className="logo-text">Smile<span>Care</span></span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className={`nav-link ${currentPage === link.id ? 'active' : ''}`}
            >
              {link.label}
            </a>
          ))}

          {/* Sign In / User Profile Item in Navbar */}
          {!user ? (
            <button
              onClick={onOpenSignIn}
              className="nav-link nav-signin-btn"
              id="nav-signin-btn"
            >
              <User size={16} />
              <span>Sign In</span>
            </button>
          ) : (
            <div className="nav-profile-container" ref={profileMenuRef}>
              <button
                className="nav-profile-trigger"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                aria-expanded={isProfileMenuOpen}
              >
                <div className="nav-user-avatar">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <span>Hi, {getFirstName(user.fullName)}</span>
                <ChevronDown size={15} className={`chevron-icon ${isProfileMenuOpen ? 'open' : ''}`} />
              </button>

              {isProfileMenuOpen && (
                <div className="nav-profile-dropdown">
                  <div className="dropdown-user-info">
                    <strong>{user.fullName}</strong>
                    <span>{user.email}</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onOpenAppointments();
                    }}
                    className="dropdown-item"
                  >
                    <CalendarCheck size={16} color="#0A369D" />
                    <span>My Appointments</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      logout();
                    }}
                    className="dropdown-item text-danger"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Desktop CTAs */}
        <div className="nav-actions">
          <button onClick={onBookClick} className="btn btn-primary nav-book-btn">
            <Calendar size={16} />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-list">
          {user && (
            <div className="mobile-user-greeting">
              <div className="nav-user-avatar">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <div>
                <strong>Hi, {user.fullName}</strong>
                <span>{user.email}</span>
              </div>
            </div>
          )}

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className={`mobile-nav-link ${currentPage === link.id ? 'active' : ''}`}
            >
              {link.label}
            </a>
          ))}

          {user ? (
            <>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAppointments();
                }}
                className="mobile-nav-link text-left"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}
              >
                <CalendarCheck size={18} />
                <span>My Appointments</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                }}
                className="mobile-nav-link text-left"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)' }}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSignIn();
              }}
              className="mobile-nav-link text-left"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}
            >
              <User size={18} />
              <span>Sign In / Register</span>
            </button>
          )}

          <div className="mobile-menu-cta">
            <a href="tel:+919876543210" className="btn btn-outline" style={{ width: '100%', marginBottom: '0.75rem' }}>
              <Phone size={16} /> Call Us: +91 98765 43210
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookClick();
              }}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              <Calendar size={16} /> Book Appointment
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
