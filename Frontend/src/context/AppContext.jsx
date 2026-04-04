import { createContext, useState, useCallback } from 'react';

/**
 * Global Application Context
 * Manages: User authentication, selected property, selected service, current page
 */

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('hv_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [page, setPage] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const handleLogin = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('hv_user', JSON.stringify(userData));
    setPage(userData.role === 'admin' ? 'admin' : 'home');
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setPage('home');
    localStorage.removeItem('hv_user');
    localStorage.removeItem('hv_token');
  }, []);

  const handlePropertyClick = useCallback((property) => {
    setSelectedProperty(property);
    setPage('property');
    window.scrollTo(0, 0);
  }, []);

  const handleServiceClick = useCallback((service) => {
    setSelectedService(service);
    setPage('service');
    window.scrollTo(0, 0);
  }, []);

  const value = {
    // State
    user,
    page,
    selectedProperty,
    selectedService,

    // Setters
    setUser,
    setPage,
    setSelectedProperty,
    setSelectedService,

    // Actions
    handleLogin,
    handleLogout,
    handlePropertyClick,
    handleServiceClick
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
