import React from 'react';
import { getSolarIrradiance } from '../../api/solar.js';
import { TimelineMax } from 'gsap';
import MicrogridChart from './MicrogridChart.js';
import MicrogridGraphic from './MicrogridGraphic.js';
import ChartControls from './ChartControls.js';

class MicrogridApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data: [],
      timeline: new TimelineMax({paused: false, onUpdate: this.updateSlider.bind(this)}),
      progress: 0
    };
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.addToTimeline = this.addToTimeline.bind(this);
  }

  handleRangeChange (e) {
    this.state.timeline.pause();
    this.setState({progress: e.target.value});
    this.state.timeline.progress(e.target.value / 100);
  }

  updateSlider () {
    this.setState({progress: this.state.timeline.progress() * 100});
  }

  componentDidMount () {
    this.state.timeline
      .addLabel("0", 0)
      .addLabel("6", 6)
      .addLabel("12", 12)
      .addLabel("18", 18)
      .timeScale(8);

    getSolarIrradiance('2010-06-01')
      .then(csv => this.setState({data: csv}));
  }

  addToTimeline (scene, label) {
    this.state.timeline.add(scene, label);
  }

  render () {
    return (
      <div id="microgrid-app">

        <div className="columns">
          <div className="column is-half">
            <MicrogridChart {...this.state} addToTimeline={this.addToTimeline}/>
          </div>
          <div className="column is-half">
            <MicrogridGraphic {...this.state} addToTimeline={this.addToTimeline}/>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <ChartControls tl={this.state.timeline} progress={this.state.progress} handleRangeChange={this.handleRangeChange}/>
          </div>
        </div>

      </div>
    );
  }
}

export default MicrogridApp ;
