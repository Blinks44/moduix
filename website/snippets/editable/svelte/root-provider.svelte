<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    EditableArea,
    EditableControls,
    EditableInput,
    EditableLabel,
    EditablePreview,
    EditableRootProvider,
    useEditable,
  } from '@moduix/svelte/editable';
  import styles from '@/components/examples/editable/editable-root-provider.module.css';

  const id = $props.id();
  const editable = useEditable({
    id,
    activationMode: 'dblclick',
    defaultValue: 'Root provider value',
  });
</script>

<div class={styles.root}>
  <EditableRootProvider value={editable}>
    <EditableLabel>External state</EditableLabel>
    <EditableArea>
      <EditableInput />
      <EditablePreview />
    </EditableArea>
    <EditableControls />
  </EditableRootProvider>
  <div data-preview-meta>
    <Button type="button" size="sm" onclick={() => editable().edit()}>Edit</Button>
  </div>
</div>