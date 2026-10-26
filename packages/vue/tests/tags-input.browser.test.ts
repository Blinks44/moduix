import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance, PropType } from 'vue';
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputContext,
  TagsInputControl,
  TagsInputHiddenInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemContext,
  TagsInputItemPreview,
  TagsInputItemText,
  TagsInputItems,
  TagsInputLabel,
  TagsInputRootProvider,
  useTagsInput,
} from '../src';
import SsrTagsInput from './fixtures/SsrTagsInput.vue';

const tagsInputComponents = {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputContext,
  TagsInputControl,
  TagsInputHiddenInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemContext,
  TagsInputItemPreview,
  TagsInputItemText,
  TagsInputItems,
  TagsInputLabel,
  TagsInputRootProvider,
} as unknown as Record<string, Component>;

const Tags = defineComponent({
  components: tagsInputComponents,
  props: {
    defaultValue: { type: Array as PropType<string[]>, default: () => ['React'] },
    name: { type: String, default: undefined },
  },
  template: `
    <TagsInput :default-value="defaultValue" :name="name">
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add framework" />
        <TagsInputClearTrigger />
      </TagsInputControl>
      <TagsInputHiddenInput />
    </TagsInput>
  `,
});

test('renders the standard item tree with stable parts and default actions', async () => {
  render(Tags, { props: { defaultValue: ['React', 'Solid'] } });

  const root = screen.getByText('Frameworks').parentElement!;

  const hiddenInput = root.querySelector('input[hidden]');
  const itemText = root.querySelector('[data-slot="tags-input-item-text"]');
  const deleteTrigger = root.querySelector('[data-slot="tags-input-item-delete-trigger"]');

  expect(root!.getAttribute('data-scope')).toBe('tags-input');
  expect(root!.getAttribute('data-part')).toBe('root');
  expect(root!.getAttribute('data-slot')).toBe('tags-input-root');
  await expect
    .element(page.getByRole('textbox', { name: 'Frameworks', exact: true }))
    .toHaveAttribute('data-part', 'input');
  await expect
    .element(page.getByRole('textbox', { name: 'Frameworks', exact: true }))
    .toHaveAttribute('data-slot', 'tags-input-input');
  expect(hiddenInput!.hasAttribute('hidden')).toBe(true);
  expect(itemText!.getAttribute('data-part')).toBe('item-text');
  expect(deleteTrigger!.getAttribute('data-part')).toBe('item-delete-trigger');
  expect(deleteTrigger?.querySelector('svg')).not.toBeNull();
  const clearTriggerLocator = page.getByRole('button', { name: 'Clear all tags', exact: true });
  await expect.element(clearTriggerLocator).toHaveAttribute('data-scope', 'tags-input');
  await expect.element(clearTriggerLocator).toHaveAttribute('data-part', 'clear-trigger');
  await expect
    .element(clearTriggerLocator)
    .toHaveAttribute('data-slot', 'tags-input-clear-trigger');
});

test('keeps Ark translations and anatomy on default actions', async () => {
  const Harness = defineComponent({
    components: tagsInputComponents,
    template: `
      <TagsInput :default-value="['React']" :translations="translations">
        <TagsInputLabel>Frameworks</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput />
          <TagsInputClearTrigger />
        </TagsInputControl>
      </TagsInput>
    `,
    setup() {
      return {
        translations: {
          clearTriggerLabel: 'Effacer tous les tags',
          deleteTagTriggerLabel: (value: string) => `Supprimer ${value}`,
          tagSelected: (value: string) => `${value} sélectionné`,
          tagAdded: (value: string) => `${value} ajouté`,
          tagsPasted: (values: string[]) => `${values.length} tags collés`,
          tagEdited: (value: string) => `${value} modifié`,
          tagUpdated: (value: string) => `${value} mis à jour`,
          tagDeleted: (value: string) => `${value} supprimé`,
        },
      };
    },
  });

  render(Harness);

  await expect
    .element(page.getByRole('button', { name: 'Supprimer React', exact: true }))
    .toBeVisible();

  const clearTriggerLocator = page.getByRole('button', {
    name: 'Effacer tous les tags',
    exact: true,
  });
  await expect.element(clearTriggerLocator).toHaveAttribute('data-scope', 'tags-input');
  await expect.element(clearTriggerLocator).toHaveAttribute('data-part', 'clear-trigger');
  await expect
    .element(clearTriggerLocator)
    .toHaveAttribute('data-slot', 'tags-input-clear-trigger');
});

