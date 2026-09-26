import { createSignal, Show } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
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
} from '@/components/editable/Editable';
import { Field, FieldErrorText } from '@/components/field';
import storyStyles from './Editable.stories.module.css';

const meta = {
  title: 'Components/Editable',
  component: Editable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Editable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Editable defaultValue="Layer name">
      <EditableLabel>Name</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal('Downtown route');

    return (
      <div class={storyStyles.stack}>
        <Editable value={value()} onValueChange={(details) => setValue(details.value)}>
          <EditableLabel>Controlled value</EditableLabel>
          <EditableArea>
            <EditableInput />
            <EditablePreview />
          </EditableArea>
          <EditableControls />
        </Editable>
        <p class={storyStyles.hint}>Current value: {value() || 'empty'}</p>
      </div>
    );
  },
};

export const AdvancedCustomization: Story = {
  render: () => (
    <Editable defaultValue="Service area">
      <EditableLabel>Name</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
      <EditableContext>
        {(editable) => (
          <Show when={editable().editing}>
            <p class={storyStyles.hint}>Enter to save, Esc to cancel.</p>
          </Show>
        )}
      </EditableContext>
    </Editable>
  ),
};

export const Controls: Story = {
  render: () => (
    <Editable defaultValue="Transit corridor" submitMode="none">
      <EditableLabel>Project title</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>
  ),
};

export const Textarea: Story = {
  render: () => (
    <Editable
      class={storyStyles.textareaRoot}
      defaultValue="Ark UI keeps the editable state, keyboard handling, and focus lifecycle."
      submitMode="none"
      placeholder="Enter a description"
    >
      <EditableLabel>Description</EditableLabel>
      <EditableArea class={storyStyles.textareaArea}>
        <EditableInput
          asChild={(props) => <textarea {...props()} />}
          class={storyStyles.textareaInput}
        />
        <EditablePreview class={storyStyles.textareaPreview} />
      </EditableArea>
      <EditableControls />
      <p class={storyStyles.hint}>Double-click to edit. Press Cmd/Ctrl + Enter to save.</p>
    </Editable>
  ),
};

export const WithField: Story = {
  render: () => (
    <Field invalid>
      <Editable defaultValue="" placeholder="Click to edit your bio" required>
        <EditableLabel>Bio</EditableLabel>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControls />
      </Editable>
      <FieldErrorText>Bio is required.</FieldErrorText>
    </Field>
  ),
};

export const DisabledAndReadOnly: Story = {
  render: () => (
    <div class={storyStyles.stack}>
      <Editable disabled defaultValue="Managed by your workspace">
        <EditableLabel>Disabled name</EditableLabel>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControls />
      </Editable>

      <Editable readOnly defaultValue="Assigned workspace">
        <EditableLabel>Read-only name</EditableLabel>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControls />
      </Editable>
    </div>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const editable = useEditable({
      activationMode: 'dblclick',
      defaultValue: 'Root provider value',
    });

    return (
      <div class={storyStyles.stack}>
        <EditableRootProvider value={editable}>
          <EditableLabel>External state</EditableLabel>
          <EditableArea>
            <EditableInput />
            <EditablePreview />
          </EditableArea>
          <EditableControls />
        </EditableRootProvider>
        <div class={storyStyles.actions}>
          <button type="button" onClick={() => editable().edit()}>
            Edit
          </button>
          <button type="button" onClick={() => editable().setValue('Updated externally')}>
            Update
          </button>
        </div>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Editable defaultValue="Custom area">
      <EditableLabel>Styled editable</EditableLabel>
      <EditableArea class={storyStyles.customArea}>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>
  ),
};