import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface Appointment {
  id: string;
  userId: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  appointments: Appointment[];
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (data: { fullName: string; email: string; phone: string; password: string }) => { success: boolean; error?: string };
  logout: () => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'userId' | 'createdAt' | 'status'>) => Appointment;
  cancelAppointment: (appointmentId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'smilecare_users_db';
const CURRENT_USER_KEY = 'smilecare_current_user';
const APPOINTMENTS_STORAGE_KEY = 'smilecare_appointments';

// Initial default user for seamless testing if needed
const DEFAULT_USERS = [
  {
    id: 'user-demo-1',
    fullName: 'Ramesh Kumar',
    email: 'ramesh@example.com',
    phone: '+91 98765 43210',
    password: 'Password123'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(CURRENT_USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Initialize users store if empty
    if (!localStorage.getItem(USERS_STORAGE_KEY)) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
    }
  }, []);

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);
    const users = rawUsers ? JSON.parse(rawUsers) : DEFAULT_USERS;

    const matched = users.find(
      (u: any) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (matched) {
      const authUser: User = {
        id: matched.id,
        fullName: matched.fullName,
        email: matched.email,
        phone: matched.phone
      };
      setUser(authUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(authUser));
      return { success: true };
    }

    return { success: false, error: 'Invalid email address or password. Please try again.' };
  };

  const register = (data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  }): { success: boolean; error?: string } => {
    const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);
    const users = rawUsers ? JSON.parse(rawUsers) : DEFAULT_USERS;

    const exists = users.some(
      (u: any) => u.email.toLowerCase() === data.email.trim().toLowerCase()
    );

    if (exists) {
      return { success: false, error: 'An account with this email already exists. Please sign in.' };
    }

    const newUser = {
      id: 'user_' + Date.now(),
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      password: data.password
    };

    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    // Account created, ready to log in
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'userId' | 'createdAt' | 'status'>): Appointment => {
    const newAppointment: Appointment = {
      id: 'apt_' + Date.now(),
      userId: user ? user.id : 'guest',
      ...appointmentData,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    const updated = [newAppointment, ...appointments];
    setAppointments(updated);
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
    return newAppointment;
  };

  const cancelAppointment = (appointmentId: string) => {
    const updated = appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: 'Cancelled' as const } : apt
    );
    setAppointments(updated);
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        appointments: user ? appointments.filter(a => a.userId === user.id) : [],
        login,
        register,
        logout,
        addAppointment,
        cancelAppointment
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
