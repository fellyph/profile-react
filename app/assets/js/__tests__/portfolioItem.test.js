'use strict';

import React from 'react';
import renderer from 'react-test-renderer';
import PortfolioItem from '../portfolio/portfolioItem';

// Mock the Thumb component to isolate PortfolioItem tests
jest.mock('../common/thumb', () => {
  return function MockThumb(props) {
    return <div data-testid="mock-thumb" data-imageurl={props.imageUrl} data-imagealt={props.imageAlt} />;
  };
});

describe('PortfolioItem Component', () => {
  const defaultProps = {
    imageUrl: 'https://example.com/portfolio.jpg',
    imageAlt: 'Portfolio project screenshot',
    title: 'My Awesome Project',
    content: '<p>This is a project description</p>'
  };

  it('should render without crashing', () => {
    const component = renderer.create(<PortfolioItem {...defaultProps} />);
    const tree = component.toJSON();
    expect(tree).not.toBeNull();
  });

  it('should render an article element with job class', () => {
    const component = renderer.create(<PortfolioItem {...defaultProps} />);
    const tree = component.toJSON();

    expect(tree.type).toBe('article');
    expect(tree.props.className).toBe('job');
  });

  it('should render the title in an h4 element', () => {
    const component = renderer.create(<PortfolioItem {...defaultProps} />);
    const tree = component.toJSON();

    // Find the h4 element (should be second child after Thumb)
    const h4 = tree.children.find(child => child.type === 'h4');
    expect(h4).toBeDefined();
    expect(h4.props.className).toBe('title');
    expect(h4.children).toContain('My Awesome Project');
  });

  it('should render the Thumb component with correct props', () => {
    const component = renderer.create(<PortfolioItem {...defaultProps} />);
    const tree = component.toJSON();

    // Find the mocked Thumb component (rendered as div with data-testid)
    const thumbMock = tree.children.find(child =>
      child.props && child.props['data-testid'] === 'mock-thumb'
    );
    expect(thumbMock).toBeDefined();
    expect(thumbMock.props['data-imageurl']).toBe('https://example.com/portfolio.jpg');
    expect(thumbMock.props['data-imagealt']).toBe('Portfolio project screenshot');
  });

  it('should render content using dangerouslySetInnerHTML', () => {
    const component = renderer.create(<PortfolioItem {...defaultProps} />);
    const tree = component.toJSON();

    // Find the description div
    const descriptionDiv = tree.children.find(child =>
      child.type === 'div' && child.props.className === 'description'
    );
    expect(descriptionDiv).toBeDefined();
    expect(descriptionDiv.props.dangerouslySetInnerHTML).toBeDefined();
    expect(descriptionDiv.props.dangerouslySetInnerHTML.__html).toBe('<p>This is a project description</p>');
  });

  it('should handle missing optional imageCaption prop', () => {
    const propsWithoutCaption = {
      imageUrl: 'https://example.com/image.jpg',
      imageAlt: 'Alt text',
      title: 'Title',
      content: 'Content'
    };

    const component = renderer.create(<PortfolioItem {...propsWithoutCaption} />);
    const tree = component.toJSON();
    expect(tree).not.toBeNull();
  });

  it('should handle missing optional content prop', () => {
    const propsWithoutContent = {
      imageUrl: 'https://example.com/image.jpg',
      imageAlt: 'Alt text',
      title: 'Title'
    };

    const component = renderer.create(<PortfolioItem {...propsWithoutContent} />);
    const tree = component.toJSON();
    expect(tree).not.toBeNull();
  });

  it('should render with optional imageCaption prop', () => {
    const propsWithCaption = {
      ...defaultProps,
      imageCaption: 'A caption for the image'
    };

    const component = renderer.create(<PortfolioItem {...propsWithCaption} />);
    const tree = component.toJSON();
    expect(tree).not.toBeNull();
  });

  // Snapshot test
  it('should match snapshot', () => {
    const component = renderer.create(<PortfolioItem {...defaultProps} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
