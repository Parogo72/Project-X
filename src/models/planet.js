import { createRef, Component } from 'react';  
import { TextureLoader } from 'three';
import Orbit from './orbit.js';
import { cameraBase } from '../functions/constants.js';

class Planet extends Component{
  constructor(props) {
    super(props);
    this.texture = this.loadTexture();
    this.myRef = createRef();
    this.focused = false;
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
   * Calculates de position of the camera
   * @param {Array<Number>} initial 
   * @param {Number} landa 
   * @returns {{x: number, y: number, z: number, error: boolean}} Object with position and error
   */
  rectaCords(initial, landa) {
    let error = false;
    let x = initial.x*landa;
    let y = initial.y*landa;
    let z = initial.z*landa;
    let i = Math.sqrt( (x)**2 + (y)**2 + (z)**2 )
    if( (i < this.props.size*2 && this.focused) || (i > Math.sqrt( cameraBase.x**2 + cameraBase.y**2 + cameraBase.z**2 ) && !this.focused)) error = true;
    return {x, y, z, error};
  }
  /** 
   * Zooms the element
   * @param {object} camera - camera that zooms
  */
  zoom(camera) {
    if(this.focused || this.props.parent.focused) return;
    this.stopZoom()
    this.focused = true;
    const initial = camera.position;
    let landa = 1;
    this.zoomID = setInterval(() => {
        landa -= 0.0001;
        const cords = this.rectaCords(initial, landa);
        camera.position.x = cords.x;
        camera.position.y = cords.y;
        camera.position.z = cords.z;
        if(cords.error === true) this.stopZoom();
    }, 10)
  }
  /** 
   * Unzooms the element
   * @param {object} camera - camera that unzooms
  */
   unzoom(camera) {
    if(!this.focused) return;
    this.stopZoom()
    this.focused = false;
    const initial = camera.position;
    let landa = 1;
    this.zoomID = setInterval(() => {
        landa += 0.0001;
        const cords = this.rectaCords(initial, landa);
        camera.position.x = cords.x;
        camera.position.y = cords.y;
        camera.position.z = cords.z;
        if(cords.error === true) this.stopZoom();
    }, 10)
  }
   /** Stop the zoom of the element */
  stopZoom() {
    clearInterval(this.zoomID);
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
   * Renders the object
   * @returns {object} Mesh
  */
  render() {
    document.addEventListener("keydown", event => {
      if(event.key === "Escape") {
        this.unzoom(this.props.camera)
        this.props.parent.unzoom()
      };
    })
    const mesh = this.myRef
    this.rotate(mesh)
    return (
      <>
        <mesh castShadow receiveShadow={true} position={this.props.position} ref={mesh} onClick={(e) => {this.zoom(this.props.camera); this.props.parent.zoom()}}>
          <sphereGeometry args={[this.props.size, 30, 30]} />
          <meshStandardMaterial map={this.texture}/>
        </mesh>
        <Orbit xRadius={this.props.orbitSize} zRadius={this.props.orbitSize} position={100}/>
      </>
    );
  }
}

export default Planet;