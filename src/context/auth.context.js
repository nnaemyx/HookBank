import { createContext, useContext } from 'react';
import { useAuthProvider } from '../hooks/useAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const authState = useAuthProvider();

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);