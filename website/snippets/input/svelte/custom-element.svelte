<script lang="ts">
  import { Field, FieldLabel } from '@moduix/svelte/field';
  import { Input } from '@moduix/svelte/input';
  import styles from '@/components/examples/input/input-custom-element.module.css';
</script>

<Field class={styles.root}>
  <FieldLabel>Repository</FieldLabel>
  <Input>
    {#snippet asChild(props)}
      <input {...props()} name="repository" placeholder="owner/project" />
    {/snippet}
  </Input>
</Field>