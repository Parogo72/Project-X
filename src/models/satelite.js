import { createRef, Component } from 'react';  
import { TextureLoader, Vector3 } from 'three';
import Orbit from './orbit.js';
import { cameraBase } from '../functions/constants.js';
import * as TWEEN from "@tweenjs/tween.js";
import { EffectComposer, Outline } from '@react-three/postprocessing'

class Satelite extends Component{
  constructor(props) {
    super(props);
    this.texture = this.loadTexture();
    this.myRef = createRef();
    this.focused = false;
    this.currentPosition = this.props.position;
    this.currentAnimation = null;
  }
  /** Stop the focus of the camera */
  stopFocus() {
    clearInterval(this.focusID);
  }
  /** Stop the rotation of the element */
  stopOrbitate() {
    clearInterval(this.orbitationID);
  }
  /** Stop the rotation of the element */
  stopRotate() {
    clearInterval(this.rotationID);
  }
  /** Stop the zoom of the element */
  stopZoom() {
    clearInterval(this.zoomID);
  }
  /** 
   * Load the texture of the object
   * @returns {object} Texture
  */
  loadTexture() {
    return new TextureLoader().load(this.props.base);
  }
  /**
   * Focus the camera to this object
   * @param {object} camera - Camera that zooms
   */
  focus(camera) {
    this.focusID = setInterval(() => {
      camera.lookAt(this.currentPosition[0], this.currentPosition[1], this.currentPosition[2]);
    }, 10);
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
   * @param {object} camera - Camera that zooms
  */
  zoom(camera) {
    if(this.focused || this.props.parent.focused) return;
    this.stopZoom();
    this.focused = true;
    this.focus(camera);
    this.orbitateCamera(camera);
  }
  /** 
   * Unzooms the element
   * @param {object} camera - Camera that unzooms
  */
   unzoom(camera) {
    if(!this.focused) return;
    this.stopZoom();
    this.stopFocus();
    this.focused = false;
    const initial = camera.position;
    const cords = this.currentPosition;
    this.currentAnimation = new TWEEN.Tween(initial)
      .to({ x: cameraBase.x, y: cameraBase.y, z: cameraBase.z}, 500)
      .onUpdate(() =>{
        camera.position.set(initial.x, initial.y, initial.z)
      }
      )
      .start().chain(new TWEEN.Tween(cords)
      .to({ x: 0, y: 0, z: 0}, 1000)
      .onUpdate(() =>{
        camera.lookAt(new Vector3(cords.x, cords.y, cords.z))
      }
      )
      .start()).onComplete(() => this.currentAnimation = null)
  }
  /** 
   * Start the orbit of the element
   * @param {object} mesh - Mesh to orbitate
  */
  orbitate(mesh) {
    let i = 0;
    this.orbitationID = setInterval(() => {
      if(i === 1000) i = 0;
      const angle = (i / 1000) * 2 * Math.PI;
      const x = -this.props.orbitSize * Math.cos(angle);
      const z = -this.props.orbitSize * Math.sin(angle);
      mesh.current.position.x = x;
      mesh.current.position.z = z;
      this.currentPosition = [x, 0, z];
      i += 0.5;
    }, 10)
  }
  /**
   * Make the camera orbitate
   * @param {*} camera - Camera
   */
  orbitateCamera(camera) {
    const initial = camera.position
    const xFinal = this.currentPosition[0]*2;
    const yFinal = this.currentPosition[1]*2 + 1;
    const zFinal = this.currentPosition[2]*2;
    this.currentAnimation = new TWEEN.Tween(initial)
      .to({ x: xFinal, y: yFinal, z: zFinal}, 500)
      .onUpdate(() =>{
        camera.position.set(initial.x, initial.y, initial.z)
      }
      )
      .start().onComplete(() => this.currentAnimation = null)
  }
  
  /** 
   * Renders the object
   * @returns {object} Mesh
  */
  render() {
    const mesh = this.myRef
    document.addEventListener("keydown", event => {
      if(event.key === "Escape" && !this.currentAnimation) {
        this.unzoom(this.props.camera);
        this.props.parent.unzoom()
      }
    })
    this.rotate(mesh)
    this.orbitate(mesh)
    return (
      <>
        <mesh castShadow={true} receiveShadow position={this.props.position} ref={mesh} onClick={(e) => {this.zoom(this.props.camera, e); this.props.parent.zoom()}}>
          <sphereGeometry args={[this.props.size, 30, 30]}/>
          <meshStandardMaterial color="white"/>
        </mesh>
        <Orbit xRadius={this.props.orbitSize} zRadius={this.props.orbitSize} position={0}/>
        <EffectComposer multisampling={5} autoClear={false}>
          <Outline blur={true} selection={mesh} selectionLayer={10} visibleEdgeColor={"#4B8AB7"} hiddenEdgeColor={"#4B8AB7"} edgeStrength={10} width={1000} />
        </EffectComposer>
      </>
    );
  }
}

export default Satelite;