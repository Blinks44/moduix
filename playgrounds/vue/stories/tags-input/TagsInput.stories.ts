import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref, useId } from 'vue';
import type { Component } from 'vue';
import { Field, FieldErrorText, FieldHelperText } from '@/components/field';
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
} from '@/components/tags-input';
import styles from './TagsInput.stories.module.css';

const meta = {
  title: 'Components/TagsInput',
  component: TagsInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TagsInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const initialTags = ['React', 'TypeScript'];
const storyComponents = {
  FieldErrorText,
  FieldHelperText,
  Field,
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputHiddenInput,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
  TagsInputRootProvider,
} as unknown as Record<string, Component>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { initialTags, styles, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <TagsInput :default-value="initialTags" name="frameworks">
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add framework" />
        <TagsInputClearTrigger aria-label="Clear frameworks" />
      </TagsInputControl>
      <TagsInputHiddenInput />
    </TagsInput>
  `),
};

export const Controlled: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <TagsInput v-model="value">
          <TagsInputLabel>Skills</TagsInputLabel>
          <TagsInputControl>
            <TagsInputItems />
            <TagsInputInput placeholder="Add skill" />
            <TagsInputClearTrigger aria-label="Clear skills" />
          </TagsInputControl>
        </TagsInput>
        <p :class="styles.hint">Current value: {{ value.join(', ') || 'empty' }}</p>
      </div>
    `,
    () => ({ value: ref([...initialTags]) }),
  ),
};

export const DelimiterPaste: Story = {
  render: renderStory(`
    <TagsInput :default-value="['React', 'Solid', 'Vue']" :delimiter="/[,;\\s]/" add-on-paste>
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Comma, semicolon, or space" />
        <TagsInputClearTrigger aria-label="Clear frameworks" />
      </TagsInputControl>
    </TagsInput>
  `),
};

export const Validation: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <TagsInput
          :max="3"
          :max-length="12"
          :default-value="['alpha', 'beta', 'gamma']"
          :validate="validate"
          @value-invalid="invalidReason = $event.reason"
        >
          <TagsInputLabel>Labels</TagsInputLabel>
          <TagsInputControl>
            <TagsInputItems />
            <TagsInputInput placeholder="Add unique label" />
            <TagsInputClearTrigger aria-label="Clear labels" />
          </TagsInputControl>
        </TagsInput>
        <p :class="styles.hint">Last invalid reason: {{ invalidReason }}</p>
      </div>
    `,
    () => ({
      invalidReason: ref('none'),
      validate: (details: { inputValue: string; value: string[] }) =>
        details.inputValue.length >= 3 && !details.value.includes(details.inputValue),
    }),
  ),
};

export const AllowDuplicates: Story = {
  render: renderStory(`
    <TagsInput allow-duplicates :default-value="['React', 'React']">
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add framework" />
        <TagsInputClearTrigger aria-label="Clear frameworks" />
      </TagsInputControl>
    </TagsInput>
  `),
};

export const MaxWithOverflow: Story = {
  render: renderStory(`
    <TagsInput :max="2" allow-overflow :default-value="['React', 'Solid']">
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add framework" />
        <TagsInputClearTrigger aria-label="Clear frameworks" />
      </TagsInputControl>
    </TagsInput>
  `),
};

export const WithFieldValidation: Story = {
  render: renderStory(`
    <Field :class="styles.field" invalid required>
      <TagsInput :default-value="['api']" name="topics">
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
  `),
};

export const DisabledAndReadOnly: Story = {
  render: renderStory(`
    <div :class="styles.stack">
      <TagsInput disabled :default-value="initialTags">
        <TagsInputLabel>Disabled frameworks</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput placeholder="Add framework" />
          <TagsInputClearTrigger aria-label="Clear disabled frameworks" />
        </TagsInputControl>
      </TagsInput>
      <TagsInput read-only :default-value="initialTags">
        <TagsInputLabel>Read-only frameworks</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput placeholder="Add framework" />
          <TagsInputClearTrigger aria-label="Clear read-only frameworks" />
        </TagsInputControl>
      </TagsInput>
    </div>
  `),
};

export const ClearButtonBelow: Story = {
  render: renderStory(`
    <div :class="styles.stack">
      <TagsInput :default-value="initialTags">
        <TagsInputLabel>Frameworks</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput placeholder="Add framework" />
        </TagsInputControl>
        <TagsInputClearTrigger as-child>
          <button :class="styles.clearButton" type="button">Clear all tags</button>
        </TagsInputClearTrigger>
      </TagsInput>
    </div>
  `),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <div :class="styles.actions">
          <button type="button" @click="tagsInput.addValue('Solid')">Add Solid</button>
          <button type="button" @click="tagsInput.clearValue()">Clear</button>
          <button type="button" @click="tagsInput.focus()">Focus</button>
        </div>
        <TagsInputRootProvider :value="tagsInput">
          <TagsInputLabel>Frameworks</TagsInputLabel>
          <TagsInputControl>
            <TagsInputItems />
            <TagsInputInput placeholder="Add framework" />
            <TagsInputClearTrigger aria-label="Clear frameworks" />
          </TagsInputControl>
        </TagsInputRootProvider>
      </div>
    `,
    () => ({ tagsInput: useTagsInput({ id: useId(), defaultValue: ['React'] }) }),
  ),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <TagsInput :class="styles.customRoot" :default-value="['Design', 'API']">
      <TagsInputLabel>Workstreams</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add workstream" />
        <TagsInputClearTrigger aria-label="Clear workstreams" />
      </TagsInputControl>
    </TagsInput>
  `),
};