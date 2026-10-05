import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
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
  render(() => (
    <Card
      class="consumer-card"
      data-size="consumer"
      data-testid="card"
      data-variant="consumer"
      style={{ 'max-width': '320px' }}
    />
  ));

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
    await expect.element(page.getByTestId(part)).toHaveCount(1);
    const element = screen.getByTestId(part);

    expect(element.getAttribute('data-scope')).toBe('card');
    expect(element.getAttribute('data-part')).toBe(part);
    expect(element.getAttribute('data-slot')).toBe(`card-${part}`);
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
  expect(titleRef?.getAttribute('data-slot')).toBe('card-title');
  expect(backgroundRef?.getAttribute('data-slot')).toBe('card-background');
});

test('preserves semantic hosts, data hooks, and the Ark Solid asChild ref limitation', async () => {
  let customRef: HTMLDivElement | undefined;
  render(() => (
    <Card
      ref={(element) => (customRef = element)}
      asChild={(props) => (
        <a {...props()} href="#report">
          Release health
        </a>
      )}
      size="lg"
      variant="elevated"
    />
  ));

  await expect.element(page.getByRole('link', { name: 'Release health' })).toHaveCount(1);
  const link = screen.getByRole('link', { name: 'Release health' });

  expect(customRef).toBeUndefined();
  expect(link.tagName).toBe('A');
  expect(link.dataset).toMatchObject({
    size: 'lg',
    variant: 'elevated',
    slot: 'card-root',
  });
});

test('preserves asChild composition on parts while forwarding their data hooks', async () => {
  render(() => (
    <>
      <CardTitle asChild={(props) => <h2 {...props()}>Release health</h2>} />
      <CardBackground
        asChild={(props) => (
          <picture {...props()} data-testid="background">
            <img alt="" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>" />
          </picture>
        )}
      />
    </>
  ));

  await expect
    .element(page.getByRole('heading', { level: 2, name: 'Release health' }))
    .toHaveCount(1);
  const heading = screen.getByRole('heading', { level: 2, name: 'Release health' });
  const background = screen.getByTestId('background');

  expect(heading.getAttribute('data-part')).toBe('title');
  expect(heading.getAttribute('data-slot')).toBe('card-title');
  expect(background.getAttribute('data-part')).toBe('background');
  expect(background.getAttribute('data-slot')).toBe('card-background');
});

test('keeps actions interactive when CardLink covers the card', async () => {
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

  await page.getByRole('button', { name: 'Acknowledge' }).click();

  expect(acknowledgements).toBe(1);
});