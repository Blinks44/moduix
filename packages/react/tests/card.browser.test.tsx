import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
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

test('renders the default root with stable hooks', async () => {
  render(
    <Card
      className="consumer-card"
      data-size="consumer"
      data-testid="card"
      data-variant="consumer"
      style={{ maxWidth: 320 }}
    />,
  );

  await expect.element(page.getByTestId('card')).toHaveCount(1);
  const card = screen.getByTestId('card');

  expect(card.dataset).toMatchObject({
    scope: 'card',
    part: 'root',
    slot: 'card-root',
    size: 'md',
    variant: 'outline',
  });
  expect(card.classList.contains('consumer-card')).toBe(true);
  expect(card.style).toMatchObject({ maxWidth: '320px' });
});

test('renders every part with its semantic default and stable hooks', async () => {
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
    await expect.element(page.getByTestId(part)).toHaveCount(1);
    const element = screen.getByTestId(part);

    expect(element.getAttribute('data-scope')).toBe('card');
    expect(element.getAttribute('data-part')).toBe(part);
    expect(element.getAttribute('data-slot')).toBe(`card-${part}`);
    expect(element.tagName).toBe(tagName.toUpperCase());
  }
});

test('preserves asChild root, title, and background hosts with their refs and hooks', async () => {
  const rootRef = createRef<HTMLDivElement>();
  const titleRef = createRef<HTMLHeadingElement>();
  const backgroundRef = createRef<HTMLDivElement>();
  render(
    <Card asChild ref={rootRef} size="lg" variant="elevated">
      <a href="#report">
        <CardTitle asChild ref={titleRef}>
          <h2>Release health</h2>
        </CardTitle>
        <CardBackground asChild ref={backgroundRef}>
          <picture data-testid="background">
            <img alt="" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>" />
          </picture>
        </CardBackground>
      </a>
    </Card>,
  );
  await expect.element(page.getByRole('link', { name: 'Release health' })).toHaveCount(1);
  const link = screen.getByRole('link', { name: 'Release health' });
  const heading = screen.getByRole('heading', { level: 2, name: 'Release health' });
  const background = screen.getByTestId('background');
  expect(rootRef.current).toBe(link);
  expect(link.dataset).toMatchObject({ size: 'lg', variant: 'elevated' });
  expect(titleRef.current).toBe(heading);
  expect(heading.dataset).toMatchObject({ part: 'title', slot: 'card-title' });
  expect(backgroundRef.current).toBe(background);
  expect(background.dataset).toMatchObject({ part: 'background', slot: 'card-background' });
});

test('keeps actions interactive when CardLink covers the card', async () => {
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

  await page.getByRole('button', { name: 'Acknowledge' }).click();

  expect(acknowledgements).toBe(1);
});

test('pads a lone section on both sides and spaces sections evenly', async () => {
  render(
    <>
      <Card size="lg">
        <CardHeader data-testid="lone-header">
          <CardTitle>Only a header</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader data-testid="header">
          <CardTitle>Header and footer</CardTitle>
        </CardHeader>
        <CardFooter data-testid="footer">Updated today</CardFooter>
      </Card>
      <Card>
        <CardBackground />
        <CardBody data-testid="body">Body after a background</CardBody>
      </Card>
    </>,
  );

  await expect.element(page.getByTestId('lone-header')).toHaveCSS('padding-top', '32px');
  await expect.element(page.getByTestId('lone-header')).toHaveCSS('padding-bottom', '32px');
  await expect.element(page.getByTestId('header')).toHaveCSS('padding-bottom', '0px');
  await expect.element(page.getByTestId('footer')).toHaveCSS('padding-top', '24px');
  await expect.element(page.getByTestId('footer')).toHaveCSS('padding-bottom', '24px');
  await expect.element(page.getByTestId('body')).toHaveCSS('padding-top', '24px');
});

test('lets CardLink cover the body of a card with a background', async () => {
  render(
    <Card>
      <CardBackground>
        <div />
      </CardBackground>
      <CardHeader>
        <CardTitle>
          <CardLink href="#guide">Weekend guide</CardLink>
        </CardTitle>
      </CardHeader>
      <CardBody data-testid="body">Three places to slow down.</CardBody>
      <CardFooter>
        <button type="button">Save</button>
      </CardFooter>
    </Card>,
  );

  await expect.element(page.getByRole('link', { name: 'Weekend guide' })).toHaveCount(1);
  const hit = (element: Element) => {
    const rect = element.getBoundingClientRect();
    return document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
  };

  expect(hit(screen.getByTestId('body'))).toBe(screen.getByRole('link', { name: 'Weekend guide' }));
  expect(hit(screen.getByRole('button', { name: 'Save' }))).toBe(
    screen.getByRole('button', { name: 'Save' }),
  );
});