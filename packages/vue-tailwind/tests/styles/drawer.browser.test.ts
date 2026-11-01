import { page } from '@rstest/browser';
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

test('applies Tailwind defaults and lets consumer utilities win', async () => {
  const Harness = defineComponent({
    components: drawerComponents,
    template: `
      <Drawer default-open :portalled="false">
        <DrawerTrigger class="bg-primary px-2">Open drawer</DrawerTrigger>
        <DrawerBackdrop />
        <DrawerPositioner><DrawerContent class="w-96 bg-card p-4">
          <DrawerHeader>
            <DrawerTitle>Preferences</DrawerTitle>
            <DrawerCloseIcon class="size-8 rounded-full bg-primary" />
            <DrawerDescription>Description</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>Body</DrawerBody><DrawerFooter>Footer</DrawerFooter>
        </DrawerContent></DrawerPositioner>
      </Drawer>
    `,
  });
  render(Harness);
  const trigger = document.querySelector('[data-slot="drawer-trigger"]')!;
  const close = document.querySelector('[data-slot="drawer-close-icon"]')!;
  expect([...trigger.classList]).toEqual(['bg-primary', 'px-2']);
  expect([...close.classList]).toEqual(
    expect.arrayContaining(['size-8', 'rounded-full', 'bg-primary']),
  );
  await expect
    .element(page.getByRole('dialog'))
    .toHaveCSS('transition-property', 'transform, scale, translate');
  await expect.element(page.getByRole('dialog')).toHaveCSS('width', '384px');
  await expect.element(page.getByRole('dialog')).toHaveCSS('padding-top', '16px');
  await expect
    .element(page.getByRole('button', { name: 'Close drawer' }))
    .toHaveCSS('width', '32px');
});