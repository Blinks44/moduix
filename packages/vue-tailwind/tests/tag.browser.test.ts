import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Tag,
  TagCloseTrigger,
  TagEndElement,
  TagLabel,
  TagStartElement,
} from '../src/components/tag';
import SsrTag from './fixtures/SsrTag.vue';

const tagComponents = { Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement };

test('renders every part with stable hooks, attrs, defaults, and a Vue ref', async () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const labelRef = ref<ComponentPublicInstance | null>(null);
  const closeRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: tagComponents,
    setup() {
      return { rootRef, labelRef, closeRef };
    },
    template: `
      <Tag ref="rootRef" class="consumer-tag" data-testid="root" size="sm" variant="secondary">
        <TagStartElement data-testid="start">+</TagStartElement>
        <TagLabel ref="labelRef" data-testid="label">Draft</TagLabel>
        <TagEndElement data-testid="end">
          <TagCloseTrigger ref="closeRef" data-testid="close" />
        </TagEndElement>
      </Tag>
    `,
  });

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

  expect(rootRef.value?.$el).toBe(root);
  expect(labelRef.value?.$el).toBe(screen.getByTestId('label'));
  expect(closeRef.value?.$el).toBe(close);
  expect(root?.classList.contains('consumer-tag')).toBe(true);
  expect(root.dataset).toMatchObject({ size: 'sm', variant: 'secondary' });
  await expect.element(page.getByTestId('close')).toHaveAttribute('type', 'button');
  expect(screen.getByRole('button', { name: 'Remove tag' })).toBe(close);
  expect(close.querySelector('svg')).not.toBeNull();
});

test('applies the documented root defaults', () => {
  render({
    components: tagComponents,
    template: '<Tag data-testid="tag">TypeScript</Tag>',
  });

  const tag = screen.getByTestId('tag');

  expect(tag.dataset).toMatchObject({ size: 'md', variant: 'default' });
});

test('uses an accessible close button and prevents aria-disabled activation', async () => {
  const ariaDisabled = ref<boolean | 'true' | undefined>();
  const handleClick = rs.fn();

  render({
    components: { TagCloseTrigger },
    setup() {
      return { ariaDisabled, handleClick };
    },
    template:
      '<TagCloseTrigger :aria-disabled="ariaDisabled" aria-label="Remove Draft tag" @click="handleClick" />',
  });

  const close = screen.getByRole('button', { name: 'Remove Draft tag' });
  await page.getByRole('button', { name: 'Remove Draft tag' }).click();
  expect(handleClick).toHaveBeenCalledTimes(1);

  ariaDisabled.value = 'true';
  await nextTick();

  await expect
    .element(page.getByRole('button', { name: 'Remove Draft tag' }))
    .toHaveAttribute('data-disabled');
  const click = new MouseEvent('click', { bubbles: true, cancelable: true });
  expect(close.dispatchEvent(click)).toBe(false);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('does not add the fallback aria-label when aria-labelledby names the close trigger', async () => {
  render({
    components: { TagCloseTrigger },
    template: `
      <span id="tag-label">Remove Draft tag</span>
      <TagCloseTrigger aria-labelledby="tag-label" />
    `,
  });

  await expect
    .element(page.getByRole('button', { name: 'Remove Draft tag' }))
    .not.toHaveAttribute('aria-label');
  await expect
    .element(page.getByRole('button', { name: 'Remove Draft tag' }))
    .toHaveAttribute('aria-labelledby', 'tag-label');
});

test('supports semantic custom hosts for every span part with asChild', () => {
  render({
    components: tagComponents,
    template: `
      <Tag>
        <TagStartElement as-child><i data-testid="start">+</i></TagStartElement>
        <TagLabel as-child><strong data-testid="label">Draft</strong></TagLabel>
        <TagEndElement as-child><i data-testid="end">!</i></TagEndElement>
      </Tag>
    `,
  });

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
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const closeRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: tagComponents,
    setup() {
      return { closeRef, rootRef };
    },
    template: `
      <Tag ref="rootRef" as-child variant="outline">
        <a href="#filters">Open filters</a>
      </Tag>
      <TagCloseTrigger ref="closeRef" as-child aria-label="Remove Draft tag">
        <button type="button" data-owner="consumer"><svg aria-hidden="true" /></button>
      </TagCloseTrigger>
    `,
  });

  const link = screen.getByRole('link', { name: 'Open filters' });
  const close = screen.getByRole('button', { name: 'Remove Draft tag' });

  expect(rootRef.value?.$el).toBe(link);
  await expect
    .element(page.getByRole('link', { name: 'Open filters' }))
    .toHaveAttribute('href', '#filters');
  expect(link.dataset).toMatchObject({
    scope: 'tag',
    part: 'root',
    slot: 'tag-root',
    variant: 'outline',
  });
  expect(closeRef.value?.$el).toBe(close);
  await expect
    .element(page.getByRole('button', { name: 'Remove Draft tag' }))
    .toHaveAttribute('type', 'button');
  expect(close.dataset).toMatchObject({ owner: 'consumer', slot: 'tag-close-trigger' });
});

