<script lang="ts">
  import { Field, FieldLabel } from '@moduix/svelte/field';
  import { InputGroup, InputGroupAddon, InputGroupInput } from '@moduix/svelte/input-group';
  import styles from '@/components/examples/input-group/input-group-custom-element.module.css';

  const repositoryOwner = 'moduix/';
</script>

<Field class={styles.root}>
  <FieldLabel>Repository</FieldLabel>
  <InputGroup>
    {#snippet asChild(props)}
      <div {...props()}>
        <InputGroupAddon>{repositoryOwner}</InputGroupAddon>
        <InputGroupInput placeholder="components" />
      </div>
    {/snippet}
  </InputGroup>
</Field>