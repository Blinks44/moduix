import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@/index';

test('preserves Ark asChild composition and forwards refs for every visible part', async () => {
  let rootRef: HTMLDivElement | undefined;
  let viewportRef!: HTMLDivElement;
  let contentRef!: HTMLDivElement;
  let scrollbarRef!: HTMLDivElement;
  let thumbRef!: HTMLDivElement;
  let cornerRef!: HTMLDivElement;

  render(() => (
    <ScrollArea
      asChild={(props) => <div {...props()} aria-label="Related articles" role="region" />}
      ref={(element) => (rootRef = element)}
    >
      <ScrollAreaViewport ref={(element) => (viewportRef = element)}>
        <ScrollAreaContent ref={(element) => (contentRef = element)}>
          Article list
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar ref={(element) => (scrollbarRef = element)}>
        <ScrollAreaThumb ref={(element) => (thumbRef = element)} />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner ref={(element) => (cornerRef = element)} />
    </ScrollArea>
  ));

  expect(rootRef).toBeUndefined();
  const root = screen.getByRole('region', { name: 'Related articles' });
  expect(root.tagName).toBe('DIV');
  await expect
    .element(page.getByRole('region', { name: 'Related articles', exact: true }))
    .toHaveAttribute('data-slot', 'scroll-area-root');
  await expect
    .element(page.getByRole('region', { name: 'Related articles', exact: true }))
    .not.toHaveAttribute('data-fade');
  await expect
    .element(page.getByRole('region', { name: 'Related articles', exact: true }))
    .toHaveAttribute('data-variant', 'hover');
  expect(viewportRef.getAttribute('data-slot')).toBe('scroll-area-viewport');
  expect(contentRef.getAttribute('data-slot')).toBe('scroll-area-content');
  expect(scrollbarRef.getAttribute('data-slot')).toBe('scroll-area-scrollbar');
  expect(thumbRef.getAttribute('data-slot')).toBe('scroll-area-thumb');
  expect(cornerRef.getAttribute('data-slot')).toBe('scroll-area-corner');
});

test('renders Ark anatomy with stable styling hooks, Tailwind defaults, and forwarded refs', async () => {
  let rootRef!: HTMLDivElement;
  let viewportRef!: HTMLDivElement;

  render(() => (
    <ScrollArea
      ref={(element) => (rootRef = element)}
      data-slot="consumer-root"
      data-variant="consumer"
      fade
      variant="always"
    >
      <ScrollAreaViewport ref={(element) => (viewportRef = element)} data-slot="consumer-viewport">
        <ScrollAreaContent>Scrollable content</ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  ));

  const root = rootRef;
  const viewport = viewportRef;

  expect('Root' in ScrollArea).toBe(false);
  expect(root!.getAttribute('data-scope')).toBe('scroll-area');
  expect(root!.getAttribute('data-part')).toBe('root');
  expect(root!.getAttribute('data-slot')).toBe('scroll-area-root');
  expect(root!.hasAttribute('data-fade')).toBe(true);
  expect(root!.getAttribute('data-variant')).toBe('always');
  expect(viewport!.getAttribute('data-part')).toBe('viewport');
  expect(viewport!.getAttribute('data-slot')).toBe('scroll-area-viewport');
  await expect
    .element(page.getByText('Scrollable content'))
    .toHaveAttribute('data-slot', 'scroll-area-content');
  await expect.element(page.locator('[data-slot="scroll-area-scrollbar"]')).toBeAttached();
  await expect.element(page.locator('[data-slot="scroll-area-thumb"]')).toBeAttached();
  await expect.element(page.locator('[data-slot="scroll-area-corner"]')).toBeAttached();
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(() => (
    <ScrollArea class="h-20">
      <ScrollAreaViewport class="rounded-none">
        <ScrollAreaContent>Scrollable content</ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar class="opacity-100">
        <ScrollAreaThumb class="bg-primary" />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  ));

  const root = document.querySelector('[data-slot="scroll-area-root"]')!;
  const viewport = document.querySelector('[data-slot="scroll-area-viewport"]')!;
  const scrollbar = document.querySelector('[data-slot="scroll-area-scrollbar"]')!;
  const thumb = document.querySelector('[data-slot="scroll-area-thumb"]')!;

  expect([...root.classList]).toEqual(expect.arrayContaining(['h-20']));
  expect([...viewport.classList]).toEqual(expect.arrayContaining(['rounded-none']));
  expect([...scrollbar.classList]).toEqual(expect.arrayContaining(['opacity-100']));
  expect([...thumb.classList]).toEqual(expect.arrayContaining(['bg-primary']));

  await expect.element(page.locator('[data-slot="scroll-area-root"]')).toHaveCSS('height', '80px');
  await expect
    .element(page.locator('[data-slot="scroll-area-viewport"]'))
    .toHaveCSS('border-radius', '0px');
  await expect
    .element(page.locator('[data-slot="scroll-area-scrollbar"]'))
    .toHaveCSS('opacity', '1');
});