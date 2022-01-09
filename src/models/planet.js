import { createRef, Component } from 'react';  
import { TextureLoader } from 'three';
import Orbit from './orbit.js';
import { cameraBase } from '../functions/constants.js';
import * as TWEEN from "@tweenjs/tween.js";

class Planet extends Component{
  constructor(props) {
    super(props);
    //this.texture = this.loadTexture();
    this.myRef = createRef();
    this.focused = false;
    this.state = {
      speed:0,
      size: props.size,
      orbitSize: props.orbitSize
    }
  }
  /** Stop the rotation of the element */
  stopRotate() {
    clearInterval(this.rotationID);
  }
  /** 
   * Load the texture of the object
   * @returns {object} Texture
  */
  loadTexture() {
    return new TextureLoader().load(this.props.base);
  }
  /** 
   * Start the rotation of the element
   * @param {object} mesh - mesh to rotate
  */
  rotate(mesh) {
    this.rotationID = setInterval(() => {
      mesh.current.rotation.y += 0.001;
    }, 10)
  }
  /** 
   * Zooms the element
   * @param {object} camera - camera that zooms
  */
  zoom(camera) {
    if(this.focused) return;
    this.props.data.planet.focus = true;
    this.focused = true;
    const initial = camera.position;
    new TWEEN.Tween(initial)
      .to({ x: -this.props.data.planet.size * 1.5, y: camera.position.y/2, z: -this.props.data.planet.size * 1.5}, 500)
      .onUpdate(() =>{
        camera.position.set(initial.x, initial.y, initial.z)
      }
      )
      .start();
  }
  /** 
   * Unzooms the element
   * @param {object} camera - camera that unzooms
  */
   unzoom(camera) {
    if(!this.focused) return;
    this.props.data.planet.focus = false;
    this.focused = false;
    const initial = camera.position;
    new TWEEN.Tween(initial)
      .to({ x: cameraBase.x, y: cameraBase.y, z: cameraBase.z}, 500)
      .onUpdate(() =>{
        camera.position.set(initial.x, initial.y, initial.z)
      }
      )
      .start();
  }
  renderLi() {
    document.getElementById("inputs")
  }
  waitChange() {
    clearInterval(this.waitChangeID)
    this.waitChangeID = setInterval(() => {
      if(this.focused && this.props.data.planet.focus !== this.focused) this.unzoom(this.props.camera); else if(!this.focused && this.props.data.planet.focus !== this.focused) this.zoom(this.props.camera)
    }, 1)
}
  /** 
   * Renders the object
   * @returns {object} Mesh
  */
  render() {
    document.addEventListener("keydown", event => {
      if(event.key === "Escape") {
        this.unzoom(this.props.camera)
      };
    })
    if(this.props.data.planet.focus) this.zoom(this.props.camera); else this.unzoom(this.props.camera)
    const mesh = this.myRef
    this.waitChange();
    this.stopRotate();
    this.rotate(mesh)
    return (
      <>
        <mesh castShadow receiveShadow={true} position={this.props.position} ref={mesh} onClick={(e) => {this.zoom(this.props.camera)}}>
          <sphereGeometry args={[this.props.size, 30, 30]} />
          <meshStandardMaterial map={this.texture}/>
        </mesh>
        <Orbit xRadius={this.props.data.planet.orbit} zRadius={this.props.data.planet.orbit} position={this.props.data.planet.orbit}/>
      </>
    );
  }
}

export default Planet;