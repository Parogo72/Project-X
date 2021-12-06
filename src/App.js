import './App.css';
import './my.css';
import React, {Suspense} from 'react';  
import { Loader, OrbitControls  } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import Satelite from './models/satelite.js';
import MyStars from './models/stars.js';
import Planet from './models/planet.js';
import Light from './models/light.js'
import { PerspectiveCamera } from 'three';
function App() {
  const camera = new PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.set(0,2,3); 
  console.log(1)
  return (
  <Suspense fallback={<Loader />}>
    <Canvas shadows shadowMap camera={camera}>
      <OrbitControls enablePan={false} enableZoom={false} position0={[5, 0, 0]}/>
      <MyStars />
      <ambientLight intensity= {0.5} />
      <Light brightness={3} color={"white"} position={[camera.position.x, camera.position.y, camera.position.z]} />
      <Planet position={[0, 0, 0]} size={1} base={"/earth.jpeg"}/>
      <Satelite position={[1, 0, 0]} size={0.1} orbit={1.5}/>
    </Canvas>
  </Suspense>
  )
}

export default App;
