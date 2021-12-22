import { useRef } from 'react';  
import { useFrame } from '@react-three/fiber';
import { ClampToEdgeWrapping, TextureLoader } from 'three';

function Sun({ position, base, size }) {
    const texture = new TextureLoader().load(base);
    texture.wrapS = ClampToEdgeWrapping;
    texture.wrapT = ClampToEdgeWrapping;
    const mesh = useRef(null);
    useFrame(() => {
      mesh.current.rotation.y += 0.0002;
    })
    return (
      <>
        <mesh position={position} ref={mesh}>
          <sphereGeometry args={[size, 30, 30]} />
          <meshStandardMaterial map={texture} />
        </mesh>
      </>
    );
}

export default Sun;
