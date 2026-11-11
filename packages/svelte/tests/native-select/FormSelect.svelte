<script lang="ts">
  import { NativeSelect } from '@/components/native-select';
</script>

<form aria-label="Project settings">
  <NativeSelect name="framework" aria-label="Framework">
    <option value="react" selected>React</option>
    <option value="vue">Vue</option>
  </NativeSelect>
</form>