import './App.css';
import './my.css';
import { Suspense, Component } from 'react';  
import { Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import MyStars from './models/stars.js';
import Light from './models/light.js';
import Sun from './models/sun.js';
import { PerspectiveCamera, Vector3 } from 'three';
import { Rel, cameraBase } from './functions/constants';
import AstralObject from './models/astralObject.js';
import Inputs from './models/inputs.js';
import * as TWEEN from "@tweenjs/tween.js";
import animate from "./functions/animate.js";
import config from './config.json';
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
        const camera = new PerspectiveCamera(this.state.camera.fov, window.innerWidth/window.innerHeight, this.state.camera.near, this.state.camera.far );
        camera.position.set(this.state.camera.position.x, this.state.camera.position.y, this.state.camera.position.z);
        camera.lookAt(new Vector3(0, 0, 0));
        this.camera = camera;
        this.rel = new Rel(this.props.x);
    }
    render() {
        this.setup();
        return (
            <Suspense fallback={<Loader/>}>
              <Canvas shadows shadowMap camera={this.camera} id="canvas">
                <MyStars/>
                <ambientLight intensity= {this.state.light.intensity} />
                <Sun data={this.state} rel={this.rel} updateKey={this.updateKey}/>
                <Light brightness={this.state.light.brightness} color={this.state.light.color} position={this.state.light.position}/>
                <AstralObject rel={this.rel} camera={this.camera} data={this.state} updateKey={this.updateKey}/> 
              </Canvas>
              <Inputs/>
            </Suspense>
        )
    }
}

export default App