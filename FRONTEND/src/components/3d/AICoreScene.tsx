import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate subtle particle clouds representing NLP tokens / embeddings
function ParticleField({ count = 240 }: { count?: number }) {
  const points = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute in a spherical halo around the core
      const radius = 2.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      coords[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      coords[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      coords[i * 3 + 2] = radius * Math.cos(phi);
    }
    return coords;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null!);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#38bdf8"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.65}
      />
    </Points>
  );
}

// Nested gimbal rings rotating around the intelligence core
function GimbalRings() {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (ring1.current) {
      ring1.current.rotation.x += delta * 0.4;
      ring1.current.rotation.y += delta * 0.2;
    }
    if (ring2.current) {
      ring2.current.rotation.y += delta * 0.35;
      ring2.current.rotation.z += delta * 0.25;
    }
    if (ring3.current) {
      ring3.current.rotation.z += delta * 0.3;
      ring3.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <group>
      {/* Outer Cyan Ring */}
      <Torus ref={ring1} args={[2.0, 0.022, 16, 100]}>
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.8}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.85}
        />
      </Torus>

      {/* Middle Violet Ring */}
      <Torus ref={ring2} args={[1.7, 0.018, 16, 100]} rotation={[Math.PI / 4, 0, 0]}>
        <meshStandardMaterial
          color="#818cf8"
          emissive="#6366f1"
          emissiveIntensity={0.9}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.75}
        />
      </Torus>

      {/* Inner Emerald / Aqua Ring */}
      <Torus ref={ring3} args={[1.4, 0.014, 16, 100]} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <meshStandardMaterial
          color="#2dd4bf"
          emissive="#0d9488"
          emissiveIntensity={1.0}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </Torus>
    </group>
  );
}

// Orbiting intelligence nodes representing documents, skills, vectors
function OrbitingNodes() {
  const orbitGroup = useRef<THREE.Group>(null!);
  const docGroup = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (orbitGroup.current) {
      orbitGroup.current.rotation.y += delta * 0.5;
    }
    if (docGroup.current) {
      docGroup.current.rotation.y -= delta * 0.3;
      docGroup.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
  });

  return (
    <>
      <group ref={orbitGroup}>
        {/* Node 1: Resume Document Vector */}
        <mesh position={[2.5, 0.4, 0]}>
          <boxGeometry args={[0.22, 0.3, 0.02]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={1.2}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Node 2: Skill Match Node */}
        <mesh position={[-2.4, -0.5, 0.8]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#10b981"
            emissiveIntensity={1.5}
          />
        </mesh>

        {/* Node 3: TF-IDF Vector Node */}
        <mesh position={[0.7, 2.2, -1.2]}>
          <octahedronGeometry args={[0.14, 0]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#a855f7"
            emissiveIntensity={1.4}
          />
        </mesh>
      </group>

      {/* Reverse Orbit for balance */}
      <group ref={docGroup}>
        <mesh position={[-1.8, 1.4, -1.0]}>
          <boxGeometry args={[0.2, 0.28, 0.02]} />
          <meshStandardMaterial
            color="#818cf8"
            emissive="#6366f1"
            emissiveIntensity={1.1}
            transparent
            opacity={0.85}
          />
        </mesh>
      </group>
    </>
  );
}

// Core scene with cursor tilt tracking
export const AICoreScene: React.FC = () => {
  const rootGroup = useRef<THREE.Group>(null!);
  const innerCore = useRef<THREE.Mesh>(null!);
  const wireShell = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    // Smooth mouse parallax
    if (rootGroup.current) {
      const targetRotationX = state.pointer.y * 0.35;
      const targetRotationY = state.pointer.x * 0.45;
      rootGroup.current.rotation.x = THREE.MathUtils.lerp(rootGroup.current.rotation.x, targetRotationX, 0.05);
      rootGroup.current.rotation.y = THREE.MathUtils.lerp(rootGroup.current.rotation.y, targetRotationY, 0.05);
    }

    // Inner core pulsing & slow counter-spin
    if (innerCore.current) {
      innerCore.current.rotation.y -= delta * 0.3;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.04;
      innerCore.current.scale.set(pulse, pulse, pulse);
    }

    // Outer wireframe shell
    if (wireShell.current) {
      wireShell.current.rotation.y += delta * 0.15;
      wireShell.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={rootGroup}>
        {/* Glowing Inner Core */}
        <Sphere ref={innerCore} args={[0.9, 64, 64]}>
          <meshStandardMaterial
            color="#0284c7"
            emissive="#06b6d4"
            emissiveIntensity={2.2}
            roughness={0.1}
            metalness={0.2}
            transparent
            opacity={0.92}
          />
        </Sphere>

        {/* Outer Translucent Glass/Wireframe Shell */}
        <Sphere ref={wireShell} args={[1.15, 32, 32]}>
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.4}
            wireframe
            transparent
            opacity={0.25}
          />
        </Sphere>

        {/* Gimbal Rotating Rings */}
        <GimbalRings />

        {/* Orbiting Data Nodes */}
        <OrbitingNodes />

        {/* Particle Cloud */}
        <ParticleField count={280} />

        {/* Central Point Lights */}
        <pointLight color="#38bdf8" intensity={3.5} distance={7} />
        <pointLight color="#818cf8" intensity={2.0} distance={5} position={[0, -1, 0]} />
      </group>
    </Float>
  );
};
