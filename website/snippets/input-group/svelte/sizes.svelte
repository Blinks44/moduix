<script lang="ts">
  import { InputGroup, InputGroupAddon, InputGroupInput } from '@moduix/svelte/input-group';
  import styles from '@/components/examples/input-group/input-group-sizes.module.css';

  const inputGroupSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
</script>

<div class={styles.stack}>
  {#each inputGroupSizes as size (size)}
    <InputGroup {size}>
      <InputGroupAddon>@</InputGroupAddon>
      <InputGroupInput aria-label={`${size} workspace`} />
    </InputGroup>
  {/each}
</div>