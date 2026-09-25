import { afterAll, beforeAll, expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Carousel,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselIndicators,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  CarouselProgressText,
} from '../src';

const carouselComponents = {
  Carousel,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselIndicators,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  CarouselProgressText,
};

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

const TestCarousel = defineComponent({
  components: carouselComponents,
  props: {
    dir: { type: String, default: undefined },
  },
  emits: ['pageChange'],
  template: `
    <Carousel
      aria-label="Travel gallery"
      :dir="dir"
      :slide-count="2"
      @page-change="$emit('pageChange', $event)"
    >
      <CarouselItemGroup>
        <CarouselItem :index="0">First</CarouselItem>
        <CarouselItem :index="1">Second</CarouselItem>
      </CarouselItemGroup>
      <CarouselControl>
        <CarouselPrevTrigger />
        <CarouselNextTrigger />
        <CarouselIndicators />
      </CarouselControl>
      <CarouselProgressText />
    </Carousel>
  `,
});

test('labels the carousel landmark and renders its default page controls', () => {
  render(TestCarousel);

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
  render(TestCarousel, {
    props: {
      dir: 'rtl',
      onPageChange: (details: { page: number }) => pages.push(details.page),
    },
  });

  fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));

  expect(screen.getByRole('region', { name: 'Travel gallery' })).toHaveAttribute('dir', 'rtl');
  await waitFor(() => expect(pages).toEqual([1]));
});

test('applies the bare loop attribute through Ark Boolean casting and wraps pages', async () => {
  const pages: number[] = [];
  const LoopHarness = defineComponent({
    components: carouselComponents,
    setup() {
      return { pages };
    },
    template: `
      <Carousel
        aria-label="Looping gallery"
        loop
        :slide-count="2"
        @page-change="pages.push($event.page)"
      >
        <CarouselItemGroup>
          <CarouselItem :index="0">First</CarouselItem>
          <CarouselItem :index="1">Second</CarouselItem>
        </CarouselItemGroup>
        <CarouselControl>
          <CarouselPrevTrigger />
          <CarouselNextTrigger />
        </CarouselControl>
      </Carousel>
    `,
  });

  render(LoopHarness);

  fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
  await waitFor(() => expect(pages).toEqual([1]));

  fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
  await waitFor(() => expect(pages).toEqual([1, 0]));
});

test('preserves refs, asChild composition, and generated indicator styling hooks', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const indicatorsRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: carouselComponents,
    setup() {
      return { indicatorsRef, rootRef };
    },
    template: `
      <Carousel ref="rootRef" as-child aria-label="Composed gallery" :slide-count="2">
        <section data-testid="composed-carousel">
          <CarouselItemGroup>
            <CarouselItem :index="0">First</CarouselItem>
            <CarouselItem :index="1">Second</CarouselItem>
          </CarouselItemGroup>
          <CarouselControl>
            <CarouselPrevTrigger as-child><button type="button">Back</button></CarouselPrevTrigger>
            <CarouselNextTrigger />
            <CarouselIndicators ref="indicatorsRef" indicator-class-name="generated-indicator" />
          </CarouselControl>
        </section>
      </Carousel>
    `,
  });

  render(Harness);

  const root = screen.getByTestId('composed-carousel');
  const previous = screen.getByRole('button', { name: 'Previous slide' });
  const indicatorGroup = root.querySelector('[data-slot="carousel-indicator-group"]');

  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'carousel-root');
  expect(rootRef.value?.$el).toBe(root);
  expect(screen.getByText('Back')).toBe(previous);
  expect(previous).toBeDisabled();
  expect(indicatorGroup).not.toBeNull();
  expect(indicatorsRef.value?.$el).toBe(indicatorGroup);
  expect(indicatorGroup?.querySelectorAll('.generated-indicator')).toHaveLength(2);
});

