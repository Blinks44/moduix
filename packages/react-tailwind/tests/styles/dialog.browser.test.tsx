import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogHeader,
  DialogCloseIcon,
  DialogContent,
  DialogPositioner,
  DialogTitle,
} from '@/index';

test('exposes the default recipe values on the content', async () => {
  render(
    <Dialog defaultOpen portalled={false}>
      <DialogPositioner>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preferences</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
          <DialogBody>Body</DialogBody>
        </DialogContent>
      </DialogPositioner>
    </Dialog>,
  );

  const dialog = page.getByRole('dialog');
  await expect.element(dialog).toHaveAttribute('data-size', 'md');
  await expect.element(dialog).toHaveAttribute('data-placement', 'center');
  await expect.element(dialog).toHaveAttribute('data-scroll-behavior', 'outside');
});

test('lets consumer Tailwind utilities override part defaults', async () => {
  render(
    <Dialog defaultOpen portalled={false}>
      <DialogPositioner>
        <DialogContent className="p-4">
          <DialogTitle>Preferences</DialogTitle>
          <DialogCloseIcon className="size-8" />
        </DialogContent>
      </DialogPositioner>
    </Dialog>,
  );

  await expect.element(page.getByRole('dialog')).toHaveCSS('padding', '16px');
  await expect
    .element(page.getByRole('button', { name: 'Close dialog' }))
    .toHaveCSS('width', '32px');
});