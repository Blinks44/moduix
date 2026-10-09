import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  RatingGroup,
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItem,
  RatingGroupItemIndicator,
  RatingGroupItems,
  RatingGroupLabel,
  RatingGroupRootProvider,
  useRatingGroup,
} from '../src';

function RatingItems() {
  return (
    <RatingGroupControl>
      <RatingGroupItems />
    </RatingGroupControl>
  );
}

function ProviderRatingGroup() {
  const ratingGroup = useRatingGroup({ defaultValue: 3 });

  return (
    <RatingGroupRootProvider value={ratingGroup}>
      <RatingGroupLabel>Provider rating</RatingGroupLabel>
      <RatingItems />
    </RatingGroupRootProvider>
  );
}

function ControlledRatingGroup() {
  const [value, setValue] = createSignal(2);

  return (
    <RatingGroup value={value()} onValueChange={(details) => setValue(details.value)}>
      <RatingGroupLabel>Controlled rating</RatingGroupLabel>
      <RatingItems />
    </RatingGroup>
  );
}

test('submits through an explicit Ark hidden input', async () => {
  const changes: number[] = [];
  const { container } = render(() => (
    <form>
      <RatingGroup
        defaultValue={3}
        name="rating"
        onValueChange={(details) => changes.push(details.value)}
      >
        <RatingGroupLabel>Rating</RatingGroupLabel>
        <RatingItems />
        <RatingGroupHiddenInput />
      </RatingGroup>
    </form>
  ));

  const form = container.querySelector('form') as HTMLFormElement;

  await expect.element(page.locator('input[hidden]')).toHaveAttribute('name', 'rating');
  expect(new FormData(form).get('rating')).toBe('3');

  await page.getByRole('radio').nth(3).click();
  await expect.poll(() => changes).toEqual([4]);
  expect(new FormData(form).get('rating')).toBe('4');
  await page.getByRole('radio').nth(4).click();
  await expect.poll(() => new FormData(form).get('rating')).toBe('5');
  expect(changes).toEqual([4, 5]);
});

test('preserves asChild composition with an explicit hidden input', () => {
  const { container } = render(() => (
    <RatingGroup
      asChild={(props) => <section {...props()} data-testid="rating-root" />}
      defaultValue={2}
    >
      <>
        <RatingGroupLabel>Rating</RatingGroupLabel>
        <RatingItems />
        <RatingGroupHiddenInput />
      </>
    </RatingGroup>
  ));

  const root = screen.getByTestId('rating-root');

  expect(root.tagName).toBe('SECTION');
  expect(root.querySelectorAll('input[hidden]')).toHaveLength(1);
  expect(container.querySelectorAll('[data-slot="rating-group-item"]')).toHaveLength(5);
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let rootRef: HTMLElement | undefined;

  render(() => (
    <RatingGroup
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} />}
      defaultValue={2}
    >
      <RatingItems />
    </RatingGroup>
  ));

  expect(rootRef).toBeUndefined();
});

test('preserves controlled and provider paths', async () => {
  const controlled = render(() => <ControlledRatingGroup />);
  const items = page.getByRole('radio');
  await items.nth(3).click();
  await expect.element(items.nth(3)).toHaveAttribute('aria-checked', 'true');
  await expect.element(items.nth(3)).toHaveAttribute('data-checked');
  controlled.unmount();
  render(() => <ProviderRatingGroup />);
  await expect.element(items.nth(2)).toHaveAttribute('aria-checked', 'true');
  await expect.element(items.nth(2)).toHaveAttribute('data-checked');
});
test('preserves half steps, keyboard focus and mouse focus visibility', async () => {
  render(() => (
    <>
      <button type="button">Before rating</button>
      <RatingGroup allowHalf defaultValue={3.5}>
        <RatingGroupLabel>Rating</RatingGroupLabel>
        <RatingItems />
      </RatingGroup>
    </>
  ));
  const items = page.getByRole('radio');
  const before = page.getByRole('button', { name: 'Before rating', exact: true });
  await expect.element(items.nth(3)).toHaveAttribute('data-half');
  await before.click();
  await before.press('Tab');
  await expect.element(items.nth(3)).toBeFocused();
  await items.nth(3).press('ArrowLeft');
  await expect.element(items.nth(2)).toBeFocused();
  await items.nth(2).press('ArrowRight');
  await expect.element(items.nth(3)).toBeFocused();
  await expect.element(items.nth(3)).toHaveAttribute('data-half');
  await items.nth(2).click();
  await expect.element(items.nth(2)).toBeFocused();
  await expect.element(items.nth(2)).not.toHaveAttribute('data-focus-visible');
});
test('repeats custom indicators with Ark item state', async () => {
  render(() => (
    <RatingGroup allowHalf defaultValue={3.5}>
      <RatingGroupLabel>Rating</RatingGroupLabel>
      <RatingGroupControl>
        <RatingGroupItems>
          <RatingGroupItemIndicator data-testid="custom-indicator">
            <span>Star</span>
          </RatingGroupItemIndicator>
        </RatingGroupItems>
      </RatingGroupControl>
    </RatingGroup>
  ));

  const indicators = screen.getAllByTestId('custom-indicator');

  expect(indicators).toHaveLength(5);
  await expect
    .element(page.getByTestId('custom-indicator').nth(2))
    .toHaveAttribute('data-highlighted');
  await expect.element(page.getByTestId('custom-indicator').nth(3)).toHaveAttribute('data-half');
});

test('forwards refs and exposes stable slots on public parts', async () => {
  let rootRef!: HTMLDivElement;
  let labelRef!: HTMLLabelElement;
  let controlRef!: HTMLDivElement;
  let itemRef!: HTMLSpanElement;
  let indicatorRef!: HTMLSpanElement;

  render(() => (
    <RatingGroup ref={(element) => (rootRef = element)} defaultValue={3}>
      <RatingGroupLabel ref={(element) => (labelRef = element)}>Rating</RatingGroupLabel>
      <RatingGroupControl ref={(element) => (controlRef = element)}>
        <RatingGroupItem ref={(element) => (itemRef = element)} index={1}>
          <RatingGroupItemIndicator ref={(element) => (indicatorRef = element)} />
        </RatingGroupItem>
      </RatingGroupControl>
      <RatingGroupHiddenInput />
    </RatingGroup>
  ));

  expect(rootRef.getAttribute('data-slot')).toBe('rating-group-root');
  expect(labelRef.getAttribute('data-slot')).toBe('rating-group-label');
  expect(controlRef.getAttribute('data-slot')).toBe('rating-group-control');
  expect(itemRef.getAttribute('data-slot')).toBe('rating-group-item');
  expect(indicatorRef.getAttribute('data-slot')).toBe('rating-group-item-indicator');
  await expect.element(page.locator('input[hidden]')).toHaveAttribute('hidden');
});