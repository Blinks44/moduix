<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Editable,
    EditableArea,
    EditableControls,
    EditableInput,
    EditableLabel,
    EditablePreview,
  } from '@moduix/svelte/editable';
  import styles from '@/components/examples/editable/editable-form.module.css';

  let submitted = $state('Nothing submitted');
  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    submitted = String(new FormData(form).get('title') ?? '');
  };
</script>

<form class={styles.root} onsubmit={handleSubmit}>
  <Editable defaultValue="Layer name" name="title">
    <EditableLabel>Layer name</EditableLabel>
    <EditableArea>
      <EditableInput />
      <EditablePreview />
    </EditableArea>
    <EditableControls />
  </Editable>
  <div data-preview-meta>
    <output>Submitted: {submitted}</output>
    <Button type="submit" size="sm">Submit</Button>
  </div>
</form>