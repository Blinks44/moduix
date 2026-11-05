<script lang="ts">
  import type { SelectRootProps } from '@/components/select';
  import FruitSelect from './FruitSelect.svelte';

  let props: Omit<SelectRootProps, 'collection'> = $props();
</script>

<form><FruitSelect {...props} /></form>