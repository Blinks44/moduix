import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef } from 'react';
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

function TestCarousel({
  dir,
  onPageChange,
}: {
  dir?: 'ltr' | 'rtl';
  onPageChange?: (details: { page: number }) => void;
}) {
  return (
    <Carousel aria-label="Travel gallery" dir={dir} onPageChange={onPageChange} slideCount={2}>
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
  const onPageChange = (details: { page: number }) => pages.push(details.page);
  const { rerender } = render(<TestCarousel dir="rtl" onPageChange={onPageChange} />);

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

  rerender(<TestCarousel dir="ltr" onPageChange={onPageChange} />);
  await expect
    .element(page.getByRole('region', { name: 'Travel gallery' }))
    .toHaveAttribute('dir', 'ltr');
  await expect.element(page.getByText('2 / 2')).toBeAttached();
});

test('preserves refs, asChild composition, and generated indicator styling hooks', async () => {
  const rootRef = createRef<HTMLDivElement>();
  const indicatorsRef = createRef<HTMLDivElement>();

  render(
    <Carousel asChild aria-label="Composed gallery" ref={rootRef} slideCount={2}>
      <section data-testid="composed-carousel">
        <CarouselItemGroup>
          <CarouselItem index={0}>First</CarouselItem>
          <CarouselItem index={1}>Second</CarouselItem>
        </CarouselItemGroup>
        <CarouselControl>
          <CarouselPrevTrigger asChild>
            <button type="button">Back</button>
          </CarouselPrevTrigger>
          <CarouselNextTrigger />
          <CarouselIndicators ref={indicatorsRef} indicatorClassName="generated-indicator" />
        </CarouselControl>
      </section>
    </Carousel>,
  );

  const root = document.querySelector('[data-testid="composed-carousel"]')!;

  expect(root.tagName).toBe('SECTION');
  expect(root.getAttribute('data-slot')).toBe('carousel-root');
  expect(rootRef.current).toBe(root);
  await expect.element(page.getByRole('button', { name: 'Previous slide' })).toHaveText('Back');
  await expect.element(page.getByRole('button', { name: 'Previous slide' })).toBeDisabled();
  expect(indicatorsRef.current?.getAttribute('data-slot')).toBe('carousel-indicator-group');
  expect(indicatorsRef.current?.querySelectorAll('.generated-indicator')).toHaveLength(2);
});
function chevronRotation(label: string) {
  const icon = document.querySelector(
    `[aria-label="${label}"] [data-slot="carousel-prev-trigger"] svg`,
  );
  return getComputedStyle(icon!).rotate;
}

test('centers controls and points default chevrons along the paging axis', async () => {
  render(
    <>
      {(['ltr', 'rtl'] as const).map((dir) => (
        <Carousel key={dir} aria-label={`${dir} gallery`} dir={dir} slideCount={2}>
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
    </>,
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

test('grows the autoplay trigger with its label', async () => {
  render(
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
    </Carousel>,
  );

  const trigger = document.querySelector<HTMLElement>('[data-slot="carousel-autoplay-trigger"]')!;

  await expect.element(page.getByText('Start slideshow')).toBeAttached();
  expect(trigger.scrollWidth).toBeLessThanOrEqual(trigger.clientWidth);
  expect(trigger.offsetWidth).toBeGreaterThan(trigger.offsetHeight);
});

test('keeps the active indicator narrow in vertical orientation', async () => {
  render(
    <Carousel aria-label="Vertical gallery" orientation="vertical" slideCount={2}>
      <CarouselItemGroup>
        <CarouselItem index={0}>First</CarouselItem>
        <CarouselItem index={1}>Second</CarouselItem>
      </CarouselItemGroup>
      <CarouselIndicators />
    </Carousel>,
  );

  await expect
    .element(page.getByRole('button', { name: 'Go to slide 1' }))
    .toHaveCSS('width', '8px');
  await expect
    .element(page.getByRole('button', { name: 'Go to slide 1' }))
    .toHaveCSS('height', '24px');
});