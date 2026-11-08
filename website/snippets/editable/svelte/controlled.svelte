<script lang="ts">
  import {
    Editable,
    EditableArea,
    EditableControls,
    EditableInput,
    EditableLabel,
    EditablePreview,
  } from '@moduix/svelte/editable';
  import styles from '@/components/examples/editable/editable-controlled.module.css';

  let value = $state('Downtown route');
</script>

<Editable class={styles.root} bind:value>
  <EditableLabel>Controlled value</EditableLabel>
  <EditableArea>
    <EditableInput />
    <EditablePreview />
  </EditableArea>
  <EditableControls />
</Editable>