test('submits through an explicit Ark hidden input', async () => {
  const { container } = render(
    defineComponent({
      components: tagsInputComponents,
      template: '<form><Tags :name="\'frameworks\'" /></form>',
    }),
    { global: { components: { Tags } } },
  );

  const form = container.querySelector('form')!;
  await page.getByRole('button', { name: 'Clear all tags', exact: true }).click();

  await expect.poll(() => new FormData(form).get('frameworks')).toBe('');
});

test('keeps explicit form data for asChild roots', () => {
  const Harness = defineComponent({
    components: tagsInputComponents,
    template: `
      <form>
        <TagsInput as-child :default-value="['React']" name="frameworks">
          <section aria-label="Frameworks">
            <TagsInputLabel>Frameworks</TagsInputLabel>
            <TagsInputControl>
              <TagsInputItems />
              <TagsInputInput />
            </TagsInputControl>
            <TagsInputHiddenInput />
          </section>
        </TagsInput>
      </form>
    `,
  });

  const { container } = render(Harness);
  const form = container.querySelector('form')!;

  expect(new FormData(form).get('frameworks')).toBe('React');
  expect(container.querySelector('section input[name="frameworks"]')).not.toBeNull();
});

test('keeps explicit form data for root providers', async () => {
  let tagsInput!: ReturnType<typeof useTagsInput>;
  const Harness = defineComponent({
    components: tagsInputComponents,
    setup() {
      tagsInput = useTagsInput({ defaultValue: ['React'], name: 'frameworks' });
      return { tagsInput };
    },
    template: `
      <form>
        <TagsInputRootProvider :value="tagsInput">
          <TagsInputLabel>Frameworks</TagsInputLabel>
          <TagsInputControl>
            <TagsInputItems />
            <TagsInputInput />
          </TagsInputControl>
          <TagsInputHiddenInput />
        </TagsInputRootProvider>
      </form>
    `,
  });

  const { container } = render(Harness);
  const form = container.querySelector('form')!;
  tagsInput.value.addValue('Vue');

  await expect.poll(() => new FormData(form).get('frameworks')).toBe('React, Vue');
});

test('keeps the consumer in control of v-model values and forwards value details once', async () => {
  const details: string[][] = [];
  const Harness = defineComponent({
    components: tagsInputComponents,
    setup() {
      return { details, value: ref(['React']) };
    },
    template: `
      <TagsInput v-model="value" @value-change="details.push($event.value)">
        <TagsInputLabel>Controlled frameworks</TagsInputLabel>
          <TagsInputControl>
            <TagsInputItems />
            <TagsInputInput />
            <TagsInputClearTrigger aria-label="Clear frameworks" />
        </TagsInputControl>
      </TagsInput>
      <output>{{ value.join(',') }}</output>
    `,
  });

  render(Harness);
  await page.getByRole('button', { name: 'Clear frameworks', exact: true }).click();

  await expect.poll(() => details).toEqual([[]]);
});

test('supports the controlled input value model', async () => {
  const inputValue = ref('');
  const Harness = defineComponent({
    components: tagsInputComponents,
    setup() {
      return { inputValue };
    },
    template: `
      <TagsInput v-model:input-value="inputValue" :default-value="['React']">
        <TagsInputLabel>Frameworks</TagsInputLabel>
        <TagsInputControl><TagsInputItems /><TagsInputInput /></TagsInputControl>
      </TagsInput>
      <output>Input: {{ inputValue }}</output>
    `,
  });

  render(Harness);
  const input = page.getByRole('textbox', { name: 'Frameworks', exact: true });
  await input.fill('Solid');
  await expect.element(page.getByText('Input: Solid', { exact: true })).toBeAttached();
  inputValue.value = 'Vue';
  await expect.element(input).toHaveValue('Vue');
  await expect.element(page.getByText('Input: Vue')).toBeAttached();
});

