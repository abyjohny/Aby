import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Line } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Lazy scene wrapper: only mounts Canvas when visible ─── */
export function Scene3D({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '200px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {visible && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ width: '100%', height: '100%', background: 'transparent' }}
          gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
          dpr={[1, 1.5]}
          frameloop="always"
        >
          <ambientLight intensity={1.2} />
          <pointLight position={[5, 6, 5]} intensity={1.5} color="#c9a96e" />
          <pointLight position={[-4, -2, 4]} intensity={0.8} color="#7a9e7e" />
          <Environment preset="city" environmentIntensity={0.6} />
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   1. CLAIMLENS — Floating panels
   ═══════════════════════════════════════ */
function Panel({ pos, rot, scale, color = '#1a1a1a' }: {
  pos: [number, number, number]; rot: [number, number, number];
  scale: [number, number, number]; color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const baseY = pos[1];
  useFrame(({ clock }) => {
    ref.current.position.y = baseY + Math.sin(clock.elapsedTime * 1.5 + pos[0]) * 0.08;
  });
  return (
    <mesh ref={ref} position={pos} rotation={rot} scale={scale}>
      <boxGeometry args={[1, 1, 0.03]} />
      <meshPhysicalMaterial color={color} transmission={0.8} transparent opacity={1} roughness={0.15} metalness={0.5} clearcoat={1} clearcoatRoughness={0.1} side={THREE.DoubleSide} />
    </mesh>
  );
}

export function ClaimLensScene() {
  const g = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state, delta) => {
    const targetX = hovered ? state.pointer.y * -0.2 : 0;
    const targetY = (hovered ? state.pointer.x * 0.4 : 0) + Math.sin(state.clock.elapsedTime * 0.25) * 0.2;
    const s = hovered ? 1.08 : 1;
    
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, targetX, delta * 5);
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, targetY, delta * 5);
    g.current.scale.lerp(new THREE.Vector3(s, s, s), delta * 5);
  });
  
  return (
    <group ref={g} 
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      <Panel pos={[0, 0, 0]} rot={[0, -0.15, 0]} scale={[2.4, 1.5, 1]} />
      <Panel pos={[1.5, 0.2, -0.5]} rot={[0, -0.4, 0]} scale={[1.1, 1.3, 1]} color="#222" />
      <Panel pos={[-1.3, 0.5, 0.3]} rot={[0, 0.2, 0.05]} scale={[0.9, 0.6, 1]} color="#1e1e1e" />
      <Panel pos={[0.4, 0.85, 0.15]} rot={[0, -0.1, 0]} scale={[1.7, 0.25, 1]} color="#1c1c1c" />
      {/* Chart bars */}
      {[[-0.3, 0.35, '#c9a96e'], [-0.1, 0.55, '#c9a96e'], [0.1, 0.4, '#7a9e7e'], [0.3, 0.6, '#c9a96e'], [0.5, 0.42, '#7a9e7e']].map(([x, h, c], i) => (
        <mesh key={i} position={[Number(x) - 0.3, Number(h) / 2 - 0.4, 0.04]}>
          <boxGeometry args={[0.07, Number(h), 0.02]} />
          <meshStandardMaterial color={c as string} emissive={c as string} emissiveIntensity={2.5} toneMapped={false} />
        </mesh>
      ))}
      {/* Accent dots */}
      {[[-0.6, 0.3], [0.4, 0.4], [0.9, -0.2]].map(([x, y], i) => (
        <mesh key={`d${i}`} position={[x, y, 0.04]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#c9a96e" />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════
   2. CREW AI — Connected nodes
   ═══════════════════════════════════════ */
export function CrewAIScene() {
  const g = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const speed = useRef(0.1);

  useFrame((state, delta) => {
    speed.current = THREE.MathUtils.lerp(speed.current, hovered ? 0.3 : 0.1, delta * 4);
    g.current.rotation.y += delta * speed.current;
    
    const targetX = hovered ? state.pointer.y * -0.2 : 0;
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, targetX, delta * 4);
    
    const s = hovered ? 1.08 : 1;
    g.current.scale.lerp(new THREE.Vector3(s, s, s), delta * 4);
  });

  const nodes: [number, number, number][] = useMemo(() => [
    [-1.2, 0.5, 0], [1.0, 0.8, -0.3], [0, -0.6, 0.5], [1.3, -0.4, -0.2], [-0.8, -0.3, -0.5]
  ], []);

  // No longer need lineGeos with BufferGeometry since we use drei's Line component

  return (
    <group ref={g}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      {nodes.map((pos, i) => (
        <group key={i}>
          <mesh position={pos}>
            <sphereGeometry args={[0.25 + (i % 3) * 0.05, 16, 16]} />
            <meshPhysicalMaterial color="#1f1a14" transmission={0.9} transparent opacity={1} roughness={0.1} metalness={0.5} clearcoat={1} />
          </mesh>
          <mesh position={pos}>
            <sphereGeometry args={[0.09, 8, 8]} />
            <meshBasicMaterial color="#c9a96e" />
          </mesh>
        </group>
      ))}
      {[[0,1],[1,2],[2,3],[3,4],[4,0],[0,2],[1,3]].map(([a, b], i) => (
        <Line key={i} points={[nodes[a], nodes[b]]} color="#c9a96e" transparent opacity={0.12} lineWidth={1.5} />
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════
   3. HAND SIGN — Stylized hand
   ═══════════════════════════════════════ */
import RoboticHand from './RoboticHand';

export function HandSignScene() {
  const g = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const targetX = (hovered ? state.pointer.y * -0.3 : 0) + Math.sin(t * 0.2) * 0.1 - 0.15;
    const targetY = (hovered ? state.pointer.x * 0.4 : 0) + Math.sin(t * 0.3) * 0.35;
    const s = hovered ? 1.45 : 1.3;

    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, targetX, delta * 4);
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, targetY, delta * 4);
    g.current.scale.lerp(new THREE.Vector3(s, s, s), delta * 4);
  });
  
  return (
    <group ref={g} position={[0, -0.3, 0]} scale={1.3}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      {/* The realistic hand model */}
      <RoboticHand position={[0, -0.6, 0]} scale={15} rotation={[0.2, 0, 0]} />
      
      {/* Surrounding tracking bounding box */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.5, 2, 0.6]} />
        <meshBasicMaterial color="#c9a96e" wireframe transparent opacity={0.03} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════
   4. BATTERY — Transparent cell
   ═══════════════════════════════════════ */
function Pulse({ offset }: { offset: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * 0.6 + offset) % 3;
    ref.current.position.y = -0.8 + t * 0.6;
    const s = 0.1 + Math.sin(t * Math.PI / 3) * 0.06;
    ref.current.scale.set(s, s, s);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = Math.sin(t / 3 * Math.PI) * 0.9;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#c9a96e" transparent />
    </mesh>
  );
}

export function BatteryScene() {
  const g = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const speed = useRef(0.15);
  
  useFrame((state, delta) => {
    speed.current = THREE.MathUtils.lerp(speed.current, hovered ? 0.4 : 0.15, delta * 4);
    g.current.rotation.y += delta * speed.current;
    
    const targetX = hovered ? state.pointer.y * -0.2 : 0;
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, targetX, delta * 4);
    
    const s = hovered ? 1.05 : 1;
    g.current.scale.lerp(new THREE.Vector3(s, s, s), delta * 4);
  });
  
  return (
    <group ref={g}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      <mesh>
        <capsuleGeometry args={[0.6, 2, 8, 16]} />
        <meshPhysicalMaterial color="#111" transmission={0.95} transparent opacity={1} roughness={0.05} metalness={0.3} clearcoat={1} />
      </mesh>
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.15, 8]} />
        <meshStandardMaterial color="#c9a96e" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 1.5, 6]} />
        <meshBasicMaterial color="#7a9e7e" wireframe transparent opacity={0.1} />
      </mesh>
      <Pulse offset={0} />
      <Pulse offset={1} />
      <Pulse offset={2} />
      <mesh>
        <capsuleGeometry args={[0.72, 2.3, 6, 8]} />
        <meshBasicMaterial color="#c9a96e" wireframe transparent opacity={0.025} />
      </mesh>
      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[0.3, 0.25, 0.1, 8]} />
        <meshStandardMaterial color="#c9a96e" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}
