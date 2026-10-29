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
});