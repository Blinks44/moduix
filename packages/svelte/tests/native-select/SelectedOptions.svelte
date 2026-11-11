<script lang="ts">
  import { NativeSelect } from '@/components/native-select';
</script>

<NativeSelect aria-label="Framework">
  <option value="react">React</option>
  <option value="vue" selected>Vue</option>
</NativeSelect>
<NativeSelect multiple aria-label="Frameworks">
  <option value="react" selected>React</option>
  <option value="vue" selected>Vue</option>
  <option value="svelte">Svelte</option>
</NativeSelect>