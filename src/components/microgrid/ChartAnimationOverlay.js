import React from 'react';

class ChartAnimationOverlay extends React.Component {
  componentDidUpdate () {
    this.props.timeline
      .set(this.rect, {opacity: 1}, 0)
      .to(this.rect, 4, {width: 0, ease: 'Power0.easeNone'}, 0)
      .to(this.line, 4, {x: this.props.width, ease: 'Power0.easeNone'}, 0);
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
      style: {opacity: 0}
    };

    return (
      <g>
        <rect ref={rect => this.rect = rect} {...rectProps}/>
        <rect ref={line => this.line = line} x="0" width="0.5" height={this.props.height} fill="gray"/>
      </g>
    )
  }
}

export default ChartAnimationOverlay;
