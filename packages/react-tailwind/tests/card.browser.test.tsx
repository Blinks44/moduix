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

test('renders the default root with stable hooks and replaceable Tailwind defaults', async () => {
  render(
    <Card
      className="border-4 border-destructive bg-muted shadow-none"
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