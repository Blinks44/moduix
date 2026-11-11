<script lang="ts">
  import type { HTMLProps } from '@ark-ui/svelte';
  import {
    Empty,
    EmptyActions,
    EmptyContent,
    EmptyDescription,
    EmptyIcon,
    EmptyTitle,
  } from '@/components/empty';

  let { ...props }: HTMLProps<'div'> = $props();

  let rootRef: Element | null = $state(null);
  let titleRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, titleRef });
</script>

<Empty {...props} bind:ref={rootRef}>
  <EmptyIcon data-testid="empty-icon">⌘</EmptyIcon>
  <EmptyContent>
    <EmptyTitle bind:ref={titleRef}>No projects</EmptyTitle>
    <EmptyDescription>Start by creating a project.</EmptyDescription>
  </EmptyContent>
  <EmptyActions>
    <button type="button">Create project</button>
  </EmptyActions>
</Empty>