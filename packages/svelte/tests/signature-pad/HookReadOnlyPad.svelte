<script lang="ts">
  import { Field } from '@/components/field';
  import HookProvider from './HookProvider.svelte';

  let { readOnly }: { readOnly?: boolean } = $props();
</script>

<Field readOnly>
  <HookProvider {readOnly} />
</Field>