test('prevents disabled close-trigger activation', async () => {
  const handleClick = rs.fn();
  render({
    components: { TagCloseTrigger },
    setup() {
      return { handleClick };
    },
    template: '<TagCloseTrigger disabled @click="handleClick" />',
  });

  const close = screen.getByRole('button', { name: 'Remove tag' });

  await expect.element(page.getByRole('button', { name: 'Remove tag' })).toBeDisabled();
  const click = new MouseEvent('click', { bubbles: true, cancelable: true });
  expect(close.dispatchEvent(click)).toBe(false);
  expect(handleClick).not.toHaveBeenCalled();
});

test('hydrates tag without replacing server hosts or ids', async () => {
  const html = await renderToString(createSSRApp(SsrTag));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverNodes = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((node) => node.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrTag);

  try {
    app.mount(host);
    await nextTick();
    const hydratedNodes = [...host.querySelectorAll('[data-slot]')];
    expect(hydratedNodes).toHaveLength(serverNodes.length);
    hydratedNodes.forEach((node, index) => expect(node).toBe(serverNodes[index]));
    expect([...host.querySelectorAll('[id]')].map((node) => node.id)).toEqual(serverIds);
    expect(host.querySelector('[data-slot="tag-root"]')?.getAttribute('data-part')).toBe('root');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render({
    components: tagComponents,
    template: `
      <Tag class="gap-3 bg-card px-4 text-card-foreground" data-testid="tag">
        <TagLabel>TypeScript</TagLabel>
      </Tag>
    `,
  });

  const tag = screen.getByTestId('tag');

  expect([...tag!.classList]).toEqual(
    expect.arrayContaining(['gap-3', 'px-4', 'bg-card', 'text-card-foreground']),
  );
  for (const utility of ['gap-1.5', 'px-2', 'bg-primary', 'text-primary-foreground']) {
    expect(tag!.classList.contains(utility)).toBe(false);
  }
});

test('updates Tag variants, close names, and native form behavior reactively', async () => {
  const variant = ref<'default' | 'outline'>('default');
  const size = ref<'md' | 'sm'>('md');
  const label = ref<string | undefined>();
  const labelledby = ref<string | undefined>();
  const submitted = rs.fn();
  const clicked = rs.fn();

  render({
    components: tagComponents,
    setup: () => ({ clicked, label, labelledby, size, submitted, variant }),
    template: `
      <form @submit.prevent="submitted">
        <span id="remove-label">Remove chosen filter</span>
        <Tag :size="size" :variant="variant" data-testid="tag">
          <TagLabel>Filter</TagLabel>
          <TagEndElement>
            <TagCloseTrigger :aria-label="label" :aria-labelledby="labelledby" @click="clicked" />
          </TagEndElement>
        </Tag>
      </form>
    `,
  });
  const close = screen.getByRole('button', { name: 'Remove tag' });
  await page.getByRole('button', { name: 'Remove tag' }).click();
  expect(clicked).toHaveBeenCalledTimes(1);
  expect(submitted).not.toHaveBeenCalled();

  variant.value = 'outline';
  size.value = 'sm';
  labelledby.value = 'remove-label';
  await nextTick();
  expect(screen.getByTestId('tag').dataset).toMatchObject({ variant: 'outline', size: 'sm' });
  await expect
    .element(page.getByRole('button', { name: 'Remove chosen filter' }))
    .not.toHaveAttribute('aria-label');
  expect(screen.getByRole('button', { name: 'Remove chosen filter' })).toBe(close);

  labelledby.value = undefined;
  label.value = 'Remove Filter tag';
  await nextTick();
  expect(screen.getByRole('button', { name: 'Remove Filter tag' })).toBe(close);
  await expect
    .element(page.getByRole('button', { name: 'Remove Filter tag' }))
    .not.toHaveAttribute('aria-labelledby');

  label.value = undefined;
  await nextTick();
  expect(screen.getByRole('button', { name: 'Remove tag' })).toBe(close);
});