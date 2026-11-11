<script lang="ts">
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
  } from '@moduix/svelte/input-group';
  import styles from '@/components/examples/input-group/input-group-disabled.module.css';

  const workspaceHandle = 'maps';
</script>

<InputGroup class={styles.root} role="group" aria-label="Workspace handle">
  <InputGroupAddon>@</InputGroupAddon>
  <InputGroupInput value={workspaceHandle} disabled />
  <InputGroupButton disabled>Copy</InputGroupButton>
</InputGroup>