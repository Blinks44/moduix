import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel, SwitchThumb } from '@/index';

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(
    <Switch className="gap-4" data-testid="root">
      <SwitchControl className="w-10 rounded-md bg-background">
        <SwitchThumb className="size-4 bg-muted-foreground" />
      </SwitchControl>
      <SwitchLabel className="text-lg">Notifications</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>,
  );

  const root = screen.getByTestId('root');
  const control = root.querySelector('[data-slot="switch-control"]')!;
  const thumb = root.querySelector('[data-slot="switch-thumb"]')!;
  const label = screen.getByText('Notifications');

  expect([...root.classList]).toEqual(expect.arrayContaining(['gap-4']));
  expect([...control.classList]).toEqual(
    expect.arrayContaining(['w-10', 'rounded-md', 'bg-background']),
  );
  expect([...thumb.classList]).toEqual(expect.arrayContaining(['size-4', 'bg-muted-foreground']));
  expect([...label.classList]).toEqual(expect.arrayContaining(['text-lg']));
  await expect.element(page.getByTestId('root')).toHaveCSS('gap', '16px');
  await expect.element(page.locator('[data-slot="switch-control"]')).toHaveCSS('width', '40px');
  await expect.element(page.locator('[data-slot="switch-thumb"]')).toHaveCSS('width', '16px');
});