<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
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

  const { Story } = defineMeta({
    title: 'Components/TagsInput',
    component: TagsInput,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const initialTags = ['React', 'TypeScript'];
</script>

<script lang="ts">
  let value = $state([...initialTags]);
  let invalidReason = $state('none');
  const validate = (details: { inputValue: string; value: string[] }) =>
    details.inputValue.length >= 3 && !details.value.includes(details.inputValue);
  const tagsInput = useTagsInput({ id: 'tags-input-root-provider', defaultValue: ['React'] });
</script>

<Story name="Basic" asChild>
  <TagsInput defaultValue={initialTags} name="frameworks">
    <TagsInputLabel>Frameworks</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItems />
      <TagsInputInput placeholder="Add framework" />
      <TagsInputClearTrigger aria-label="Clear frameworks" />
    </TagsInputControl>
    <TagsInputHiddenInput />
  </TagsInput>
</Story>

<Story name="Controlled" asChild>
  <div class={styles.stack}>
    <TagsInput bind:value>
      <TagsInputLabel>Skills</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add skill" />
        <TagsInputClearTrigger aria-label="Clear skills" />
      </TagsInputControl>
    </TagsInput>
    <p class={styles.hint}>Current value: {value.join(', ') || 'empty'}</p>
  </div>
</Story>

<Story name="Delimiter Paste" exportName="DelimiterPaste" asChild>
  <TagsInput defaultValue={['React', 'Solid', 'Vue']} delimiter={/[,;\s]/} addOnPaste>
    <TagsInputLabel>Frameworks</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItems />
      <TagsInputInput placeholder="Comma, semicolon, or space" />
      <TagsInputClearTrigger aria-label="Clear frameworks" />
    </TagsInputControl>
  </TagsInput>
</Story>

<Story name="Validation" asChild>
  <div class={styles.stack}>
    <TagsInput
      max={3}
      maxLength={12}
      defaultValue={['alpha', 'beta', 'gamma']}
      {validate}
      onValueInvalid={(details) => (invalidReason = details.reason)}
    >
      <TagsInputLabel>Labels</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add unique label" />
        <TagsInputClearTrigger aria-label="Clear labels" />
      </TagsInputControl>
    </TagsInput>
    <p class={styles.hint}>Last invalid reason: {invalidReason}</p>
  </div>
</Story>

<Story name="Allow Duplicates" exportName="AllowDuplicates" asChild>
  <TagsInput allowDuplicates defaultValue={['React', 'React']}>
    <TagsInputLabel>Frameworks</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItems />
      <TagsInputInput placeholder="Add framework" />
      <TagsInputClearTrigger aria-label="Clear frameworks" />
    </TagsInputControl>
  </TagsInput>
</Story>

<Story name="Max With Overflow" exportName="MaxWithOverflow" asChild>
  <TagsInput max={2} allowOverflow defaultValue={['React', 'Solid']}>
    <TagsInputLabel>Frameworks</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItems />
      <TagsInputInput placeholder="Add framework" />
      <TagsInputClearTrigger aria-label="Clear frameworks" />
    </TagsInputControl>
  </TagsInput>
</Story>

<Story name="With Field Validation" exportName="WithFieldValidation" asChild>
  <Field class={styles.field} invalid required>
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
</Story>

<Story name="Disabled And Read Only" exportName="DisabledAndReadOnly" asChild>
  <div class={styles.stack}>
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
</Story>

<Story name="Clear Button Below" exportName="ClearButtonBelow" asChild>
  <div class={styles.stack}>
    <TagsInput defaultValue={initialTags}>
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add framework" />
      </TagsInputControl>
      <TagsInputClearTrigger>
        {#snippet asChild(props)}
          <button {...props({ class: styles.clearButton })} type="button">Clear all tags</button>
        {/snippet}
      </TagsInputClearTrigger>
    </TagsInput>
  </div>
</Story>

<Story name="Root Provider" exportName="RootProvider" asChild>
  <div class={styles.stack}>
    <div class={styles.actions}>
      <button type="button" onclick={() => tagsInput().addValue('Solid')}>Add Solid</button>
      <button type="button" onclick={() => tagsInput().clearValue()}>Clear</button>
      <button type="button" onclick={() => tagsInput().focus()}>Focus</button>
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
</Story>

<Story name="Custom Styling" exportName="CustomStyling" asChild>
  <TagsInput class={styles.customRoot} defaultValue={['Design', 'API']}>
    <TagsInputLabel>Workstreams</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItems />
      <TagsInputInput placeholder="Add workstream" />
      <TagsInputClearTrigger aria-label="Clear workstreams" />
    </TagsInputControl>
  </TagsInput>
</Story>