<script lang="ts">
  import { Field } from '@/components/field';
  import { Input } from '@/components/input';

  let { required = false }: { required?: boolean } = $props();
</script>

<Field {required}>
  <Input aria-label="Project key" />
</Field>