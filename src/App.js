import './App.css';
import './my.css';
import React, {Suspense} from 'react';  
import { Loader, OrbitControls  } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import Satelite from './models/satelite.js';
import MyStars from './models/stars.js';
import Planet from './models/planet.js';
import Light from './models/light.js';
import Sun from './models/sun.js';
import { PerspectiveCamera } from 'three';
import { Rel } from './functions/constants';
import { useRef } from 'react';  
import { useFrame, useLoader } from '@react-three/fiber';
import { RepeatWrapping, TextureLoader } from 'three';
function App({ x }) {
  const camera = new PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.set(0,2,3);
  const texture = useLoader(TextureLoader, "/sun.jpeg");
  texture.wrapS = RepeatWrapping;
  const rel = new Rel(x);
  return (
  <Suspense fallback={<Loader />}>
    <Canvas shadows shadowMap camera={camera}>
      <OrbitControls enablePan={false} enableZoom={false} position0={[5, 0, 0]}/>
      <MyStars />
      <ambientLight intensity= {0.5} />
      <Sun position={[500, 0, 0]} size={rel.calc('sunSize')} base={texture}/>
      <Light brightness={2} color={"white"} position={[10, 0, 0]}/>
      <Planet position={[0, 0, 0]} size={rel.calc('planetSize')} base={"/earth.jpeg"} orbit={500}/>
      <Satelite position={[1, 0, 0]} size={0.1} orbit={1.5}/>
    </Canvas>
  </Suspense>
  )
}

export default App;
