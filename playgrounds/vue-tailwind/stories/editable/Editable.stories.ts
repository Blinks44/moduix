import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
import {
  Editable,
  EditableArea,
  EditableContext,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableRootProvider,
  useEditable,
} from '@/components/editable';
import { Field, FieldErrorText } from '@/components/field';

const meta = {
  title: 'Components/Editable',
  component: Editable,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Editable>;

export default meta;

type Story = StoryObj<typeof meta>;

const stackClass = 'grid gap-3';
const hintClass = 'col-span-full m-0 text-xs leading-4 text-muted-foreground';
const actionClass = 'rounded-sm border border-border bg-background px-2 py-1 text-foreground';
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
} as unknown as Record<string, Component>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: editableComponents,
      setup() {
        return { actionClass, hintClass, stackClass, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Editable default-value="Layer name">
      <EditableLabel>Name</EditableLabel>
      <EditableArea><EditableInput /><EditablePreview /></EditableArea>
      <EditableControls />
    </Editable>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div :class="stackClass">
        <Editable v-model="value">
          <EditableLabel>Controlled value</EditableLabel>
          <EditableArea><EditableInput /><EditablePreview /></EditableArea>
          <EditableControls />
        </Editable>
        <p :class="hintClass">Current value: {{ value || 'empty' }}</p>
      </div>
    `,
    () => ({ value: ref('Downtown route') }),
  ),
};

export const AdvancedCustomization: Story = {
  render: renderStory(`
    <Editable default-value="Service area">
      <EditableLabel>Name</EditableLabel>
      <EditableArea><EditableInput /><EditablePreview /></EditableArea>
      <EditableControls />
      <EditableContext v-slot="editable">
        <p v-if="editable.editing" :class="hintClass">Enter to save, Esc to cancel.</p>
      </EditableContext>
    </Editable>
  `),
};

export const Controls: Story = {
  render: renderStory(`
    <Editable default-value="Transit corridor" submit-mode="none">
      <EditableLabel>Project title</EditableLabel>
      <EditableArea><EditableInput /><EditablePreview /></EditableArea>
      <EditableControls />
    </Editable>
  `),
};

export const Textarea: Story = {
  render: renderStory(`
    <Editable
      class="w-full max-w-96"
      default-value="Ark UI keeps the editable state, keyboard handling, and focus lifecycle."
      submit-mode="none"
      placeholder="Enter a description"
    >
      <EditableLabel>Description</EditableLabel>
      <EditableArea class="items-start">
        <EditableInput as-child><textarea /></EditableInput>
        <EditablePreview class="min-h-24 whitespace-pre-wrap" />
      </EditableArea>
      <EditableControls class="self-start" />
      <p :class="hintClass">Double-click to edit. Press Cmd/Ctrl + Enter to save.</p>
    </Editable>
  `),
};

export const WithField: Story = {
  render: renderStory(`
    <Field invalid>
      <Editable default-value="" placeholder="Click to edit your bio" required>
        <EditableLabel>Bio</EditableLabel>
        <EditableArea><EditableInput /><EditablePreview /></EditableArea>
        <EditableControls />
      </Editable>
      <FieldErrorText :class="hintClass">Bio is required.</FieldErrorText>
    </Field>
  `),
};

export const DisabledAndReadOnly: Story = {
  render: renderStory(`
    <div :class="stackClass">
      <Editable disabled default-value="Managed by your workspace">
        <EditableLabel>Disabled name</EditableLabel>
        <EditableArea><EditableInput /><EditablePreview /></EditableArea>
        <EditableControls />
      </Editable>
      <Editable read-only default-value="Assigned workspace">
        <EditableLabel>Read-only name</EditableLabel>
        <EditableArea><EditableInput /><EditablePreview /></EditableArea>
        <EditableControls />
      </Editable>
    </div>
  `),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :class="stackClass">
        <EditableRootProvider :value="editable">
          <EditableLabel>External state</EditableLabel>
          <EditableArea><EditableInput /><EditablePreview /></EditableArea>
          <EditableControls />
        </EditableRootProvider>
        <div class="flex gap-2">
          <button :class="actionClass" type="button" @click="editable.edit()">Edit</button>
          <button :class="actionClass" type="button" @click="editable.setValue('Updated externally')">Update</button>
        </div>
      </div>
    `,
    () => ({
      editable: useEditable({ activationMode: 'dblclick', defaultValue: 'Root provider value' }),
    }),
  ),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <Editable default-value="Custom area">
      <EditableLabel>Styled editable</EditableLabel>
      <EditableArea class="w-64 rounded-sm border-primary data-focus:outline-primary"><EditableInput /><EditablePreview /></EditableArea>
      <EditableControls />
    </Editable>
  `),
};