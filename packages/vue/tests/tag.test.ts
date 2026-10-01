import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Tag,
  TagCloseTrigger,
  TagEndElement,
  TagLabel,
  TagStartElement,
} from '../src/components/tag';

const tagComponents = { Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement };

test('renders every part with stable hooks, attrs, defaults, and a Vue ref', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: tagComponents,
    setup() {
      return { rootRef };
    },
    template: `
      <Tag ref="rootRef" class="consumer-tag" data-testid="root" size="sm" variant="secondary">
        <TagStartElement data-testid="start">+</TagStartElement>
        <TagLabel data-testid="label">Draft</TagLabel>
        <TagEndElement data-testid="end">
          <TagCloseTrigger data-testid="close" />
        </TagEndElement>
      </Tag>
    `,
  });

  render(Harness);

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
    expect(element).toHaveAttribute('data-scope', 'tag');
    expect(element).toHaveAttribute('data-part', part);
    expect(element).toHaveAttribute('data-slot', slot);
  }

  const root = screen.getByTestId('root');
  const close = screen.getByTestId('close');

  expect(rootRef.value?.$el).toBe(root);
  expect(root).toHaveClass('consumer-tag');
  expect(root).toHaveAttribute('data-size', 'sm');
  expect(root).toHaveAttribute('data-variant', 'secondary');
  expect(close).toHaveAttribute('type', 'button');
  expect(close).toHaveAccessibleName('Remove tag');
  expect(close.querySelector('svg')).not.toBeNull();
});

test('applies the documented root defaults', () => {
  render({
    components: tagComponents,
    template: '<Tag data-testid="tag">TypeScript</Tag>',
  });

  const tag = screen.getByTestId('tag');

  expect(tag).toHaveAttribute('data-size', 'md');
  expect(tag).toHaveAttribute('data-variant', 'default');
});

test('forwards refs through ordinary rendered parts', () => {
  const labelRef = ref<ComponentPublicInstance | null>(null);
  const closeRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: tagComponents,
    setup() {
      return { closeRef, labelRef };
    },
    template: `
      <Tag>
        <TagLabel ref="labelRef">Production</TagLabel>
        <TagCloseTrigger ref="closeRef" />
      </Tag>
    `,
  });

  render(Harness);

  expect(labelRef.value?.$el).toBe(screen.getByText('Production'));
  expect(closeRef.value?.$el).toBe(screen.getByRole('button', { name: 'Remove tag' }));
});

test('uses an accessible close button and prevents aria-disabled activation', async () => {
  const ariaDisabled = ref<boolean | 'true' | undefined>();
  const handleClick = rs.fn();
  const Harness = defineComponent({
    components: { TagCloseTrigger },
    setup() {
      return { ariaDisabled, handleClick };
    },
    template:
      '<TagCloseTrigger :aria-disabled="ariaDisabled" aria-label="Remove Draft tag" @click="handleClick" />',
  });

  render(Harness);

  const close = screen.getByRole('button', { name: 'Remove Draft tag' });
  await fireEvent.click(close);
  expect(handleClick).toHaveBeenCalledTimes(1);

  ariaDisabled.value = 'true';
  await nextTick();

  expect(close).toHaveAttribute('data-disabled');
  const click = new MouseEvent('click', { bubbles: true, cancelable: true });
  expect(close.dispatchEvent(click)).toBe(false);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('does not add the fallback aria-label when aria-labelledby names the close trigger', () => {
  render({
    components: { TagCloseTrigger },
    template: `
      <span id="tag-label">Remove Draft tag</span>
      <TagCloseTrigger aria-labelledby="tag-label" />
    `,
  });

  const close = screen.getByRole('button', { name: 'Remove Draft tag' });

  expect(close).not.toHaveAttribute('aria-label');
  expect(close).toHaveAttribute('aria-labelledby', 'tag-label');
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
    expect(element).toHaveAttribute('data-scope', 'tag');
    expect(element).toHaveAttribute('data-part', part);
    expect(element).toHaveAttribute('data-slot', slot);
  }
});

test('preserves semantic custom hosts and refs with asChild', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const closeRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
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

  render(Harness);

  const link = screen.getByRole('link', { name: 'Open filters' });
  const close = screen.getByRole('button', { name: 'Remove Draft tag' });

  expect(rootRef.value?.$el).toBe(link);
  expect(link).toHaveAttribute('href', '#filters');
  expect(link).toHaveAttribute('data-scope', 'tag');
  expect(link).toHaveAttribute('data-part', 'root');
  expect(link).toHaveAttribute('data-slot', 'tag-root');
  expect(link).toHaveAttribute('data-variant', 'outline');
  expect(closeRef.value?.$el).toBe(close);
  expect(close).toHaveAttribute('type', 'button');
  expect(close).toHaveAttribute('data-owner', 'consumer');
  expect(close).toHaveAttribute('data-slot', 'tag-close-trigger');
});

