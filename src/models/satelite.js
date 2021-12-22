import { useRef } from 'react'; 
import { useFrame } from '@react-three/fiber';
import Orbit from './orbit.js';
function Satelite({position, size, orbit}) {
    const mesh = useRef(null);
    let i=0;
    useFrame(() => {
      if(i === 1000) i = 0;
      const angle = (i / 1000) * 2 * Math.PI;
      const x = orbit * Math.cos(angle);
      const z = orbit * Math.sin(angle);
      mesh.current.position.x = x;
      mesh.current.position.z = z;
      mesh.current.rotation.y -= 0.001;
      i += 1;
    })
    return (
      <>
        <mesh castShadow={true} receiveShadow position={position} ref={mesh}>
          <sphereGeometry args={[size, 30, 30]} />
          <meshStandardMaterial color="white"/>
        </mesh>
        <Orbit xRadius={orbit} zRadius={orbit} position={0}/>
      </>
    );
}

export default Satelite;
