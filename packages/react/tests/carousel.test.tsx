import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Carousel } from '../src';

function TestCarousel({
  dir,
  onPageChange,
}: {
  dir?: 'ltr' | 'rtl';
  onPageChange?: (details: { page: number }) => void;
}) {
  return (
    <Carousel aria-label="Travel gallery" dir={dir} onPageChange={onPageChange} slideCount={2}>
      <Carousel.ItemGroup>
        <Carousel.Item index={0}>First</Carousel.Item>
        <Carousel.Item index={1}>Second</Carousel.Item>
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
        <Carousel.Indicators />
      </Carousel.Control>
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
});

test('keeps Ark page-change details and direction on the root', async () => {
  const pages: number[] = [];
  render(<TestCarousel dir="rtl" onPageChange={(details) => pages.push(details.page)} />);

  fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));

  expect(screen.getByRole('region', { name: 'Travel gallery' })).toHaveAttribute('dir', 'rtl');
  await waitFor(() => expect(pages).toEqual([1]));
});