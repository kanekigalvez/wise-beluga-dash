import { createContext, useState, useEffect, ReactNode, useContext } from "react";

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdminState] = useState<boolean>(() => {
    try {
      const item = window.localStorage.getItem("isAdmin");
      return item ? JSON.parse(item) : false;
    } catch (error) {
      console.error(error);
      return false;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
    } catch (error) {
      console.error(error);
    }
  }, [isAdmin]);

  const setIsAdmin = (value: boolean) => {
    setIsAdminState(value);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};