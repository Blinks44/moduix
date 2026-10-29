import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
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