import React from 'react';
import MicrogridGraphic from './graphic/MicrogridGraphic.js';
import * as systems from '../../data/microgrid-systems.js';

class MicrogridApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      systems,
      activeId: 'fushan'
    };
  }

  componentDidMount () {
  }

  activeSystem () {
    return this.state.systems[this.state.activeId];
  }

  render () {
    return (
      <div id="microgrid-app">

        <div className="columns">
          <div className="column">
            <MicrogridGraphic {...this.activeSystem()}/>
          </div>
        </div>

      </div>
    );
  }
}

export default MicrogridApp ;
