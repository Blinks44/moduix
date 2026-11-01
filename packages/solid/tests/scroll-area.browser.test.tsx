import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
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
} from '@/index';

test('renders Ark anatomy with stable styling hooks and forwarded refs', async () => {
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
  await expect
    .element(page.locator('[data-slot="scroll-area-viewport"]'))
    .toHaveAttribute('data-overflow-y');
  await page.getByRole('button', { name: 'Scroll to bottom', exact: true }).click();
  await expect
    .element(page.locator('[data-slot="scroll-area-viewport"]'))
    .toHaveAttribute('data-at-bottom');
  await expect.element(page.getByText('false', { exact: true })).toBeAttached();
});

test('shows only the overflowing scrollbar with the always variant', async () => {
  render(() => (
    <ScrollArea variant="always" style={{ width: '200px', height: '100px' }}>
      <ScrollAreaViewport>
        <ScrollAreaContent style={{ height: '400px' }}>Tall content</ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar data-testid="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar data-testid="horizontal" orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </ScrollArea>
  ));

  await expect.element(page.getByTestId('vertical')).toHaveAttribute('data-overflow-y');
  await expect.element(page.getByTestId('horizontal')).not.toHaveAttribute('data-overflow-x');
  const vertical = document.querySelector<HTMLElement>('[data-testid="vertical"]')!;
  const horizontal = document.querySelector<HTMLElement>('[data-testid="horizontal"]')!;

  expect(getComputedStyle(vertical).opacity).toBe('1');
  expect(vertical.offsetWidth).toBe(4);
  expect(vertical.offsetHeight).toBe(92);
  expect(getComputedStyle(horizontal).display).toBe('none');
});