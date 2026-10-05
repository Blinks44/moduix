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

test('keeps component-owned visual utilities visible and lets consumers override them', async () => {
  render(
    <Carousel aria-label="Styled gallery" className="gap-0" slideCount={2}>
      <CarouselItemGroup>
        <CarouselItem index={0}>First</CarouselItem>
        <CarouselItem index={1}>Second</CarouselItem>
      </CarouselItemGroup>
      <CarouselControl>
        <CarouselPrevTrigger className="size-5 bg-primary" />
        <CarouselNextTrigger />
        <CarouselIndicators />
      </CarouselControl>
      <CarouselProgressText className="text-lg" />
    </Carousel>,
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
      'focus-visible:outline-1',
      'focus-visible:-outline-offset-1',
      'focus-visible:outline-ring',
    ]),
  );
  expect([...previous.classList]).toEqual(
    expect.arrayContaining(['size-5', 'bg-primary', 'rounded-full']),
  );
  expect([...previous.classList]).not.toContain('size-control-md');
  expect([...previous.classList]).not.toContain('bg-card');
  expect([...indicator.classList]).toEqual(
    expect.arrayContaining(['size-2', 'rounded-full', 'bg-muted']),
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
    <Carousel aria-label="Vertical gallery" orientation="vertical" slideCount={2}>
      <CarouselItemGroup>
        <CarouselItem index={0}>First</CarouselItem>
        <CarouselItem index={1}>Second</CarouselItem>
      </CarouselItemGroup>
      <CarouselIndicators />
    </Carousel>,
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