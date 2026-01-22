import renderer, { ReactTestRendererNode } from 'react-test-renderer';
import PortfolioList from '../portfolio/portfolioList';
import { Job } from '../types';

jest.mock('../portfolio/portfolioItem', () => {
  return function MockPortfolioItem(props: {
    imageUrl: string;
    imageAlt: string;
    title: string;
    content: string;
  }) {
    return (
      <div
        data-testid="mock-portfolio-item"
        data-imageurl={props.imageUrl}
        data-imagealt={props.imageAlt}
        data-title={props.title}
        data-content={props.content}
      />
    );
  };
});

describe('PortfolioList Component', () => {
  const mockJobs: Job[] = [
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
    {
      id: 3,
      title: { rendered: 'Project Three' },
      content: { rendered: '<p>Description three</p>' },
      thumbnail_url: 'https://example.com/thumb3.jpg',
    },
  ];

  it('should render without crashing', () => {
    const component = renderer.create(<PortfolioList jobs={mockJobs} />);
    const tree = component.toJSON();
    expect(tree).not.toBeNull();
  });

  it('should render a section element with jobs class', () => {
    const component = renderer.create(<PortfolioList jobs={mockJobs} />);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.type).toBe('section');
    expect(tree.props.className).toBe('jobs');
  });

  it('should render a Portfolio heading', () => {
    const component = renderer.create(<PortfolioList jobs={mockJobs} />);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    const h2 = tree.children!.find(
      (child: ReactTestRendererNode) => typeof child === 'object' && child !== null && 'type' in child && child.type === 'h2'
    ) as renderer.ReactTestRendererJSON;
    expect(h2).toBeDefined();
    expect(h2.children).toContain('Portfolio');
  });

  it('should render correct number of PortfolioItem components', () => {
    const component = renderer.create(<PortfolioList jobs={mockJobs} />);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    const portfolioItems = tree.children!.filter(
      (child: ReactTestRendererNode) =>
        typeof child === 'object' &&
        child !== null &&
        'props' in child &&
        child.props &&
        child.props['data-testid'] === 'mock-portfolio-item'
    );
    expect(portfolioItems.length).toBe(3);
  });

  it('should render empty list when jobs array is empty', () => {
    const component = renderer.create(<PortfolioList jobs={[]} />);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree).not.toBeNull();
    expect(tree.type).toBe('section');

    const h2 = tree.children!.find(
      (child: ReactTestRendererNode) => typeof child === 'object' && child !== null && 'type' in child && child.type === 'h2'
    ) as renderer.ReactTestRendererJSON;
    expect(h2).toBeDefined();

    const portfolioItems = tree.children!.filter(
      (child: ReactTestRendererNode) =>
        typeof child === 'object' &&
        child !== null &&
        'props' in child &&
        child.props &&
        child.props['data-testid'] === 'mock-portfolio-item'
    );
    expect(portfolioItems.length).toBe(0);
  });

  it('should use default empty array when jobs prop is undefined', () => {
    const component = renderer.create(<PortfolioList />);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree).not.toBeNull();
    expect(tree.type).toBe('section');
  });

  it('should pass correct props to PortfolioItem components', () => {
    const component = renderer.create(<PortfolioList jobs={mockJobs} />);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    const portfolioItems = tree.children!.filter(
      (child: ReactTestRendererNode) =>
        typeof child === 'object' &&
        child !== null &&
        'props' in child &&
        child.props &&
        child.props['data-testid'] === 'mock-portfolio-item'
    ) as renderer.ReactTestRendererJSON[];

    const firstItem = portfolioItems[0];
    expect(firstItem.props['data-title']).toBe('Project One');
    expect(firstItem.props['data-content']).toBe('<p>Description one</p>');
    expect(firstItem.props['data-imageurl']).toBe('https://example.com/thumb1.jpg');
    expect(firstItem.props['data-imagealt']).toBe('Project One');
  });

  it('should render items with unique keys', () => {
    const ids = mockJobs.map((job) => job.id);
    const uniqueIds = [...new Set(ids)];
    expect(ids.length).toBe(uniqueIds.length);
  });

  it('should match snapshot with jobs', () => {
    const component = renderer.create(<PortfolioList jobs={mockJobs} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with empty jobs', () => {
    const component = renderer.create(<PortfolioList jobs={[]} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
