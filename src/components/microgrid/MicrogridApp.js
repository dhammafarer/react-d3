import React from 'react';
import GraphicContainer from './graphic/GraphicContainer.js';
import GraphicModal from './graphic/GraphicModal.js';
import ControlPanel from './ui/ControlPanel.js';
import SystemSettings from './ui/SystemSettings.js';
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
    this.toggleBuildingState = this.toggleBuildingState.bind(this);
  }

  setActiveSystem (i) {
    this.setState({activeIdx: i});
  }

  toggleBuildingState (idx) {
    let systems = this.state.systems
      .map((s, i) => {
        if (i == this.state.activeIdx) s.buildings.map((b, i) => {
          if (i == idx) b.data.active = !b.data.active;
          return b;
        });
        return s;
      }
    );

    this.setState({systems});
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
    return (
      <div className="microgrid-app">

        <GraphicModal data={this.state.graphicModalContent}
          showModal={this.state.showGraphicModal}
          position={this.state.graphicModalPosition}
          closeModal={this.closeGraphicModal}/>

        <div className="split-pane-vertical">


          <div className="pane-vertical panel">
            <div className="split-pane-horizontal">
              <div className="controls">
                <div className="panel-horizontal">
                  <ControlPanel {...this.state}
                    setActiveSystem={this.setActiveSystem}/>
                </div>
              </div>
              <hr />

              <div className="controls">
                <div className="panel-horizontal">
                  <SystemSettings {...this.state}
                    toggleBuildingState={this.toggleBuildingState}/>
                </div>
              </div>
            </div>
          </div>

          <div className="pane-vertical pane2">
            <div className="split-pane-horizontal">

              <div className="pane-horizontal">
                <div className="horizontal-panel">
                  <div className="horizontal-panel-content">
                    <GraphicContainer systems={this.state.systems} activeIdx={this.state.activeIdx} openGraphicModal={this.openGraphicModal}/>
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
