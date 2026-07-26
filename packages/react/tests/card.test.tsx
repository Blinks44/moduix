import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Button, Card } from '../src';

test('renders the default root with stable hooks', () => {
  render(<Card data-testid="card" />);

  const card = screen.getByTestId('card');

  expect(card).toHaveAttribute('data-scope', 'card');
  expect(card).toHaveAttribute('data-part', 'root');
  expect(card).toHaveAttribute('data-slot', 'card-root');
  expect(card).toHaveAttribute('data-size', 'md');
  expect(card).toHaveAttribute('data-variant', 'outline');
});

test('forwards an HTMLElement ref and props to an asChild root', () => {
  const ref = createRef<HTMLElement>();

  render(
    <Card asChild ref={ref} size="lg" variant="elevated">
      <a href="#report">Release health</a>
    </Card>,
  );

  const link = screen.getByRole('link', { name: 'Release health' });

  expect(ref.current).toBe(link);
  expect(link).toHaveAttribute('data-size', 'lg');
  expect(link).toHaveAttribute('data-variant', 'elevated');
});

test('keeps actions interactive when Card.Link covers the card', () => {
  let acknowledgements = 0;

  render(
    <Card>
      <Card.Header>
        <Card.Title>
          <Card.Link href="#incident">Incident response</Card.Link>
        </Card.Title>
        <Card.Action>
          <Button onClick={() => acknowledgements++}>Acknowledge</Button>
        </Card.Action>
      </Card.Header>
    </Card>,
  );

  fireEvent.click(screen.getByRole('button', { name: 'Acknowledge' }));

  expect(acknowledgements).toBe(1);
});