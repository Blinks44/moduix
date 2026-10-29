import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { CloseButton } from '@/index';

test('preserves parent data hooks through asChild and lets consumer utilities override defaults', async () => {
  render({
    components: { CloseButton },
    template: `
      <CloseButton
        as-child
        aria-label="Close panel"
        data-scope="accordion"
        data-part="trigger"
        data-slot="accordion-trigger"
        data-disabled=""
        class="size-10"
      >
        <button type="button"><svg aria-hidden="true" /></button>
      </CloseButton>
    `,
  });

  const button = screen.getByRole('button', { name: 'Close panel' });

  expect(button?.classList.contains('size-10')).toBe(true);
  expect(button.dataset).toMatchObject({
    scope: 'accordion',
    part: 'trigger',
    slot: 'accordion-trigger',
  });
  await expect
    .element(page.getByRole('button', { name: 'Close panel' }))
    .toHaveAttribute('data-disabled');
});