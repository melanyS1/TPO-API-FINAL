import { createContext, useContext, useState, useCallback } from 'react';

const RefreshContext = createContext();

export function RefreshProvider({ children }) {
  const [productsVersion, setProductsVersion] = useState(0);
  const bumpProductsVersion = useCallback(() => {
    setProductsVersion(v => v + 1);
  }, []);

  return (
    <RefreshContext.Provider value={{ productsVersion, bumpProductsVersion }}>
      {children}
    </RefreshContext.Provider>
  );
}

export function useRefresh() {
  const ctx = useContext(RefreshContext);
  if (!ctx) throw new Error('useRefresh must be used within a RefreshProvider');
  return ctx;
}
