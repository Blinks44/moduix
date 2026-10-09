import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import {
  ScrollArea,
  ScrollAreaContext,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRootProvider,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  useScrollArea,
} from '../src';

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
  const content = screen.getByText('Scrollable content');
  const scrollbar = document.querySelector('[data-slot="scroll-area-scrollbar"]')!;
  const thumb = document.querySelector('[data-slot="scroll-area-thumb"]')!;
  const corner = document.querySelector('[data-slot="scroll-area-corner"]')!;

  expect('Root' in ScrollArea).toBe(false);
  expect(root.getAttribute('data-scope')).toBe('scroll-area');
  expect(root.getAttribute('data-part')).toBe('root');
  expect(root.getAttribute('data-slot')).toBe('scroll-area-root');
  expect(root.hasAttribute('data-fade')).toBe(true);
  expect(root.getAttribute('data-variant')).toBe('always');
  expect([...root.classList]).toEqual(
    expect.arrayContaining(['relative', 'h-full', 'w-full', 'text-foreground']),
  );
  expect(viewport.getAttribute('data-part')).toBe('viewport');
  expect(viewport.getAttribute('data-slot')).toBe('scroll-area-viewport');
  expect([...viewport.classList]).toEqual(
    expect.arrayContaining(['rounded-md', '[scrollbar-width:none]']),
  );
  await expect
    .element(page.getByText('Scrollable content'))
    .toHaveAttribute('data-slot', 'scroll-area-content');
  expect([...content!.classList]).toEqual(expect.arrayContaining(['block']));
  await expect.element(page.locator('[data-slot="scroll-area-scrollbar"]')).toBeAttached();
  expect([...scrollbar.classList]).toEqual(
    expect.arrayContaining(['rounded-md', 'opacity-0', 'pointer-events-none']),
  );
  await expect.element(page.locator('[data-slot="scroll-area-thumb"]')).toBeAttached();
  expect([...thumb.classList]).toEqual(expect.arrayContaining(['rounded-full', 'bg-border']));
  await expect.element(page.locator('[data-slot="scroll-area-corner"]')).toBeAttached();
  expect([...corner.classList]).toEqual(expect.arrayContaining(['bg-transparent']));
});

test('keeps RootProvider composition on the moduix surface', async () => {
  function ProviderScrollArea() {
    const scrollArea = useScrollArea();

    return (
      <ScrollAreaRootProvider
        value={scrollArea}
        data-slot="consumer-provider"
        style={{ width: 240, height: 120 }}
      >
        <ScrollAreaViewport>
          <ScrollAreaContent style={{ height: 480 }}>Provider content</ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar>
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
        <ScrollAreaContext>
          {(context) => (
            <>
              <output>{String(context.isAtTop)}</output>
              <button
                type="button"
                onClick={() => context.scrollToEdge({ edge: 'bottom', behavior: 'instant' })}
              >
                Scroll to bottom
              </button>
            </>
          )}
        </ScrollAreaContext>
      </ScrollAreaRootProvider>
    );
  }

  render(<ProviderScrollArea />);

  await expect
    .element(page.locator('[data-slot="scroll-area-root-provider"]'))
    .toHaveAttribute('data-scope', 'scroll-area');
  await expect.element(page.getByText('Provider content')).toBeAttached();
  await expect.element(page.getByText('true')).toBeAttached();
  const viewport = document.querySelector('[data-slot="scroll-area-viewport"]')!;
  await expect
    .element(page.locator('[data-slot="scroll-area-viewport"]'))
    .toHaveAttribute('data-overflow-y');
  expect(viewport.scrollHeight).toBeGreaterThan(viewport.clientHeight);
  await page.getByRole('button', { name: 'Scroll to bottom', exact: true }).click();
  await expect
    .element(page.locator('[data-slot="scroll-area-viewport"]'))
    .toHaveAttribute('data-at-bottom');
  await expect.element(page.getByText('false', { exact: true })).toBeAttached();
  expect(viewport.scrollTop).toBe(viewport.scrollHeight - viewport.clientHeight);
});

test('preserves Ark asChild composition and forwards refs for every visible part', () => {
  const rootRef = createRef<HTMLDivElement>();
  const viewportRef = createRef<HTMLDivElement>();
  const contentRef = createRef<HTMLDivElement>();
  const scrollbarRef = createRef<HTMLDivElement>();
  const thumbRef = createRef<HTMLDivElement>();
  const cornerRef = createRef<HTMLDivElement>();

  render(
    <ScrollArea asChild ref={rootRef}>
      <div aria-label="Related articles" role="region">
        <ScrollAreaViewport ref={viewportRef}>
          <ScrollAreaContent ref={contentRef}>Article list</ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar ref={scrollbarRef}>
          <ScrollAreaThumb ref={thumbRef} />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner ref={cornerRef} />
      </div>
    </ScrollArea>,
  );

  expect(rootRef.current!.getAttribute('data-slot')).toBe('scroll-area-root');
  expect(rootRef.current!.hasAttribute('data-fade')).toBe(false);
  expect(rootRef.current!.getAttribute('data-variant')).toBe('hover');
  expect([...rootRef.current!.classList]).toEqual(
    expect.arrayContaining(['group/scroll-area', 'relative', 'h-full', 'w-full']),
  );
  expect(viewportRef.current!.getAttribute('data-slot')).toBe('scroll-area-viewport');
  expect(contentRef.current!.getAttribute('data-slot')).toBe('scroll-area-content');
  expect(scrollbarRef.current!.getAttribute('data-slot')).toBe('scroll-area-scrollbar');
  expect(thumbRef.current!.getAttribute('data-slot')).toBe('scroll-area-thumb');
  expect(cornerRef.current!.getAttribute('data-slot')).toBe('scroll-area-corner');
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
  expect(root.classList.contains('h-full')).toBe(false);
  expect([...viewport.classList]).toEqual(expect.arrayContaining(['rounded-none']));
  expect(viewport!.classList.contains('rounded-md')).toBe(false);
  expect([...scrollbar.classList]).toEqual(expect.arrayContaining(['opacity-100']));
  expect(scrollbar!.classList.contains('opacity-0')).toBe(false);
  expect([...thumb.classList]).toEqual(expect.arrayContaining(['bg-primary']));
  expect(thumb!.classList.contains('bg-border')).toBe(false);

  await expect.element(page.locator('[data-slot="scroll-area-root"]')).toHaveCSS('height', '80px');
  await expect
    .element(page.locator('[data-slot="scroll-area-viewport"]'))
    .toHaveCSS('border-radius', '0px');
  await expect
    .element(page.locator('[data-slot="scroll-area-scrollbar"]'))
    .toHaveCSS('opacity', '1');
});