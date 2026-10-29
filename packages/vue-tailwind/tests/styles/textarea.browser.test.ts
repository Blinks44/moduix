import { FieldLabel, FieldRoot } from '@ark-ui/vue/field';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { Textarea } from '@/index';

const fieldComponents = {
  FieldLabel,
  FieldRoot,
  Textarea,
};

test('preserves native field state and component-owned styling hooks', async () => {
  render({
    components: fieldComponents,
    template: `
      <FieldRoot disabled id="summary" invalid read-only required>
        <FieldLabel>Summary</FieldLabel>
        <Textarea
          class="consumer-class"
          data-part="consumer-part"
          data-scope="consumer-scope"
          data-slot="consumer-slot"
        />
      </FieldRoot>
    `,
  });

  const textarea = screen.getByRole('textbox', { name: 'Summary' });

  const textbox = page.getByRole('textbox', { name: 'Summary' });
  await expect.element(textbox).toBeDisabled();
  await expect.element(textbox).toHaveAttribute('aria-invalid', 'true');
  await expect.element(textbox).toHaveAttribute('readonly');
  expect(textarea?.hasAttribute('required')).toBe(true);
  expect(textarea.dataset).toMatchObject({
    part: 'textarea',
    scope: 'field',
    slot: 'textarea-root',
  });
  expect(textarea?.classList.contains('consumer-class')).toBe(true);
});

test('lets consumer utilities replace component defaults', () => {
  render({
    components: fieldComponents,
    template: `
      <Textarea
        aria-label="Project notes"
        class="min-h-20 w-80 max-w-sm resize-none rounded-lg bg-muted px-0 py-0 leading-5"
      />
    `,
  });

  const textarea = screen.getByRole('textbox', { name: 'Project notes' });
  expect([...textarea.classList]).toEqual(
    expect.arrayContaining([
      'w-80',
      'max-w-sm',
      'min-h-20',
      'resize-none',
      'rounded-lg',
      'bg-muted',
      'px-0',
      'py-0',
      'leading-5',
    ]),
  );
});