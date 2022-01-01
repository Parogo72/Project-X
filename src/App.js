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
import { unzoom } from './functions/utils';
function App({ x }) {
  const camera = new PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.set(cameraBase[0], cameraBase[1], cameraBase[2]);
  camera.position.set(-3,2,-3);
  camera.lookAt(new Vector3(0, 0, 0));
  const rel = new Rel(x);
  document.addEventListener("keydown", event => {
    if(event.key === "Escape") unzoom(camera);
  })
  return (
  <Suspense fallback={<Loader />}>
    <Canvas shadows shadowMap camera={camera} id="canvas" >
      <MyStars/>
      <ambientLight intensity= {0.5} />
      <Sun position={[100, 0, 0]} size={rel.calc('sunSize')} base={"/sun.jpeg"} />
      <Light brightness={2} color={"white"} position={[10, 0, 0]}/>
      <Planet position={[0, 0, 0]} size={rel.calc('planetSize')} base={"/earth.jpeg"} orbit={100}/>
      <Satelite position={[1, 0, 0]} size={0.1} orbit={1.5}/>
    </Canvas>
  </Suspense>
  )
}

export default App;
