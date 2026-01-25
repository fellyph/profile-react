import { useEffect, useRef, useCallback, useState } from 'react';
import * as THREE from 'three';

interface KeyState {
  ArrowUp: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
  KeyW: boolean;
  KeyS: boolean;
  KeyA: boolean;
  KeyD: boolean;
  Space: boolean;
}

const Hero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mainMeshRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const keyStateRef = useRef<KeyState>({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    KeyW: false,
    KeyS: false,
    KeyA: false,
    KeyD: false,
    Space: false,
  });
  const [isFocused, setIsFocused] = useState(false);

  const velocityRef = useRef({ x: 0, y: 0, z: 0 });
  const rotationSpeedRef = useRef({ x: 0.005, y: 0.01 });

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.code as keyof KeyState;
    if (key in keyStateRef.current) {
      keyStateRef.current[key] = true;
      event.preventDefault();
    }
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const key = event.code as keyof KeyState;
    if (key in keyStateRef.current) {
      keyStateRef.current[key] = false;
    }
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    // Reset all keys when losing focus
    Object.keys(keyStateRef.current).forEach((key) => {
      keyStateRef.current[key as keyof KeyState] = false;
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create main geometric shape (icosahedron)
    const geometry = new THREE.IcosahedronGeometry(1.5, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    mainMeshRef.current = mesh;

    // Create inner shape
    const innerGeometry = new THREE.OctahedronGeometry(0.8, 0);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x888888,
      wireframe: true,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    mesh.add(innerMesh);

    // Create particle system for background
    const particleCount = 500;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x444444,
      size: 0.05,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      const keys = keyStateRef.current;
      const velocity = velocityRef.current;
      const rotationSpeed = rotationSpeedRef.current;

      // Handle keyboard input for movement
      const acceleration = 0.002;
      const maxSpeed = 0.05;
      const friction = 0.98;

      // Horizontal movement (Left/Right or A/D)
      if (keys.ArrowLeft || keys.KeyA) {
        velocity.x -= acceleration;
      }
      if (keys.ArrowRight || keys.KeyD) {
        velocity.x += acceleration;
      }

      // Vertical movement (Up/Down or W/S)
      if (keys.ArrowUp || keys.KeyW) {
        velocity.y += acceleration;
      }
      if (keys.ArrowDown || keys.KeyS) {
        velocity.y -= acceleration;
      }

      // Zoom (Space)
      if (keys.Space) {
        rotationSpeed.x *= 1.02;
        rotationSpeed.y *= 1.02;
        if (rotationSpeed.x > 0.1) rotationSpeed.x = 0.1;
        if (rotationSpeed.y > 0.1) rotationSpeed.y = 0.1;
      } else {
        rotationSpeed.x *= 0.99;
        rotationSpeed.y *= 0.99;
        if (rotationSpeed.x < 0.005) rotationSpeed.x = 0.005;
        if (rotationSpeed.y < 0.01) rotationSpeed.y = 0.01;
      }

      // Clamp velocity
      velocity.x = Math.max(-maxSpeed, Math.min(maxSpeed, velocity.x));
      velocity.y = Math.max(-maxSpeed, Math.min(maxSpeed, velocity.y));

      // Apply friction
      velocity.x *= friction;
      velocity.y *= friction;

      // Update mesh position
      if (mainMeshRef.current) {
        mainMeshRef.current.position.x += velocity.x;
        mainMeshRef.current.position.y += velocity.y;

        // Keep within bounds
        const bounds = 3;
        if (mainMeshRef.current.position.x > bounds)
          mainMeshRef.current.position.x = bounds;
        if (mainMeshRef.current.position.x < -bounds)
          mainMeshRef.current.position.x = -bounds;
        if (mainMeshRef.current.position.y > bounds)
          mainMeshRef.current.position.y = bounds;
        if (mainMeshRef.current.position.y < -bounds)
          mainMeshRef.current.position.y = -bounds;

        // Rotate the mesh
        mainMeshRef.current.rotation.x += rotationSpeed.x;
        mainMeshRef.current.rotation.y += rotationSpeed.y;
      }

      // Rotate particles slowly
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0005;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current)
        return;

      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }

      geometry.dispose();
      material.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div className="hero-3d">
      <div
        ref={containerRef}
        className="hero-3d__canvas"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onFocus={handleFocus}
        onBlur={handleBlur}
        role="application"
        aria-label="Interactive 3D scene. Use arrow keys or WASD to move, Space to speed up rotation."
      />
      <div className="hero-3d__content">
        <h2 className="hero-3d__hello">Hello.</h2>
        <h1 className="hero-3d__title">
          I'm Fellyph Cintra, brazilian front-end engineer based in Dublin,
          Ireland.
        </h1>
      </div>
      <div className={`hero-3d__controls ${isFocused ? 'hero-3d__controls--visible' : ''}`}>
        <p className="hero-3d__hint">
          {isFocused
            ? 'Use Arrow Keys or WASD to move | Space to boost'
            : 'Click the 3D scene to control it'}
        </p>
      </div>
    </div>
  );
};

export default Hero3D;
