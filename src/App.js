import './App.css';
import './my.css';
import { Suspense, Component } from 'react';  
import { Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import MyStars from './models/stars.js';
import Light from './models/light.js';
import Sun from './models/sun.js';
import { PerspectiveCamera, Vector3 } from 'three';
import { Rel } from './functions/constants';
import AstralObject from './models/astralObject.js';
import Inputs from './models/inputs.js';
import * as TWEEN from "@tweenjs/tween.js";
import animate from "./functions/animate.js";
import config from './config.json';
const rel = new Rel(config.proportion);
config.sun.size = rel.calc("sunSize")
config.planet.size = rel.calc("planetSize")
const camera = new PerspectiveCamera(config.camera.fov, window.innerWidth/window.innerHeight, config.camera.near, config.camera.far );
camera.position.set(config.camera.position.x, config.camera.position.y, config.camera.position.z);
camera.lookAt(new Vector3(0, 0, 0));
animate((time) => {
  TWEEN.update(time);
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = config
    }
    updateKey = (value) => {
      this.setState(value)
    }
    setup() {
        this.camera = camera;
        this.rel = rel;
    }
    render() {
        this.setup()
        return (
            <Suspense fallback={<Loader/>}>
              <Canvas shadows shadowMap camera={this.camera} id="canvas">
                <MyStars/>
                <ambientLight intensity= {this.state.light.intensity} />
                <Sun data={this.state} rel={this.rel} updateKey={this.updateKey}/>
                <Light brightness={this.state.light.brightness} color={this.state.light.color} position={this.state.light.position}/>
                <AstralObject rel={this.rel} camera={this.camera} data={this.state} updateKey={this.updateKey}/> 
              </Canvas>
              <Inputs data={this.state} updateKey={this.updateKey}/>
            </Suspense>
        )
    }
}

export default App