<script module lang="ts">
  import type { TimerAreaProps, TimerItemProps } from '@ark-ui/svelte/timer';
  import type { Snippet } from 'svelte';

  export interface TimerSegmentsProps extends Omit<TimerAreaProps, 'asChild' | 'children'> {
    separator?: Snippet | string;
    types?: TimerItemProps['type'][];
  }

  const defaultTypes: TimerItemProps['type'][] = ['hours', 'minutes', 'seconds'];
</script>

<script lang="ts">
  import TimerArea from './TimerArea.svelte';
  import TimerItem from './TimerItem.svelte';
  import TimerSeparator from './TimerSeparator.svelte';

  let {
    ref = $bindable(null),
    separator = ':',
    types = defaultTypes,
    ...props
  }: TimerSegmentsProps = $props();
</script>

<TimerArea {...props} bind:ref>
  {#each types as type, index (`${type}-${index}`)}
    <TimerItem {type} />{#if index < types.length - 1}<TimerSeparator
        >{#if typeof separator === 'string'}{separator}{:else}{@render separator()}{/if}</TimerSeparator
      >{/if}
  {/each}
</TimerArea>