
import { Component } from 'react';  

class Inputs extends Component{
  constructor(props) {
    super(props);
    this.state = {
        sateliteCheck: false,
        planetCheck: false,
        sateliteSize: 5,
        planetSize: 10,
    }
  }
  visible(s) {
      switch(s) {
          case "planet": if(this.state.planetCheck) return {display: "block"}
          break;
          case "satelite": if(this.state.sateliteCheck) return {display: "block"}
          break;
          default:
          break;
      }
      return {display: "none", color: "black"}
  }
  focus(e) {
    if(!e.target.checked) return this.setState({ planetCheck: false, sateliteCheck: false });
    if(e.target.id === "planet") this.setState({ planetCheck: true, sateliteCheck: false });
    if(e.target.id === "satelite") this.setState({ sateliteCheck: true, planetCheck: false });
    
  }
  /** 
   * Renders the object
   * @returns {object} Div
  */
  render() {
    return (
        <>
            <div id="inputs">
                <ul className="elementFocus">
                    <li className={this.state.planetCheck ? "checked" : ""} >
                        <input type='checkbox' onChange={e => this.focus(e)} id='planet' checked={this.state.planetCheck}>
                        </input>
                        <label htmlFor="planet">
                            Planet
                        </label>
                    </li>
                    <li className={this.state.sateliteCheck ? "checked" : ""}>
                        <input type="checkbox" onChange={e => this.focus(e)} checked={this.state.sateliteCheck} id='satelite'>
                        </input>
                        <label htmlFor="satelite">
                            Satelite
                        </label>
                    </li>
                </ul>
                <ul id="sateliteInfo" style={this.visible("satelite")}>
                    <li>
                        <input defaultValue={this.state.sateliteSize}/>
                        <label>Size</label>
                    </li>
                    <li>
                        <input defaultValue={this.state.sateliteSpeed}/>
                        <label>Speed</label>
                    </li>
                    <li>
                        <input defaultValue={this.state.sateliteOrbit}/>
                        <label>Orbit</label>
                    </li>
                </ul>
                <ul id="planetInfo" style={this.visible("planet")}>
                    <li id="a">
                        <input defaultValue={this.state.planetSize}/>
                        <label>Size</label>
                    </li>
                    <li>
                        <input defaultValue={this.state.planetSpeed} onChange={e => this.update(e)}/>
                        <label>Speed {this.state.planetSpeed}</label>
                    </li>
                    <li>
                        <input value={this.state.planetOrbit}/>
                        <label>Orbit {this.state.planetOrbit}</label>
                    </li>
                </ul>
            </div>
        </>
    );
  }
}

export default Inputs;