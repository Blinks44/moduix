<script lang="ts">
  import { FieldLabel, FieldRoot } from '@ark-ui/svelte/field';
  import { NativeSelect } from '@/components/native-select';
</script>

<FieldRoot disabled id="framework" invalid required>
  <FieldLabel>Framework</FieldLabel>
  <NativeSelect
    controlProps={{ title: 'Native select control', class: 'consumer-control' }}
    class="consumer-select"
  >
    <option value="react">React</option>
  </NativeSelect>
</FieldRoot>