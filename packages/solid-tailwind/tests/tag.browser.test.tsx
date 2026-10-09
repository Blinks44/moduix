import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement } from '../src';

test('resolves custom close-trigger children once and preserves their reactive content', async () => {
  const [label, setLabel] = createSignal('Dismiss');
  let childMounts = 0;
  function CustomChild() {
    childMounts++;
    return <span data-testid="custom-child">{label()}</span>;
  }
  render(() => (
    <TagCloseTrigger data-testid="close">
      <CustomChild />
    </TagCloseTrigger>
  ));

  const child = screen.getByTestId('custom-child');
  expect(childMounts).toBe(1);
  expect(child.parentElement).toBe(screen.getByTestId('close'));
  setLabel('Remove');
  expect(screen.getByTestId('custom-child')).toBe(child);
  await expect.element(page.getByTestId('custom-child')).toContainText('Remove');
  expect(childMounts).toBe(1);
});

test('renders every part with stable hooks and native defaults', async () => {
  let rootRef!: HTMLSpanElement;
  let labelRef!: HTMLSpanElement;
  let closeRef!: HTMLButtonElement;

  render(() => (
    <Tag
      ref={(element) => (rootRef = element)}
      class="consumer-tag"
      data-testid="root"
      size="sm"
      variant="secondary"
    >
      <TagStartElement data-testid="start" />
      <TagLabel ref={(element) => (labelRef = element)} data-testid="label">
        Draft
      </TagLabel>
      <TagEndElement data-testid="end">
        <TagCloseTrigger ref={(element) => (closeRef = element)} data-testid="close" />
      </TagEndElement>
    </Tag>
  ));

  const parts = [
    ['root', 'span', 'root', 'tag-root'],
    ['start', 'span', 'start-element', 'tag-start-element'],
    ['label', 'span', 'label', 'tag-label'],
    ['end', 'span', 'end-element', 'tag-end-element'],
    ['close', 'button', 'close-trigger', 'tag-close-trigger'],
  ] as const;

  for (const [testId, tagName, part, slot] of parts) {
    const element = screen.getByTestId(testId);

    expect(element.tagName).toBe(tagName.toUpperCase());
    expect(element.dataset).toMatchObject({ scope: 'tag', part: part, slot: slot });
  }

  const root = screen.getByTestId('root');
  const close = screen.getByTestId('close');

  expect(rootRef).toBe(root);
  expect(labelRef).toBe(screen.getByTestId('label'));
  expect(closeRef).toBe(close);
  expect(root?.classList.contains('consumer-tag')).toBe(true);
  expect(root.dataset).toMatchObject({ size: 'sm', variant: 'secondary' });
  await expect.element(page.getByTestId('close')).toHaveAttribute('type', 'button');
  await expect.element(page.getByTestId('close')).toHaveAttribute('aria-label', 'Remove tag');
  expect(close.querySelector('svg')).not.toBeNull();
});

test('applies the documented root defaults', () => {
  render(() => <Tag data-testid="tag">TypeScript</Tag>);

  expect(screen.getByTestId('tag').dataset).toMatchObject({ size: 'md', variant: 'default' });
});

test('uses an accessible close button and prevents disabled activation', async () => {
  const [disabled, setDisabled] = createSignal(false);
  let clickCount = 0;
  render(() => <TagCloseTrigger aria-disabled={disabled()} onClick={() => clickCount++} />);

  const close = screen.getByRole('button', { name: 'Remove tag' });
  expect(screen.getByRole('button', { name: 'Remove tag' })).toBe(close);
  await page.getByRole('button', { name: 'Remove tag' }).click();
  expect(clickCount).toBe(1);

  setDisabled(true);
  await expect
    .element(page.getByRole('button', { name: 'Remove tag' }))
    .toHaveAttribute('data-disabled');
  expect(close.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))).toBe(
    false,
  );
  expect(clickCount).toBe(1);
});

test('preserves semantic root composition with native Ark Solid asChild', () => {
  render(() => (
    <Tag
      asChild={(props) => (
        <button {...props()} type="button">
          <TagLabel>Open filter</TagLabel>
        </button>
      )}
      size="sm"
      variant="outline"
    />
  ));

  const button = screen.getByRole('button', { name: 'Open filter' });

  expect(button.dataset).toMatchObject({
    scope: 'tag',
    part: 'root',
    slot: 'tag-root',
    size: 'sm',
    variant: 'outline',
  });
});

test('does not forward refs through native Ark Solid root asChild composition', async () => {
  let rootRef: HTMLSpanElement | undefined;

  render(() => (
    <Tag
      ref={(element) => (rootRef = element)}
      asChild={(props) => (
        <a {...props()} href="#filter">
          Open filter
        </a>
      )}
    />
  ));

  await expect.element(page.getByRole('link', { name: 'Open filter' })).toBeAttached();
  expect(rootRef).toBeUndefined();
});

test('preserves semantic close-trigger composition with native Ark Solid asChild', async () => {
  render(() => (
    <TagCloseTrigger
      aria-label="Remove billing tag"
      asChild={(props) => (
        <button {...props()} type="button" data-owner="consumer">
          Remove
        </button>
      )}
    />
  ));

  const button = screen.getByRole('button', { name: 'Remove billing tag' });

  await expect
    .element(page.getByRole('button', { name: 'Remove billing tag' }))
    .toHaveAttribute('type', 'button');
  expect(button.dataset).toMatchObject({
    owner: 'consumer',
    scope: 'tag',
    part: 'close-trigger',
    slot: 'tag-close-trigger',
  });
});

test('does not forward refs through native Ark Solid close-trigger asChild composition', async () => {
  let closeRef: HTMLButtonElement | undefined;

  render(() => (
    <TagCloseTrigger
      ref={(element) => (closeRef = element)}
      aria-label="Remove billing tag"
      asChild={(props) => (
        <button {...props()} type="button">
          Remove
        </button>
      )}
    />
  ));

  await expect.element(page.getByRole('button', { name: 'Remove billing tag' })).toBeAttached();
  expect(closeRef).toBeUndefined();
});

test('prevents disabled close-trigger activation', async () => {
  let clickCount = 0;

  render(() => <TagCloseTrigger disabled onClick={() => clickCount++} />);

  const close = screen.getByRole('button', { name: 'Remove tag' });

  expect(close.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))).toBe(
    false,
  );
  expect(clickCount).toBe(0);
  await expect
    .element(page.getByRole('button', { name: 'Remove tag' }))
    .toHaveAttribute('data-disabled');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => (
    <Tag class="gap-3 bg-card px-4 text-card-foreground" data-testid="tag">
      <TagLabel>TypeScript</TagLabel>
    </Tag>
  ));

  const tag = screen.getByTestId('tag');

  expect([...tag!.classList]).toEqual(
    expect.arrayContaining(['gap-3', 'px-4', 'bg-card', 'text-card-foreground']),
  );
  for (const utility of ['gap-1.5', 'px-2', 'bg-primary', 'text-primary-foreground']) {
    expect(tag!.classList.contains(utility)).toBe(false);
  }
});