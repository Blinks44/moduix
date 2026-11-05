<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
  import {
    Empty,
    EmptyActions,
    EmptyContent,
    EmptyDescription,
    EmptyIcon,
    EmptyTitle,
  } from '@/components/empty';
  import { FileIcon, FolderIcon } from '@/lib/moduix/icons/ui';

  const emptyClass = 'w-[min(28rem,calc(100vw-2rem))]';
  const customEmptyClass =
    'w-[min(28rem,calc(100vw-2rem))] rounded-lg border-primary/30 bg-primary/10 shadow-md';
  const customIconClass = 'rounded-lg bg-primary/15 text-primary [&_svg]:size-7';

  const { Story } = defineMeta({
    title: 'Components/Empty',
    component: Empty,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Basic" asChild>
  <Empty class={emptyClass}>
    <EmptyIcon><FolderIcon /></EmptyIcon>
    <EmptyContent>
      <EmptyTitle>No deployments yet</EmptyTitle>
      <EmptyDescription
        >Connect a repository to start tracking release status and deployment history.</EmptyDescription
      >
    </EmptyContent>
    <EmptyActions>
      <Button>Connect repository</Button>
      <Button variant="outline">Read setup guide</Button>
    </EmptyActions>
  </Empty>
</Story>

<Story name="Without Actions" asChild>
  <Empty class={emptyClass}>
    <EmptyIcon><FileIcon /></EmptyIcon>
    <EmptyContent>
      <EmptyTitle>No saved places</EmptyTitle>
      <EmptyDescription
        >Save frequently used destinations to keep them close to your workspace.</EmptyDescription
      >
    </EmptyContent>
  </Empty>
</Story>

<Story name="Without Icon" asChild>
  <Empty class={emptyClass}>
    <EmptyContent>
      <EmptyTitle>No results found</EmptyTitle>
      <EmptyDescription
        >Try changing the search query or clearing one of the active filters.</EmptyDescription
      >
    </EmptyContent>
    <EmptyActions><Button variant="outline">Clear filters</Button></EmptyActions>
  </Empty>
</Story>

<Story name="Custom Styles" asChild>
  <Empty class={customEmptyClass}>
    <EmptyIcon class={customIconClass}><FolderIcon /></EmptyIcon>
    <EmptyContent>
      <EmptyTitle>Invite your team</EmptyTitle>
      <EmptyDescription
        >Shared projects, comments, and approvals appear here after the first teammate joins.</EmptyDescription
      >
    </EmptyContent>
    <EmptyActions><Button>Send invite</Button></EmptyActions>
  </Empty>
</Story>