<script lang="ts">
  import { InputGroup, InputGroupInput } from '@/components/input-group';
</script>

<InputGroup class="hydrated-group">
  {#snippet asChild(props)}
    <section {...props()} aria-label="Server group">
      <InputGroupInput aria-label="Server input" />
    </section>
  {/snippet}
</InputGroup>