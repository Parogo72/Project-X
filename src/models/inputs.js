
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
  update(e) {
      console.log(e)
  }
  focus(e) {
    if(!e.target.checked) return this.setState({ planetCheck: false, sateliteCheck: false });
    if(e.target.id === "planet") return this.setState({ planetCheck: true, sateliteCheck: false });
    if(e.target.id === "satelite") return this.setState({ sateliteCheck: true, planetCheck: false });
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
                <E state={this.state}></E>
            </div>
        </>
    );
  }
}

export default Inputs;

function E(e) {
    if(e.state.sateliteCheck) {
        return(<ul id="sateliteInfo">
            <li>
                <input value={e.state.sateliteSize}/>
                <label>Size</label>
            </li>
            <li>
                <input value={e.state.sateliteSpeed}/>
                <label>Speed</label>
            </li>
            <li>
                <input value={e.state.sateliteOrbit}/>
                <label>Orbit</label>
            </li>
        </ul>)
    }
    if(e.state.planetCheck) {
        return(<ul id="planetInfo">
            <li id="a">
                <input value={e.state.planetSize}/>
                <label>Size</label>
            </li>
            <li>
                <input value={e.state.planetSpeed} onChange={e => this.update(e)}/>
                <label>Speed {e.state.planetSpeed}</label>
            </li>
            <li>
                <input value={e.state.planetOrbit}/>
                <label>Orbit {e.state.planetOrbit}</label>
            </li>
        </ul>)
    }
    return <ul></ul>
  }