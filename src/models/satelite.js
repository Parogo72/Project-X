
import { createRef, Component } from 'react';  
import { TextureLoader } from 'three';
import Orbit from './orbit.js';

class Satelite extends Component{
  constructor(props) {
    super(props);
    this.texture = this.loadTexture();
    this.myRef = createRef();
  }
  /** 
   * Start the orbit of the element
   * @param {object} mesh - mesh to orbitate
  */
  orbitate(mesh) {
    let i = 0;
    this.rbitationID = setInterval(() => {
      if(i === 1000) i = 0;
      const angle = (i / 1000) * 2 * Math.PI;
      const x = this.props.orbit * Math.cos(angle);
      const z = this.props.orbit * Math.sin(angle);
      mesh.current.position.x = x;
      mesh.current.position.z = z;
      i += 0.5;
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
    this.rotate(mesh)
    this.orbitate(mesh)
    return (
      <>
        <mesh castShadow={true} receiveShadow position={this.props.position} ref={mesh}>
          <sphereGeometry args={[this.props.size, 30, 30]} />
          <meshStandardMaterial color="white"/>
        </mesh>
        <Orbit xRadius={this.props.orbit} zRadius={this.props.orbit} position={0}/>
      </>
    );
  }
}

export default Satelite;