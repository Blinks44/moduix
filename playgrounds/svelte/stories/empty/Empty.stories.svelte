<script module lang="ts">
  import ComputerIcon from '@lucide/svelte/icons/computer';
  import MapIcon from '@lucide/svelte/icons/map';
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
  import styles from './Empty.stories.module.css';

  const { Story } = defineMeta({
    title: 'Components/Empty',
    component: Empty,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Basic" asChild>
  <Empty class={styles.empty}>
    <EmptyIcon><ComputerIcon /></EmptyIcon>
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
  <Empty class={styles.empty}>
    <EmptyIcon><MapIcon /></EmptyIcon>
    <EmptyContent>
      <EmptyTitle>No saved places</EmptyTitle>
      <EmptyDescription
        >Save frequently used destinations to keep them close to your workspace.</EmptyDescription
      >
    </EmptyContent>
  </Empty>
</Story>

<Story name="Without Icon" asChild>
  <Empty class={styles.empty}>
    <EmptyContent>
      <EmptyTitle>No results found</EmptyTitle>
      <EmptyDescription
        >Try changing the search query or clearing one of the active filters.</EmptyDescription
      >
    </EmptyContent>
    <EmptyActions>
      <Button variant="outline">Clear filters</Button>
    </EmptyActions>
  </Empty>
</Story>

<Story name="Custom Styles" asChild>
  <Empty class={styles.customEmpty}>
    <EmptyIcon class={styles.customIcon}><ComputerIcon /></EmptyIcon>
    <EmptyContent>
      <EmptyTitle>Invite your team</EmptyTitle>
      <EmptyDescription
        >Shared projects, comments, and approvals appear here after the first teammate joins.</EmptyDescription
      >
    </EmptyContent>
    <EmptyActions><Button>Send invite</Button></EmptyActions>
  </Empty>
</Story>