import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@solidjs/testing-library';
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
  render(() => (
    <Card
      class="consumer-card"
      data-size="consumer"
      data-testid="card"
      data-variant="consumer"
      style={{ 'max-width': '320px' }}
    />
  ));

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
  render(() => (
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
    </Card>
  ));

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

test('forwards refs through ordinary rendered parts', () => {
  let rootRef!: HTMLDivElement;
  let titleRef!: HTMLHeadingElement;
  let backgroundRef!: HTMLDivElement;

  render(() => (
    <Card ref={(element) => (rootRef = element)}>
      <CardTitle ref={(element) => (titleRef = element)}>Release health</CardTitle>
      <CardBackground ref={(element) => (backgroundRef = element)} />
    </Card>
  ));

  expect(rootRef).toBe(screen.getByRole('heading', { name: 'Release health' }).parentElement);
  expect(titleRef).toHaveAttribute('data-slot', 'card-title');
  expect(backgroundRef).toHaveAttribute('data-slot', 'card-background');
});

test('preserves semantic hosts and data hooks with native Ark Solid asChild composition', () => {
  render(() => (
    <Card
      asChild={(props) => (
        <a {...props()} href="#report">
          Release health
        </a>
      )}
      size="lg"
      variant="elevated"
    />
  ));

  const link = screen.getByRole('link', { name: 'Release health' });

  expect(link.tagName).toBe('A');
  expect(link).toHaveAttribute('data-size', 'lg');
  expect(link).toHaveAttribute('data-variant', 'elevated');
  expect(link).toHaveAttribute('data-slot', 'card-root');
});

test('preserves asChild composition on parts while forwarding their data hooks', () => {
  render(() => (
    <>
      <CardTitle asChild={(props) => <h2 {...props()}>Release health</h2>} />
      <CardBackground
        asChild={(props) => (
          <picture {...props()} data-testid="background">
            <img alt="" src="/forest.jpg" />
          </picture>
        )}
      />
    </>
  ));

  const heading = screen.getByRole('heading', { level: 2, name: 'Release health' });
  const background = screen.getByTestId('background');

  expect(heading).toHaveAttribute('data-part', 'title');
  expect(heading).toHaveAttribute('data-slot', 'card-title');
  expect(background).toHaveAttribute('data-part', 'background');
  expect(background).toHaveAttribute('data-slot', 'card-background');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let rootRef: HTMLDivElement | undefined;

  render(() => (
    <Card
      ref={(element) => (rootRef = element)}
      asChild={(props) => (
        <a {...props()} href="#report">
          Release health
        </a>
      )}
    />
  ));

  expect(screen.getByRole('link', { name: 'Release health' })).toBeInTheDocument();
  expect(rootRef).toBeUndefined();
});

test('keeps actions interactive when CardLink covers the card', () => {
  let acknowledgements = 0;

  render(() => (
    <Card>
      <CardHeader>
        <CardTitle>
          <CardLink href="#incident">Incident response</CardLink>
        </CardTitle>
        <CardAction>
          <Button onClick={() => acknowledgements++}>Acknowledge</Button>
        </CardAction>
      </CardHeader>
    </Card>
  ));

  fireEvent.click(screen.getByRole('button', { name: 'Acknowledge' }));

  expect(acknowledgements).toBe(1);
});