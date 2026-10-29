import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import {
  Popover,
  PopoverCloseIcon,
  PopoverContent,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@/index';

test('closes with CloseIcon and restores focus to its trigger', async () => {
  render(
    <Popover portalled={false}>
      <PopoverTrigger>Open preferences</PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverTitle>Preferences</PopoverTitle>
          <PopoverCloseIcon />
        </PopoverContent>
      </PopoverPositioner>
    </Popover>,
  );

  const trigger = page.getByRole('button', { name: 'Open preferences' });
  await trigger.click();
  await page.getByRole('button', { name: 'Close popover' }).click();
  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
});
// Zag 1.43.3 checks the title before lazy content mounts; enable after the upstream fix.