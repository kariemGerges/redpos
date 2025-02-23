'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface LoginModalContextType {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

const LoginModalContext = createContext<LoginModalContextType | null>(null);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <LoginModalContext.Provider value={{ isOpen, open, close }}>
            {children}
        </LoginModalContext.Provider>
    );
};

export const useLoginModal = () => {
    const context = useContext(LoginModalContext);
    if (!context) {
        throw new Error('useLoginModal must be used within a LoginProvider');
    }
    return context;
};
