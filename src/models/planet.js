import { useRef } from 'react';  
import { useFrame, useLoader } from '@react-three/fiber';
import { RepeatWrapping, TextureLoader } from 'three';

function Planet({ position, base, size }) {
    const texture = useLoader(TextureLoader, base);
    texture.wrapS = RepeatWrapping;
    const mesh = useRef(null);
    useFrame(() => {
      mesh.current.rotation.y += 0.001;
    })
    return (
      <>
        <mesh castShadow receiveShadow position={position} ref={mesh}>
          <sphereGeometry args={[size, 30, 30]} />
          <meshStandardMaterial map={texture}/>
        </mesh>
      </>
    );
}

export default Planet;