import React from 'react';
import MicrogridGraphic from './graphic/MicrogridGraphic.js';
import GraphicModal from './graphic/GraphicModal.js';
import ControlPanel from './ui/ControlPanel.js';
import { fushan, qimei } from '../../data/microgrid-systems.js';
import './MicrogridApp.scss';

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
      <div className="microgrid-app">

        <GraphicModal data={this.state.graphicModalContent}
          showModal={this.state.showGraphicModal}
          position={this.state.graphicModalPosition}
          closeModal={this.closeGraphicModal}/>

        <div className="split-pane-vertical">


          <div className="pane-vertical panel">
            <div className="controls">
              <ControlPanel {...this.state}
                setActiveSystem={this.setActiveSystem}/>
            </div>
          </div>

          <div className="pane-vertical pane2">
            <div className="split-pane-horizontal">

              <div className="pane-horizontal">
                <div className="horizontal-panel">
                  <div className="horizontal-panel-content">
                    <MicrogridGraphic {...activeSystem} openGraphicModal={this.openGraphicModal}/>
                  </div>
                </div>
              </div>

              <div className="pane-horizontal bottom">
                <div className="horizontal-panel">
                  <div className="horizontal-panel-content">
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MicrogridApp ;
