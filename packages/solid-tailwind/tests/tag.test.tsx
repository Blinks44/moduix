import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement } from '../src';

test('renders every part with stable hooks and native defaults', () => {
  render(() => (
    <Tag class="consumer-tag" data-testid="root" size="sm" variant="secondary">
      <TagStartElement data-testid="start" />
      <TagLabel data-testid="label">Draft</TagLabel>
      <TagEndElement data-testid="end">
        <TagCloseTrigger data-testid="close" />
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
    expect(element).toHaveAttribute('data-scope', 'tag');
    expect(element).toHaveAttribute('data-part', part);
    expect(element).toHaveAttribute('data-slot', slot);
  }

  const root = screen.getByTestId('root');
  const close = screen.getByTestId('close');

  expect(root).toHaveClass('consumer-tag');
  expect(root).toHaveAttribute('data-size', 'sm');
  expect(root).toHaveAttribute('data-variant', 'secondary');
  expect(close).toHaveAttribute('type', 'button');
  expect(close).toHaveAttribute('aria-label', 'Remove tag');
  expect(close.querySelector('svg')).not.toBeNull();
});

test('forwards refs through ordinary rendered parts', () => {
  let rootRef!: HTMLSpanElement;
  let labelRef!: HTMLSpanElement;
  let closeRef!: HTMLButtonElement;

  render(() => (
    <Tag ref={(element) => (rootRef = element)}>
      <TagLabel ref={(element) => (labelRef = element)}>Production</TagLabel>
      <TagCloseTrigger ref={(element) => (closeRef = element)} />
    </Tag>
  ));

  expect(rootRef).toBe(screen.getByText('Production').parentElement);
  expect(labelRef).toBe(screen.getByText('Production'));
  expect(closeRef).toBe(screen.getByRole('button', { name: 'Remove tag' }));
});

test('applies the documented root defaults', () => {
  render(() => <Tag data-testid="tag">TypeScript</Tag>);

  expect(screen.getByTestId('tag')).toHaveAttribute('data-size', 'md');
  expect(screen.getByTestId('tag')).toHaveAttribute('data-variant', 'default');
});

test('uses an accessible close button and prevents disabled activation', () => {
  const [disabled, setDisabled] = createSignal(false);
  let clickCount = 0;
  render(() => <TagCloseTrigger aria-disabled={disabled()} onClick={() => clickCount++} />);

  const close = screen.getByRole('button', { name: 'Remove tag' });
  expect(close).toHaveAccessibleName('Remove tag');
  fireEvent.click(close);
  expect(clickCount).toBe(1);

  setDisabled(true);
  expect(close).toHaveAttribute('data-disabled');
  expect(fireEvent.click(close)).toBe(false);
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

  expect(button).toHaveAttribute('data-scope', 'tag');
  expect(button).toHaveAttribute('data-part', 'root');
  expect(button).toHaveAttribute('data-slot', 'tag-root');
  expect(button).toHaveAttribute('data-size', 'sm');
  expect(button).toHaveAttribute('data-variant', 'outline');
});

test('does not forward refs through native Ark Solid root asChild composition', () => {
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

  expect(screen.getByRole('link', { name: 'Open filter' })).toBeInTheDocument();
  expect(rootRef).toBeUndefined();
});

test('preserves semantic close-trigger composition with native Ark Solid asChild', () => {
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

  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveAttribute('data-owner', 'consumer');
  expect(button).toHaveAttribute('data-scope', 'tag');
  expect(button).toHaveAttribute('data-part', 'close-trigger');
  expect(button).toHaveAttribute('data-slot', 'tag-close-trigger');
});

test('does not forward refs through native Ark Solid close-trigger asChild composition', () => {
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

  expect(screen.getByRole('button', { name: 'Remove billing tag' })).toBeInTheDocument();
  expect(closeRef).toBeUndefined();
});

test('prevents disabled close-trigger activation', () => {
  let clickCount = 0;

  render(() => <TagCloseTrigger disabled onClick={() => clickCount++} />);

  const close = screen.getByRole('button', { name: 'Remove tag' });

  expect(fireEvent.click(close)).toBe(false);
  expect(clickCount).toBe(0);
  expect(close).toHaveAttribute('data-disabled');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => (
    <Tag class="gap-3 bg-card px-4 text-card-foreground" data-testid="tag">
      <TagLabel>TypeScript</TagLabel>
    </Tag>
  ));

  const tag = screen.getByTestId('tag');

  expect(tag).toHaveClass('gap-3', 'px-4', 'bg-card', 'text-card-foreground');
  expect(tag).not.toHaveClass('gap-1.5', 'px-2', 'bg-primary', 'text-primary-foreground');
});
