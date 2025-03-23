'use client';
import React from 'react';
import {
    // Poppins, Bungee_Hairline,
    Rubik_Glitch
} from 'next/font/google';

// const poppins = Poppins({ subsets: ['latin'], weight: ['700'] });
// const bungee = Bungee_Hairline({ subsets: ['latin'], weight: ['400'] });
const rubik = Rubik_Glitch({ subsets: ['latin'], weight: ['400'] });

const Logo: React.FC<{ size?: string, colorN?: string, colorP?: string }> = ({ size, colorN, colorP}) => {
    return (
        <div className="flex items-center justify-center">
            <p className={`${size} ${colorN} ${rubik.className} font-bold`}>
                Next
            </p>
            <p className={`${size} ${colorP} ${rubik.className} font-bold`}>
                POS
            </p>
        </div>
    );
};

export default Logo;