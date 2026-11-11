<script lang="ts">
  import { TimerArea, TimerSeparator } from '@/components/timer';
  import TimerItemGroup from './TimerItemGroup.svelte';
</script>

<TimerArea>
  <TimerItemGroup type="minutes" label="minutes" />
  <TimerSeparator>:</TimerSeparator>
  <TimerItemGroup type="seconds" label="seconds" />
</TimerArea>