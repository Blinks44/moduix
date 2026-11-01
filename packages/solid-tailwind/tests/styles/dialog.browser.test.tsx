import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import { Dialog, DialogCloseIcon, DialogContent, DialogPositioner, DialogTitle } from '@/index';

test('lets consumer Tailwind utilities override part defaults', async () => {
  render(() => (
    <Dialog defaultOpen portalled={false}>
      <DialogPositioner>
        <DialogContent class="p-4">
          <DialogTitle>Preferences</DialogTitle>
          <DialogCloseIcon class="size-8" />
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  ));

  await expect.element(page.getByRole('dialog')).toHaveCSS('padding', '16px');
  await expect
    .element(page.getByRole('button', { name: 'Close dialog' }))
    .toHaveCSS('width', '32px');
});