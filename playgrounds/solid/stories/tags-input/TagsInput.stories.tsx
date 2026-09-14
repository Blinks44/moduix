import { clsx } from 'clsx';
import { createSignal, createUniqueId } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Field } from '@/components/field';
import { TagsInput, useTagsInput } from '@/components/tags-input/TagsInput';
import storyStyles from './TagsInput.stories.module.css';

const initialTags = ['React', 'TypeScript'];

const meta = {
  title: 'Components/TagsInput',
  component: TagsInput.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TagsInput.Root>;

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
      <div class={storyStyles.stack}>
        <TagsInput value={value()} onValueChange={(details) => setValue(details.value)}>
          <TagsInput.Label>Skills</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input placeholder="Add skill" />
            <TagsInput.ClearTrigger aria-label="Clear skills" />
          </TagsInput.Control>
        </TagsInput>
        <p class={storyStyles.hint}>Current value: {value().join(', ') || 'empty'}</p>
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
      <div class={storyStyles.stack}>
        <TagsInput
          max={3}
          maxLength={12}
          defaultValue={['alpha', 'beta', 'gamma']}
          validate={(details) => {
            return details.inputValue.length >= 3 && !details.value.includes(details.inputValue);
          }}
          onValueInvalid={(details) => {
            setInvalidReason(details.reason);
          }}
        >
          <TagsInput.Label>Labels</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input placeholder="Add unique label" />
            <TagsInput.ClearTrigger aria-label="Clear labels" />
          </TagsInput.Control>
        </TagsInput>
        <p class={storyStyles.hint}>Last invalid reason: {invalidReason()}</p>
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
    <Field invalid required class={storyStyles.field}>
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
    <div class={storyStyles.stack}>
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
    <div class={storyStyles.stack}>
      <TagsInput defaultValue={initialTags}>
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add framework" />
        </TagsInput.Control>
        <TagsInput.ClearTrigger
          asChild={(props) => (
            <button {...props()} class={clsx(props().class, storyStyles.clearButton)} type="button">
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
      <div class={storyStyles.stack}>
        <div class={storyStyles.actions}>
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
    <TagsInput class={storyStyles.customRoot} defaultValue={['Design', 'API']}>
      <TagsInput.Label>Workstreams</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Add workstream" />
        <TagsInput.ClearTrigger aria-label="Clear workstreams" />
      </TagsInput.Control>
    </TagsInput>
  ),
};