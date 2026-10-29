import { FieldErrorText, FieldLabel, FieldRoot } from '@ark-ui/vue/field';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { Input as TextInput } from '@/index';

const fieldComponents = {
  FieldErrorText,
  FieldLabel,
  FieldRoot,
  TextInput,
};

test('preserves native field state and component-owned styling hooks', async () => {
  render({
    components: fieldComponents,
    template: `
      <FieldRoot disabled id="email" invalid read-only required>
        <FieldLabel>Email</FieldLabel>
        <TextInput
          :data-part="'consumer-part'"
          :data-scope="'consumer-scope'"
          :data-size="'xs'"
          :data-slot="'consumer-slot'"
          :html-size="8"
          class="consumer-class"
        />
        <FieldErrorText>Enter an email address.</FieldErrorText>
      </FieldRoot>
    `,
  });

  const input = screen.getByRole('textbox', { name: 'Email' });

  const textbox = page.getByRole('textbox', { name: 'Email' });
  await expect.element(textbox).toBeDisabled();
  await expect.element(textbox).toHaveAttribute('aria-invalid', 'true');
  await expect.element(textbox).toHaveAttribute('readonly');
  expect(input?.hasAttribute('required')).toBe(true);
  expect(input.dataset).toMatchObject({
    part: 'input',
    scope: 'field',
    size: 'md',
    slot: 'input-root',
  });
  await expect.element(textbox).toHaveAttribute('size', '8');
});