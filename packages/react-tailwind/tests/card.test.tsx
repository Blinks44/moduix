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

test('renders the default root with stable hooks and replaceable Tailwind defaults', () => {
  render(
    <Card
      className="border-4 border-destructive bg-muted shadow-none"
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
  expect(card).toHaveClass('border-4', 'border-destructive', 'bg-muted', 'shadow-none');
  expect(card).not.toHaveClass('border', 'border-border', 'bg-card', 'shadow-md');
  expect(card).toHaveStyle({ maxWidth: '320px' });
});

test('uses native group state utilities for size while consumer classes replace default part utilities', () => {
  render(
    <Card size="lg">
      <CardHeader
        className="group-data-[size=lg]/card:px-2 group-data-[size=lg]/card:pt-2"
        data-testid="header"
      />
      <CardBody data-testid="body" />
      <CardFooter data-testid="footer" />
      <CardTitle data-testid="title">Release health</CardTitle>
    </Card>,
  );

  const root = screen.getByRole('heading', { name: 'Release health' }).parentElement!;
  const header = screen.getByTestId('header');
  const body = screen.getByTestId('body');
  const footer = screen.getByTestId('footer');
  const title = screen.getByTestId('title');

  expect(root).toHaveClass('group/card');
  expect(header).toHaveClass('px-6', 'pt-6', 'group-data-[size=lg]/card:px-2');
  expect(header).not.toHaveClass(
    'group-data-[size=lg]/card:px-8',
    'group-data-[size=lg]/card:pt-8',
  );
  expect(body).toHaveClass('px-6', 'group-data-[size=lg]/card:px-8');
  expect(footer).toHaveClass('pb-6', 'group-data-[size=lg]/card:pb-8');
  expect(title).toHaveClass('text-lg', 'group-data-[size=lg]/card:text-xl');
  expect(body.className).not.toMatch(/\[--|var\(--/);
  expect(title.className).not.toMatch(/\[--|var\(--/);
});

test('renders every part with its semantic default, stable hooks, and visible utility defaults', () => {
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

  expect(screen.getByTestId('background')).toHaveClass('absolute', 'inset-0', 'overflow-hidden');
  expect(screen.getByTestId('media')).toHaveClass('overflow-hidden');
  expect(screen.getByTestId('header')).toHaveClass('grid');
  expect(screen.getByTestId('title')).toHaveClass('font-semibold');
  expect(screen.getByTestId('link')).toHaveClass('after:rounded-lg');
  expect(screen.getByTestId('action')).toHaveClass('col-start-2', 'row-start-1', 'row-span-2');
  expect(screen.getByTestId('body')).toHaveClass('text-sm', 'text-muted-foreground');
  expect(screen.getByTestId('body')).not.toHaveClass('leading-normal');
  expect(screen.getByTestId('footer')).toHaveClass('flex', 'flex-wrap');
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