test('forwards Vue refs through ordinary and asChild Ark paths', async () => {
  const refs = {
    root: ref<ComponentPublicInstance | null>(null),
    label: ref<ComponentPublicInstance | null>(null),
    input: ref<ComponentPublicInstance | null>(null),
    asChildRoot: ref<ComponentPublicInstance | null>(null),
  };
  const Harness = defineComponent({
    components: tagsInputComponents,
    setup() {
      return {
        asChildRoot: refs.asChildRoot,
        inputRef: refs.input,
        labelRef: refs.label,
        rootRef: refs.root,
      };
    },
    template: `
      <TagsInput ref="rootRef">
        <TagsInputLabel ref="labelRef">Frameworks</TagsInputLabel>
        <TagsInputControl><TagsInputInput ref="inputRef" /></TagsInputControl>
      </TagsInput>
      <TagsInput ref="asChildRoot" as-child>
        <section aria-label="Composed frameworks"><TagsInputControl><TagsInputInput /></TagsInputControl></section>
      </TagsInput>
    `,
  });

  render(Harness);

  expect(refs.root.value!.$el.getAttribute('data-slot')).toBe('tags-input-root');
  expect(refs.label.value!.$el.getAttribute('data-slot')).toBe('tags-input-label');
  expect(refs.input.value!.$el.getAttribute('data-slot')).toBe('tags-input-input');
  expect(refs.asChildRoot.value!.$el.getAttribute('data-slot')).toBe('tags-input-root');
  await expect
    .element(page.getByRole('region', { name: 'Composed frameworks', exact: true }))
    .toHaveAttribute('data-slot', 'tags-input-root');
});

test('keeps context slots connected to the root and item state', async () => {
  const Harness = defineComponent({
    components: tagsInputComponents,
    template: `
      <TagsInput :default-value="['React']">
        <TagsInputContext v-slot="context">
          <output>Tags: {{ context.value.join(', ') }}</output>
          <TagsInputControl>
            <TagsInputItem
              v-for="(item, index) in context.value"
              :key="item"
              :index="index"
              :value="item"
            >
              <TagsInputItemPreview>
                <TagsInputItemText>{{ item }}</TagsInputItemText>
                <TagsInputItemContext v-slot="itemContext">
                  <span>Highlighted: {{ itemContext.highlighted }}</span>
                </TagsInputItemContext>
              </TagsInputItemPreview>
            </TagsInputItem>
            <TagsInputInput />
          </TagsInputControl>
        </TagsInputContext>
      </TagsInput>
    `,
  });

  render(Harness);
  await expect.element(page.getByText('Tags: React')).toBeAttached();
  await expect.element(page.getByText('Highlighted: false')).toBeAttached();
});

test('hydrates stable hosts and ids and remains interactive', async () => {
  const html = await renderToString(createSSRApp(SsrTagsInput));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="tags-input-root"]');
  const serverNodes = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  expect(serverRoot).not.toBeNull();
  expect(serverIds.length).toBeGreaterThan(0);
  const app = createSSRApp(SsrTagsInput);
  try {
    app.mount(host);
    expect(host.querySelector('[data-slot="tags-input-root"]')).toBe(serverRoot);
    expect([...host.querySelectorAll('[data-slot]')]).toEqual(serverNodes);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    const input = page.getByRole('textbox', { name: 'Frameworks', exact: true });
    await input.fill('Vue');
    await input.press('Enter');
    await expect
      .poll(() => new FormData(host.querySelector('form')!).get('frameworks'))
      .toBe('React, Vue');
  } finally {
    app.unmount();
    host.remove();
  }
});