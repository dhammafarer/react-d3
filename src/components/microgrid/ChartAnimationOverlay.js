import React from 'react';
import PropTypes from 'prop-types';
import { TimelineMax } from 'gsap';

class ChartAnimationOverlay extends React.Component {
  componentDidMount () {
    this.props
      .addToTimeline(this.animate1(), "0");
    this.props
      .addToTimeline(this.animate2(), "12");
  }

  animate1 () {
    return new TimelineMax()
      .to(this.rect, 0, {opacity: 1}, 0.01)
      .to(this.rect, 12, {width: this.props.width * 11 / 25, ease: 'Power0.easeNone'}, 0);
  }

  animate2 () {
    return new TimelineMax()
      .to(this.rect, 12, {width: 0, ease: 'Power0.easeNone'});
  }

  render () {
    const rectProps = {
      transform: "rotate(180)",
      y: -1 * this.props.height,
      x: -1 * this.props.width,
      width: this.props.width,
      height: this.props.height,
      fill: "white",
      stroke: "white",
      strokeWidth: "1px",
      opacity: "0"
    };

    return (
      <g>
        <rect ref={rect => this.rect = rect} {...rectProps}/>
      </g>
    );
  }
}

ChartAnimationOverlay.propTypes = {
  timeline: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  addToTimeline: PropTypes.func
};

export default ChartAnimationOverlay;
