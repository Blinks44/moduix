import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  Editable,
  EditableArea,
  EditableContext,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableRootProvider,
  Field,
  FieldErrorText,
  useEditable,
  useEditableContext,
} from '../src';
import SsrEditable from './fixtures/SsrEditable.vue';

const editableComponents = {
  Editable,
  EditableArea,
  EditableContext,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableRootProvider,
  Field,
  FieldErrorText,
} as Record<string, Component>;

const TestEditable = defineComponent({
  components: editableComponents,
  props: {
    defaultValue: { type: String, default: 'Layer name' },
    form: { type: String, default: undefined },
    name: { type: String, default: undefined },
  },
  emits: ['valueCommit'],
  setup(_, { emit }) {
    return { handleValueCommit: (details: { value: string }) => emit('valueCommit', details) };
  },
  template: `
    <Editable
      :default-value="defaultValue"
      :form="form"
      :name="name"
      @value-commit="handleValueCommit"
    >
      <EditableLabel>Name</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>
  `,
});

test('preserves Ark semantics, refs, anatomy, attrs, and moduix hooks', () => {
  const refs = {
    root: ref<ComponentPublicInstance>(),
    label: ref<ComponentPublicInstance>(),
    area: ref<ComponentPublicInstance>(),
    input: ref<ComponentPublicInstance>(),
    preview: ref<ComponentPublicInstance>(),
    controls: ref<ComponentPublicInstance>(),
  };
  const Harness = defineComponent({
    components: editableComponents,
    setup() {
      return refs;
    },
    template: `
      <Editable ref="root" default-value="Layer name" data-probe="root">
        <EditableLabel ref="label">Name</EditableLabel>
        <EditableArea ref="area">
          <EditableInput ref="input" aria-label="editable input" />
          <EditablePreview ref="preview" />
        </EditableArea>
        <EditableControls ref="controls" />
      </Editable>
    `,
  });

  render(Harness);

  const root = refs.root.value?.$el as HTMLElement;
  const label = refs.label.value?.$el as HTMLElement;
  const area = refs.area.value?.$el as HTMLElement;
  const input = refs.input.value?.$el as HTMLInputElement;
  const preview = refs.preview.value?.$el as HTMLElement;
  const controls = refs.controls.value?.$el as HTMLElement;

  expect(root?.getAttribute('data-slot')).toBe('editable-root');
  expect(root?.getAttribute('data-scope')).toBe('editable');
  expect(root?.getAttribute('data-probe')).toBe('root');
  expect(label?.getAttribute('data-slot')).toBe('editable-label');
  expect(area?.getAttribute('data-slot')).toBe('editable-area');
  expect(input?.getAttribute('data-slot')).toBe('editable-input');
  expect(preview?.getAttribute('data-slot')).toBe('editable-preview');
  expect(controls?.getAttribute('data-slot')).toBe('editable-control');
  const editIcon = controls.querySelector('[data-slot="editable-edit-trigger"] svg');
  expect(Boolean(editIcon?.isConnected)).toBe(true);
  expect(editIcon?.getAttribute('aria-hidden')).toBe('true');
  expect(editIcon?.getAttribute('focusable')).toBe('false');
});

test('commits with Enter and reverts with Escape', async () => {
  const commits: string[] = [];
  render(TestEditable, {
    props: { onValueCommit: (details: { value: string }) => commits.push(details.value) },
  });

  const editTrigger = page.getByRole('button', { name: 'edit', exact: true });
  await editTrigger.click();
  await expect.element(page.getByRole('button', { name: 'submit', exact: true })).toBeVisible();
  await expect.element(page.getByRole('button', { name: 'cancel', exact: true })).toBeVisible();
  await expect.element(editTrigger).toHaveCount(0);

  const input = page.getByRole('textbox', { name: 'editable input', exact: true });
  await input.fill('Draft name');
  await input.press('Escape');

  await expect.element(page.getByText('Layer name')).toBeVisible();
  expect(commits).toEqual([]);

  await editTrigger.click();

  await input.fill('Published name');
  await input.press('Enter');

  await expect.poll(() => commits).toEqual(['Published name']);
  await expect.element(page.getByText('Published name')).toBeVisible();
});

test('supports controlled v-model updates through a parent', async () => {
  const value = ref('Layer name');
  const Harness = defineComponent({
    components: editableComponents,
    setup() {
      return { value };
    },
    template: `
      <Editable v-model="value">
        <EditableArea><EditableInput /><EditablePreview /></EditableArea>
        <EditableControls />
      </Editable>
    `,
  });

  render(Harness);

  await page.getByRole('button', { name: 'edit', exact: true }).click();

  await page.getByRole('textbox').fill('Published name');
  await page.getByRole('textbox').press('Enter');

  await expect.poll(() => value.value).toBe('Published name');
  await expect.element(page.getByText('Published name')).toBeVisible();
});

