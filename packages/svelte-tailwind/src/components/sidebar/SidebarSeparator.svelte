<script module lang="ts">
  import type { SeparatorRootProps } from '../separator/Separator.svelte';

  export interface SidebarSeparatorProps extends SeparatorRootProps {}
</script>

<script lang="ts">
  import { cn } from '@/lib/moduix/cn';
  import Separator from '../separator/Separator.svelte';

  let { class: className, ref = $bindable(null), ...props }: SidebarSeparatorProps = $props();
</script>

<Separator {...props} bind:ref class={cn('border-sidebar-border', className)} />