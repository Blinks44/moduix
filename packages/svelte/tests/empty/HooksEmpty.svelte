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
</script>

<Empty data-part="consumer" data-scope="consumer" data-testid="root" {...props}>
  <EmptyIcon data-part="consumer" data-scope="consumer" data-testid="icon" />
  <EmptyContent data-part="consumer" data-scope="consumer" data-testid="content">
    <EmptyTitle data-part="consumer" data-scope="consumer" data-testid="title">
      No projects
    </EmptyTitle>
    <EmptyDescription data-part="consumer" data-scope="consumer" data-testid="description" />
  </EmptyContent>
  <EmptyActions data-part="consumer" data-scope="consumer" data-testid="actions" />
</Empty>