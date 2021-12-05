import { useRef } from 'react';  
import { Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
function MyStars() {
    const mesh = useRef(null);
    useFrame(() => {
      mesh.current.rotation.y += 0.0005;
    })
    return (
      <>
        <mesh ref={mesh}>
          <Stars />
        </mesh>
      </>
    );
}

export default MyStars;