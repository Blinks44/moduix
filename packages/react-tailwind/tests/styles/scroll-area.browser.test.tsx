import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@/index';

test('renders Ark anatomy with stable styling hooks, Tailwind defaults, and forwarded refs', async () => {
  const rootRef = createRef<HTMLDivElement>();
  const viewportRef = createRef<HTMLDivElement>();

  render(
    <ScrollArea
      ref={rootRef}
      data-slot="consumer-root"
      data-variant="consumer"
      fade
      variant="always"
    >
      <ScrollAreaViewport ref={viewportRef} data-slot="consumer-viewport">
        <ScrollAreaContent>Scrollable content</ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>,
  );

  const root = rootRef.current!;
  const viewport = viewportRef.current!;

  expect('Root' in ScrollArea).toBe(false);
  expect(root.getAttribute('data-scope')).toBe('scroll-area');
  expect(root.getAttribute('data-part')).toBe('root');
  expect(root.getAttribute('data-slot')).toBe('scroll-area-root');
  expect(root.hasAttribute('data-fade')).toBe(true);
  expect(root.getAttribute('data-variant')).toBe('always');
  expect(viewport.getAttribute('data-part')).toBe('viewport');
  expect(viewport.getAttribute('data-slot')).toBe('scroll-area-viewport');
  await expect
    .element(page.getByText('Scrollable content'))
    .toHaveAttribute('data-slot', 'scroll-area-content');
  await expect.element(page.locator('[data-slot="scroll-area-scrollbar"]')).toBeAttached();
  await expect.element(page.locator('[data-slot="scroll-area-thumb"]')).toBeAttached();
  await expect.element(page.locator('[data-slot="scroll-area-corner"]')).toBeAttached();
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(
    <ScrollArea className="h-20">
      <ScrollAreaViewport className="rounded-none">
        <ScrollAreaContent>Scrollable content</ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar className="opacity-100">
        <ScrollAreaThumb className="bg-primary" />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>,
  );

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