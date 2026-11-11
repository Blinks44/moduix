<script lang="ts">
  import { NativeSelect } from '@/components/native-select';
</script>

<NativeSelect
  class="h-20 w-80 rounded-lg bg-muted p-0"
  controlProps={{ class: 'w-full' }}
  multiple
  size={3}
  aria-label="Frameworks"
>
  <option value="react">React</option>
  <option value="vue">Vue</option>
</NativeSelect>