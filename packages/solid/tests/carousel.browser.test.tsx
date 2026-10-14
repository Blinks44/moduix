import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  Carousel,
  CarouselAutoplayIndicator,
  CarouselAutoplayTrigger,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  CarouselProgressText,
} from '../src';

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
      <CarouselItemGroup>
        <CarouselItem index={0}>First</CarouselItem>
        <CarouselItem index={1}>Second</CarouselItem>
      </CarouselItemGroup>
      <CarouselControl>
        <CarouselPrevTrigger />
        <CarouselNextTrigger />
        <CarouselIndicators />
      </CarouselControl>
      <CarouselProgressText />
    </Carousel>
  );
}

test('labels the carousel, renders controls, and preserves page-change details and direction', async () => {
  const pages: number[] = [];
  const [dir, setDir] = createSignal<'ltr' | 'rtl'>('rtl');
  render(() => <TestCarousel dir={dir()} onPageChange={(details) => pages.push(details.page)} />);

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

  setDir('ltr');
  await expect
    .element(page.getByRole('region', { name: 'Travel gallery' }))
    .toHaveAttribute('dir', 'ltr');
  await expect.element(page.getByText('2 / 2')).toBeAttached();
});

test('preserves ordinary refs and generated indicator styling hooks', () => {
  let rootRef!: HTMLDivElement;
  let indicatorsRef!: HTMLDivElement;

  const { container } = render(() => (
    <Carousel ref={(element) => (rootRef = element)} aria-label="Gallery" slideCount={2}>
      <CarouselItemGroup>
        <CarouselItem index={0}>First</CarouselItem>
        <CarouselItem index={1}>Second</CarouselItem>
      </CarouselItemGroup>
      <CarouselControl>
        <CarouselPrevTrigger />
        <CarouselNextTrigger />
        <CarouselIndicators
          ref={(element) => (indicatorsRef = element)}
          indicatorClassName="generated-indicator"
        />
      </CarouselControl>
    </Carousel>
  ));

  const root = container.querySelector('[data-slot="carousel-root"]');

  expect(rootRef).toBe(root);
  expect(rootRef.getAttribute('data-scope')).toBe('carousel');
  expect(indicatorsRef.getAttribute('data-slot')).toBe('carousel-indicator-group');
  expect(indicatorsRef.querySelectorAll('.generated-indicator')).toHaveLength(2);
});

test('preserves semantic asChild hosts and styling hooks without forwarding refs', async () => {
  let rootRef: HTMLDivElement | undefined;
  const { container } = render(() => (
    <Carousel
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} data-testid="composed-carousel" />}
      aria-label="Composed gallery"
      slideCount={2}
    >
      <CarouselItemGroup>
        <CarouselItem index={0}>First</CarouselItem>
        <CarouselItem index={1}>Second</CarouselItem>
      </CarouselItemGroup>
      <CarouselControl>
        <CarouselPrevTrigger
          asChild={(props) => (
            <button {...props()} type="button">
              Back
            </button>
          )}
        />
        <CarouselNextTrigger />
        <CarouselIndicators indicatorClassName="generated-indicator" />
      </CarouselControl>
    </Carousel>
  ));

  const root = container.querySelector('[data-testid="composed-carousel"]')!;
  const previous = page.getByRole('button', { name: 'Previous slide' });

  expect(root.tagName).toBe('SECTION');
  expect(root.getAttribute('data-slot')).toBe('carousel-root');
  expect(root.getAttribute('data-scope')).toBe('carousel');
  await expect.element(previous).toHaveJSProperty('tagName', 'BUTTON');
  await expect.element(previous).toHaveText('Back');
  await expect.element(previous).toBeDisabled();
  expect(root.querySelectorAll('.generated-indicator')).toHaveLength(2);
  expect(rootRef).toBeUndefined();
});

function chevronRotation(label: string) {
  const icon = document.querySelector(
    `[aria-label="${label}"] [data-slot="carousel-prev-trigger"] svg`,
  );
  return getComputedStyle(icon!).rotate;
}

test('centers controls and points default chevrons along the paging axis', async () => {
  render(() => (
    <>
      {(['ltr', 'rtl'] as const).map((dir) => (
        <Carousel aria-label={`${dir} gallery`} dir={dir} slideCount={2}>
          <CarouselItemGroup>
            <CarouselItem index={0}>First</CarouselItem>
            <CarouselItem index={1}>Second</CarouselItem>
          </CarouselItemGroup>
          <CarouselControl>
            <CarouselPrevTrigger />
            <CarouselNextTrigger />
          </CarouselControl>
        </Carousel>
      ))}
      <Carousel aria-label="vertical gallery" orientation="vertical" slideCount={2}>
        <CarouselItemGroup>
          <CarouselItem index={0}>First</CarouselItem>
          <CarouselItem index={1}>Second</CarouselItem>
        </CarouselItemGroup>
        <CarouselControl>
          <CarouselPrevTrigger />
          <CarouselNextTrigger>
            <svg data-testid="custom-icon" />
          </CarouselNextTrigger>
        </CarouselControl>
      </Carousel>
    </>
  ));

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

test('grows the autoplay trigger with its label', async () => {
  render(() => (
    <Carousel aria-label="Autoplay gallery" slideCount={2}>
      <CarouselItemGroup>
        <CarouselItem index={0}>First</CarouselItem>
        <CarouselItem index={1}>Second</CarouselItem>
      </CarouselItemGroup>
      <CarouselAutoplayTrigger>
        <CarouselAutoplayIndicator fallback="Start slideshow">
          Pause slideshow
        </CarouselAutoplayIndicator>
      </CarouselAutoplayTrigger>
    </Carousel>
  ));

  const trigger = document.querySelector<HTMLElement>('[data-slot="carousel-autoplay-trigger"]')!;

  await expect.element(page.getByText('Start slideshow')).toBeAttached();
  expect(trigger.scrollWidth).toBeLessThanOrEqual(trigger.clientWidth);
  expect(trigger.offsetWidth).toBeGreaterThan(trigger.offsetHeight);
});

test('keeps the active indicator narrow in vertical orientation', async () => {
  render(() => (
    <Carousel aria-label="Vertical gallery" orientation="vertical" slideCount={2}>
      <CarouselItemGroup>
        <CarouselItem index={0}>First</CarouselItem>
        <CarouselItem index={1}>Second</CarouselItem>
      </CarouselItemGroup>
      <CarouselIndicators />
    </Carousel>
  ));

  await expect
    .element(page.getByRole('button', { name: 'Go to slide 1' }))
    .toHaveCSS('width', '8px');
  await expect
    .element(page.getByRole('button', { name: 'Go to slide 1' }))
    .toHaveCSS('height', '24px');
});