import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const NeuralNexus: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  
  const coreRef = useRef<THREE.Mesh | null>(null);
  const ringsRef = useRef<THREE.Group>(new THREE.Group());
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 6;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- Components ---

    // 1. Central Core (Icosahedron)
    const coreGeom = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    scene.add(core);
    coreRef.current = core;

    // 2. Gimbal Rings
    const ringGroup = new THREE.Group();
    const ringCount = 3;
    const ringMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.4, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.1, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.2, wireframe: true }),
    ];

    for (let i = 0; i < ringCount; i++) {
      const radius = 2 + i * 0.5;
      const ringGeom = new THREE.TorusGeometry(radius, 0.01, 16, 100);
      const ring = new THREE.Mesh(ringGeom, ringMaterials[i % ringMaterials.length]);
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      ringGroup.add(ring);
    }
    scene.add(ringGroup);
    ringsRef.current = ringGroup;

    // 3. Dynamic Particles
    const particlesGeom = new THREE.BufferGeometry();
    const count = 1500;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 12;
    }
    particlesGeom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.008,
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particlesGeom, particlesMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Animation Loop
    let frame = 0;
    const animate = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
      frame += 0.01;
      requestAnimationFrame(animate);

      if (coreRef.current) {
        coreRef.current.rotation.y += 0.005;
        coreRef.current.rotation.z += 0.002;
        const scale = 1 + Math.sin(frame) * 0.05;
        coreRef.current.scale.set(scale, scale, scale);
      }

      if (ringsRef.current) {
        ringsRef.current.children.forEach((ring, i) => {
          ring.rotation.x += 0.002 * (i + 1);
          ring.rotation.y += 0.003 * (i + 1);
        });
      }

      if (particlesRef.current) {
        particlesRef.current.rotation.y -= 0.001;
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    // GSAP Entrance
    gsap.from(core.scale, { x: 0, y: 0, z: 0, duration: 2, ease: "expo.out" });
    gsap.from(ringGroup.children.map(r => r.scale), { 
      x: 0, y: 0, z: 0, 
      duration: 1.5, 
      stagger: 0.2, 
      ease: "back.out(1.7)" 
    });

    // Mouse Interaction Parallax
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) - 0.5;
      const mouseY = (event.clientY / window.innerHeight) - 0.5;

      if (cameraRef.current) {
        gsap.to(cameraRef.current.position, {
          x: mouseX * 3,
          y: -mouseY * 3,
          duration: 1.2,
          ease: "power2.out"
        });
        cameraRef.current.lookAt(0, 0, 0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full aspect-square max-w-[700px] relative z-10"
      style={{ filter: 'drop-shadow(0 0 50px rgba(59, 130, 246, 0.15))' }}
    />
  );
};

export default NeuralNexus;
