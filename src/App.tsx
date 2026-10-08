import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { AboutSection } from './components/AboutSection';
import { DoctorsSection } from './components/DoctorsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LeadGenCta } from './components/LeadGenCta';
import { BookingSection } from './components/BookingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileStickyCta } from './components/MobileStickyCta';
import { AuthModal, type AuthMode } from './components/AuthModal';
import { MyAppointmentsModal } from './components/MyAppointmentsModal';

function MainApp() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState('General Dentistry');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  // Auth & Portal Modal States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<AuthMode>('signin');
  const [authPromptMessage, setAuthPromptMessage] = useState<string | undefined>(undefined);
  const [isAppointmentsModalOpen, setIsAppointmentsModalOpen] = useState(false);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBooking = (service?: string, doctor?: string) => {
    if (service) setSelectedService(service);
    if (doctor) setSelectedDoctor(doctor);
    
    // Every customer MUST sign in first before booking an appointment
    if (!user) {
      openSignIn('Please sign in or create an account first to book your appointment.');
      return;
    }

    navigateTo('booking');
  };

  const openSignIn = (prompt?: string) => {
    setAuthModalMode('signin');
    setAuthPromptMessage(prompt);
    setIsAuthModalOpen(true);
  };

  const openRegister = (prompt?: string) => {
    setAuthModalMode('register');
    setAuthPromptMessage(prompt);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="app-layout">
      {/* 1. Header & Navigation */}
      <Navbar
        onBookClick={() => scrollToBooking()}
        currentPage={currentPage}
        onNavigate={(page) => navigateTo(page)}
        onOpenSignIn={() => openSignIn()}
        onOpenAppointments={() => setIsAppointmentsModalOpen(true)}
      />

      <main>
        {/* PAGE 1: HOME */}
        {currentPage === 'home' && (
          <>
            <Hero onBookClick={() => scrollToBooking()} />
            <TrustSection />
            <ServicesSection onSelectService={(service) => scrollToBooking(service)} />
            <HowItWorksSection />
            <AboutSection onMeetDoctorsClick={() => navigateTo('doctors')} />
            <DoctorsSection onBookWithDoctor={(doctor) => scrollToBooking(undefined, doctor)} />
            <TestimonialsSection />
            <LeadGenCta onBookClick={() => scrollToBooking()} />
            <ContactSection />
          </>
        )}

        {/* PAGE 2: SERVICES */}
        {currentPage === 'services' && (
          <div className="page-wrapper">
            <ServicesSection onSelectService={(service) => scrollToBooking(service)} />
            <HowItWorksSection />
            <LeadGenCta onBookClick={() => scrollToBooking()} />
          </div>
        )}

        {/* PAGE 3: ABOUT */}
        {currentPage === 'about' && (
          <div className="page-wrapper">
            <AboutSection onMeetDoctorsClick={() => navigateTo('doctors')} />
            <TrustSection />
            <LeadGenCta onBookClick={() => scrollToBooking()} />
          </div>
        )}

        {/* PAGE 4: DOCTORS */}
        {currentPage === 'doctors' && (
          <div className="page-wrapper">
            <DoctorsSection onBookWithDoctor={(doctor) => scrollToBooking(undefined, doctor)} />
            <TrustSection />
            <LeadGenCta onBookClick={() => scrollToBooking()} />
          </div>
        )}

        {/* PAGE 5: REVIEWS */}
        {currentPage === 'reviews' && (
          <div className="page-wrapper">
            <TestimonialsSection />
            <LeadGenCta onBookClick={() => scrollToBooking()} />
          </div>
        )}

        {/* PAGE 6: CONTACT */}
        {currentPage === 'contact' && (
          <div className="page-wrapper">
            <ContactSection />
            <LeadGenCta onBookClick={() => scrollToBooking()} />
          </div>
        )}

        {/* PAGE 7: BOOK APPOINTMENT (Dedicated Page) */}
        {currentPage === 'booking' && (
          <div className="page-wrapper">
            <BookingSection
              initialService={selectedService}
              initialDoctor={selectedDoctor}
              onBackToHome={() => navigateTo('home')}
              onOpenSignIn={() => openSignIn('Please sign in to complete your appointment booking.')}
              onOpenRegister={() => openRegister('Create an account to book your appointment.')}
            />
          </div>
        )}
      </main>

      {/* 12. Rich Footer */}
      <Footer
        onNavClick={(page) => navigateTo(page)}
        onBookClick={() => scrollToBooking()}
      />

      {/* 13. High-Priority Sticky Mobile CTA Bar */}
      <MobileStickyCta onBookClick={() => scrollToBooking()} />

      {/* 14. Authentication Modal (Sign In / Register / Forgot Password) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        promptMessage={authPromptMessage}
        onClose={() => {
          setIsAuthModalOpen(false);
          setAuthPromptMessage(undefined);
        }}
        onSuccess={() => {
          navigateTo('home');
        }}
      />

      {/* 15. My Appointments Patient Modal */}
      <MyAppointmentsModal
        isOpen={isAppointmentsModalOpen}
        onClose={() => setIsAppointmentsModalOpen(false)}
        onBookNew={() => scrollToBooking()}
      />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
