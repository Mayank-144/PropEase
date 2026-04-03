import { useContext } from 'react';
import { AppContext } from './AppContext';

/**
 * Custom hook to access app context
 * Usage: const { user, setUser } = useAppContext();
 */
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider');
  }
  return context;
}

/**
 * Custom hook for authentication logic
 */
export function useAuth() {
  const { user, setUser } = useAppContext();

  const login = (userData) => {
    localStorage.setItem('hv_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('hv_user');
    localStorage.removeItem('hv_props');
    setUser(null);
  };

  const isAdmin = () => user?.role === 'admin';
  const isLoggedIn = () => user !== null;

  return {
    user,
    login,
    logout,
    isAdmin,
    isLoggedIn
  };
}
