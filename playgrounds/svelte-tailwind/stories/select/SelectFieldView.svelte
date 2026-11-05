<script lang="ts">
  import { SelectField } from '@/components/select';

  let { placeholder = 'Select an option' }: { placeholder?: string } = $props();
</script>

<SelectField {placeholder} clearLabel="Clear selection" />