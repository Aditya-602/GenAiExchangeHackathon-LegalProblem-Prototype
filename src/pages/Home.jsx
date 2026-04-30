
import Orb from "../components/Orb";
import { Link } from "react-router-dom";


export const Home = () => {
  return (
    <div className="bg-white">
      {/* Full-screen orb section */}
      <div className="relative w-full h-screen" style={{ width: '100vw', height: '100vh' }}>
        <Orb
          hoverIntensity={0.35}
          rotateOnHover={true}
          hue={300}
          forceHoverState={false}
        />
        {/* Animated heading and button centered on the orb */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <h1 className="text-6xl text-transparent bg-clip-text font-bold bg-gradient-to-r from-black to-red-900 text-glow animate-[fadeInScale_1.2s_ease-out_0.8s_both] mb-8">
            Hello, User
          </h1>
          <p className="text-xl text-gray-700 mb-8 animate-[fadeInUp_1s_ease-out_1.2s_both] opacity-0">
            Simplify legal documents with AI-powered analysis
          </p>
          <Link 
            to="/GetStarted" 
            className="pointer-events-auto bg-white text-black cosmic-button opacity-0 hover:scale-110 transform animate-[fadeInBounce_1s_ease-out_1.6s_both]"
          >
            Get Started
          </Link>
        </div>
        
        {/* Scroll indicator */}
        
        
      </div>
      
      {/* Footer section - appears when scrolling down */}
      {/* <Footer/> */}
    </div>
  );
};

