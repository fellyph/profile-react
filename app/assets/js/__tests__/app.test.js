'use strict';

import React from 'react';
import renderer, { act } from 'react-test-renderer';
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

    // Setup default mock response
    axios.get.mockImplementation(() => Promise.resolve({ data: mockPortfolioData }));
  });

  it('should render without crashing', () => {
    let component;
    act(() => {
      component = renderer.create(<App />);
    });
    const tree = component.toJSON();
    expect(tree).not.toBeNull();
  });

  it('should initialize with empty jobs array', () => {
    let component;
    act(() => {
      component = renderer.create(<App />);
    });
    const tree = component.toJSON();

    // Initially jobs should be empty
    const passedJobs = JSON.parse(tree.props['data-jobs']);
    expect(passedJobs).toEqual([]);
  });

  it('should fetch portfolio data on mount', () => {
    act(() => {
      renderer.create(<App />);
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://blog.fellyph.com.br/wp-json/wp/v2/portfolio');
  });

  it('should render PortfolioList component', () => {
    let component;
    act(() => {
      component = renderer.create(<App />);
    });
    const tree = component.toJSON();

    expect(tree.props['data-testid']).toBe('mock-portfolio-list');
  });

  it('should update with fetched data', async () => {
    let component;
    await act(async () => {
      component = renderer.create(<App />);
      // Wait for the promise to resolve
      await Promise.resolve();
    });

    const tree = component.toJSON();
    const passedJobs = JSON.parse(tree.props['data-jobs']);
    expect(passedJobs).toEqual(mockPortfolioData);
  });

  it('should handle API errors gracefully', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    axios.get.mockImplementation(() => Promise.reject(new Error('Network error')));

    let component;
    await act(async () => {
      component = renderer.create(<App />);
      // Wait for the promise to reject
      await Promise.resolve();
    });

    const tree = component.toJSON();
    // State should remain with empty jobs array
    const passedJobs = JSON.parse(tree.props['data-jobs']);
    expect(passedJobs).toEqual([]);

    consoleError.mockRestore();
  });

  it('should handle empty API response', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: [] }));

    let component;
    await act(async () => {
      component = renderer.create(<App />);
      // Wait for the promise to resolve
      await Promise.resolve();
    });

    const tree = component.toJSON();
    const passedJobs = JSON.parse(tree.props['data-jobs']);
    expect(passedJobs).toEqual([]);
  });

  // Snapshot test
  it('should match snapshot with initial state', () => {
    let component;
    act(() => {
      component = renderer.create(<App />);
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('App Component - API Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
  });

  it('should call correct endpoint', () => {
    act(() => {
      renderer.create(<App />);
    });

    expect(axios.get).toHaveBeenCalledWith(
      'https://blog.fellyph.com.br/wp-json/wp/v2/portfolio'
    );
  });

  it('should only make one API call on mount', () => {
    act(() => {
      renderer.create(<App />);
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
