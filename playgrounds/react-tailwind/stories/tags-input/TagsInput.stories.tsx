import type { Meta, StoryObj } from '@storybook/react-vite';
import { useId, useState } from 'react';
import { Field, FieldErrorText, FieldHelperText } from '@/components/field/Field';
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputHiddenInput,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
  TagsInputRootProvider,
  useTagsInput,
} from '@/components/tags-input/TagsInput';

const initialTags = ['React', 'TypeScript'];
const stackClassName = 'grid items-start gap-3';
const actionsClassName = 'inline-flex flex-wrap gap-2';
const hintClassName = 'm-0 text-xs leading-4 text-muted-foreground';
const fieldClassName = 'w-96 max-w-full';
const clearButtonClassName =
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
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add framework" />
        <TagsInputClearTrigger aria-label="Clear frameworks" />
      </TagsInputControl>
      <TagsInputHiddenInput />
    </TagsInput>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(initialTags);

    return (
      <div className={stackClassName}>
        <TagsInput value={value} onValueChange={(details) => setValue(details.value)}>
          <TagsInputLabel>Skills</TagsInputLabel>
          <TagsInputControl>
            <TagsInputItems />
            <TagsInputInput placeholder="Add skill" />
            <TagsInputClearTrigger aria-label="Clear skills" />
          </TagsInputControl>
        </TagsInput>
        <p className={hintClassName}>Current value: {value.join(', ') || 'empty'}</p>
      </div>
    );
  },
};

export const DelimiterPaste: Story = {
  render: () => (
    <TagsInput defaultValue={['React', 'Solid', 'Vue']} delimiter={/[,;\s]/} addOnPaste>
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Comma, semicolon, or space" />
        <TagsInputClearTrigger aria-label="Clear frameworks" />
      </TagsInputControl>
    </TagsInput>
  ),
};

export const Validation: Story = {
  render: () => {
    const [invalidReason, setInvalidReason] = useState('none');

    return (
      <div className={stackClassName}>
        <TagsInput
          max={3}
          maxLength={12}
          defaultValue={['alpha', 'beta', 'gamma']}
          validate={(details) =>
            details.inputValue.length >= 3 && !details.value.includes(details.inputValue)
          }
          onValueInvalid={(details) => setInvalidReason(details.reason)}
        >
          <TagsInputLabel>Labels</TagsInputLabel>
          <TagsInputControl>
            <TagsInputItems />
            <TagsInputInput placeholder="Add unique label" />
            <TagsInputClearTrigger aria-label="Clear labels" />
          </TagsInputControl>
        </TagsInput>
        <p className={hintClassName}>Last invalid reason: {invalidReason}</p>
      </div>
    );
  },
};

export const AllowDuplicates: Story = {
  render: () => (
    <TagsInput allowDuplicates defaultValue={['React', 'React']}>
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add framework" />
        <TagsInputClearTrigger aria-label="Clear frameworks" />
      </TagsInputControl>
    </TagsInput>
  ),
};

export const MaxWithOverflow: Story = {
  render: () => (
    <TagsInput max={2} allowOverflow defaultValue={['React', 'Solid']}>
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add framework" />
        <TagsInputClearTrigger aria-label="Clear frameworks" />
      </TagsInputControl>
    </TagsInput>
  ),
};

export const WithFieldValidation: Story = {
  render: () => (
    <Field invalid required className={fieldClassName}>
      <TagsInput defaultValue={['api']} name="topics">
        <TagsInputLabel>Topics</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput placeholder="Add topic" />
          <TagsInputClearTrigger aria-label="Clear topics" />
        </TagsInputControl>
        <TagsInputHiddenInput />
      </TagsInput>
      <FieldHelperText>Add at least one topic.</FieldHelperText>
      <FieldErrorText>Topics are required.</FieldErrorText>
    </Field>
  ),
};

export const DisabledAndReadOnly: Story = {
  render: () => (
    <div className={stackClassName}>
      <TagsInput disabled defaultValue={initialTags}>
        <TagsInputLabel>Disabled frameworks</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput placeholder="Add framework" />
          <TagsInputClearTrigger aria-label="Clear disabled frameworks" />
        </TagsInputControl>
      </TagsInput>
      <TagsInput readOnly defaultValue={initialTags}>
        <TagsInputLabel>Read-only frameworks</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput placeholder="Add framework" />
          <TagsInputClearTrigger aria-label="Clear read-only frameworks" />
        </TagsInputControl>
      </TagsInput>
    </div>
  ),
};

export const ClearButtonBelow: Story = {
  render: () => (
    <div className={stackClassName}>
      <TagsInput defaultValue={initialTags}>
        <TagsInputLabel>Frameworks</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput placeholder="Add framework" />
        </TagsInputControl>
        <TagsInputClearTrigger asChild>
          <button className={clearButtonClassName} type="button">
            Clear all tags
          </button>
        </TagsInputClearTrigger>
      </TagsInput>
    </div>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const id = useId();
    const tagsInput = useTagsInput({ id, defaultValue: ['React'] });

    return (
      <div className={stackClassName}>
        <div className={actionsClassName}>
          <button type="button" onClick={() => tagsInput.addValue('Solid')}>
            Add Solid
          </button>
          <button type="button" onClick={() => tagsInput.clearValue()}>
            Clear
          </button>
          <button type="button" onClick={tagsInput.focus}>
            Focus
          </button>
        </div>
        <TagsInputRootProvider value={tagsInput}>
          <TagsInputLabel>Frameworks</TagsInputLabel>
          <TagsInputControl>
            <TagsInputItems />
            <TagsInputInput placeholder="Add framework" />
            <TagsInputClearTrigger aria-label="Clear frameworks" />
          </TagsInputControl>
        </TagsInputRootProvider>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <TagsInput className="w-96" defaultValue={['Design', 'API']}>
      <TagsInputLabel className="text-primary">Workstreams</TagsInputLabel>
      <TagsInputControl className="border-primary/40 bg-primary/5">
        <TagsInputItems />
        <TagsInputInput
          className="text-primary placeholder:text-primary/60"
          placeholder="Add workstream"
        />
        <TagsInputClearTrigger
          className="text-primary hover:bg-primary/10 hover:text-primary"
          aria-label="Clear workstreams"
        />
      </TagsInputControl>
    </TagsInput>
  ),
};