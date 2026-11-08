<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    Select,
    SelectContent,
    SelectIndicator,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectPositioner,
    SelectTrigger,
    SelectValueText,
  } from '@/components/select';
  import { SidebarLabel, SidebarNavigationButton } from '@/components/sidebar';
  import styles from './Sidebar.stories.module.css';

  const workspaces = createListCollection({
    items: [
      { label: 'Acme Inc.', value: 'acme' },
      { label: 'Northstar', value: 'northstar' },
      { label: 'Personal', value: 'personal' },
    ],
  });
</script>

<Select
  class={styles.workspaceSelect}
  collection={workspaces}
  defaultValue={['acme']}
  positioning={{ placement: 'right-start', gutter: 8, flip: false }}
>
  <SelectTrigger>
    {#snippet asChild(triggerProps)}
      <SidebarNavigationButton
        {...triggerProps()}
        size="lg"
        aria-label="Select workspace"
        title="Workspace"
      >
        <span class={styles.workspaceMark} data-sidebar-icon>AC</span>
        <SidebarLabel class={styles.accountMeta}>
          <strong><SelectValueText placeholder="Select workspace" /></strong>
          <span>Workspace</span>
        </SidebarLabel>
        <SelectIndicator />
      </SidebarNavigationButton>
    {/snippet}
  </SelectTrigger>
  <SelectPositioner>
    <SelectContent>
      {#each workspaces.items as workspace (workspace.value)}
        <SelectItem item={workspace}>
          <SelectItemText>{workspace.label}</SelectItemText>
          <SelectItemIndicator />
        </SelectItem>
      {/each}
    </SelectContent>
  </SelectPositioner>
</Select>