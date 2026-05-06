import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Immediate Reticle movement
      gsap.to(cursorRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "none"
      });

      // Follower delayed movement
      gsap.to(followerRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const onMouseDown = () => {
      gsap.to(".reticle-center", { scale: 0.7, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to(".reticle-center", { scale: 1, duration: 0.2 });
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const interactives = document.querySelectorAll('button, a, .nav-item, [role="button"]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  useEffect(() => {
    if (isHovering) {
      gsap.to(".reticle-bracket", {
        padding: '2px',
        borderColor: '#3b82f6',
        opacity: 1,
        duration: 0.3
      });
      gsap.to(".reticle-center", {
        scale: 1.5,
        backgroundColor: '#3b82f6',
        duration: 0.3
      });
      gsap.to(followerRef.current, {
        scale: 1.5,
        opacity: 0.1,
        duration: 0.3
      });
    } else {
      gsap.to(".reticle-bracket", {
        padding: '8px',
        borderColor: 'rgba(17, 17, 17, 0.3)',
        opacity: 0.5,
        duration: 0.3
      });
      gsap.to(".reticle-center", {
        scale: 1,
        backgroundColor: '#111',
        duration: 0.3
      });
      gsap.to(followerRef.current, {
        scale: 1,
        opacity: 0.4,
        duration: 0.3
      });
    }
  }, [isHovering]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Primary Reticle */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
      >
        {/* Central Crosshair */}
        <div className="reticle-center w-1 h-1 bg-brand-black rounded-full" />
        
        {/* Corner Brackets */}
        <div className="reticle-bracket absolute w-8 h-8 flex items-center justify-center p-2 transition-all">
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-inherit" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-inherit" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-inherit" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-inherit" />
        </div>
      </div>

      {/* Floating Follower Ring */}
      <div 
        ref={followerRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-brand-black/10 rounded-full opacity-40 mix-blend-difference pointer-events-none"
      >
        {/* Rotating technical marks */}
        <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-brand-black/20" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-brand-black/20" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-brand-black/20" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-brand-black/20" />
        </div>
      </div>
    </div>
  );
};

export default CustomCursor;
