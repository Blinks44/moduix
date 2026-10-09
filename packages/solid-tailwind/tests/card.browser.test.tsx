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

test('renders the default root with stable hooks and replaceable Tailwind defaults', async () => {
  render(() => (
    <Card
      class="border-4 border-destructive bg-muted shadow-none"
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
  expect([...card.classList]).toEqual(
    expect.arrayContaining(['border-4', 'border-destructive', 'bg-muted', 'shadow-none']),
  );
  for (const className of ['border', 'border-border', 'bg-card', 'shadow-md']) {
    expect(card.classList.contains(className)).toBe(false);
  }
  expect(card.style).toMatchObject({ maxWidth: '320px' });
  await expect.element(page.getByTestId('card')).toHaveCSS('border-top-width', '4px');
  await expect.element(page.getByTestId('card')).toHaveCSS('--tw-shadow', '0 0 #0000');
  await expect.element(page.getByTestId('card')).toHaveCSS('max-width', '320px');
});

test('uses native group state utilities for size while consumer classes replace default part utilities', async () => {
  render(() => (
    <Card size="lg">
      <CardHeader
        class="group-data-[size=lg]/card:px-2 group-data-[size=lg]/card:pt-2"
        data-testid="header"
      />
      <CardBody data-testid="body" />
      <CardFooter data-testid="footer" />
      <CardTitle data-testid="title">Release health</CardTitle>
    </Card>
  ));

  await expect.element(page.getByRole('heading', { name: 'Release health' })).toHaveCount(1);
  const root = screen.getByRole('heading', { name: 'Release health' }).parentElement!;
  const header = screen.getByTestId('header');
  const body = screen.getByTestId('body');
  const footer = screen.getByTestId('footer');
  const title = screen.getByTestId('title');

  expect(root.classList.contains('group/card')).toBe(true);
  expect([...header.classList]).toEqual(
    expect.arrayContaining(['px-6', 'pt-6', 'group-data-[size=lg]/card:px-2']),
  );
  for (const className of ['group-data-[size=lg]/card:px-8', 'group-data-[size=lg]/card:pt-8']) {
    expect(header.classList.contains(className)).toBe(false);
  }
  expect([...body.classList]).toEqual(
    expect.arrayContaining(['px-6', 'group-data-[size=lg]/card:px-8']),
  );
  expect([...footer.classList]).toEqual(
    expect.arrayContaining(['pb-6', 'group-data-[size=lg]/card:pb-8']),
  );
  expect([...title.classList]).toEqual(
    expect.arrayContaining(['text-lg', 'group-data-[size=lg]/card:text-xl']),
  );
  expect(body.className).not.toMatch(/\[--|var\(--/);
  expect(title.className).not.toMatch(/\[--|var\(--/);
  await expect.element(page.getByTestId('header')).toHaveCSS('padding-left', '8px');
  await expect.element(page.getByTestId('header')).toHaveCSS('padding-top', '8px');
  await expect.element(page.getByTestId('body')).toHaveCSS('padding-left', '32px');
  await expect.element(page.getByTestId('footer')).toHaveCSS('padding-bottom', '32px');
  await expect.element(page.getByTestId('title')).toHaveCSS('font-size', '20px');
});

test('renders every part with its semantic default, stable hooks, and visible utility defaults', async () => {
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

  expect([...screen.getByTestId('background').classList]).toEqual(
    expect.arrayContaining(['absolute', 'inset-0', 'overflow-hidden']),
  );
  expect(screen.getByTestId('media').classList.contains('overflow-hidden')).toBe(true);
  expect(screen.getByTestId('header').classList.contains('grid')).toBe(true);
  expect(screen.getByTestId('title').classList.contains('font-semibold')).toBe(true);
  expect(screen.getByTestId('link').classList.contains('after:rounded-lg')).toBe(true);
  expect([...screen.getByTestId('action').classList]).toEqual(
    expect.arrayContaining(['col-start-2', 'row-start-1', 'row-span-2']),
  );
  expect([...screen.getByTestId('body').classList]).toEqual(
    expect.arrayContaining(['text-sm', 'text-muted-foreground']),
  );
  expect(screen.getByTestId('body').classList.contains('leading-normal')).toBe(false);
  expect([...screen.getByTestId('footer').classList]).toEqual(
    expect.arrayContaining(['flex', 'flex-wrap']),
  );
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