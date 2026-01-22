'use strict';

import React from 'react';
import renderer from 'react-test-renderer';
import App from '../app';
import axios from 'axios';

// Mock PortfolioList to isolate App tests
jest.mock('../portfolio/portfolioList', () => {
  return function MockPortfolioList(props) {
    return (
      <div
        data-testid="mock-portfolio-list"
        data-jobs={JSON.stringify(props.jobs)}
      />
    );
  };
});

// axios is auto-mocked from __mocks__/axios.js

describe('App Component', () => {
  const mockPortfolioData = [
    {
      id: 1,
      title: { rendered: 'Project One' },
      content: { rendered: '<p>Description one</p>' },
      thumbnail_url: 'https://example.com/thumb1.jpg'
    },
    {
      id: 2,
      title: { rendered: 'Project Two' },
      content: { rendered: '<p>Description two</p>' },
      thumbnail_url: 'https://example.com/thumb2.jpg'
    }
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Setup default mock response (Jest 21 compatible)
    axios.get.mockImplementation(() => Promise.resolve({ data: mockPortfolioData }));
  });

  it('should render without crashing', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).not.toBeNull();
  });

  it('should initialize with empty jobs array in state', () => {
    const component = renderer.create(<App />);
    const instance = component.getInstance();

    expect(instance.state.jobs).toEqual([]);
  });

  it('should have the correct API source URL in state', () => {
    const component = renderer.create(<App />);
    const instance = component.getInstance();

    expect(instance.state.source).toBe('https://blog.fellyph.com.br/wp-json/wp/v2/portfolio');
  });

  it('should fetch portfolio data on mount', () => {
    renderer.create(<App />);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://blog.fellyph.com.br/wp-json/wp/v2/portfolio');
  });

  it('should render PortfolioList component', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();

    expect(tree.props['data-testid']).toBe('mock-portfolio-list');
  });

  it('should pass jobs from state to PortfolioList', async () => {
    const component = renderer.create(<App />);
    const instance = component.getInstance();

    // Manually set state to verify prop passing
    instance.setState({ jobs: mockPortfolioData });

    // Re-render to get updated tree
    const tree = component.toJSON();

    // The jobs prop should contain the state jobs
    const passedJobs = JSON.parse(tree.props['data-jobs']);
    expect(passedJobs).toEqual(mockPortfolioData);
  });

  it('should update state when API call succeeds', (done) => {
    const component = renderer.create(<App />);
    const instance = component.getInstance();

    // Wait for the promise to resolve
    setTimeout(() => {
      expect(instance.state.jobs).toEqual(mockPortfolioData);
      done();
    }, 100);
  });

  it('should handle API errors gracefully', (done) => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    axios.get.mockImplementation(() => Promise.reject(new Error('Network error')));

    const component = renderer.create(<App />);
    const instance = component.getInstance();

    // Wait for the promise to reject
    setTimeout(() => {
      // State should remain with empty jobs array
      expect(instance.state.jobs).toEqual([]);
      consoleError.mockRestore();
      done();
    }, 100);
  });

  it('should handle empty API response', (done) => {
    axios.get.mockImplementation(() => Promise.resolve({ data: [] }));

    const component = renderer.create(<App />);
    const instance = component.getInstance();

    // Wait for the promise to resolve
    setTimeout(() => {
      expect(instance.state.jobs).toEqual([]);
      done();
    }, 100);
  });

  // Snapshot test
  it('should match snapshot with initial state', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('App Component - API Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call correct endpoint', () => {
    renderer.create(<App />);

    expect(axios.get).toHaveBeenCalledWith(
      'https://blog.fellyph.com.br/wp-json/wp/v2/portfolio'
    );
  });

  it('should only make one API call on mount', () => {
    renderer.create(<App />);

    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
