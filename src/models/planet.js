import { useRef } from 'react';  
import { useFrame } from '@react-three/fiber';
import { ClampToEdgeWrapping, TextureLoader } from 'three';
import Orbit from './orbit.js';
import { zoomPlanet } from '../functions/utils.js';
function Planet({ position, base, size, orbit }) {
    const texture = new TextureLoader().load(base);
    texture.wrapS = ClampToEdgeWrapping;
    texture.wrapT = ClampToEdgeWrapping;
    const mesh = useRef(null);
    useFrame(() => {
      mesh.current.rotation.y += 0.001;
    })
    return (
      <>
        <mesh castShadow receiveShadow={true} position={position} ref={mesh} onClick={e => zoomPlanet(e)}>
          <sphereGeometry args={[size, 30, 30]}/>
          <meshStandardMaterial map={texture}/>
        </mesh>
        <Orbit xRadius={orbit} zRadius={orbit} position={100}/>
      </>
    );
}

export default Planet;
