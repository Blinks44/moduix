<script lang="ts">
  import { FieldLabel, FieldRoot } from '@ark-ui/svelte/field';
  import { Input } from '@/components/input';
</script>

<FieldRoot disabled id="email" invalid readOnly required>
  <FieldLabel>Email</FieldLabel>
  <Input
    data-part="consumer-part"
    data-scope="consumer-scope"
    data-size="xs"
    data-slot="consumer-slot"
    htmlSize={8}
    class="consumer-class"
  />
</FieldRoot>