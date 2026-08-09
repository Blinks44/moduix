import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Button, Card } from '../src';

test('renders the default root with stable hooks', () => {
  render(<Card className="consumer-card" data-testid="card" style={{ maxWidth: 320 }} />);

  const card = screen.getByTestId('card');

  expect(card).toHaveAttribute('data-scope', 'card');
  expect(card).toHaveAttribute('data-part', 'root');
  expect(card).toHaveAttribute('data-slot', 'card-root');
  expect(card).toHaveAttribute('data-size', 'md');
  expect(card).toHaveAttribute('data-variant', 'outline');
  expect(card).toHaveClass('consumer-card');
  expect(card).toHaveStyle({ maxWidth: '320px' });
});

test('renders every part with its semantic default and stable hooks', () => {
  render(
    <Card>
      <Card.Media data-testid="media" />
      <Card.Header data-testid="header">
        <Card.Title data-testid="title">
          <Card.Link data-testid="link" href="#release">
            Release health
          </Card.Link>
        </Card.Title>
        <Card.Description data-testid="description">Production rollout</Card.Description>
        <Card.Action data-testid="action" />
      </Card.Header>
      <Card.Body data-testid="body" />
      <Card.Footer data-testid="footer" />
    </Card>,
  );

  const parts = [
    ['media', 'div'],
    ['header', 'div'],
    ['title', 'h3'],
    ['link', 'a'],
    ['description', 'p'],
    ['action', 'div'],
    ['body', 'div'],
    ['footer', 'div'],
  ] as const;

  for (const [part, tagName] of parts) {
    const element = screen.getByTestId(part);

    expect(element).toHaveAttribute('data-scope', 'card');
    expect(element).toHaveAttribute('data-part', part);
    expect(element).toHaveAttribute('data-slot', `card-${part}`);
    expect(element.tagName).toBe(tagName.toUpperCase());
  }
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

test('forwards an HTMLElement ref through an asChild part', () => {
  const ref = createRef<HTMLElement>();

  render(
    <Card.Title asChild ref={ref}>
      <h2>Release health</h2>
    </Card.Title>,
  );

  const heading = screen.getByRole('heading', { level: 2, name: 'Release health' });

  expect(ref.current).toBe(heading);
  expect(heading).toHaveAttribute('data-part', 'title');
  expect(heading).toHaveAttribute('data-slot', 'card-title');
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