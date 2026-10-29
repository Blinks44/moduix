import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { type ReactNode } from 'react';
import { Dialog, DialogContent, DialogPositioner, DialogTitle } from '@/index';

function DialogParts({ children }: { children?: ReactNode }) {
  return (
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Preferences</DialogTitle>
        {children}
      </DialogContent>
    </DialogPositioner>
  );
}

test('exposes the default recipe values on the content', async () => {
  render(
    <Dialog defaultOpen portalled={false}>
      <DialogParts />
    </Dialog>,
  );

  const dialog = page.getByRole('dialog');
  await expect.element(dialog).toHaveAttribute('data-size', 'md');
  await expect.element(dialog).toHaveAttribute('data-placement', 'center');
  await expect.element(dialog).toHaveAttribute('data-scroll-behavior', 'outside');
});