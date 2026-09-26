import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

test('labels the carousel landmark and renders its default page controls', () => {
  render(<TestCarousel />);

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
  render(<TestCarousel dir="rtl" onPageChange={(details) => pages.push(details.page)} />);

  fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));

  expect(screen.getByRole('region', { name: 'Travel gallery' })).toHaveAttribute('dir', 'rtl');
  await waitFor(() => expect(pages).toEqual([1]));
});

test('preserves refs, asChild composition, and generated indicator styling hooks', () => {
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

  const root = screen.getByTestId('composed-carousel');

  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'carousel-root');
  expect(rootRef.current).toBe(root);
  expect(screen.getByText('Back')).toBe(screen.getByRole('button', { name: 'Previous slide' }));
  expect(screen.getByRole('button', { name: 'Previous slide' })).toBeDisabled();
  expect(indicatorsRef.current).toHaveAttribute('data-slot', 'carousel-indicator-group');
  expect(indicatorsRef.current?.querySelectorAll('.generated-indicator')).toHaveLength(2);
});

test('keeps component-owned visual utilities visible and lets consumers override them', () => {
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
    <Carousel aria-label="Vertical gallery" orientation="vertical" slideCount={2}>
      <CarouselItemGroup>
        <CarouselItem index={0}>First</CarouselItem>
        <CarouselItem index={1}>Second</CarouselItem>
      </CarouselItemGroup>
      <CarouselIndicators />
    </Carousel>,
  );

  const currentIndicator = screen.getByRole('button', { name: 'Go to slide 1' });

  expect(currentIndicator).toHaveClass(
    'data-[orientation=vertical]:data-current:h-6',
    'data-[orientation=vertical]:data-current:w-2',
  );
});