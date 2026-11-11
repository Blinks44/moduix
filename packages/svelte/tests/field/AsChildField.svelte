<script lang="ts">
  import { Field, FieldLabel } from '@/components/field';
  import { Input } from '@/components/input';

  let rootRef: Element | null = $state(null);

  export const getRootRef = () => rootRef;
</script>

<Field bind:ref={rootRef}>
  {#snippet asChild(props)}
    <section {...props()} aria-label="Email field">
      <FieldLabel>Email</FieldLabel>
      <Input />
    </section>
  {/snippet}
</Field>