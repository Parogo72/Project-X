import { createRef, Component } from 'react';  
import { Group, Object3D, Scene, TextureLoader, Vector2, WebGLRenderer } from 'three';
import Orbit from './orbit.js';
import { cameraBase } from '../functions/constants.js';

import { EffectComposer, Outline } from '@react-three/postprocessing'

class Satelite extends Component{
  constructor(props) {
    super(props);
    this.texture = this.loadTexture();
    this.myRef = createRef();
    this.focused = false;
    this.currentPosition = this.props.position
  }
  
  focus(camera) {
    this.focusID = setInterval(() => {
      camera.lookAt(this.currentPosition[0], this.currentPosition[1], this.currentPosition[2]);
    }, 10);
  }
  stopFocus() {
    clearInterval(this.focusID);
  }
  /**
   * Calculates de position of the camera
   * @param {{x: number, y: number, z: number}} initial 
   * @param {Number} landa 
   * @param {Boolean} skip Skip the error
   * @returns {{x: number, y: number, z: number, error: boolean}} Object with position and error
   */
   rectaCords(initial, landa, skip) {
    let error = false;
    let x = initial.x*landa;
    let y = initial.y*landa;
    let z = initial.z*landa;
    let i = Math.sqrt( (x)**2 + (y)**2 + (z)**2 )
    if( !skip && ((i < this.props.size*2 && this.focused) || (i > Math.sqrt( cameraBase.x**2 + cameraBase.y**2 + cameraBase.z**2 ) && !this.focused))) error = true;
    return {x, y, z, error};
  }
  /** 
   * Zooms the element
   * @param {object} camera - camera that zooms
  */
  zoom(camera) {
    if(this.focused) return;
    this.stopZoom()
    this.focused = true;
    this.focus(camera);
    this.orbitateCamera(camera);
  }
  resetZoom(camera) {
    let i = 1;
    for(let j=1; i>0; i-=0.02, j+=1) {
      setTimeout(() => {
        const cords = this.rectaCords({
          x: this.currentPosition[0],
          y: this.currentPosition[1],
          z: this.currentPosition[2]
        }, i, true)
        camera.lookAt(cords.x, cords.y, cords.z)
    }, 10*j)
    }
    if(i < 0) this.fixCamera(camera);
  }
  /** 
   * Unzooms the element
   * @param {object} camera - camera that unzooms
  */
   unzoom(camera) {
    if(!this.focused) return;
    this.stopZoom();
    this.focused = false;
    const initial = camera.position;
    let landa = 1;
    this.zoomID = setInterval(() => {
        landa += 0.0001;
        const cords = this.rectaCords(initial, landa);
        camera.position.x = cords.x;
        camera.position.y = cords.y;
        camera.position.z = cords.z;
        if(cords.error === true) {
          this.stopFocus();
          this.resetZoom(camera);
          this.stopZoom();
        }
    }, 10)
  }
  fixCamera(camera) {
    let initial = camera.position
    for(let i=1, j=1; i>0; i-=0.02, j+=1) {
      setTimeout(() => {
        camera.position.x = (-cameraBase.x + initial.x) * i + cameraBase.x
        camera.position.y = (-cameraBase.y + initial.y) * i + cameraBase.y
        camera.position.z = (-cameraBase.z + initial.z) * i + cameraBase.z
    }, 10*j)
    }
  }
   /** Stop the zoom of the element */
  stopZoom() {
    clearInterval(this.zoomID);
  }
  /** 
   * Start the orbit of the element
   * @param {object} mesh - mesh to orbitate
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
  orbitateCamera(camera) {
    let landa = 1;
    const xFinal = this.currentPosition[0]*2;
    const yFinal = this.currentPosition[1]*2 + 1;
    const zFinal = this.currentPosition[2]*2;
    const camera0 = setInterval(() => {
      if(landa < 0) {
        clearInterval(camera0);
      }  
      camera.position.x = (camera.position.x - xFinal)*landa + xFinal;
      camera.position.y = (camera.position.y - yFinal)*landa + yFinal;
      camera.position.z = (camera.position.z - zFinal)*landa + zFinal;
      landa -= 0.01;
    }, 10)
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
  /** Stop the rotation of the element */
  stopRotate() {
    clearInterval(this.rotationID);
  }
  /** Stop the rotation of the element */
  stopOrbitate() {
    clearInterval(this.orbitationID);
  }
  /** 
   * Load the texture of the object
   * @returns {object} Texture
  */
  loadTexture() {
    return new TextureLoader().load(this.props.base);
  }
  /** 
   * Renders the object
   * @returns {object} Mesh
  */
  render() {
    const mesh = this.myRef
    document.addEventListener("keydown", event => {
      if(event.key === "Escape") this.unzoom(this.props.camera);
    })
    this.rotate(mesh)
    this.orbitate(mesh)
    return (
      <>
        <mesh castShadow={true} receiveShadow position={this.props.position} ref={mesh} onClick={(e) => this.zoom(this.props.camera, e)}>
          <sphereGeometry args={[this.props.size, 30, 30]} />
          <meshStandardMaterial color="white"/>
        </mesh>
        <EffectComposer multisampling={5} autoClear={false}>
          <Outline blur={true} selection={mesh} selectionLayer={10} visibleEdgeColor={"#4B8AB7"} hiddenEdgeColor={"#4B8AB7"} edgeStrength={10} width={1000} />
        </EffectComposer>
        <Orbit xRadius={this.props.orbitSize} zRadius={this.props.orbitSize} position={0}/>
      </>
    );
  }
}

export default Satelite;