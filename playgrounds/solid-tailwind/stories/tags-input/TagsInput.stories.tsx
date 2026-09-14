import { clsx } from 'clsx';
import { createSignal, createUniqueId } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Field } from '@/components/field/Field';
import { TagsInput, useTagsInput } from '@/components/tags-input/TagsInput';

const initialTags = ['React', 'TypeScript'];
const stackClass = 'grid items-start gap-3';
const actionsClass = 'inline-flex flex-wrap gap-2';
const hintClass = 'm-0 text-xs leading-4 text-muted-foreground';
const fieldClass = 'w-96 max-w-full';
const clearButtonClass =
  'w-max cursor-pointer rounded-md border border-border bg-background px-3 py-1.5 text-sm leading-5 text-foreground';

const meta = {
  title: 'Components/TagsInput',
  component: TagsInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TagsInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <TagsInput defaultValue={initialTags} name="frameworks">
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Add framework" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = createSignal(initialTags);

    return (
      <div class={stackClass}>
        <TagsInput value={value()} onValueChange={(details) => setValue(details.value)}>
          <TagsInput.Label>Skills</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input placeholder="Add skill" />
            <TagsInput.ClearTrigger aria-label="Clear skills" />
          </TagsInput.Control>
        </TagsInput>
        <p class={hintClass}>Current value: {value().join(', ') || 'empty'}</p>
      </div>
    );
  },
};

export const DelimiterPaste: Story = {
  render: () => (
    <TagsInput defaultValue={['React', 'Solid', 'Vue']} delimiter={/[,;\s]/} addOnPaste>
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Comma, semicolon, or space" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
    </TagsInput>
  ),
};

export const Validation: Story = {
  render: () => {
    const [invalidReason, setInvalidReason] = createSignal('none');

    return (
      <div class={stackClass}>
        <TagsInput
          max={3}
          maxLength={12}
          defaultValue={['alpha', 'beta', 'gamma']}
          validate={(details) =>
            details.inputValue.length >= 3 && !details.value.includes(details.inputValue)
          }
          onValueInvalid={(details) => setInvalidReason(details.reason)}
        >
          <TagsInput.Label>Labels</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input placeholder="Add unique label" />
            <TagsInput.ClearTrigger aria-label="Clear labels" />
          </TagsInput.Control>
        </TagsInput>
        <p class={hintClass}>Last invalid reason: {invalidReason()}</p>
      </div>
    );
  },
};

export const AllowDuplicates: Story = {
  render: () => (
    <TagsInput allowDuplicates defaultValue={['React', 'React']}>
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Add framework" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
    </TagsInput>
  ),
};

export const MaxWithOverflow: Story = {
  render: () => (
    <TagsInput max={2} allowOverflow defaultValue={['React', 'Solid']}>
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Add framework" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
    </TagsInput>
  ),
};

export const WithFieldValidation: Story = {
  render: () => (
    <Field invalid required class={fieldClass}>
      <TagsInput defaultValue={['api']} name="topics">
        <TagsInput.Label>Topics</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add topic" />
          <TagsInput.ClearTrigger aria-label="Clear topics" />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput>
      <Field.HelperText>Add at least one topic.</Field.HelperText>
      <Field.ErrorText>Topics are required.</Field.ErrorText>
    </Field>
  ),
};

export const DisabledAndReadOnly: Story = {
  render: () => (
    <div class={stackClass}>
      <TagsInput disabled defaultValue={initialTags}>
        <TagsInput.Label>Disabled frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add framework" />
          <TagsInput.ClearTrigger aria-label="Clear disabled frameworks" />
        </TagsInput.Control>
      </TagsInput>
      <TagsInput readOnly defaultValue={initialTags}>
        <TagsInput.Label>Read-only frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add framework" />
          <TagsInput.ClearTrigger aria-label="Clear read-only frameworks" />
        </TagsInput.Control>
      </TagsInput>
    </div>
  ),
};

export const ClearButtonBelow: Story = {
  render: () => (
    <div class={stackClass}>
      <TagsInput defaultValue={initialTags}>
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add framework" />
        </TagsInput.Control>
        <TagsInput.ClearTrigger
          asChild={(props) => (
            <button {...props()} class={clsx(props().class, clearButtonClass)} type="button">
              Clear all tags
            </button>
          )}
        />
      </TagsInput>
    </div>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const tagsInput = useTagsInput({ id: createUniqueId(), defaultValue: ['React'] });

    return (
      <div class={stackClass}>
        <div class={actionsClass}>
          <button type="button" onClick={() => tagsInput().addValue('Solid')}>
            Add Solid
          </button>
          <button type="button" onClick={() => tagsInput().clearValue()}>
            Clear
          </button>
          <button type="button" onClick={() => tagsInput().focus()}>
            Focus
          </button>
        </div>
        <TagsInput.RootProvider value={tagsInput}>
          <TagsInput.Label>Frameworks</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input placeholder="Add framework" />
            <TagsInput.ClearTrigger aria-label="Clear frameworks" />
          </TagsInput.Control>
        </TagsInput.RootProvider>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <TagsInput class="w-96" defaultValue={['Design', 'API']}>
      <TagsInput.Label class="text-primary">Workstreams</TagsInput.Label>
      <TagsInput.Control class="border-primary/40 bg-primary/5">
        <TagsInput.Items />
        <TagsInput.Input
          class="text-primary placeholder:text-primary/60"
          placeholder="Add workstream"
        />
        <TagsInput.ClearTrigger
          class="text-primary hover:bg-primary/10 hover:text-primary"
          aria-label="Clear workstreams"
        />
      </TagsInput.Control>
    </TagsInput>
  ),
};