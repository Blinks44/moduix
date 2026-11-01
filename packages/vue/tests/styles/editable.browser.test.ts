import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent } from 'vue';
import type { Component } from 'vue';
import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableRootProvider,
  Field,
  FieldErrorText,
} from '@/index';

const editableComponents = {
  Editable,
  EditableArea,
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