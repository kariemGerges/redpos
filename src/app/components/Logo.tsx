import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['700'] });

const Logo: React.FC<{ size?: string, colorN?: string, colorP?: string }> = ({ size, colorN, colorP}) => {
    return (
        <div className="flex items-center justify-center">
            <p className={`${size} ${colorN} font-bold`}>Next</p>
            <p className={`${size} ${colorP} ${poppins.className} font-bold`}>
                POS
            </p>
        </div>
    );
};

export default Logo;