test('activates the preview with the moduix double-click default', async () => {
  render(TestEditable);

  await page.getByText('Layer name').dblclick();

  await expect
    .element(page.getByRole('textbox', { name: 'editable input', exact: true }))
    .toBeVisible();
});

test('keeps disabled triggers unavailable and read-only values unchanged', async () => {
  render({
    components: editableComponents,
    template: `
      <>
        <Editable disabled default-value="Disabled value">
          <EditableLabel>Disabled name</EditableLabel>
          <EditableArea><EditableInput /><EditablePreview /></EditableArea>
          <EditableControls />
        </Editable>
        <Editable read-only default-value="Read-only value">
          <EditableLabel>Read-only name</EditableLabel>
          <EditableArea><EditableInput /><EditablePreview /></EditableArea>
          <EditableControls />
        </Editable>
      </>
    `,
  });

  const disabledEditable = screen
    .getByText('Disabled name')
    .closest<HTMLElement>('[data-slot="editable-root"]');
  const readOnlyEditable = screen
    .getByText('Read-only name')
    .closest<HTMLElement>('[data-slot="editable-root"]');

  expect(disabledEditable).not.toBeNull();
  expect(readOnlyEditable).not.toBeNull();
  await expect
    .element(
      page
        .locator('[data-slot="editable-root"]')
        .filter({ hasText: 'Disabled name' })
        .getByRole('button', { name: 'edit' }),
    )
    .toBeDisabled();

  await page
    .locator('[data-slot="editable-root"]')
    .filter({ hasText: 'Read-only name' })
    .getByRole('button', { name: 'edit' })
    .click();
  await expect
    .element(
      page
        .locator('[data-slot="editable-root"]')
        .filter({ hasText: 'Read-only name' })
        .getByText('Read-only value'),
    )
    .toBeVisible();
  await expect
    .element(
      page
        .locator('[data-slot="editable-root"]')
        .filter({ hasText: 'Read-only name' })
        .getByRole('textbox'),
    )
    .toHaveCount(0);
});

test('inherits Field state and preserves public styling hooks', () => {
  render({
    components: editableComponents,
    template: `
      <Field disabled id="layer-name" invalid read-only required>
        <Editable default-value="Layer name">
          <EditableLabel>Layer name</EditableLabel>
          <EditableArea><EditableInput /><EditablePreview /></EditableArea>
          <EditableControls />
        </Editable>
        <FieldErrorText>Required</FieldErrorText>
      </Field>
    `,
  });

  const fieldInput = document.querySelector<HTMLInputElement>('[data-slot="editable-input"]');
  const root = fieldInput?.closest('[data-slot="editable-root"]');
  const area = root?.querySelector<HTMLElement>('[data-slot="editable-area"]');
  const input = root?.querySelector<HTMLInputElement>('[data-slot="editable-input"]');
  const label = root?.querySelector<HTMLElement>('[data-slot="editable-label"]');

  expect(Boolean(root?.isConnected)).toBe(true);
  expect(area?.hasAttribute('data-disabled')).toBe(true);
  expect(input?.matches(':disabled')).toBe(true);
  expect(input?.getAttribute('aria-invalid')).toBe('true');
  expect(input?.hasAttribute('readonly')).toBe(true);
  expect(input?.hasAttribute('required')).toBe(true);
  expect(label?.hasAttribute('data-invalid')).toBe(true);
  expect(label?.getAttribute('for')).toBe(input?.id);
});

test('participates in native form submission', () => {
  render({
    components: { ...editableComponents, TestEditable },
    template: `
      <form>
        <TestEditable default-value="Layer name" name="title" />
      </form>
    `,
  });
  const form = document.querySelector('form');

  expect(form).not.toBeNull();
  expect(new FormData(form! as HTMLFormElement).get('title')).toBe('Layer name');
});

test('submits the committed value through an external form owner', async () => {
  render({
    components: { ...editableComponents, TestEditable },
    template: `
      <div>
        <form id="editable-form" />
        <TestEditable default-value="Layer name" form="editable-form" name="title" />
      </div>
    `,
  });

  await page.getByRole('button', { name: 'edit', exact: true }).click();

  await page.getByRole('textbox', { name: 'editable input', exact: true }).fill('Published name');
  await page.getByRole('textbox', { name: 'editable input', exact: true }).press('Enter');

  await expect.element(page.getByText('Published name')).toBeVisible();
  const form = document.getElementById('editable-form');

  expect(form).toBeInstanceOf(HTMLFormElement);
  expect(new FormData(form as HTMLFormElement).get('title')).toBe('Published name');
});

