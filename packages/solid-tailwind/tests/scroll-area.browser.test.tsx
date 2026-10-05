import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
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
  const content = screen.getByText('Scrollable content');
  const scrollbar = document.querySelector('[data-slot="scroll-area-scrollbar"]')!;
  const thumb = document.querySelector('[data-slot="scroll-area-thumb"]')!;
  const corner = document.querySelector('[data-slot="scroll-area-corner"]')!;

  expect('Root' in ScrollArea).toBe(false);
  expect(root!.getAttribute('data-scope')).toBe('scroll-area');
  expect(root!.getAttribute('data-part')).toBe('root');
  expect(root!.getAttribute('data-slot')).toBe('scroll-area-root');
  expect(root!.hasAttribute('data-fade')).toBe(true);
  expect(root!.getAttribute('data-variant')).toBe('always');
  expect([...root!.classList]).toEqual(
    expect.arrayContaining(['relative', 'h-full', 'w-full', 'text-foreground']),
  );
  expect(viewport!.getAttribute('data-part')).toBe('viewport');
  expect(viewport!.getAttribute('data-slot')).toBe('scroll-area-viewport');
  expect([...viewport!.classList]).toEqual(
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
        style={{ width: '240px', height: '120px' }}
      >
        <ScrollAreaViewport>
          <ScrollAreaContent style={{ height: '480px' }}>Provider content</ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar>
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
        <ScrollAreaContext>
          {(context) => (
            <>
              <output>{String(context().isAtTop)}</output>
              <button
                type="button"
                onClick={() => context().scrollToEdge({ edge: 'bottom', behavior: 'instant' })}
              >
                Scroll to bottom
              </button>
            </>
          )}
        </ScrollAreaContext>
      </ScrollAreaRootProvider>
    );
  }

  render(() => <ProviderScrollArea />);

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
  expect([...root!.classList]).toEqual(
    expect.arrayContaining(['group/scroll-area', 'relative', 'h-full', 'w-full']),
  );
  expect(viewportRef.getAttribute('data-slot')).toBe('scroll-area-viewport');
  expect(contentRef.getAttribute('data-slot')).toBe('scroll-area-content');
  expect(scrollbarRef.getAttribute('data-slot')).toBe('scroll-area-scrollbar');
  expect(thumbRef.getAttribute('data-slot')).toBe('scroll-area-thumb');
  expect(cornerRef.getAttribute('data-slot')).toBe('scroll-area-corner');
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