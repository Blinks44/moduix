<script lang="ts">
  import { LocaleProvider } from '@ark-ui/svelte/locale';
  import type { Snippet } from 'svelte';

  let { children }: { children?: Snippet } = $props();
</script>

<div lang="ar" dir="rtl">
  <LocaleProvider locale="ar-EG">{@render children?.()}</LocaleProvider>
</div>