<script lang="ts">
  import { Field, FieldContext } from '@/components/field';
  import FieldContextProbe from './FieldContextProbe.svelte';
</script>

<Field required>
  <FieldContext>
    {#snippet render(field)}
      <output>{field?.()?.required ? 'required' : 'optional'}</output>
    {/snippet}
  </FieldContext>
  <FieldContextProbe />
</Field>