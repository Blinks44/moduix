import { afterAll, beforeAll, expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { Carousel } from '../src';

const originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;
const dimensionDescriptors = {
  offsetHeight: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight'),
  offsetWidth: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth'),
  scrollHeight: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollHeight'),
  scrollWidth: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollWidth'),
};

const getDimension = (element: HTMLElement, dimension: keyof typeof dimensionDescriptors) => {
  const part = element.getAttribute('data-part');

  if (part === 'item-group') {
    return dimension === 'offsetWidth' || dimension === 'offsetHeight' ? 100 : 200;
  }

  if (part === 'item') return 100;

  const descriptor = dimensionDescriptors[dimension];
  return descriptor?.get?.call(element) ?? descriptor?.value ?? 0;
};

beforeAll(() => {
  HTMLElement.prototype.getBoundingClientRect = function () {
    const part = this.getAttribute('data-part');

    if (part === 'item-group') return createRect(0, 0, 100, 100);

    if (part === 'item') {
      const left = Number(this.getAttribute('data-index')) * 100;
      return createRect(left, 0, 100, 100);
    }

    return originalGetBoundingClientRect.call(this);
  };

  for (const dimension of Object.keys(dimensionDescriptors) as Array<
    keyof typeof dimensionDescriptors
  >) {
    Object.defineProperty(HTMLElement.prototype, dimension, {
      configurable: true,
      get() {
        return getDimension(this, dimension);
      },
    });
  }
});

afterAll(() => {
  HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect;

  for (const [dimension, descriptor] of Object.entries(dimensionDescriptors)) {
    if (descriptor) Object.defineProperty(HTMLElement.prototype, dimension, descriptor);
  }
});

function createRect(left: number, top: number, width: number, height: number): DOMRect {
  return {
    bottom: top + height,
    height,
    left,
    right: left + width,
    top,
    width,
    x: left,
    y: top,
    toJSON: () => ({}),
  };
}

function TestCarousel(props: {
  dir?: 'ltr' | 'rtl';
  onPageChange?: (details: { page: number }) => void;
}) {
  return (
    <Carousel
      aria-label="Travel gallery"
      dir={props.dir}
      onPageChange={props.onPageChange}
      slideCount={2}
    >
      <Carousel.ItemGroup>
        <Carousel.Item index={0}>First</Carousel.Item>
        <Carousel.Item index={1}>Second</Carousel.Item>
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
        <Carousel.Indicators />
      </Carousel.Control>
      <Carousel.ProgressText />
    </Carousel>
  );
}

test('labels the carousel landmark and renders its default page controls', () => {
  render(() => <TestCarousel />);

  expect(screen.getByRole('region', { name: 'Travel gallery' })).toHaveAttribute(
    'aria-roledescription',
    'carousel',
  );
  expect(screen.getByRole('button', { name: 'Previous slide' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Next slide' })).toBeEnabled();
  expect(screen.getByRole('button', { name: 'Go to slide 1' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Go to slide 2' })).toBeInTheDocument();
  expect(screen.getByText('1 / 2')).toBeInTheDocument();
});

test('keeps Ark page-change details and direction on the root', async () => {
  const pages: number[] = [];
  render(() => <TestCarousel dir="rtl" onPageChange={(details) => pages.push(details.page)} />);

  fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));

  expect(screen.getByRole('region', { name: 'Travel gallery' })).toHaveAttribute('dir', 'rtl');
  await waitFor(() => expect(pages).toEqual([1]));
});

test('preserves ordinary refs and generated indicator styling hooks', () => {
  let rootRef!: HTMLDivElement;
  let indicatorsRef!: HTMLDivElement;

  render(() => (
    <Carousel ref={(element) => (rootRef = element)} aria-label="Gallery" slideCount={2}>
      <Carousel.ItemGroup>
        <Carousel.Item index={0}>First</Carousel.Item>
        <Carousel.Item index={1}>Second</Carousel.Item>
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
        <Carousel.Indicators
          ref={(element) => (indicatorsRef = element)}
          indicatorClassName="generated-indicator"
        />
      </Carousel.Control>
    </Carousel>
  ));

  const root = screen.getByRole('region', { name: 'Gallery' });

  expect(rootRef).toBe(root);
  expect(root).toHaveAttribute('data-slot', 'carousel-root');
  expect(root).toHaveAttribute('data-scope', 'carousel');
  expect(indicatorsRef).toHaveAttribute('data-slot', 'carousel-indicator-group');
  expect(indicatorsRef.querySelectorAll('.generated-indicator')).toHaveLength(2);
});

test('preserves semantic hosts with native Ark Solid asChild composition', () => {
  render(() => (
    <Carousel
      asChild={(props) => <section {...props()} data-testid="composed-carousel" />}
      aria-label="Composed gallery"
      slideCount={2}
    >
      <Carousel.ItemGroup>
        <Carousel.Item index={0}>First</Carousel.Item>
        <Carousel.Item index={1}>Second</Carousel.Item>
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger
          asChild={(props) => (
            <button {...props()} type="button">
              Back
            </button>
          )}
        />
        <Carousel.NextTrigger />
        <Carousel.Indicators indicatorClassName="generated-indicator" />
      </Carousel.Control>
    </Carousel>
  ));

  const root = screen.getByTestId('composed-carousel');
  const previous = screen.getByRole('button', { name: 'Previous slide' });

  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'carousel-root');
  expect(root).toHaveAttribute('data-scope', 'carousel');
  expect(previous.tagName).toBe('BUTTON');
  expect(previous).toHaveTextContent('Back');
  expect(previous).toBeDisabled();
  expect(root.querySelectorAll('.generated-indicator')).toHaveLength(2);
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let rootRef: HTMLDivElement | undefined;

  render(() => (
    <Carousel
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} />}
      aria-label="Composed gallery"
      slideCount={2}
    />
  ));

  expect(rootRef).toBeUndefined();
});

test('keeps component-owned visual utilities visible and lets consumers override them', () => {
  render(() => (
    <Carousel aria-label="Styled gallery" class="gap-0" slideCount={2}>
      <Carousel.ItemGroup>
        <Carousel.Item index={0}>First</Carousel.Item>
        <Carousel.Item index={1}>Second</Carousel.Item>
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger class="size-5 bg-primary" />
        <Carousel.NextTrigger />
        <Carousel.Indicators />
      </Carousel.Control>
      <Carousel.ProgressText class="text-lg" />
    </Carousel>
  ));

  const root = screen.getByRole('region', { name: 'Styled gallery' });
  const previous = screen.getByRole('button', { name: 'Previous slide' });
  const indicator = screen.getByRole('button', { name: 'Go to slide 1' });
  const progress = screen.getByText('1 / 2');

  expect(root).toHaveClass('gap-0');
  expect(root).not.toHaveClass('gap-3');
  expect(previous).toHaveClass('size-5', 'bg-primary', 'rounded-full');
  expect(previous).not.toHaveClass('size-control-md', 'bg-card');
  expect(indicator).toHaveClass('size-2', 'rounded-full', 'bg-muted');
  expect(progress).toHaveClass('text-lg');
  expect(progress).not.toHaveClass('text-sm');
});

test('lets consumers override runtime indicator sizing with state utilities', () => {
  render(() => (
    <Carousel aria-label="Thumbnail gallery" slideCount={2}>
      <Carousel.ItemGroup>
        <Carousel.Item index={0}>First</Carousel.Item>
        <Carousel.Item index={1}>Second</Carousel.Item>
      </Carousel.ItemGroup>
      <Carousel.IndicatorGroup>
        <Carousel.Indicator
          index={0}
          class="h-12 w-20 bg-transparent data-current:h-12 data-current:w-20 data-current:bg-transparent"
        />
        <Carousel.Indicator index={1} />
      </Carousel.IndicatorGroup>
    </Carousel>
  ));

  const currentIndicator = screen.getByRole('button', { name: 'Go to slide 1' });

  expect(currentIndicator).toHaveClass(
    'h-12',
    'w-20',
    'bg-transparent',
    'data-current:h-12',
    'data-current:w-20',
    'data-current:bg-transparent',
  );
  expect(currentIndicator).not.toHaveClass('data-current:w-6', 'data-current:bg-primary');
});

test('keeps the active indicator narrow in vertical orientation', () => {
  render(() => (
    <Carousel aria-label="Vertical gallery" orientation="vertical" slideCount={2}>
      <Carousel.ItemGroup>
        <Carousel.Item index={0}>First</Carousel.Item>
        <Carousel.Item index={1}>Second</Carousel.Item>
      </Carousel.ItemGroup>
      <Carousel.Indicators />
    </Carousel>
  ));

  const currentIndicator = screen.getByRole('button', { name: 'Go to slide 1' });

  expect(currentIndicator).toHaveClass(
    'data-[orientation=vertical]:data-current:h-6',
    'data-[orientation=vertical]:data-current:w-2',
  );
});