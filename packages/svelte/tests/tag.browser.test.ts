import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import { Tag, TagCloseTrigger } from '@/components/tag';
import AsChildTag from './tag/AsChildTag.svelte';
import CustomIconTagClose from './tag/CustomIconTagClose.svelte';
import LabelledTagClose from './tag/LabelledTagClose.svelte';
import ReactiveTag from './tag/ReactiveTag.svelte';
import SpanAsChildTag from './tag/SpanAsChildTag.svelte';
import TagParts from './tag/TagParts.svelte';

test('renders every part with stable hooks, attrs, defaults, and a Svelte ref', async () => {
  const { component } = render(TagParts);

  const parts = [
    ['root', 'SPAN', 'root', 'tag-root'],
    ['start', 'SPAN', 'start-element', 'tag-start-element'],
    ['label', 'SPAN', 'label', 'tag-label'],
    ['end', 'SPAN', 'end-element', 'tag-end-element'],
    ['close', 'BUTTON', 'close-trigger', 'tag-close-trigger'],
  ] as const;

  for (const [testId, tagName, part, slot] of parts) {
    const element = screen.getByTestId(testId);

    expect(element.tagName).toBe(tagName);
    expect(element.dataset).toMatchObject({ scope: 'tag', part: part, slot: slot });
  }

  const root = screen.getByTestId('root');
  const close = screen.getByTestId('close');
  const refs = component.getRefs();

  expect(refs.root).toBe(root);
  expect(refs.label).toBe(screen.getByTestId('label'));
  expect(refs.close).toBe(close);
  expect(root.classList.contains('consumer-tag')).toBe(true);
  expect(root.dataset).toMatchObject({ size: 'sm', variant: 'secondary' });
  await expect.element(page.getByTestId('close')).toHaveAttribute('type', 'button');
  expect(screen.getByRole('button', { name: 'Remove tag' })).toBe(close);
  expect(close.querySelector('svg')).not.toBeNull();
});

test('applies the documented root defaults', () => {
  const { container } = render(Tag, { props: { 'data-testid': 'tag' } });

  const tag = container.querySelector<HTMLElement>('[data-testid="tag"]')!;

  expect(tag.dataset).toMatchObject({ size: 'md', variant: 'default' });
});

test('uses an accessible close button and prevents aria-disabled activation', async () => {
  const handleClick = rs.fn();

  const { rerender } = render(TagCloseTrigger, {
    props: { 'aria-label': 'Remove Draft tag', onclick: handleClick },
  });

  const close = screen.getByRole('button', { name: 'Remove Draft tag' });
  await page.getByRole('button', { name: 'Remove Draft tag' }).click();
  expect(handleClick).toHaveBeenCalledTimes(1);

  await rerender({ 'aria-disabled': 'true' });

  await expect
    .element(page.getByRole('button', { name: 'Remove Draft tag' }))
    .toHaveAttribute('data-disabled');
  const click = new MouseEvent('click', { bubbles: true, cancelable: true });
  expect(close.dispatchEvent(click)).toBe(false);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('does not add the fallback aria-label when aria-labelledby names the close trigger', async () => {
  render(LabelledTagClose);

  await expect
    .element(page.getByRole('button', { name: 'Remove Draft tag' }))
    .not.toHaveAttribute('aria-label');
  await expect
    .element(page.getByRole('button', { name: 'Remove Draft tag' }))
    .toHaveAttribute('aria-labelledby', 'tag-label');
});

test('supports semantic custom hosts for every span part with asChild', () => {
  render(SpanAsChildTag);

  for (const [testId, tagName, part, slot] of [
    ['start', 'I', 'start-element', 'tag-start-element'],
    ['label', 'STRONG', 'label', 'tag-label'],
    ['end', 'I', 'end-element', 'tag-end-element'],
  ] as const) {
    const element = screen.getByTestId(testId);

    expect(element.tagName).toBe(tagName);
    expect(element.dataset).toMatchObject({ scope: 'tag', part: part, slot: slot });
  }
});

test('preserves semantic custom hosts and refs with asChild', async () => {
  const { component } = render(AsChildTag);

  const link = screen.getByRole('link', { name: 'Open filters' });
  const close = screen.getByRole('button', { name: 'Remove Draft tag' });
  const refs = component.getRefs();

  expect(refs.root).toBe(link);
  await expect
    .element(page.getByRole('link', { name: 'Open filters' }))
    .toHaveAttribute('href', '#filters');
  expect(link.dataset).toMatchObject({
    scope: 'tag',
    part: 'root',
    slot: 'tag-root',
    variant: 'outline',
  });
  expect(refs.close).toBe(close);
  await expect
    .element(page.getByRole('button', { name: 'Remove Draft tag' }))
    .toHaveAttribute('type', 'button');
  expect(close.dataset).toMatchObject({ owner: 'consumer', slot: 'tag-close-trigger' });
});

test('prevents disabled close-trigger activation', async () => {
  const handleClick = rs.fn();
  render(TagCloseTrigger, { props: { disabled: true, onclick: handleClick } });

  const close = screen.getByRole('button', { name: 'Remove tag' });

  await expect.element(page.getByRole('button', { name: 'Remove tag' })).toBeDisabled();
  const click = new MouseEvent('click', { bubbles: true, cancelable: true });
  expect(close.dispatchEvent(click)).toBe(false);
  expect(handleClick).not.toHaveBeenCalled();
});

test('updates Tag variants, close names, and native form behavior reactively', async () => {
  const submitted = rs.fn();
  const clicked = rs.fn();

  const { rerender } = render(ReactiveTag, { props: { clicked, submitted } });
  const close = screen.getByRole('button', { name: 'Remove tag' });
  await page.getByRole('button', { name: 'Remove tag' }).click();
  expect(clicked).toHaveBeenCalledTimes(1);
  expect(submitted).not.toHaveBeenCalled();

  await rerender({ variant: 'outline', size: 'sm', labelledby: 'remove-label' });
  expect(screen.getByTestId('tag').dataset).toMatchObject({ variant: 'outline', size: 'sm' });
  await expect
    .element(page.getByRole('button', { name: 'Remove chosen filter' }))
    .not.toHaveAttribute('aria-label');
  expect(screen.getByRole('button', { name: 'Remove chosen filter' })).toBe(close);

  await rerender({ labelledby: undefined, label: 'Remove Filter tag' });
  expect(screen.getByRole('button', { name: 'Remove Filter tag' })).toBe(close);
  await expect
    .element(page.getByRole('button', { name: 'Remove Filter tag' }))
    .not.toHaveAttribute('aria-labelledby');

  await rerender({ label: undefined });
  expect(screen.getByRole('button', { name: 'Remove tag' })).toBe(close);
});

test('keeps the fallback name when the close trigger has a custom icon', () => {
  render(CustomIconTagClose);

  const close = screen.getByRole('button', { name: 'Remove tag' });

  expect(close.contains(screen.getByTestId('custom-icon'))).toBe(true);
});