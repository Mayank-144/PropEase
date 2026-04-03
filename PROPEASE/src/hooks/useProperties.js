import { useState, useCallback } from 'react';
import { getStoredProps, saveProps } from '../utils/storage';

/**
 * Custom hook for managing properties
 */
export function useProperties() {
  const [properties, setProperties] = useState(getStoredProps());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllProperties = useCallback(() => {
    return properties;
  }, [properties]);

  const getPropertyById = useCallback((id) => {
    return properties.find(p => p.id === parseInt(id));
  }, [properties]);

  const searchProperties = useCallback((criteria) => {
    return properties.filter(p => {
      if (criteria.location && !p.location.toLowerCase().includes(criteria.location.toLowerCase())) {
        return false;
      }
      if (criteria.type && p.type !== criteria.type) {
        return false;
      }
      if (criteria.minPrice && p.price < criteria.minPrice) {
        return false;
      }
      if (criteria.maxPrice && p.price > criteria.maxPrice) {
        return false;
      }
      if (criteria.bedrooms && p.bedrooms < criteria.bedrooms) {
        return false;
      }
      return true;
    });
  }, [properties]);

  const addProperty = useCallback((property) => {
    try {
      setLoading(true);
      const newProperty = {
        ...property,
        id: Math.max(...properties.map(p => p.id || 0)) + 1
      };
      const updated = [...properties, newProperty];
      setProperties(updated);
      saveProps(updated);
      setError(null);
      return newProperty;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [properties]);

  const updateProperty = useCallback((id, updates) => {
    try {
      setLoading(true);
      const updated = properties.map(p =>
        p.id === parseInt(id) ? { ...p, ...updates } : p
      );
      setProperties(updated);
      saveProps(updated);
      setError(null);
      return updated.find(p => p.id === parseInt(id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [properties]);

  const deleteProperty = useCallback((id) => {
    try {
      setLoading(true);
      const updated = properties.filter(p => p.id !== parseInt(id));
      setProperties(updated);
      saveProps(updated);
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [properties]);

  return {
    properties,
    loading,
    error,
    getAllProperties,
    getPropertyById,
    searchProperties,
    addProperty,
    updateProperty,
    deleteProperty
  };
}
