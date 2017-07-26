import React from 'react';
import PropTypes from 'prop-types';
import './GraphicModal.scss';
import Transition from 'react-transition-group/Transition';
import { TimelineMax } from 'gsap';
/* eslint-disable no-console */

class GraphicModal extends React.Component {
  onEnter (node) {
    const content = node.querySelector('.graphic-modal-content');
    const background = node.querySelector('.graphic-modal-background');
    const ripple = node.querySelector('.ripple');

    new TimelineMax({onComplete: this.end})
      .set(node, {display: 'block'})
      .to(ripple, 0.5, {transform: 'scale(2)'})
      .to(background, 0.3, {opacity: 1}, "-=0.2")
      .from(content, 0.5, {y: "-=10", opacity: 0})
    ;
  }

  onExiting (node) {
    let content = node.querySelector('.graphic-modal-content');
    let ripple = node.querySelector('.ripple');
    const background = node.querySelector('.graphic-modal-background');
    new TimelineMax({onComplete: this.end})
      .to(ripple, 0.3, {transform: 'scale(0)'})
      .to(background, 0.3, {opacity: 0}, "-=0.1")
      .set(node, {display: 'none'});
  }

  end (done) {
    done();
  }

  render () {
    const {closeModal, showModal, position, data} = this.props;
    return (
      <Transition in={showModal}
        onEnter={this.onEnter}
        onExiting={this.onExiting}
        addEndListener={(node, done) => this.end(done)}
        timeout={300}>
        <div className="graphic-modal">
          <div className="graphic-modal-background" onClick={() => closeModal()}></div>
          <div className="graphic-modal-frame">
            <div className="ripple"/>
            <div className="graphic-modal-content">
              {data &&
                <div>
                  <h1>{data.name}</h1>
                  <div>
                    <button onClick={closeModal}>close</button>
                </div>
                </div>
              }
            </div>
          </div>
        </div>
      </Transition>
    );
  }
}

GraphicModal.propTypes = {
  data: PropTypes.object,
  position: PropTypes.array,
  showModal: PropTypes.bool,
  closeModal: PropTypes.func.isRequired
};

export default GraphicModal;
