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

  const { Story } = defineMeta({
    title: 'Components/Editable',
    component: Editable,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const stackClass = 'grid gap-3';
  const hintClass = 'col-span-full m-0 text-xs leading-4 text-muted-foreground';
  const actionClass = 'rounded-sm border border-border bg-background px-2 py-1 text-foreground';
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
  <div class={stackClass}>
    <Editable bind:value>
      <EditableLabel>Controlled value</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>
    <p class={hintClass}>Current value: {value || 'empty'}</p>
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
          <p class={hintClass}>Enter to save, Esc to cancel.</p>
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
    class="max-w-96"
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
      <EditablePreview class="min-h-24" />
    </EditableArea>
    <EditableControls />
    <p class={hintClass}>Double-click to edit. Press Cmd/Ctrl + Enter to save.</p>
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
</Story>

<Story name="Root Provider" asChild>
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
      <button class={actionClass} type="button" onclick={() => editable().edit()}>Edit</button>
      <button
        class={actionClass}
        type="button"
        onclick={() => editable().setValue('Updated externally')}
      >
        Update
      </button>
    </div>
  </div>
</Story>

<Story name="Custom Styling" asChild>
  <Editable defaultValue="Custom area">
    <EditableLabel>Styled editable</EditableLabel>
    <EditableArea class="rounded-sm border-primary data-focus:outline-primary">
      <EditableInput />
      <EditablePreview />
    </EditableArea>
    <EditableControls />
  </Editable>
</Story>