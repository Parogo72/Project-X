import { createRef, Component } from 'react';  
import { TextureLoader } from 'three';

class Sun extends Component{
  constructor(props) {
    super(props);
    this.texture = this.loadTexture();
    this.myRef = createRef();
  }
  /** 
   * Start the rotation of the element
   * @param {object} mesh - mesh to rotate
  */
  rotate(mesh) {
    this.rotationID = setInterval(() => {
      mesh.current.rotation.y += 0.0001;
    }, 10)
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
    const mesh = this.myRef
    this.rotate(mesh)
    return (
      <>
        <mesh position={this.props.position} ref={mesh}>
          <sphereGeometry args={[this.props.size, 30, 30]} />
          <meshStandardMaterial map={this.texture} />
        </mesh>
      </>
    );
  }
}

export default Sun;
