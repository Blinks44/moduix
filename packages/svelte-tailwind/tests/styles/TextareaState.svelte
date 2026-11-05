<script lang="ts">
  import { FieldLabel, FieldRoot } from '@ark-ui/svelte/field';
  import { Textarea } from '@/components/textarea';
</script>

<FieldRoot disabled id="summary" invalid readOnly required>
  <FieldLabel>Summary</FieldLabel>
  <Textarea
    class="consumer-class"
    data-part="consumer-part"
    data-scope="consumer-scope"
    data-slot="consumer-slot"
  />
</FieldRoot>