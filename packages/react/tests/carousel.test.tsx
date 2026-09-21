import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import {
  Carousel,
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