import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Carousel,
  CarouselAutoplayIndicator,
  CarouselAutoplayTrigger,
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
import TestCarousel from './fixtures/TestCarousel.vue';

const carouselComponents = {
  Carousel,
  CarouselAutoplayIndicator,
  CarouselAutoplayTrigger,
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

test('labels the carousel, renders controls, and preserves page-change details and direction', async () => {
  const pages: number[] = [];
  const { rerender } = render(TestCarousel, {
    props: {
      dir: 'rtl',
      onPageChange: (details: { page: number }) => pages.push(details.page),
    },
  });

  await expect
    .element(page.getByRole('region', { name: 'Travel gallery' }))
    .toHaveAttribute('aria-roledescription', 'carousel');
  await expect.element(page.getByRole('button', { name: 'Previous slide' })).toBeDisabled();
  await expect.element(page.getByRole('button', { name: 'Next slide' })).toBeEnabled();
  await expect.element(page.getByRole('button', { name: 'Go to slide 1' })).toBeAttached();
  await expect.element(page.getByRole('button', { name: 'Go to slide 2' })).toBeAttached();
  await expect.element(page.getByText('1 / 2')).toBeAttached();

  await page.getByRole('button', { name: 'Next slide' }).click();

  await expect
    .element(page.getByRole('region', { name: 'Travel gallery' }))
    .toHaveAttribute('dir', 'rtl');
  await expect.poll(() => pages).toEqual([1]);

  await rerender({ dir: 'ltr' });
  await expect
    .element(page.getByRole('region', { name: 'Travel gallery' }))
    .toHaveAttribute('dir', 'ltr');
  await expect.element(page.getByText('2 / 2')).toBeAttached();
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

  await page.getByRole('button', { name: 'Next slide' }).click();
  await expect.poll(() => pages).toEqual([1]);

  await page.getByRole('button', { name: 'Next slide' }).click();
  await expect.poll(() => pages).toEqual([1, 0]);
});

test('preserves refs, asChild composition, and generated indicator styling hooks', async () => {
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

  const { container } = render(Harness);

  const root = container.querySelector('[data-testid="composed-carousel"]')!;
  const previous = page.getByRole('button', { name: 'Previous slide' });
  const indicatorGroup = root.querySelector('[data-slot="carousel-indicator-group"]');

  expect(root.tagName).toBe('SECTION');
  expect(root.getAttribute('data-slot')).toBe('carousel-root');
  expect(rootRef.value?.$el).toBe(root);
  await expect.element(previous).toHaveText('Back');
  await expect.element(previous).toBeDisabled();
  expect(indicatorGroup).not.toBeNull();
  expect(indicatorsRef.value?.$el).toBe(indicatorGroup);
  expect(indicatorGroup?.querySelectorAll('.generated-indicator')).toHaveLength(2);
});

test('hydrates server markup without replacing hosts or changing generated ids', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestCarousel));
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="carousel-root"]');
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(TestCarousel);

  try {
    app.mount(host);
    expect(host.querySelector('[data-slot="carousel-root"]')).toBe(serverRoot);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    await page.getByRole('button', { name: 'Next slide' }).click();
    await expect.element(page.getByText('2 / 2')).toBeAttached();
  } finally {
    app.unmount();
    host.remove();
  }
});

