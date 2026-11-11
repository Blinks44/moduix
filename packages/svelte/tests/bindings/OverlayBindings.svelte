<script lang="ts">
  import {
    Drawer,
    DrawerContent,
    DrawerPositioner,
    DrawerTitle,
    DrawerTrigger,
  } from '@/components/drawer';
  import {
    FloatingPanel,
    FloatingPanelContent,
    FloatingPanelPositioner,
    FloatingPanelTitle,
    FloatingPanelTrigger,
  } from '@/components/floating-panel';
  import {
    HoverCard,
    HoverCardContent,
    HoverCardPositioner,
    HoverCardTrigger,
  } from '@/components/hover-card';
  import {
    Lightbox,
    LightboxContent,
    LightboxPositioner,
    LightboxTrigger,
  } from '@/components/lightbox';
  import { Menu, MenuContent, MenuItem, MenuPositioner, MenuTrigger } from '@/components/menu';
  import {
    Popover,
    PopoverContent,
    PopoverPositioner,
    PopoverTitle,
    PopoverTrigger,
  } from '@/components/popover';
  import { Tooltip, TooltipContent, TooltipPositioner, TooltipTrigger } from '@/components/tooltip';

  let popover = $state(false);
  let popoverTrigger = $state<string | null>(null);
  let tooltip = $state(false);
  let tooltipTrigger = $state<string | null>(null);
  let hoverCard = $state(false);
  let menu = $state(false);
  let menuHighlight = $state<string | null>(null);
  let drawer = $state(false);
  let panel = $state(false);
  let panelSize = $state({ width: 240, height: 120 });
  let lightbox = $state(false);

  export const write = (
    key: 'drawer' | 'hoverCard' | 'lightbox' | 'menu' | 'panel' | 'popover' | 'tooltip',
  ) => {
    if (key === 'popover') popoverTrigger = 'b';
    if (key === 'drawer') drawer = true;
    if (key === 'hoverCard') hoverCard = true;
    if (key === 'lightbox') lightbox = true;
    if (key === 'menu') menu = true;
    if (key === 'panel') panel = true;
    if (key === 'popover') popover = true;
    if (key === 'tooltip') tooltip = true;
  };
  export const resizePanel = () => {
    panelSize = { width: 300, height: 150 };
  };
  export const read = () => ({
    drawer,
    hoverCard,
    lightbox,
    menu,
    panel,
    popover,
    popoverTrigger,
    tooltip,
  });
</script>

<div>
  <Popover bind:open={popover} bind:triggerValue={popoverTrigger} portalled={false}>
    <PopoverTrigger value="a">Popover a</PopoverTrigger>
    <PopoverTrigger value="b">Popover b</PopoverTrigger>
    <PopoverPositioner>
      <PopoverContent data-testid="popover-content"
        ><PopoverTitle>Popover</PopoverTitle></PopoverContent
      >
    </PopoverPositioner>
  </Popover>

  <Tooltip bind:open={tooltip} bind:triggerValue={tooltipTrigger} openDelay={0} portalled={false}>
    <TooltipTrigger>Tooltip trigger</TooltipTrigger>
    <TooltipPositioner>
      <TooltipContent data-testid="tooltip-content">Tooltip</TooltipContent>
    </TooltipPositioner>
  </Tooltip>

  <HoverCard bind:open={hoverCard} openDelay={0} portalled={false}>
    <HoverCardTrigger>Hover card trigger</HoverCardTrigger>
    <HoverCardPositioner>
      <HoverCardContent data-testid="hover-card-content">Hover card</HoverCardContent>
    </HoverCardPositioner>
  </HoverCard>

  <Menu bind:open={menu} bind:highlightedValue={menuHighlight} portalled={false}>
    <MenuTrigger>Menu trigger</MenuTrigger>
    <MenuPositioner>
      <MenuContent data-testid="menu-content"><MenuItem value="edit">Edit</MenuItem></MenuContent>
    </MenuPositioner>
  </Menu>

  <Drawer bind:open={drawer} portalled={false}>
    <DrawerTrigger>Drawer trigger</DrawerTrigger>
    <DrawerPositioner>
      <DrawerContent data-testid="drawer-content"><DrawerTitle>Drawer</DrawerTitle></DrawerContent>
    </DrawerPositioner>
  </Drawer>

  <FloatingPanel bind:open={panel} bind:size={panelSize} portalled={false}>
    <FloatingPanelTrigger>Panel trigger</FloatingPanelTrigger>
    <FloatingPanelPositioner>
      <FloatingPanelContent data-testid="panel-content">
        <FloatingPanelTitle>Panel</FloatingPanelTitle>
      </FloatingPanelContent>
    </FloatingPanelPositioner>
  </FloatingPanel>

  <Lightbox bind:open={lightbox} portalled={false}>
    <LightboxTrigger>Lightbox trigger</LightboxTrigger>
    <LightboxPositioner>
      <LightboxContent data-testid="lightbox-content" aria-label="Preview">Preview</LightboxContent>
    </LightboxPositioner>
  </Lightbox>
</div>