<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
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

  const { Story } = defineMeta({
    title: 'Components/Editable',
    component: Editable,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let value = $state('Downtown route');
  const editable = useEditable({ activationMode: 'dblclick', defaultValue: 'Root provider value' });
</script>

<Story name="Basic" asChild>
  <Editable defaultValue="Layer name">
    <EditableLabel>Name</EditableLabel>
    <EditableArea>
      <EditableInput />
      <EditablePreview />
    </EditableArea>
    <EditableControls />
  </Editable>
</Story>

<Story name="Controlled" asChild>
  <div class={styles.stack}>
    <Editable bind:value>
      <EditableLabel>Controlled value</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>
    <p class={styles.hint}>Current value: {value || 'empty'}</p>
  </div>
</Story>

<Story name="Advanced Customization" asChild>
  <Editable defaultValue="Service area">
    <EditableLabel>Name</EditableLabel>
    <EditableArea>
      <EditableInput />
      <EditablePreview />
    </EditableArea>
    <EditableControls />
    <EditableContext>
      {#snippet render(context)}
        {#if context().editing}
          <p class={styles.hint}>Enter to save, Esc to cancel.</p>
        {/if}
      {/snippet}
    </EditableContext>
  </Editable>
</Story>

<Story name="Controls" asChild>
  <Editable defaultValue="Transit corridor" submitMode="none">
    <EditableLabel>Project title</EditableLabel>
    <EditableArea>
      <EditableInput />
      <EditablePreview />
    </EditableArea>
    <EditableControls />
  </Editable>
</Story>

<Story name="Textarea" asChild>
  <Editable
    class={styles.textareaRoot}
    defaultValue="Ark UI keeps the editable state, keyboard handling, and focus lifecycle."
    placeholder="Enter a description"
  >
    <EditableLabel>Description</EditableLabel>
    <EditableArea>
      <EditableInput>
        {#snippet asChild(props)}
          <textarea {...props()}></textarea>
        {/snippet}
      </EditableInput>
      <EditablePreview class={styles.textareaPreview} />
    </EditableArea>
    <EditableControls />
    <p class={styles.hint}>Double-click to edit. Press Cmd/Ctrl + Enter to save.</p>
  </Editable>
</Story>

<Story name="With Field" asChild>
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
</Story>

<Story name="Disabled And Read Only" asChild>
  <div class={styles.stack}>
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
</Story>

<Story name="Root Provider" asChild>
  <div class={styles.stack}>
    <EditableRootProvider value={editable}>
      <EditableLabel>External state</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </EditableRootProvider>
    <div class={styles.actions}>
      <button type="button" onclick={() => editable().edit()}>Edit</button>
      <button type="button" onclick={() => editable().setValue('Updated externally')}>
        Update
      </button>
    </div>
  </div>
</Story>

<Story name="Custom Styling" asChild>
  <Editable defaultValue="Custom area">
    <EditableLabel>Styled editable</EditableLabel>
    <EditableArea class={styles.customArea}>
      <EditableInput />
      <EditablePreview />
    </EditableArea>
    <EditableControls />
  </Editable>
</Story>