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
    return new TextureLoader().load(this.props.data.sun.texture);
  }
  setup() {
    const obj = this.props.data
    obj.sun.size = this.props.rel.calc("sunSize")
    this.props.updateKey(obj)
  }
  
  /** 
   * Renders the object
   * @returns {object} Mesh
  */
  render() {
    const mesh = this.myRef;
    this.stopRotate();
    this.rotate(mesh);
    return (
      <>
        <mesh position={[this.props.data.planet.orbit, this.props.data.sun.position.y, this.props.data.sun.position.z ]} ref={mesh}>
          <sphereGeometry args={[this.props.data.sun.size, 30, 30]} />
          <meshStandardMaterial map={this.texture} />
        </mesh>
      </>
    );
  }
}

export default Sun;
