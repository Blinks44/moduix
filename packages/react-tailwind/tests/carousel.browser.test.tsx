import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef } from 'react';
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

test('lets consumers override runtime indicator sizing with state utilities', async () => {
  render(
    <Carousel aria-label="Thumbnail gallery" slideCount={2}>
      <CarouselItemGroup>
        <CarouselItem index={0}>First</CarouselItem>
        <CarouselItem index={1}>Second</CarouselItem>
      </CarouselItemGroup>
      <CarouselIndicatorGroup>
        <CarouselIndicator
          index={0}
          className="h-12 w-20 bg-transparent data-current:h-12 data-current:w-20 data-current:bg-transparent"
        />
        <CarouselIndicator index={1} />
      </CarouselIndicatorGroup>
    </Carousel>,
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