test('keeps component-owned visual utilities visible and lets consumers override them', async () => {
  render(
    defineComponent({
      components: carouselComponents,
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

  const root = document.querySelector<HTMLElement>('[data-slot="carousel-root"]')!;
  const itemGroup = document.querySelector('[data-slot="carousel-item-group"]')!;
  const previous = document.querySelector<HTMLElement>('[data-slot="carousel-prev-trigger"]')!;
  const indicator = document.querySelector<HTMLElement>(
    '[data-slot="carousel-indicator"][data-current]',
  )!;
  const progress = document.querySelector<HTMLElement>('[data-slot="carousel-progress-text"]')!;

  expect([...root.classList]).toEqual(expect.arrayContaining(['gap-0']));
  expect([...root.classList]).not.toContain('gap-3');
  expect([...itemGroup.classList]).toEqual(
    expect.arrayContaining([
      'rounded-xl',
      'outline-0',
      'focus-visible:outline-focus-inset',
      'focus-visible:outline-offset-focus-inset',
      'focus-visible:outline-ring',
    ]),
  );
  expect([...previous.classList]).toEqual(
    expect.arrayContaining(['size-5', 'bg-primary', 'rounded-full']),
  );
  expect([...previous.classList]).not.toContain('size-control-md');
  expect([...previous.classList]).not.toContain('bg-card');
  expect([...indicator.classList]).toEqual(
    expect.arrayContaining(['size-2', 'rounded-full', 'bg-muted-foreground/50']),
  );
  expect([...progress.classList]).toEqual(expect.arrayContaining(['text-lg']));
  expect([...progress.classList]).not.toContain('text-sm');
  await expect
    .element(page.getByRole('region', { name: 'Styled gallery' }))
    .toHaveCSS('gap', '0px');
  await expect
    .element(page.getByRole('button', { name: 'Previous slide' }))
    .toHaveCSS('width', '20px');
  await expect.element(page.getByText('1 / 2')).toHaveCSS('font-size', '18px');
});

test('lets consumers override runtime indicator sizing with state utilities', async () => {
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

  const currentIndicator = document.querySelector<HTMLElement>(
    '[data-slot="carousel-indicator"][data-current]',
  )!;

  expect([...currentIndicator.classList]).toEqual(
    expect.arrayContaining([
      'h-12',
      'w-20',
      'bg-transparent',
      'data-current:h-12',
      'data-current:w-20',
      'data-current:bg-transparent',
    ]),
  );
  expect([...currentIndicator.classList]).not.toContain('data-current:w-6');
  expect([...currentIndicator.classList]).not.toContain('data-current:bg-primary');
  await expect
    .element(page.getByRole('button', { name: 'Go to slide 1' }))
    .toHaveCSS('width', '80px');
  await expect
    .element(page.getByRole('button', { name: 'Go to slide 1' }))
    .toHaveCSS('height', '48px');
  await expect
    .element(page.getByRole('button', { name: 'Go to slide 1' }))
    .toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
});

test('keeps the active indicator narrow in vertical orientation', async () => {
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

  const currentIndicator = document.querySelector<HTMLElement>(
    '[data-slot="carousel-indicator"][data-current]',
  )!;

  expect([...currentIndicator.classList]).toEqual(
    expect.arrayContaining([
      'data-[orientation=vertical]:data-current:h-6',
      'data-[orientation=vertical]:data-current:w-2',
    ]),
  );
  await expect
    .element(page.getByRole('button', { name: 'Go to slide 1' }))
    .toHaveCSS('width', '8px');
  await expect
    .element(page.getByRole('button', { name: 'Go to slide 1' }))
    .toHaveCSS('height', '24px');
});

function chevronRotation(label: string) {
  const icon = document.querySelector(
    `[aria-label="${label}"] [data-slot="carousel-prev-trigger"] svg`,
  );
  return getComputedStyle(icon!).rotate;
}

test('centers controls and points default chevrons along the paging axis', async () => {
  render(
    defineComponent({
      components: carouselComponents,
      template: `
        <Carousel
          v-for="dir in ['ltr', 'rtl']"
          :key="dir"
          :aria-label="dir + ' gallery'"
          :dir="dir"
          :slide-count="2"
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
        <Carousel aria-label="vertical gallery" orientation="vertical" :slide-count="2">
          <CarouselItemGroup>
            <CarouselItem :index="0">First</CarouselItem>
            <CarouselItem :index="1">Second</CarouselItem>
          </CarouselItemGroup>
          <CarouselControl>
            <CarouselPrevTrigger />
            <CarouselNextTrigger>
              <svg data-testid="custom-icon" />
            </CarouselNextTrigger>
          </CarouselControl>
        </Carousel>
      `,
    }),
  );

  const control = document.querySelector<HTMLElement>('[data-slot="carousel-control"]')!;
  const previous = control.querySelector<HTMLElement>('[data-slot="carousel-prev-trigger"]')!;
  const next = control.querySelector<HTMLElement>('[data-slot="carousel-next-trigger"]')!;
  const controlRect = control.getBoundingClientRect();

  expect(previous.getBoundingClientRect().left - controlRect.left).toBeGreaterThan(1);
  expect(
    Math.abs(
      previous.getBoundingClientRect().left -
        controlRect.left -
        (controlRect.right - next.getBoundingClientRect().right),
    ),
  ).toBeLessThanOrEqual(1);
  expect(chevronRotation('ltr gallery')).toBe('none');
  expect(chevronRotation('rtl gallery')).toBe('180deg');
  expect(chevronRotation('vertical gallery')).toBe('90deg');
  expect(getComputedStyle(document.querySelector('[data-testid="custom-icon"]')!).rotate).toBe(
    'none',
  );
});

test('grows the autoplay trigger with its label and forwards the fallback slot', async () => {
  render(
    defineComponent({
      components: carouselComponents,
      template: `
        <Carousel aria-label="Autoplay gallery" :slide-count="2">
          <CarouselItemGroup>
            <CarouselItem :index="0">First</CarouselItem>
            <CarouselItem :index="1">Second</CarouselItem>
          </CarouselItemGroup>
          <CarouselAutoplayTrigger>
            <CarouselAutoplayIndicator>
              Pause slideshow
              <template #fallback>Start slideshow</template>
            </CarouselAutoplayIndicator>
          </CarouselAutoplayTrigger>
        </Carousel>
      `,
    }),
  );

  const trigger = document.querySelector<HTMLElement>('[data-slot="carousel-autoplay-trigger"]')!;

  await expect.element(page.getByText('Start slideshow')).toBeAttached();
  expect(trigger.scrollWidth).toBeLessThanOrEqual(trigger.clientWidth);
  expect(trigger.offsetWidth).toBeGreaterThan(trigger.offsetHeight);
});