import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  Editable,
  EditableArea,
  EditableCancelTrigger,
  EditableContext,
  EditableControl,
  EditableControls,
  EditableEditTrigger,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableRootProvider,
  EditableSubmitTrigger,
  Field,
  FieldErrorText,
  useEditable,
  useEditableContext,
} from '../src';

const editableComponents = {
  Editable,
  EditableArea,
  EditableCancelTrigger,
  EditableContext,
  EditableControl,
  EditableControls,
  EditableEditTrigger,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableRootProvider,
  EditableSubmitTrigger,
  Field,
  FieldErrorText,
} as unknown as Record<string, Component>;

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

  expect(root).toHaveAttribute('data-slot', 'editable-root');
  expect(root).toHaveAttribute('data-scope', 'editable');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(label).toHaveAttribute('data-slot', 'editable-label');
  expect(area).toHaveAttribute('data-slot', 'editable-area');
  expect(input).toHaveAttribute('data-slot', 'editable-input');
  expect(preview).toHaveAttribute('data-slot', 'editable-preview');
  expect(controls).toHaveAttribute('data-slot', 'editable-control');
  const editIcon = controls.querySelector('[data-slot="editable-edit-trigger"] svg');
  expect(editIcon).toBeInTheDocument();
  expect(editIcon).toHaveAttribute('aria-hidden', 'true');
  expect(editIcon).toHaveAttribute('focusable', 'false');
});

test('commits with Enter and reverts with Escape', async () => {
  const commits: string[] = [];
  render(TestEditable, {
    props: { onValueCommit: (details: { value: string }) => commits.push(details.value) },
  });

  await fireEvent.click(screen.getByRole('button', { name: 'edit' }));
  const input = await screen.findByRole('textbox', { name: 'editable input' });
  await fireEvent.update(input, 'Draft name');
  await fireEvent.keyDown(input, { key: 'Escape' });

  await waitFor(() => expect(screen.getByText('Layer name')).toBeVisible());
  expect(commits).toEqual([]);

  await fireEvent.click(screen.getByRole('button', { name: 'edit' }));
  const committedInput = await screen.findByRole('textbox', { name: 'editable input' });
  await fireEvent.update(committedInput, 'Published name');
  await fireEvent.keyDown(committedInput, { key: 'Enter' });

  await waitFor(() => expect(commits).toEqual(['Published name']));
  expect(screen.getByText('Published name')).toBeVisible();
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

  await fireEvent.click(screen.getByRole('button', { name: 'edit' }));
  const input = await screen.findByRole('textbox');
  await fireEvent.update(input, 'Published name');
  await fireEvent.keyDown(input, { key: 'Enter' });

  await waitFor(() => expect(value.value).toBe('Published name'));
  expect(screen.getByText('Published name')).toBeVisible();
});

test('switches Controls to submit and cancel triggers while editing', async () => {
  render(TestEditable);

  const editable = screen
    .getByText('Layer name')
    .closest<HTMLElement>('[data-slot="editable-root"]');

  expect(editable).not.toBeNull();
  await fireEvent.click(within(editable!).getByRole('button', { name: 'edit' }));

  expect(await within(editable!).findByRole('button', { name: 'submit' })).toBeVisible();
  expect(within(editable!).getByRole('button', { name: 'cancel' })).toBeVisible();
  expect(within(editable!).queryByRole('button', { name: 'edit' })).not.toBeInTheDocument();
});

test('activates the preview with the moduix double-click default', async () => {
  render(TestEditable);

  await fireEvent.dblClick(screen.getByText('Layer name'));

  expect(await screen.findByRole('textbox', { name: 'editable input' })).toBeVisible();
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
  expect(within(disabledEditable!).getByRole('button', { name: 'edit' })).toBeDisabled();

  await fireEvent.click(within(readOnlyEditable!).getByRole('button', { name: 'edit' }));
  expect(within(readOnlyEditable!).getByText('Read-only value')).toBeVisible();
  expect(within(readOnlyEditable!).queryByRole('textbox')).not.toBeInTheDocument();
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

  expect(root).toBeInTheDocument();
  expect(area).toHaveAttribute('data-disabled');
  expect(input).toBeDisabled();
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(input).toHaveAttribute('readonly');
  expect(input).toBeRequired();
  expect(label).toHaveAttribute('data-invalid');
  expect(label).toHaveAttribute('for', input?.id);
});

test('participates in native form submission', () => {
  render({
    components: { ...editableComponents, TestEditable },
    template: `
      <form><TestEditable default-value="Layer name" name="title" /></form>
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

  await fireEvent.click(screen.getByRole('button', { name: 'edit' }));
  const input = await screen.findByRole('textbox', { name: 'editable input' });
  await fireEvent.update(input, 'Published name');
  await fireEvent.keyDown(input, { key: 'Enter' });

  await waitFor(() => expect(screen.getByText('Published name')).toBeVisible());
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
      <Editable default-edit default-value="Draft description" @value-commit="commits.push($event.value)">
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
  const input = screen.getByRole('textbox', { name: 'editable input' });
  await fireEvent.update(input, 'Published description');
  await fireEvent.keyDown(input, { ctrlKey: true, key: 'Enter' });

  await waitFor(() => expect(commits).toEqual(['Published description']));
  expect(input).toHaveAttribute('hidden');
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

  expect(controlsRef.value?.$el).toHaveAttribute('data-slot', 'editable-control');
  await fireEvent.click(screen.getByRole('button', { name: 'Edit externally' }));
  expect(await screen.findByRole('textbox')).toBeVisible();
});

test('forwards refs on ordinary parts and exposes context state', () => {
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

  expect(rootRef.value?.$el).toHaveAttribute('data-slot', 'editable-root');
  expect(inputRef.value?.$el).toHaveAttribute('data-slot', 'editable-input');
  expect(screen.getByText('render:Context value')).toBeInTheDocument();
  expect(screen.getByText('Context value:false')).toBeInTheDocument();
});

test('preserves semantic hosts with asChild composition', () => {
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
  expect(root).toHaveAttribute('data-slot', 'editable-root');
  expect(rootRef.value?.$el).toBe(root);
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render({
    components: editableComponents,
    template: `
      <Editable class="max-w-md gap-0">
        <EditableLabel>Name</EditableLabel>
        <EditableArea class="border-primary px-6"><EditableInput /><EditablePreview /></EditableArea>
        <EditableControls />
      </Editable>
    `,
  });

  const root = screen.getByText('Name').closest('[data-slot="editable-root"]');
  const area = screen.getByText('Name').parentElement?.querySelector('[data-slot="editable-area"]');
  expect(root).toHaveClass('gap-0', 'max-w-md');
  expect(root).not.toHaveClass('gap-1', 'max-w-full');
  expect(area).toHaveClass('border-primary', 'px-6');
  expect(area).not.toHaveClass('border-border', 'px-3.5');
});

test('renders the public anatomy on the server and hydrates stable ids', async () => {
  const App = defineComponent({
    components: editableComponents,
    template: `
      <Editable default-value="Layer name">
        <EditableLabel>Name</EditableLabel>
        <EditableArea><EditableInput /><EditablePreview /></EditableArea>
        <EditableControls />
      </Editable>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="editable-root"');
  expect(html).toContain('data-slot="editable-area"');
  expect(html).toContain('data-slot="editable-preview"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);
  app.mount(host);
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
  app.unmount();
  host.remove();
});