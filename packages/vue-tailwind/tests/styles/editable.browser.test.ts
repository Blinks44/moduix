import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
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
      <form><TestEditable default-value="Layer name" name="title" /></form>
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
      <Editable default-edit default-value="Draft description" @value-commit="commits.push($event.value)">
        <EditableLabel>Description</EditableLabel>
        <EditableArea>
          <EditableInput as-child><textarea /></EditableInput>
          <EditablePreview />
        </EditableArea>
        <EditableControls />
      </Editable>
    `,
  });

  render(Harness);

  await page
    .getByRole('textbox', { name: 'Description', exact: true })
    .fill('Published description');
  await page
    .getByRole('textbox', { name: 'Description', exact: true })
    .press('ControlOrMeta+Enter');

  await expect.poll(() => commits).toEqual(['Published description']);
  await expect.element(page.locator('[data-slot="editable-input"]')).toHaveAttribute('hidden');
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
  expect([...root!.classList]).toEqual(expect.arrayContaining(['gap-0', 'max-w-md']));
  expect([...area!.classList]).toEqual(expect.arrayContaining(['border-primary', 'px-6']));
  expect(getComputedStyle(root!).gap).toBe('0px');
  expect(getComputedStyle(area!).paddingLeft).toBe('24px');
});