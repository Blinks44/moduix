<script lang="ts">
  import { Field, FieldLabel } from '@moduix/svelte/field';
  import { InputGroup, InputGroupAddon, InputGroupInput } from '@moduix/svelte/input-group';
  import styles from '@/components/examples/input-group/input-group-basic.module.css';

  const workspacePrefix = '@';
</script>

<Field class={styles.root}>
  <FieldLabel>Workspace</FieldLabel>
  <InputGroup>
    <InputGroupAddon>{workspacePrefix}</InputGroupAddon>
    <InputGroupInput name="workspace" placeholder="maps" />
  </InputGroup>
</Field>