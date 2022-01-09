
import { Component } from 'react';  

class Inputs extends Component{
  constructor(props) {
    super(props);
    this.planet = false;
    this.satelite = false;
  }
  change(s, c, e) {
    const obj = this.props.data
    if(isNaN(Number(e)) || Number(e) === 0) return;
    obj[s][c] = e
    this.props.updateKey(obj)
  }
  visible(s) {
      switch(s) {
          case "planet": if(this.props.data.planet.focus) return {display: "block"}
          break;
          case "satelite": if(this.props.data.satelite.focus) return {display: "block"}
          break;
          default:
          break;
      }
      return {display: "none", color: "black"}
  }
  focus(e) {
    if(!e.target.checked) {
        this.props.data.planet.focus = false;
        this.props.data.satelite.focus = false
        return
    }
    if(e.target.id === "planet") {
        this.props.data.planet.focus = true;
        this.props.data.satelite.focus = false;
        return
    }
    if(e.target.id === "satelite") {
        this.props.data.planet.focus = false;
        this.props.data.satelite.focus = true;
        return
    }
    
  }
  
  waitChange() {
      clearInterval(this.waitChangeID)
      this.waitChangeID = setInterval(() => {
        if(this.props.data.planet.focus !== this.planet ||  this.props.data.satelite.focus !== this.satelite) this.forceUpdate();
      }, 1)
  }
  /** 
   * Renders the object
   * @returns {object} Div
  */
  render() {
    this.satelite = this.props.data.satelite.focus;
    this.planet = this.props.data.planet.focus;
    this.waitChange();
    return (
        <>
            <div id="inputs">
                <ul className="elementFocus">
                    <li className={this.props.data.planet.focus ? "checked" : ""} >
                        <input type='checkbox' onChange={e => this.focus(e)} id='planet' checked={this.props.data.planet.focus}>
                        </input>
                        <label htmlFor="planet">
                            Planet
                        </label>
                    </li>
                    <li className={this.props.data.satelite.focus ? "checked" : ""}>
                        <input type="checkbox" onChange={e => this.focus(e)} checked={this.props.data.satelite.focus} id='satelite'>
                        </input>
                        <label htmlFor="satelite">
                            Satelite
                        </label>
                    </li>
                </ul>
                <ul id="sateliteInfo" style={this.visible("satelite")}>
                    <li>
                        <input defaultValue={this.props.data.satelite.size} onInput={e => this.change("satelite", "size", e.target.value)} type="number"/>
                        <label>Size</label>
                    </li>
                    <li>
                        <input defaultValue={this.props.data.satelite.speed} onInput={e => this.change("satelite", "speed", e.target.value)} type="number"/>
                        <label>Speed</label>
                    </li>
                    <li>
                        <input defaultValue={this.props.data.satelite.orbit} onInput={e => this.change("satelite", "orbit", e.target.value)} type="number"/>
                        <label>Orbit</label>
                    </li>
                </ul>
                <ul id="planetInfo" style={this.visible("planet")}>
                    <li id="a">
                        <input defaultValue={this.props.data.planet.size} onInput={e => this.change("planet", "size", e.target.value)} type="number"/>
                        <label>Size</label>
                    </li>
                    <li>
                        <input defaultValue={this.props.data.planet.speed} onInput={e => this.change("planet", "speed", e.target.value)} type="number"/>
                        <label>Speed</label>
                    </li>
                    <li>
                        <input defaultValue={this.props.data.planet.orbit} onInput={e => this.change("planet", "orbit", e.target.value)} type="number"/>
                        <label>Orbit</label>
                    </li>
                </ul>
            </div>
        </>
    );
  }
}

export default Inputs;