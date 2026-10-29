import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent } from 'vue';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerCloseTrigger,
  DrawerContext,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPositioner,
  DrawerRootProvider,
  DrawerStack,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
} from '@/index';

const drawerComponents = {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerCloseTrigger,
  DrawerContext,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPositioner,
  DrawerRootProvider,
  DrawerStack,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
};

test('applies consumer classes after CSS Module defaults', () => {
  const Harness = defineComponent({
    components: drawerComponents,
    template:
      '<Drawer default-open :portalled="false"><DrawerTrigger class="consumer-trigger">Open drawer</DrawerTrigger><DrawerBackdrop /><DrawerPositioner><DrawerContent class="consumer-content"><DrawerHeader><DrawerTitle>Preferences</DrawerTitle><DrawerCloseIcon class="consumer-close" /><DrawerDescription>Description</DrawerDescription></DrawerHeader><DrawerBody class="consumer-body">Body</DrawerBody><DrawerFooter class="consumer-footer">Footer</DrawerFooter></DrawerContent></DrawerPositioner></Drawer>',
  });
  render(Harness);
  expect([...document.querySelector('[data-slot="drawer-trigger"]')!.classList]).toEqual([
    'consumer-trigger',
  ]);
});