test('prevents disabled close-trigger activation', () => {
  const handleClick = rs.fn();
  render({
    components: { TagCloseTrigger },
    setup() {
      return { handleClick };
    },
    template: '<TagCloseTrigger disabled @click="handleClick" />',
  });

  const close = screen.getByRole('button', { name: 'Remove tag' });

  expect(close).toBeDisabled();
  const click = new MouseEvent('click', { bubbles: true, cancelable: true });
  expect(close.dispatchEvent(click)).toBe(false);
  expect(handleClick).not.toHaveBeenCalled();
});

test('renders and hydrates the public anatomy without replacing server markup', async () => {
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const App = defineComponent({
    components: tagComponents,
    template: `
      <Tag as-child variant="outline">
        <button type="button">
          <TagStartElement><span aria-hidden="true">+</span></TagStartElement>
          <TagLabel>Open filters</TagLabel>
        </button>
      </Tag>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="tag-root"');
  expect(html).toContain('data-slot="tag-label"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverNodes = [...host.querySelectorAll('[data-slot]')];
  const app = createSSRApp(App);
  app.mount(host);
  await nextTick();

  const hydratedNodes = [...host.querySelectorAll('[data-slot]')];
  expect(hydratedNodes).toHaveLength(serverNodes.length);
  hydratedNodes.forEach((node, index) => expect(node).toBe(serverNodes[index]));
  expect(host.querySelector('[data-slot="tag-root"]')).toHaveAttribute('data-part', 'root');
  expect(warn).not.toHaveBeenCalled();
  expect(error).not.toHaveBeenCalled();
  app.unmount();
  host.remove();
  warn.mockRestore();
  error.mockRestore();
});

test('updates Tag variants, close names, and native form behavior reactively', async () => {
  const variant = ref<'default' | 'outline'>('default');
  const size = ref<'md' | 'sm'>('md');
  const label = ref<string | undefined>();
  const labelledby = ref<string | undefined>();
  const submitted = rs.fn();
  const clicked = rs.fn();
  const Harness = defineComponent({
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

  render(Harness);
  const close = screen.getByRole('button', { name: 'Remove tag' });
  await fireEvent.click(close);
  expect(clicked).toHaveBeenCalledTimes(1);
  expect(submitted).not.toHaveBeenCalled();

  variant.value = 'outline';
  size.value = 'sm';
  labelledby.value = 'remove-label';
  await nextTick();
  expect(screen.getByTestId('tag')).toHaveAttribute('data-variant', 'outline');
  expect(screen.getByTestId('tag')).toHaveAttribute('data-size', 'sm');
  expect(close).not.toHaveAttribute('aria-label');
  expect(close).toHaveAccessibleName('Remove chosen filter');

  labelledby.value = undefined;
  label.value = 'Remove Filter tag';
  await nextTick();
  expect(close).toHaveAccessibleName('Remove Filter tag');
  expect(close).not.toHaveAttribute('aria-labelledby');

  label.value = undefined;
  await nextTick();
  expect(close).toHaveAccessibleName('Remove tag');
});