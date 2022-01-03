import './App.css';
import './my.css';
import React, {Suspense} from 'react';  
import { Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import Satelite from './models/satelite.js';
import MyStars from './models/stars.js';
import Planet from './models/planet.js';
import Light from './models/light.js';
import Sun from './models/sun.js';
import { PerspectiveCamera, Vector3 } from 'three';
import { Rel, cameraBase } from './functions/constants';
function App({ x }) {
  const camera = new PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.set(cameraBase.x, cameraBase.y, cameraBase.z);
  camera.lookAt(new Vector3(0, 0, 0));
  const rel = new Rel(x);
  return (
  <Suspense fallback={<Loader/>}>
    <Canvas shadows shadowMap camera={camera} id="canvas">
      <MyStars/>
      <ambientLight intensity= {0.5} />
      <Sun position={[100, 0, 0]} size={rel.calc('sunSize')} base={"/sun.jpeg"} />
      <Light brightness={2} color={"white"} position={[10, 0, 0]}/>
      <Planet position={[0, 0, 0]} size={rel.calc('planetSize')} base={"/earth.jpeg"} orbitSize={100} camera={camera}/>
      <Satelite position={[-1.5, 0, 0]} size={0.1} orbitSize={1.5} camera={camera}/>
    </Canvas>
  </Suspense>
  )
}

export default App;
