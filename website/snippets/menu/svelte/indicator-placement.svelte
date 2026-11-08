<script lang="ts">
  import { Grid3X3, Map, MapPin, TrafficCone } from '@lucide/svelte';
  import { Button } from '@moduix/svelte/button';
  import {
    Menu,
    MenuCheckboxItem,
    MenuContent,
    MenuIndicator,
    MenuItemIndicator,
    MenuItemText,
    MenuPositioner,
    MenuTrigger,
    MenuViewport,
  } from '@moduix/svelte/menu';

  let showSearch = $state(true);
  let showGrid = $state(false);
  let showLabels = $state(true);
  let showTraffic = $state(false);
</script>

<Menu closeOnSelect={false}>
  <MenuTrigger>
    {#snippet asChild(props)}
      <Button {...props()}>View <MenuIndicator /></Button>
    {/snippet}
  </MenuTrigger>
  <MenuPositioner>
    <MenuContent>
      <MenuViewport>
        <MenuCheckboxItem bind:checked={showSearch} value="search" indicator="end">
          <MenuItemText><Map />Search</MenuItemText>
          <MenuItemIndicator />
        </MenuCheckboxItem>
        <MenuCheckboxItem bind:checked={showGrid} value="grid" indicator="end">
          <MenuItemText><Grid3X3 />Grid</MenuItemText>
          <MenuItemIndicator />
        </MenuCheckboxItem>
        <MenuCheckboxItem bind:checked={showLabels} value="labels" indicator="end">
          <MenuItemText><MapPin />Place Labels</MenuItemText>
          <MenuItemIndicator />
        </MenuCheckboxItem>
        <MenuCheckboxItem bind:checked={showTraffic} value="traffic" indicator="end">
          <MenuItemText><TrafficCone />Traffic</MenuItemText>
          <MenuItemIndicator />
        </MenuCheckboxItem>
      </MenuViewport>
    </MenuContent>
  </MenuPositioner>
</Menu>