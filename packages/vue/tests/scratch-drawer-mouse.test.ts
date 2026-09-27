import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { defineComponent } from 'vue';
import {
  Drawer,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from '../src';

const drawerComponents = {
  Drawer,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
};

test('scratch: closes when dragging content outside grabber past threshold', async () => {
  const details: Array<{ open: boolean }> = [];
  const Harness = defineComponent({
    components: drawerComponents,
    setup() {
      return { onOpenChange: (detail: { open: boolean }) => details.push(detail) };
    },
    template:
      '<Drawer default-open :portalled="false" @open-change="onOpenChange"><DrawerPositioner><DrawerContent><DrawerTitle>Preferences</DrawerTitle><div data-testid="drawer-body">Body</div></DrawerContent></DrawerPositioner></Drawer>',
  });
  render(Harness);

  const content = await screen.findByRole('dialog');
  const body = screen.getByTestId('drawer-body');

  await fireEvent.pointerDown(body, {
    button: 0,
    clientX: 100,
    clientY: 100,
    pointerId: 1,
    pointerType: 'mouse',
  });
  await fireEvent.pointerMove(body, {
    clientX: 100,
    clientY: 160,
    pointerId: 1,
    pointerType: 'mouse',
  });
  await waitFor(() => expect(content).toHaveAttribute('data-dragging'));
  await fireEvent.pointerMove(body, {
    clientX: 100,
    clientY: 400,
    pointerId: 1,
    pointerType: 'mouse',
  });
  await fireEvent.pointerUp(body, {
    clientX: 100,
    clientY: 400,
    pointerId: 1,
    pointerType: 'mouse',
  });

  await waitFor(() => expect(details).toEqual([{ open: false }]), { timeout: 3000 });
  console.log('VUE DETAILS:', JSON.stringify(details));
});