'use strict';

import React from 'react';
import renderer from 'react-test-renderer';
import Thumb from '../common/thumb';

describe('Thumb Component', () => {
  const defaultProps = {
    imageUrl: 'https://example.com/image.jpg',
    imageAlt: 'Test image description'
  };

  it('should render without crashing', () => {
    const component = renderer.create(<Thumb {...defaultProps} />);
    const tree = component.toJSON();
    expect(tree).not.toBeNull();
  });

  it('should render a figure element with thumb class', () => {
    const component = renderer.create(<Thumb {...defaultProps} />);
    const tree = component.toJSON();

    expect(tree.type).toBe('figure');
    expect(tree.props.className).toBe('thumb');
  });

  it('should render an image with correct src attribute', () => {
    const component = renderer.create(<Thumb {...defaultProps} />);
    const tree = component.toJSON();

    const img = tree.children[0];
    expect(img.type).toBe('img');
    expect(img.props.src).toBe('https://example.com/image.jpg');
  });

  it('should render an image with correct alt attribute for accessibility', () => {
    const component = renderer.create(<Thumb {...defaultProps} />);
    const tree = component.toJSON();

    const img = tree.children[0];
    expect(img.props.alt).toBe('Test image description');
  });

  it('should render with different imageUrl values', () => {
    const customProps = {
      imageUrl: 'https://different-site.com/photo.png',
      imageAlt: 'Different image'
    };

    const component = renderer.create(<Thumb {...customProps} />);
    const tree = component.toJSON();

    const img = tree.children[0];
    expect(img.props.src).toBe('https://different-site.com/photo.png');
    expect(img.props.alt).toBe('Different image');
  });

  it('should accept optional imageCaption prop without error', () => {
    const propsWithCaption = {
      ...defaultProps,
      imageCaption: 'This is a caption'
    };

    const component = renderer.create(<Thumb {...propsWithCaption} />);
    const tree = component.toJSON();
    expect(tree).not.toBeNull();
  });

  // Snapshot test
  it('should match snapshot', () => {
    const component = renderer.create(<Thumb {...defaultProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
