import renderer, { act } from 'react-test-renderer';
import App from '../app';
import axios from 'axios';
import { Job } from '../types';

jest.mock('../portfolio/portfolioList', () => {
  return function MockPortfolioList(props: { jobs: Job[] }) {
    return (
      <div data-testid="mock-portfolio-list" data-jobs={JSON.stringify(props.jobs)} />
    );
  };
});

describe('App Component', () => {
  const mockPortfolioData: Job[] = [
    {
      id: 1,
      title: { rendered: 'Project One' },
      content: { rendered: '<p>Description one</p>' },
      thumbnail_url: 'https://example.com/thumb1.jpg',
    },
    {
      id: 2,
      title: { rendered: 'Project Two' },
      content: { rendered: '<p>Description two</p>' },
      thumbnail_url: 'https://example.com/thumb2.jpg',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({ data: mockPortfolioData })
    );
  });

  it('should render without crashing', () => {
    let component: renderer.ReactTestRenderer;
    act(() => {
      component = renderer.create(<App />);
    });
    const tree = component!.toJSON();
    expect(tree).not.toBeNull();
  });

  it('should initialize with empty jobs array', () => {
    let component: renderer.ReactTestRenderer;
    act(() => {
      component = renderer.create(<App />);
    });
    const tree = component!.toJSON() as renderer.ReactTestRendererJSON;

    const passedJobs = JSON.parse(tree.props['data-jobs']);
    expect(passedJobs).toEqual([]);
  });

  it('should fetch portfolio data on mount', () => {
    act(() => {
      renderer.create(<App />);
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      'https://blog.fellyph.com.br/wp-json/wp/v2/portfolio'
    );
  });

  it('should render PortfolioList component', () => {
    let component: renderer.ReactTestRenderer;
    act(() => {
      component = renderer.create(<App />);
    });
    const tree = component!.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.props['data-testid']).toBe('mock-portfolio-list');
  });

  it('should update with fetched data', async () => {
    let component: renderer.ReactTestRenderer;
    await act(async () => {
      component = renderer.create(<App />);
      await Promise.resolve();
    });

    const tree = component!.toJSON() as renderer.ReactTestRendererJSON;
    const passedJobs = JSON.parse(tree.props['data-jobs']);
    expect(passedJobs).toEqual(mockPortfolioData);
  });

  it('should handle API errors gracefully', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error('Network error'))
    );

    let component: renderer.ReactTestRenderer;
    await act(async () => {
      component = renderer.create(<App />);
      await Promise.resolve();
    });

    const tree = component!.toJSON() as renderer.ReactTestRendererJSON;
    const passedJobs = JSON.parse(tree.props['data-jobs']);
    expect(passedJobs).toEqual([]);

    consoleError.mockRestore();
  });

  it('should handle empty API response', async () => {
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({ data: [] })
    );

    let component: renderer.ReactTestRenderer;
    await act(async () => {
      component = renderer.create(<App />);
      await Promise.resolve();
    });

    const tree = component!.toJSON() as renderer.ReactTestRendererJSON;
    const passedJobs = JSON.parse(tree.props['data-jobs']);
    expect(passedJobs).toEqual([]);
  });

  it('should match snapshot with initial state', () => {
    let component: renderer.ReactTestRenderer;
    act(() => {
      component = renderer.create(<App />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('App Component - API Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({ data: [] })
    );
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
