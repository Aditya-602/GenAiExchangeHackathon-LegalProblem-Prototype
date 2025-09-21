import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box } from 'lucide-react';

export const Navbar = () => {
    const location = useLocation();

    // Hide navbar on NotFound page
    if (location.pathname === '/notfound') {
        return null;
    }

    return (
        <nav className="fixed top-0 text-2xl left-0 right-0 bg-transparent z-50 flex pointer-events-auto text-black justify-between items-center px-8 py-4 animate-[slideDown_0.8s_ease-out]">
            {/* Logo/Icon on the left */}
            <div className="animate-[fadeInUp_1s_ease-out_0.1s_both] flex items-center gap-3">
                <Box className="w-8 h-8 text-black" />
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-black text-glow">Lexify</span>
            </div>
            
            {/* Navigation links centered */}
            <ul className="flex gap-8 list-none m-0 p-0">
                <li className="animate-[fadeInUp_1s_ease-out_0.2s_both]">
                    <Link to="/" className="px-4 py-2 rounded-full bg-transparent hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:scale-105 transition-all duration-300 font-medium transform">
                        Home
                    </Link>
                </li>
                <li className="animate-[fadeInUp_1s_ease-out_0.4s_both]">
                    <Link to="/Chat" className="px-4 py-2 rounded-full bg-transparent hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:scale-105 transition-all duration-300 font-medium transform">
                        Ez-AI
                    </Link>
                </li>
                <li className="animate-[fadeInUp_1s_ease-out_0.6s_both]">
                    <Link to="/Chat" className="px-4 py-2 rounded-full bg-transparent hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:scale-105 transition-all duration-300 font-medium transform">
                        About us
                    </Link>
                </li>
            
            </ul>
        </nav>
    );
};

