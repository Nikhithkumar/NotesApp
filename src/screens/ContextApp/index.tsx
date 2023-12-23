import React from 'react'
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
    user: null,
    login: (userData: any) => {},
    logout: () => {},
})

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState(null);

    const login = (userData: any) => {
        setUser(userData)
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
