import { expect, test } from '@rstest/core';
import { renderToString } from 'solid-js/web';
import {
  Dialog,
  DialogContent,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
  Menu,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuTrigger,
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
} from '../src';

// Importing the test barrel evaluates every component entrypoint without browser globals.
test('loads every component without browser globals', () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
});

// Solid portals render nothing on the server, so overlays render inline here.
test('renders open overlays on the server', () => {
  const html = renderToString(() => (
    <>
      <Dialog defaultOpen portalled={false}>
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogPositioner>
          <DialogContent>
            <DialogTitle>Dialog</DialogTitle>
          </DialogContent>
        </DialogPositioner>
      </Dialog>
      <Drawer defaultOpen portalled={false}>
        <DrawerTrigger>Open drawer</DrawerTrigger>
        <DrawerPositioner>
          <DrawerContent>
            <DrawerTitle>Drawer</DrawerTitle>
          </DrawerContent>
        </DrawerPositioner>
      </Drawer>
      <Popover defaultOpen portalled={false}>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverPositioner>
          <PopoverContent>Popover</PopoverContent>
        </PopoverPositioner>
      </Popover>
      <Menu defaultOpen portalled={false}>
        <MenuTrigger>Open menu</MenuTrigger>
        <MenuPositioner>
          <MenuContent>
            <MenuItem value="edit">Edit</MenuItem>
          </MenuContent>
        </MenuPositioner>
      </Menu>
      <Tooltip defaultOpen portalled={false}>
        <TooltipTrigger>Open tooltip</TooltipTrigger>
        <TooltipPositioner>
          <TooltipContent>Tooltip</TooltipContent>
        </TooltipPositioner>
      </Tooltip>
    </>
  ));

  for (const slot of ['dialog', 'drawer', 'popover', 'menu', 'tooltip']) {
    expect(html).toContain(`data-slot="${slot}-content"`);
  }
});