test('keeps component-owned visual utilities visible and lets consumers override them', () => {
  render(
    defineComponent({
      components: carouselComponents,
      setup() {
        return { carouselComponents };
      },
      template: `
        <Carousel aria-label="Styled gallery" class="gap-0" :slide-count="2">
          <CarouselItemGroup>
            <CarouselItem :index="0">First</CarouselItem>
            <CarouselItem :index="1">Second</CarouselItem>
          </CarouselItemGroup>
          <CarouselControl>
            <CarouselPrevTrigger class="size-5 bg-primary" />
            <CarouselNextTrigger />
            <CarouselIndicators />
          </CarouselControl>
          <CarouselProgressText class="text-lg" />
        </Carousel>
      `,
    }),
  );

  const root = screen.getByRole('region', { name: 'Styled gallery' });
  const itemGroup = document.querySelector('[data-slot="carousel-item-group"]')!;
  const previous = screen.getByRole('button', { name: 'Previous slide' });
  const indicator = screen.getByRole('button', { name: 'Go to slide 1' });
  const progress = screen.getByText('1 / 2');

  expect(root).toHaveClass('gap-0');
  expect(root).not.toHaveClass('gap-3');
  expect(itemGroup).toHaveClass(
    'rounded-xl',
    'outline-0',
    'focus-visible:outline-1',
    'focus-visible:-outline-offset-1',
    'focus-visible:outline-ring',
  );
  expect(previous).toHaveClass('size-5', 'bg-primary', 'rounded-full');
  expect(previous).not.toHaveClass('size-control-md', 'bg-card');
  expect(indicator).toHaveClass('size-2', 'rounded-full', 'bg-muted');
  expect(progress).toHaveClass('text-lg');
  expect(progress).not.toHaveClass('text-sm');
});

test('lets consumers override runtime indicator sizing with state utilities', () => {
  render(
    defineComponent({
      components: carouselComponents,
      template: `
        <Carousel aria-label="Thumbnail gallery" :slide-count="2">
          <CarouselItemGroup>
            <CarouselItem :index="0">First</CarouselItem>
            <CarouselItem :index="1">Second</CarouselItem>
          </CarouselItemGroup>
          <CarouselIndicatorGroup>
            <CarouselIndicator
              :index="0"
              class="h-12 w-20 bg-transparent data-current:h-12 data-current:w-20 data-current:bg-transparent"
            />
            <CarouselIndicator :index="1" />
          </CarouselIndicatorGroup>
        </Carousel>
      `,
    }),
  );

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
  render(
    defineComponent({
      components: carouselComponents,
      template: `
        <Carousel aria-label="Vertical gallery" orientation="vertical" :slide-count="2">
          <CarouselItemGroup>
            <CarouselItem :index="0">First</CarouselItem>
            <CarouselItem :index="1">Second</CarouselItem>
          </CarouselItemGroup>
          <CarouselIndicators />
        </Carousel>
      `,
    }),
  );

  const currentIndicator = screen.getByRole('button', { name: 'Go to slide 1' });

  expect(currentIndicator).toHaveClass(
    'data-[orientation=vertical]:data-current:h-6',
    'data-[orientation=vertical]:data-current:w-2',
  );
});

test('renders the public anatomy on the server and hydrates without id drift', async () => {
  const SsrHarness = defineComponent({
    components: carouselComponents,
    template: `
      <Carousel aria-label="Server gallery" :slide-count="2">
        <CarouselItemGroup>
          <CarouselItem :index="0">First</CarouselItem>
          <CarouselItem :index="1">Second</CarouselItem>
        </CarouselItemGroup>
        <CarouselControl>
          <CarouselPrevTrigger />
          <CarouselNextTrigger />
          <CarouselIndicators />
        </CarouselControl>
        <CarouselProgressText />
      </Carousel>
    `,
  });

  const html = await renderToString(createSSRApp(SsrHarness));
  expect(html).toContain('data-slot="carousel-root"');
  expect(html).toContain('data-slot="carousel-item-group"');
  expect(html).toContain('data-slot="carousel-prev-trigger"');
  expect(html).toContain('data-slot="carousel-indicator"');
  expect(html).toContain('1 / 2');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(SsrHarness);
  app.mount(host);
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
  app.unmount();
  host.remove();
});