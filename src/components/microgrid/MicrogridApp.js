import React from 'react';
import MicrogridGraphic from './graphic/MicrogridGraphic.js';
import { fushan, qimei } from '../../data/microgrid-systems.js';

class MicrogridApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      systems: [fushan, qimei],
      activeId: 0
    };
  }

  componentDidMount () {
  }

  activeSystem () {
    return this.state.systems[this.state.activeId];
  }

  setActiveSystem (i) {
    this.setState({activeId: i});
  }

  render () {
    let activeSystem = this.activeSystem();

    return (
      <div id="microgrid-app">

        <div className="columns">
          <div className="column is-one-quarter">
            <div>
              {this.state.systems.map((el, i) =>
                <button className="button"
                  onClick={() => this.setActiveSystem(i)}
                  key={el.id}>
                  {el.id}
                </button>
              )}
            </div>
          </div>

          <div className="column is-three-quarter">
            <MicrogridGraphic {...activeSystem}/>
          </div>
        </div>

      </div>
    );
  }
}

export default MicrogridApp ;
