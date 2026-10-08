import React, { useState } from 'react';
import { Mail, Lock, User, Phone, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export type AuthMode = 'signin' | 'register' | 'forgot';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: AuthMode;
  onClose: () => void;
  onSuccess?: () => void;
  promptMessage?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'signin',
  onClose,
  onSuccess,
  promptMessage
}) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  
  // Register Form State
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Validation / Feedback
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Reset when opening
  React.useEffect(() => {
    setMode(initialMode);
    setErrors({});
    setServerError(null);
    setSuccessMsg(null);
    setForgotSubmitted(false);
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const validateSignIn = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!signInEmail.trim()) {
      newErrors.signInEmail = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInEmail.trim())) {
      newErrors.signInEmail = 'Please enter a valid email address';
    }

    if (!signInPassword) {
      newErrors.signInPassword = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!regFullName.trim()) {
      newErrors.regFullName = 'Full name is required';
    } else if (regFullName.trim().length < 3) {
      newErrors.regFullName = 'Name must be at least 3 characters';
    }

    if (!regEmail.trim()) {
      newErrors.regEmail = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail.trim())) {
      newErrors.regEmail = 'Please enter a valid email address';
    }

    if (!regPhone.trim()) {
      newErrors.regPhone = 'Phone number is required';
    } else if (!/^[0-9+ -]{8,15}$/.test(regPhone.trim())) {
      newErrors.regPhone = 'Please enter a valid phone number';
    }

    if (!regPassword) {
      newErrors.regPassword = 'Password is required';
    } else if (regPassword.length < 6) {
      newErrors.regPassword = 'Password must be at least 6 characters';
    }

    if (!regConfirmPassword) {
      newErrors.regConfirmPassword = 'Confirm password is required';
    } else if (regPassword !== regConfirmPassword) {
      newErrors.regConfirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validateSignIn()) return;

    setIsLoading(true);
    setTimeout(() => {
      const res = login(signInEmail, signInPassword);
      setIsLoading(false);
      if (res.success) {
        setSuccessMsg('Signed in successfully!');
        setTimeout(() => {
          onClose();
          if (onSuccess) onSuccess();
        }, 500);
      } else {
        setServerError(res.error || 'Failed to sign in.');
      }
    }, 400);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validateRegister()) return;

    setIsLoading(true);
    setTimeout(() => {
      const registeredEmail = regEmail;
      const res = register({
        fullName: regFullName,
        email: regEmail,
        phone: regPhone,
        password: regPassword
      });
      setIsLoading(false);
      if (res.success) {
        // Switch to sign in view, pre-fill email, and prompt user to login
        setSignInEmail(registeredEmail);
        setSignInPassword('');
        setMode('signin');
        setSuccessMsg('Account created successfully! Please sign in with your password to continue.');
        setErrors({});
        // Clear registration form
        setRegFullName('');
        setRegEmail('');
        setRegPhone('');
        setRegPassword('');
        setRegConfirmPassword('');
      } else {
        setServerError(res.error || 'Failed to create account.');
      }
    }, 400);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail.trim())) {
      setErrors({ forgotEmail: 'Please enter a valid registered email address' });
      return;
    }
    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setForgotSubmitted(true);
    }, 400);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {/* Only show prompt message when there is no success message */}
        {promptMessage && !successMsg && (
          <div className="auth-prompt-notice">
            <AlertCircle size={18} />
            <span>{promptMessage}</span>
          </div>
        )}

        {serverError && (
          <div className="auth-error-banner">
            <AlertCircle size={18} />
            <span>{serverError}</span>
          </div>
        )}

        {successMsg && (
          <div className="auth-success-banner">
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* 1. SIGN IN MODE */}
        {mode === 'signin' && (
          <div className="auth-form-body">
            <div className="auth-header">
              <span className="section-tag">Welcome Back</span>
              <h3 className="auth-title">Sign In to SmileCare</h3>
              <p className="auth-subtitle">Access your appointments, medical history, and profile.</p>
            </div>

            <form onSubmit={handleSignInSubmit} noValidate>
              <div className="form-group" style={{ marginBottom: '1.15rem' }}>
                <label className="form-label" htmlFor="signInEmail">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    id="signInEmail"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="e.g. yourname@example.com"
                    className={`form-input ${errors.signInEmail ? 'has-error' : ''}`}
                  />
                </div>
                {errors.signInEmail && <span className="form-error">{errors.signInEmail}</span>}
              </div>

              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="form-label" htmlFor="signInPassword">Password</label>
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setServerError(null); setErrors({}); }}
                    className="auth-link-btn"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input
                    type="password"
                    id="signInPassword"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`form-input ${errors.signInPassword ? 'has-error' : ''}`}
                  />
                </div>
                {errors.signInPassword && <span className="form-error">{errors.signInPassword}</span>}
              </div>

              <button
                type="submit"
                className="btn btn-primary auth-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>

              <div className="auth-footer-switch">
                <span>Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => { setMode('register'); setServerError(null); setErrors({}); }}
                  className="auth-switch-highlight"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 2. REGISTER MODE */}
        {mode === 'register' && (
          <div className="auth-form-body">
            <div className="auth-header">
              <span className="section-tag">New Patient</span>
              <h3 className="auth-title">Create Account</h3>
              <p className="auth-subtitle">Join SmileCare for fast booking, appointment reminders, and records.</p>
            </div>

            <form onSubmit={handleRegisterSubmit} noValidate>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label" htmlFor="regFullName">Full Name</label>
                <div className="input-with-icon">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    id="regFullName"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className={`form-input ${errors.regFullName ? 'has-error' : ''}`}
                  />
                </div>
                {errors.regFullName && <span className="form-error">{errors.regFullName}</span>}
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label" htmlFor="regEmail">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    id="regEmail"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="e.g. ramesh@example.com"
                    className={`form-input ${errors.regEmail ? 'has-error' : ''}`}
                  />
                </div>
                {errors.regEmail && <span className="form-error">{errors.regEmail}</span>}
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label" htmlFor="regPhone">Phone Number</label>
                <div className="input-with-icon">
                  <Phone size={18} className="input-icon" />
                  <input
                    type="tel"
                    id="regPhone"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`form-input ${errors.regPhone ? 'has-error' : ''}`}
                  />
                </div>
                {errors.regPhone && <span className="form-error">{errors.regPhone}</span>}
              </div>

              <div className="form-grid" style={{ marginBottom: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="regPassword">Password</label>
                  <div className="input-with-icon">
                    <Lock size={18} className="input-icon" />
                    <input
                      type="password"
                      id="regPassword"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 chars"
                      className={`form-input ${errors.regPassword ? 'has-error' : ''}`}
                    />
                  </div>
                  {errors.regPassword && <span className="form-error">{errors.regPassword}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="regConfirmPassword">Confirm Password</label>
                  <div className="input-with-icon">
                    <Lock size={18} className="input-icon" />
                    <input
                      type="password"
                      id="regConfirmPassword"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className={`form-input ${errors.regConfirmPassword ? 'has-error' : ''}`}
                    />
                  </div>
                  {errors.regConfirmPassword && <span className="form-error">{errors.regConfirmPassword}</span>}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary auth-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>

              <div className="auth-footer-switch">
                <span>Already have an account? </span>
                <button
                  type="button"
                  onClick={() => { setMode('signin'); setServerError(null); setErrors({}); }}
                  className="auth-switch-highlight"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 3. FORGOT PASSWORD MODE */}
        {mode === 'forgot' && (
          <div className="auth-form-body">
            <div className="auth-header">
              <span className="section-tag">Account Recovery</span>
              <h3 className="auth-title">Reset Password</h3>
              <p className="auth-subtitle">Enter your registered email and we'll send you reset instructions.</p>
            </div>

            {forgotSubmitted ? (
              <div className="auth-forgot-success">
                <CheckCircle2 size={44} color="#00A896" style={{ margin: '0 auto 1rem auto' }} />
                <h4>Reset Link Sent!</h4>
                <p>We've sent a password reset link to <strong>{forgotEmail}</strong>. Please check your inbox.</p>
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '1.25rem' }}
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} noValidate>
                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label" htmlFor="forgotEmail">Email Address</label>
                  <div className="input-with-icon">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      id="forgotEmail"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="e.g. yourname@example.com"
                      className={`form-input ${errors.forgotEmail ? 'has-error' : ''}`}
                    />
                  </div>
                  {errors.forgotEmail && <span className="form-error">{errors.forgotEmail}</span>}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary auth-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>

                <div className="auth-footer-switch">
                  <button
                    type="button"
                    onClick={() => { setMode('signin'); setServerError(null); setErrors({}); }}
                    className="auth-link-btn"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
