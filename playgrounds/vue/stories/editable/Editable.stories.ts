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
import styles from './Editable.stories.module.css';

const meta = {
  title: 'Components/Editable',
  component: Editable,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Editable>;

export default meta;

type Story = StoryObj<typeof meta>;

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
        return { styles, ...setup?.() };
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
      <div :class="styles.stack">
        <Editable v-model="value">
          <EditableLabel>Controlled value</EditableLabel>
          <EditableArea><EditableInput /><EditablePreview /></EditableArea>
          <EditableControls />
        </Editable>
        <p :class="styles.hint">Current value: {{ value || 'empty' }}</p>
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
        <p v-if="editable.editing" :class="styles.hint">Enter to save, Esc to cancel.</p>
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
      :class="styles.textareaRoot"
      default-value="Ark UI keeps the editable state, keyboard handling, and focus lifecycle."
      submit-mode="none"
      placeholder="Enter a description"
    >
      <EditableLabel>Description</EditableLabel>
      <EditableArea :class="styles.textareaArea">
        <EditableInput as-child :class="styles.textareaInput"><textarea /></EditableInput>
        <EditablePreview :class="styles.textareaPreview" />
      </EditableArea>
      <EditableControls />
      <p :class="styles.hint">Double-click to edit. Press Cmd/Ctrl + Enter to save.</p>
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
      <FieldErrorText>Bio is required.</FieldErrorText>
    </Field>
  `),
};

export const DisabledAndReadOnly: Story = {
  render: renderStory(`
    <div :class="styles.stack">
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
      <div :class="styles.stack">
        <EditableRootProvider :value="editable">
          <EditableLabel>External state</EditableLabel>
          <EditableArea><EditableInput /><EditablePreview /></EditableArea>
          <EditableControls />
        </EditableRootProvider>
        <div :class="styles.actions">
          <button type="button" @click="editable.edit()">Edit</button>
          <button type="button" @click="editable.setValue('Updated externally')">Update</button>
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
      <EditableArea :class="styles.customArea"><EditableInput /><EditablePreview /></EditableArea>
      <EditableControls />
    </Editable>
  `),
};