import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerHeader,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from '@/index';

test('applies Tailwind defaults and lets consumer utilities win', async () => {
  render(() => (
    <Drawer defaultOpen portalled={false}>
      <DrawerTrigger class="bg-primary px-2">Open drawer</DrawerTrigger>
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent class="w-96 bg-card p-4">
          <DrawerGrabber>
            <DrawerGrabberIndicator />
          </DrawerGrabber>
          <DrawerHeader>
            <DrawerTitle>Preferences</DrawerTitle>
            <DrawerCloseIcon class="size-8 rounded-full bg-primary" />
            <DrawerDescription>Description</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>Body</DrawerBody>
          <DrawerFooter>Footer</DrawerFooter>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  ));

  const trigger = document.querySelector('[data-slot="drawer-trigger"]')!;
  const content = document.querySelector('[role="dialog"]')!;
  const closeIcon = document.querySelector('[data-slot="drawer-close-icon"]')!;

  expect([...trigger.classList]).toEqual(['bg-primary', 'px-2']);
  expect([...content.classList]).toEqual(expect.arrayContaining(['w-96', 'bg-card', 'p-4']));
  expect([...closeIcon.classList]).toEqual(
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