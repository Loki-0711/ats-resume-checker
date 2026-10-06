import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AICoreScene } from './AICoreScene';

interface AIOrbCanvasProps {
  className?: string;
  intensity?: number;
}

export const AIOrbCanvas: React.FC<AIOrbCanvasProps> = ({ className = 'w-full h-full' }) => {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#bae6fd" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#c084fc" />

        <Suspense fallback={null}>
          <AICoreScene />
        </Suspense>
      </Canvas>
    </div>
  );
};
