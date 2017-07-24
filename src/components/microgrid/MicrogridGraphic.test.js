/* globals describe, it, expect*/
import React from 'react';
import renderer from 'react-test-renderer';
import MicrogridGraphic from './MicrogridGraphic.js';

describe('MicrogridGraphic', () => {
  it('displays the graphic', () => {
    const options = {createNodeMock};
    const tree = renderer.create(
      <MicrogridGraphic />,
      options
    );

    expect(tree).toMatchSnapshot();
  });
});

function createNodeMock (element) {
  if (element.type === 'div') {
    return {style: {}, offsetWidth: 800};
  }
  return null;
}
