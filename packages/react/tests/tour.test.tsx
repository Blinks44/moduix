import type { TourStepDetails } from '@ark-ui/react/tour';
import { describe, expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '../src/components/button';
import { Tour, useTour } from '../src/components/tour';

Object.defineProperty(globalThis, 'visualViewport', {
  value: {
    width: 1024,
    addEventListener: () => {},
    removeEventListener: () => {},
  },
});

const steps = [
  {
    id: 'welcome',
    type: 'dialog',
    title: 'Welcome',
    description: 'Start the tour.',
    actions: [
      { label: 'Continue', action: 'next' },
      { label: 'Continue', action: 'dismiss' },
    ],
    backdrop: true,
  },
] satisfies TourStepDetails[];

function TourExample() {
  const tour = useTour({ steps });

  return (
    <>
      <Button onClick={() => tour.start()}>Start tour</Button>
      <Tour tour={tour} portalled={false} lazyMount unmountOnExit>
        <Tour.Backdrop />
        <Tour.Positioner>
          <Tour.Content>
            <Tour.CloseIcon />
            <Tour.Body>
              <Tour.Title />
              <Tour.Description />
              <Tour.ProgressText />
            </Tour.Body>
            <Tour.Control>
              <Tour.ActionList />
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour>
    </>
  );
}

describe('Tour', () => {
  test('renders an inline dialog with the scrollable body sugar', async () => {
    render(
      <div data-testid="tour-host">
        <TourExample />
      </div>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Start tour' }));

    const content = await screen.findByRole('alertdialog', { name: 'Welcome' });
    expect(content).toHaveAttribute('data-slot', 'tour-content');
    expect(content.querySelector('[data-slot="tour-body"]')).toBeInTheDocument();
    expect(
      screen.getByTestId('tour-host').querySelector('[data-slot="tour-positioner"]'),
    ).toBeInTheDocument();
  });

  test('keeps duplicate action labels as separate working triggers', async () => {
    render(<TourExample />);

    fireEvent.click(screen.getByRole('button', { name: 'Start tour' }));

    expect(await screen.findAllByText('Continue')).toHaveLength(2);
  });
});