test('commits textarea values with Ctrl or Cmd + Enter', async () => {
  const commits: string[] = [];
  const Harness = defineComponent({
    components: editableComponents,
    setup() {
      return { commits };
    },
    template: `
      <Editable
        default-edit
        default-value="Draft description"
        @value-commit="commits.push($event.value)"
      >
        <EditableLabel>Description</EditableLabel>
        <EditableArea>
          <EditableInput as-child><textarea aria-label="editable input" /></EditableInput>
          <EditablePreview />
        </EditableArea>
        <EditableControls />
      </Editable>
    `,
  });

  render(Harness);

  await page
    .getByRole('textbox', { name: 'editable input', exact: true })
    .fill('Published description');
  await page
    .getByRole('textbox', { name: 'editable input', exact: true })
    .press('ControlOrMeta+Enter');

  await expect.poll(() => commits).toEqual(['Published description']);
  await expect.element(page.locator('[data-slot="editable-input"]')).toHaveAttribute('hidden');
});

test('forwards the controls ref and supports RootProvider state', async () => {
  const controlsRef = ref<ComponentPublicInstance>();
  const RootProviderEditable = defineComponent({
    components: editableComponents,
    setup() {
      return { controlsRef, editable: useEditable({ defaultValue: 'Provider value' }) };
    },
    template: `
      <div>
        <button type="button" @click="editable.edit()">Edit externally</button>
        <EditableRootProvider :value="editable">
          <EditableLabel>Provider name</EditableLabel>
          <EditableArea><EditableInput /><EditablePreview /></EditableArea>
          <EditableControls ref="controlsRef" />
        </EditableRootProvider>
      </div>
    `,
  });

  render(RootProviderEditable);

  expect(controlsRef.value?.$el?.getAttribute('data-slot')).toBe('editable-control');
  await page.getByRole('button', { name: 'Edit externally', exact: true }).click();
  await expect.element(page.getByRole('textbox')).toBeVisible();
});

test('forwards refs on ordinary parts and exposes context state', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const inputRef = ref<ComponentPublicInstance>();
  const Status = defineComponent({
    setup() {
      return { editable: useEditableContext() };
    },
    template: '<output>{{ editable.value }}:{{ String(editable.editing) }}</output>',
  });
  const Harness = defineComponent({
    components: { ...editableComponents, Status },
    setup() {
      return { inputRef, rootRef };
    },
    template: `
      <Editable ref="rootRef" default-value="Context value">
        <EditableLabel>Name</EditableLabel>
        <EditableArea><EditableInput ref="inputRef" /><EditablePreview /></EditableArea>
        <EditableContext v-slot="editable"><span>render:{{ editable.value }}</span></EditableContext>
        <Status />
      </Editable>
    `,
  });

  render(Harness);

  expect(rootRef.value?.$el?.getAttribute('data-slot')).toBe('editable-root');
  expect(inputRef.value?.$el?.getAttribute('data-slot')).toBe('editable-input');
  await expect.element(page.getByText('render:Context value')).toBeAttached();
  await expect.element(page.getByText('Context value:false')).toBeAttached();
});

test('preserves semantic hosts with asChild composition', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: editableComponents,
    setup() {
      return { rootRef };
    },
    template: `
      <Editable ref="rootRef" as-child default-value="Layer name">
        <section aria-label="Editable section">
          <EditableArea><EditableInput /><EditablePreview /></EditableArea>
        </section>
      </Editable>
    `,
  });

  render(Harness);
  const root = screen.getByRole('region', { name: 'Editable section' });

  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Editable section', exact: true }))
    .toHaveAttribute('data-slot', 'editable-root');
  expect(rootRef.value?.$el).toBe(root);
});

test('hydrates stable hosts and ids and remains interactive', async () => {
  const html = await renderToString(createSSRApp(SsrEditable));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const serverInput = host.querySelector('input');
  expect(serverInput).not.toBeNull();
  expect(serverIds.length).toBeGreaterThan(0);
  const app = createSSRApp(SsrEditable);
  try {
    app.mount(host);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    expect(host.querySelector('input')).toBe(serverInput);
    await page.getByRole('button', { name: 'edit', exact: true }).click();
    const input = page.getByRole('textbox');
    await expect.element(input).toBeFocused();
    await input.fill('Hydrated name');
    await input.press('Enter');
    await expect.element(page.getByText('Hydrated name')).toBeVisible();
  } finally {
    app.unmount();
    host.remove();
  }
});