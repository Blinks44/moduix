import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
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
} from '@/index';

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
  expect(card.style).toMatchObject({ maxWidth: '320px' });
  await expect.element(page.getByTestId('card')).toHaveCSS('border-top-width', '4px');
  await expect.element(page.getByTestId('card')).toHaveCSS('--tw-shadow', '0 0 #0000');
  await expect.element(page.getByTestId('card')).toHaveCSS('max-width', '320px');
});

test('sizes spacing through the root while consumer classes replace default part utilities', async () => {
  render(() => (
    <Card size="lg">
      <CardHeader class="px-2 pt-2" data-testid="header" />
      <CardBody data-testid="body" />
      <CardFooter data-testid="footer" />
      <CardTitle data-testid="title">Release health</CardTitle>
    </Card>
  ));

  await expect.element(page.getByRole('heading', { name: 'Release health' })).toHaveCount(1);

  await expect.element(page.getByTestId('header')).toHaveCSS('padding-left', '8px');
  await expect.element(page.getByTestId('header')).toHaveCSS('padding-top', '8px');
  await expect.element(page.getByTestId('body')).toHaveCSS('padding-left', '32px');
  await expect.element(page.getByTestId('footer')).toHaveCSS('padding-top', '32px');
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
});