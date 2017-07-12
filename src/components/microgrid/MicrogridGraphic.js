import React from 'react';
import PropTypes from 'prop-types';
import { TimelineMax } from 'gsap';

class MicrogridGraphic extends React.Component {
  componentDidMount () {
    this.props.addToTimeline(this.animate(), "0");
  }

  animate () {
    return new TimelineMax()
      .to(this.rect, 6, {fill: "#ceeae6", ease: "Power2.easeIn"}, 0)
      .to(this.rect, 6, {fill: "#9bcfea", ease: "Power2.easeIn"})
      .to(this.rect, 6, {fill: "#2b7cb3", ease: "Power1.easeIn"})
      .to(this.rect, 2, {fill: "#154167", ease: "Power2.easeIn"})
      .to(this.rect, 4, {fill: "#333", ease: "Power2.easeIn"});
  }

  render () {
    return (
      <svg viewBox="0 0 400 300">
        <rect ref={rect => this.rect = rect} fill="#333" x="10" y="10" width="1000" height="400"/>
      </svg>
    );
  }
}

MicrogridGraphic.propTypes = {
  timeline: PropTypes.object.isRequired,
  addToTimeline: PropTypes.func.isRequired
};

export default MicrogridGraphic;
