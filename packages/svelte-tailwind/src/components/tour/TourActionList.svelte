<script module lang="ts">
  import type { ClassValue } from 'svelte/elements';

  export interface TourActionListProps {
    class?: ClassValue | null;
  }
</script>

<script lang="ts">
  import { TourActions } from '@ark-ui/svelte/tour';
  import TourActionTrigger from './TourActionTrigger.svelte';

  let { class: className }: TourActionListProps = $props();
</script>

<TourActions>
  {#snippet children(actions)}
    {#each actions() as action, index (`${action.label}-${index}`)}
      <TourActionTrigger {action} class={className} />
    {/each}
  {/snippet}
</TourActions>