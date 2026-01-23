import renderer from 'react-test-renderer';
import Hero3D from '../hero/Hero3D';

// Mock Three.js
const mockDomElement = { remove: jest.fn() };

jest.mock('three', () => {
  const actualThree = jest.requireActual('three');

  class MockWebGLRenderer {
    domElement: HTMLElement;
    constructor() {
      this.domElement = global.document.createElement('canvas');
    }
    setSize = jest.fn();
    setPixelRatio = jest.fn();
    render = jest.fn();
    dispose = jest.fn();
  }

  return {
    ...actualThree,
    WebGLRenderer: MockWebGLRenderer,
  };
});

describe('Hero3D Component', () => {
  beforeEach(() => {
    // Mock requestAnimationFrame
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      return 1;
    });
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const component = renderer.create(<Hero3D />);
    const tree = component.toJSON();
    expect(tree).not.toBeNull();
  });

  it('should render the hero-3d container', () => {
    const component = renderer.create(<Hero3D />);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    expect(tree.type).toBe('div');
    expect(tree.props.className).toBe('hero-3d');
  });

  it('should render the canvas container with correct attributes', () => {
    const component = renderer.create(<Hero3D />);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    const canvasContainer = tree.children!.find(
      (child) => typeof child === 'object' && child !== null && 'props' in child && child.props.className === 'hero-3d__canvas'
    ) as renderer.ReactTestRendererJSON;

    expect(canvasContainer).toBeDefined();
    expect(canvasContainer.props.tabIndex).toBe(0);
    expect(canvasContainer.props.role).toBe('application');
    expect(canvasContainer.props['aria-label']).toContain('Interactive 3D scene');
  });

  it('should render the content section with hello text', () => {
    const component = renderer.create(<Hero3D />);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    const contentDiv = tree.children!.find(
      (child) => typeof child === 'object' && child !== null && 'props' in child && child.props.className === 'hero-3d__content'
    ) as renderer.ReactTestRendererJSON;

    expect(contentDiv).toBeDefined();

    const hello = contentDiv.children!.find(
      (child) => typeof child === 'object' && child !== null && 'props' in child && child.props.className === 'hero-3d__hello'
    ) as renderer.ReactTestRendererJSON;

    expect(hello).toBeDefined();
    expect(hello.children).toContain('Hello.');
  });

  it('should render the title', () => {
    const component = renderer.create(<Hero3D />);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    const contentDiv = tree.children!.find(
      (child) => typeof child === 'object' && child !== null && 'props' in child && child.props.className === 'hero-3d__content'
    ) as renderer.ReactTestRendererJSON;

    const title = contentDiv.children!.find(
      (child) => typeof child === 'object' && child !== null && 'props' in child && child.props.className === 'hero-3d__title'
    ) as renderer.ReactTestRendererJSON;

    expect(title).toBeDefined();
    expect(title.type).toBe('h1');
  });

  it('should render the controls section', () => {
    const component = renderer.create(<Hero3D />);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    const controlsDiv = tree.children!.find(
      (child) => typeof child === 'object' && child !== null && 'props' in child && child.props.className?.includes('hero-3d__controls')
    ) as renderer.ReactTestRendererJSON;

    expect(controlsDiv).toBeDefined();
  });

  it('should display hint text for controls', () => {
    const component = renderer.create(<Hero3D />);
    const tree = component.toJSON() as renderer.ReactTestRendererJSON;

    const controlsDiv = tree.children!.find(
      (child) => typeof child === 'object' && child !== null && 'props' in child && child.props.className?.includes('hero-3d__controls')
    ) as renderer.ReactTestRendererJSON;

    const hint = controlsDiv.children!.find(
      (child) => typeof child === 'object' && child !== null && 'props' in child && child.props.className === 'hero-3d__hint'
    ) as renderer.ReactTestRendererJSON;

    expect(hint).toBeDefined();
  });

  it('should match snapshot', () => {
    const component = renderer.create(<Hero3D />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
