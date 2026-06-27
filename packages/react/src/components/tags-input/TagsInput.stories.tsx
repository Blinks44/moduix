import type { Meta, StoryObj } from '@storybook/react-vite';
import { useId, useState } from 'react';
import { Field } from '../field';
import { TagsInput, useTagsInput, type TagsInputValueChangeDetails } from './TagsInput';
import storyStyles from './TagsInput.stories.module.css';

const initialTags = ['React', 'TypeScript'];

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

function TagsInputItems({ value }: { value: string[] }) {
  return value.map((item, index) => (
    <TagsInput.Item key={`${item}-${index}`} index={index} value={item}>
      <TagsInput.ItemPreview>
        <TagsInput.ItemText>{item}</TagsInput.ItemText>
        <TagsInput.ItemDeleteTrigger aria-label={`Remove ${item}`} />
      </TagsInput.ItemPreview>
      <TagsInput.ItemInput />
    </TagsInput.Item>
  ));
}

export const Basic: Story = {
  render: () => (
    <TagsInput defaultValue={initialTags} name="frameworks">
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Context>
          {(tagsInput) => <TagsInputItems value={tagsInput.value} />}
        </TagsInput.Context>
        <TagsInput.Input placeholder="Add framework" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(initialTags);

    function handleValueChange(details: TagsInputValueChangeDetails) {
      setValue(details.value);
    }

    return (
      <div className={storyStyles.stack}>
        <TagsInput value={value} onValueChange={handleValueChange}>
          <TagsInput.Label>Skills</TagsInput.Label>
          <TagsInput.Control>
            <TagsInputItems value={value} />
            <TagsInput.Input placeholder="Add skill" />
            <TagsInput.ClearTrigger aria-label="Clear skills" />
          </TagsInput.Control>
          <TagsInput.HiddenInput />
        </TagsInput>
        <p className={storyStyles.hint}>Current value: {value.join(', ') || 'empty'}</p>
      </div>
    );
  },
};

export const DelimiterPaste: Story = {
  render: () => (
    <TagsInput defaultValue={['React', 'Solid', 'Vue']} delimiter={/[,;\s]/} addOnPaste>
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Context>
          {(tagsInput) => <TagsInputItems value={tagsInput.value} />}
        </TagsInput.Context>
        <TagsInput.Input placeholder="Comma, semicolon, or space" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  ),
};

export const Validation: Story = {
  render: () => {
    const [invalidReason, setInvalidReason] = useState('none');

    return (
      <div className={storyStyles.stack}>
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
            <TagsInput.Context>
              {(tagsInput) => <TagsInputItems value={tagsInput.value} />}
            </TagsInput.Context>
            <TagsInput.Input placeholder="Add unique label" />
            <TagsInput.ClearTrigger aria-label="Clear labels" />
          </TagsInput.Control>
          <TagsInput.HiddenInput />
        </TagsInput>
        <p className={storyStyles.hint}>Last invalid reason: {invalidReason}</p>
      </div>
    );
  },
};

export const AllowDuplicates: Story = {
  render: () => (
    <TagsInput allowDuplicates defaultValue={['React', 'React']}>
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Context>
          {(tagsInput) => <TagsInputItems value={tagsInput.value} />}
        </TagsInput.Context>
        <TagsInput.Input placeholder="Add framework" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  ),
};

export const MaxWithOverflow: Story = {
  render: () => (
    <TagsInput max={2} allowOverflow defaultValue={['React', 'Solid']}>
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Context>
          {(tagsInput) => <TagsInputItems value={tagsInput.value} />}
        </TagsInput.Context>
        <TagsInput.Input placeholder="Add framework" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  ),
};

export const WithFieldValidation: Story = {
  render: () => (
    <Field invalid required className={storyStyles.field}>
      <TagsInput defaultValue={['api']} name="topics">
        <TagsInput.Label>Topics</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Context>
            {(tagsInput) => <TagsInputItems value={tagsInput.value} />}
          </TagsInput.Context>
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

export const ClearButtonBelow: Story = {
  render: () => (
    <div className={storyStyles.stack}>
      <TagsInput defaultValue={initialTags}>
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Context>
            {(tagsInput) => <TagsInputItems value={tagsInput.value} />}
          </TagsInput.Context>
          <TagsInput.Input placeholder="Add framework" />
        </TagsInput.Control>
        <TagsInput.ClearTrigger asChild>
          <button className={storyStyles.clearButton} type="button">
            Clear all tags
          </button>
        </TagsInput.ClearTrigger>
        <TagsInput.HiddenInput />
      </TagsInput>
    </div>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const id = useId();
    const tagsInput = useTagsInput({ id, defaultValue: ['React'] });

    return (
      <div className={storyStyles.stack}>
        <div className={storyStyles.actions}>
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
        <TagsInput.RootProvider value={tagsInput}>
          <TagsInput.Label>Frameworks</TagsInput.Label>
          <TagsInput.Control>
            <TagsInputItems value={tagsInput.value} />
            <TagsInput.Input placeholder="Add framework" />
            <TagsInput.ClearTrigger aria-label="Clear frameworks" />
          </TagsInput.Control>
          <TagsInput.HiddenInput />
        </TagsInput.RootProvider>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <TagsInput className={storyStyles.customRoot} defaultValue={['Design', 'API']}>
      <TagsInput.Label>Workstreams</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Context>
          {(tagsInput) => <TagsInputItems value={tagsInput.value} />}
        </TagsInput.Context>
        <TagsInput.Input placeholder="Add workstream" />
        <TagsInput.ClearTrigger aria-label="Clear workstreams" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  ),
};