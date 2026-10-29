import { FieldLabel, FieldRoot, FieldErrorText } from '@ark-ui/vue/field';
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
  expect(input?.classList.contains('consumer-class')).toBe(true);
});

test('lets consumer utilities replace component defaults', () => {
  render({
    components: fieldComponents,
    template: `
      <TextInput
        size="lg"
        :html-size="8"
        aria-label="Project key"
        class="min-h-20 w-80 max-w-sm rounded-lg bg-muted px-0 py-0 leading-5"
      />
    `,
  });

  const input = screen.getByRole('textbox', { name: 'Project key' });
  expect([...input.classList]).toEqual(
    expect.arrayContaining([
      'w-80',
      'max-w-sm',
      'min-h-20',
      'rounded-lg',
      'bg-muted',
      'px-0',
      'py-0',
      'leading-5',
    ]),
  );
  expect(getComputedStyle(input)).toMatchObject({
    minHeight: '80px',
    width: '320px',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    lineHeight: '20px',
  });
});