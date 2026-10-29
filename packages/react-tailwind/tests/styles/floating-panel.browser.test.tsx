import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { FloatingPanel, FloatingPanelPositioner, FloatingPanelContent } from '@/index';

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(
    <FloatingPanel defaultOpen defaultSize={{ width: 360, height: 260 }} portalled={false}>
      <FloatingPanelPositioner>
        <FloatingPanelContent className="rounded-none bg-muted" />
      </FloatingPanelPositioner>
    </FloatingPanel>,
  );

  const content = screen.getByRole('dialog');
  expect([...content!.classList]).toEqual(expect.arrayContaining(['rounded-none', 'bg-muted']));

  await expect
    .element(page.locator('[data-slot="floating-panel-content"]'))
    .toHaveCSS('border-radius', '0px');
});