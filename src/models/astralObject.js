import { createRef, Component } from 'react';  
import Planet from './planet.js';
import Satelite from './satelite.js';

class AstralObject extends Component{
  constructor(props) {
    super(props);
    this.myRef = createRef();
    this.focused = false;
  }
  zoom() {
    this.focused = true;
  }
  unzoom() {
    this.focused = false;
  }
  /** 
   * Renders the object
   * @returns {object} Mesh
  */
  render() {
    const mesh = this.myRef
    return (
        <>
          <mesh ref={mesh}>
            <Planet position={[0, 0, 0]} size={this.props.rel.calc('planetSize')} base={"/earth.jpeg"} orbitSize={100} camera={this.props.camera} parent={this}/>
            <Satelite position={[-1.5, 0, 0]} size={0.1} orbitSize={1.5} camera={this.props.camera} parent={this}/>
          </mesh>
        </>
    );
  }
}

export default AstralObject;