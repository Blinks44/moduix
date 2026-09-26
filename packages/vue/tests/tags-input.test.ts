import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
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

test('renders the standard item tree with stable parts and default actions', () => {
  render(Tags, { props: { defaultValue: ['React', 'Solid'] } });

  const root = screen.getByText('Frameworks').parentElement!;
  const input = screen.getByRole('textbox', { name: 'Frameworks' }) as HTMLInputElement;
  const hiddenInput = root.querySelector('input[hidden]');
  const itemText = root.querySelector('[data-slot="tags-input-item-text"]');
  const deleteTrigger = root.querySelector('[data-slot="tags-input-item-delete-trigger"]');
  const clearTrigger = screen.getByRole('button', { name: 'Clear all tags' });

  expect(root).toHaveAttribute('data-scope', 'tags-input');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'tags-input-root');
  expect(input).toHaveAttribute('data-part', 'input');
  expect(input).toHaveAttribute('data-slot', 'tags-input-input');
  expect(hiddenInput).toHaveAttribute('hidden');
  expect(itemText).toHaveAttribute('data-part', 'item-text');
  expect(deleteTrigger).toHaveAttribute('data-part', 'item-delete-trigger');
  expect(deleteTrigger?.querySelector('svg')).not.toBeNull();
  expect(clearTrigger).toHaveAttribute('data-scope', 'tags-input');
  expect(clearTrigger).toHaveAttribute('data-part', 'clear-trigger');
  expect(clearTrigger).toHaveAttribute('data-slot', 'tags-input-clear-trigger');
});

test('keeps Ark translations and anatomy on default actions', () => {
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

  expect(screen.getByRole('button', { name: 'Supprimer React' })).toBeVisible();
  const clearTrigger = screen.getByRole('button', { name: 'Effacer tous les tags' });
  expect(clearTrigger).toHaveAttribute('data-scope', 'tags-input');
  expect(clearTrigger).toHaveAttribute('data-part', 'clear-trigger');
  expect(clearTrigger).toHaveAttribute('data-slot', 'tags-input-clear-trigger');
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
  await fireEvent.click(screen.getByRole('button', { name: 'Clear all tags' }));

  await waitFor(() => expect(new FormData(form).get('frameworks')).toBe(''));
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

  await waitFor(() => expect(new FormData(form).get('frameworks')).toBe('React, Vue'));
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
  await fireEvent.click(screen.getByRole('button', { name: 'Clear frameworks' }));

  await waitFor(() => expect(details).toEqual([[]]));
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
  inputValue.value = 'Vue';
  await waitFor(() => expect(screen.getByText('Input: Vue')).toBeInTheDocument());
});

test('forwards Vue refs through ordinary and asChild Ark paths', () => {
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

  expect(refs.root.value?.$el).toHaveAttribute('data-slot', 'tags-input-root');
  expect(refs.label.value?.$el).toHaveAttribute('data-slot', 'tags-input-label');
  expect(refs.input.value?.$el).toHaveAttribute('data-slot', 'tags-input-input');
  expect(refs.asChildRoot.value?.$el).toHaveAttribute('data-slot', 'tags-input-root');
  expect(screen.getByRole('region', { name: 'Composed frameworks' })).toHaveAttribute(
    'data-slot',
    'tags-input-root',
  );
});

test('keeps context slots connected to the root and item state', () => {
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
  expect(screen.getByText('Tags: React')).toBeInTheDocument();
  expect(screen.getByText('Highlighted: false')).toBeInTheDocument();
});

test('renders and hydrates the public anatomy without changing generated ids', async () => {
  const App = defineComponent({
    components: tagsInputComponents,
    template: `
      <TagsInput :default-value="['React']" name="frameworks">
        <TagsInputLabel>Frameworks</TagsInputLabel>
        <TagsInputControl><TagsInputItems /><TagsInputInput /></TagsInputControl>
        <TagsInputHiddenInput />
      </TagsInput>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="tags-input-root"');
  expect(html).toContain('data-slot="tags-input-input"');
  expect(html).toContain('data-slot="tags-input-item-text"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);
  app.mount(host);

  expect(host.querySelectorAll('[data-slot="tags-input-root"]')).toHaveLength(1);
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);

  app.unmount();
  host.remove();
});