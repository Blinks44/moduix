<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import { Select, SelectIndicator, SelectTrigger, SelectValueText } from '@/components/select';
  import {
    SidebarLabel,
    SidebarNavigationButton,
    SidebarNavigationItem,
    SidebarNavigationList,
  } from '@/components/sidebar';
  import Layout from './Layout.svelte';

  const workspaces = createListCollection({ items: [{ label: 'Acme Inc.', value: 'acme' }] });
</script>

<Layout>
  <SidebarNavigationList>
    <SidebarNavigationItem>
      <Select collection={workspaces} defaultValue={['acme']}>
        <SelectTrigger>
          {#snippet asChild(triggerProps)}
            <SidebarNavigationButton {...triggerProps()} aria-label="Select workspace">
              <span data-sidebar-icon>AC</span>
              <SidebarLabel><SelectValueText placeholder="Select workspace" /></SidebarLabel>
              <SelectIndicator data-testid="select-indicator" />
            </SidebarNavigationButton>
          {/snippet}
        </SelectTrigger>
      </Select>
    </SidebarNavigationItem>
  </SidebarNavigationList>
</Layout>