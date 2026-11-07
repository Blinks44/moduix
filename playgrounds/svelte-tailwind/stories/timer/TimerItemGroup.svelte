<script lang="ts">
  import { TimerItem, type TimerItemProps } from '@/components/timer';

  let { label, type }: { label: string; type: TimerItemProps['type'] } = $props();
</script>

<span class="inline-grid justify-items-center gap-1">
  <TimerItem {type} />
  <span class="text-xs leading-4 font-normal text-muted-foreground">{label}</span>
</span>