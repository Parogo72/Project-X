import { useRef } from 'react';  
import { useFrame, useLoader } from '@react-three/fiber';
import { RepeatWrapping, TextureLoader } from 'three';

function Sun({ position, base, size }) {
    //const texture = useLoader(TextureLoader, base);
    //texture.wrapS = RepeatWrapping;
    const mesh = useRef(null);
    useFrame(() => {
      mesh.current.rotation.y += 0.0005;
    })
    return (
      <>
        <mesh position={position} ref={mesh}>
          <sphereGeometry args={[size, 30, 30]} />
          <meshStandardMaterial map={base} />
        </mesh>
      </>
    );
}

export default Sun;
