import { Field as FieldPrimitive } from '@ark-ui/solid/field';
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

const stackClass = 'grid gap-3';
const hintClass = 'col-span-full m-0 text-xs leading-4 text-muted-foreground';
const actionClass = 'rounded-sm border border-border bg-background px-2 py-1 text-foreground';

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
      <div class={stackClass}>
        <Editable value={value()} onValueChange={(details) => setValue(details.value)}>
          <EditableLabel>Controlled value</EditableLabel>
          <EditableArea>
            <EditableInput />
            <EditablePreview />
          </EditableArea>
          <EditableControls />
        </Editable>
        <p class={hintClass}>Current value: {value() || 'empty'}</p>
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
            <p class={hintClass}>Enter to save, Esc to cancel.</p>
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
      class="w-full max-w-96"
      defaultValue="Ark UI keeps the editable state, keyboard handling, and focus lifecycle."
      submitMode="none"
      placeholder="Enter a description"
    >
      <EditableLabel>Description</EditableLabel>
      <EditableArea class="items-start">
        <EditableInput asChild={(props) => <textarea {...props()} />} />
        <EditablePreview class="min-h-24 whitespace-pre-wrap" />
      </EditableArea>
      <EditableControls class="self-start" />
      <p class={hintClass}>Double-click to edit. Press Cmd/Ctrl + Enter to save.</p>
    </Editable>
  ),
};

export const WithField: Story = {
  render: () => (
    <FieldPrimitive.Root invalid>
      <Editable defaultValue="" placeholder="Click to edit your bio" required>
        <EditableLabel>Bio</EditableLabel>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControls />
      </Editable>
      <FieldPrimitive.ErrorText class={hintClass}>Bio is required.</FieldPrimitive.ErrorText>
    </FieldPrimitive.Root>
  ),
};

export const DisabledAndReadOnly: Story = {
  render: () => (
    <div class={stackClass}>
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
      <div class={stackClass}>
        <EditableRootProvider value={editable}>
          <EditableLabel>External state</EditableLabel>
          <EditableArea>
            <EditableInput />
            <EditablePreview />
          </EditableArea>
          <EditableControls />
        </EditableRootProvider>
        <div class="flex gap-2">
          <button class={actionClass} type="button" onClick={() => editable().edit()}>
            Edit
          </button>
          <button
            class={actionClass}
            type="button"
            onClick={() => editable().setValue('Updated externally')}
          >
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
      <EditableArea class="w-64 rounded-sm border-primary data-focus:outline-primary">
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>
  ),
};