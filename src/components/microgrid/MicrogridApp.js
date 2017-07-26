import React from 'react';
import MicrogridGraphic from './graphic/MicrogridGraphic.js';
import Navigation from './ui/Navigation.js';
import GraphicModal from './graphic/GraphicModal.js';
import ControlPanel from './ui/ControlPanel.js';
import { fushan, qimei } from '../../data/microgrid-systems.js';

class MicrogridApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      systems: [fushan, qimei],
      activeIdx: 0,
      showGraphicModal: false,
      graphicModalContent: null,
      graphicModalPosition: [0, 0]
    };
    this.setActiveSystem = this.setActiveSystem.bind(this);
    this.openGraphicModal = this.openGraphicModal.bind(this);
    this.closeGraphicModal = this.closeGraphicModal.bind(this);
  }

  activeSystem () {
    return this.state.systems[this.state.activeIdx];
  }

  setActiveSystem (i) {
    this.setState({activeIdx: i});
  }

  openGraphicModal (e, data) {
    /* eslint-disable no-console */
    let {left, top} = e.target.getBoundingClientRect();
    this.setState({
      showGraphicModal: true,
      graphicModalContent: data,
      graphicModalPosition: [left, top]
    });
  }

  closeGraphicModal () {
    this.setState({
      showGraphicModal: false,
      graphicModalContent: null
    });
  }

  render () {
    let activeSystem = this.activeSystem();

    return (
      <div id="microgrid-app">

        <Navigation />

        <GraphicModal data={this.state.graphicModalContent}
          showModal={this.state.showGraphicModal}
          position={this.state.graphicModalPosition}
          closeModal={this.closeGraphicModal}/>

        <div className="columns">
          <aside className="column is-2-desktop is-3-tablet is-hidden-mobile hero is-fullheight">
            <ControlPanel {...this.state}
              setActiveSystem={this.setActiveSystem}/>
          </aside>

          <main className="column">
            <article className="container">
              <MicrogridGraphic {...activeSystem} openGraphicModal={this.openGraphicModal}/>
            </article>
          </main>
        </div>

        <footer className="footer">
          <div className="container">
            <div className="content has-text-centered">
              microgrid app
            </div>
          </div>
        </footer>

      </div>
    );
  }
}

export default MicrogridApp ;
