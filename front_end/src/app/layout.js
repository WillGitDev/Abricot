import { Manrope, Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const manrope = Manrope({
    variable: '--font-manrope',
    subsets: ['latin'],
});

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

export const metadata = {
    title: 'Abricot',
    description: 'Gérer vos tâches sur des projets',
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr" className={`${manrope.variable} ${inter.variable}`}>
            <body>
                {children}

                <Toaster position="top-right" richColors />
            </body>
        </html>
    );
}
