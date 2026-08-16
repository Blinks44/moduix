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

function TourExample({ portalled }: { portalled?: boolean }) {
  const tour = useTour({ steps });

  return (
    <>
      <Button onClick={() => tour.start()}>Start tour</Button>
      <Tour tour={tour} portalled={portalled} lazyMount unmountOnExit>
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

function CustomActionTourExample() {
  const tour = useTour({ steps });

  return (
    <>
      <Button onClick={() => tour.start()}>Start custom action tour</Button>
      <Tour tour={tour} portalled={false} lazyMount unmountOnExit>
        <Tour.Positioner>
          <Tour.Content>
            <Tour.Title />
            <Tour.Description />
            <Tour.Control>
              <Tour.Actions>
                {(actions) =>
                  actions.map((action, index) => (
                    <Tour.ActionTrigger key={`${action.label}-${index}`} action={action} asChild>
                      <button type="button">{action.label}</button>
                    </Tour.ActionTrigger>
                  ))
                }
              </Tour.Actions>
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
        <TourExample portalled={false} />
      </div>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Start tour' }));

    const content = await screen.findByRole('alertdialog', { name: 'Welcome' });
    expect(content).toHaveAttribute('data-slot', 'tour-content');
    expect(content.querySelector('[data-slot="tour-body"]')).toBeInTheDocument();
    expect(
      screen.getByTestId('tour-host').querySelector('[data-slot="tour-positioner"]'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close tour' })).toHaveAttribute(
      'data-slot',
      'tour-close-icon',
    );
  });

  test('portals overlay parts by default', async () => {
    render(
      <div data-testid="tour-host">
        <TourExample />
      </div>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Start tour' }));

    const content = await screen.findByRole('alertdialog', { name: 'Welcome' });
    expect(screen.getByTestId('tour-host')).not.toContainElement(content);
  });

  test('keeps duplicate action labels as separate, correctly disabled action triggers', async () => {
    render(<TourExample portalled={false} />);

    fireEvent.click(screen.getByRole('button', { name: 'Start tour' }));

    const actions = await screen.findAllByText('Continue');
    expect(actions).toHaveLength(2);
    expect(actions[0]).toBeDisabled();
    expect(actions[1]).not.toBeDisabled();
  });

  test('preserves Ark action behavior when custom markup is composed with asChild', async () => {
    render(<CustomActionTourExample />);

    fireEvent.click(screen.getByRole('button', { name: 'Start custom action tour' }));

    const actions = await screen.findAllByText('Continue');
    expect(actions[0]).toHaveAttribute('data-slot', 'tour-action-trigger');
    expect(actions[0]).toBeDisabled();
    expect(actions[1]).not.toBeDisabled();
  });
});