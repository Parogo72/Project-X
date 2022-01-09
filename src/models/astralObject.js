import { createRef, Component } from 'react';  
import Planet from './planet.js';
import Satelite from './satelite.js';

class AstralObject extends Component{
  constructor(props) {
    super(props);
    this.myRef = createRef();
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
            <Planet updateKey={this.props.updateKey} data={this.props.data} position={[this.props.data.planet.position.x, this.props.data.planet.position.y, this.props.data.planet.position.z]} size={this.props.data.planet.size} base={this.props.data.planet.texture} orbitSize={this.props.data.planet.orbit} camera={this.props.camera} parent={this}/>
            <Satelite updateKey={this.props.updateKey} data={this.props.data} position={[this.props.data.satelite.position.x, this.props.data.satelite.position.y, this.props.data.satelite.position.z]} size={this.props.data.satelite.size} orbitSize={this.props.data.satelite.orbit} camera={this.props.camera} parent={this}/>
          </mesh>
        </>
    );
  }
}

export default AstralObject;