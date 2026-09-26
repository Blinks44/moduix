import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  Button,
  Card,
  CardAction,
  CardBackground,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardLink,
  CardMedia,
  CardTitle,
} from '../src';

test('renders the default root with stable hooks', () => {
  render(
    <Card
      className="consumer-card"
      data-size="consumer"
      data-testid="card"
      data-variant="consumer"
      style={{ maxWidth: 320 }}
    />,
  );

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
      <CardBackground data-testid="background" />
      <CardMedia data-testid="media" />
      <CardHeader data-testid="header">
        <CardTitle data-testid="title">
          <CardLink data-testid="link" href="#release">
            Release health
          </CardLink>
        </CardTitle>
        <CardDescription data-testid="description">Production rollout</CardDescription>
        <CardAction data-testid="action" />
      </CardHeader>
      <CardBody data-testid="body" />
      <CardFooter data-testid="footer" />
    </Card>,
  );

  const parts = [
    ['background', 'div'],
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
  let current: HTMLElement | null = null;
  const ref = (element: HTMLElement | null) => {
    current = element;
  };

  render(
    <Card asChild ref={ref} size="lg" variant="elevated">
      <a href="#report">Release health</a>
    </Card>,
  );

  const link = screen.getByRole('link', { name: 'Release health' });

  expect(current).toBe(link);
  expect(link).toHaveAttribute('data-size', 'lg');
  expect(link).toHaveAttribute('data-variant', 'elevated');
});

test('forwards an HTMLElement ref through an asChild part', () => {
  let current: HTMLElement | null = null;
  const ref = (element: HTMLElement | null) => {
    current = element;
  };

  render(
    <CardTitle asChild ref={ref}>
      <h2>Release health</h2>
    </CardTitle>,
  );

  const heading = screen.getByRole('heading', { level: 2, name: 'Release health' });

  expect(current).toBe(heading);
  expect(heading).toHaveAttribute('data-part', 'title');
  expect(heading).toHaveAttribute('data-slot', 'card-title');
});

test('forwards an HTMLElement ref through an asChild background', () => {
  let current: HTMLElement | null = null;
  const ref = (element: HTMLElement | null) => {
    current = element;
  };

  render(
    <CardBackground asChild ref={ref}>
      <picture data-testid="background">
        <img alt="" src="/forest.jpg" />
      </picture>
    </CardBackground>,
  );

  const background = screen.getByTestId('background');

  expect(current).toBe(background);
  expect(background).toHaveAttribute('data-part', 'background');
  expect(background).toHaveAttribute('data-slot', 'card-background');
});

test('keeps actions interactive when CardLink covers the card', () => {
  let acknowledgements = 0;

  render(
    <Card>
      <CardHeader>
        <CardTitle>
          <CardLink href="#incident">Incident response</CardLink>
        </CardTitle>
        <CardAction>
          <Button onClick={() => acknowledgements++}>Acknowledge</Button>
        </CardAction>
      </CardHeader>
    </Card>,
  );

  fireEvent.click(screen.getByRole('button', { name: 'Acknowledge' }));

  expect(acknowledgements).toBe(1);
});