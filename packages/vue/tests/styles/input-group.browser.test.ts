import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Field,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupClearTrigger,
  InputGroupInput,
  InputGroupText,
} from '@/index';

const components = {
  Field,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupClearTrigger,
  InputGroupInput,
  InputGroupText,
};

test('preserves grouped field state, owned hooks, and native refs', async () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const addonRef = ref<ComponentPublicInstance | null>(null);
  const inputRef = ref<ComponentPublicInstance | null>(null);
  const textRef = ref<ComponentPublicInstance | null>(null);
  const buttonRef = ref<ComponentPublicInstance | null>(null);

  render({
    components,
    setup: () => ({ rootRef, addonRef, inputRef, textRef, buttonRef }),
    template: `
      <Field disabled id="workspace" invalid read-only>
        <FieldLabel>Workspace</FieldLabel>
        <InputGroup ref="rootRef"
          class="consumer-root"
          data-part="consumer-part"
          data-scope="consumer-scope"
          data-size="xs"
          data-slot="consumer-slot"
          data-testid="input-group"
          size="lg"
        >
          <InputGroupAddon ref="addonRef"
            class="consumer-addon"
            data-part="consumer-part"
            data-scope="consumer-scope"
            data-slot="consumer-slot"
          >@</InputGroupAddon>
          <InputGroupInput ref="inputRef" />
          <InputGroupText ref="textRef"
            class="consumer-text"
            data-part="consumer-part"
            data-scope="consumer-scope"
            data-slot="consumer-slot"
          >.com</InputGroupText>
          <InputGroupButton ref="buttonRef" class="consumer-button" data-slot="consumer-slot">Copy</InputGroupButton>
        </InputGroup>
      </Field>
    `,
  });

  const group = screen.getByTestId('input-group');
  const addon = screen.getByText('@');
  const input = screen.getByRole('textbox', { name: 'Workspace' });
  const text = screen.getByText('.com');
  const button = screen.getByRole('button', { name: 'Copy' });

  const groupLocator = page.getByTestId('input-group');
  await expect.element(groupLocator).toHaveAttribute('data-slot', 'input-group-root');
  await expect.element(groupLocator).toHaveAttribute('data-scope', 'input-group');
  await expect.element(groupLocator).toHaveAttribute('data-part', 'root');
  await expect.element(groupLocator).toHaveAttribute('data-size', 'lg');
  const textLocator = page.getByText('@', { exact: true });
  await expect.element(textLocator).toHaveAttribute('data-slot', 'input-group-addon');
  await expect.element(textLocator).toHaveAttribute('data-scope', 'input-group');
  await expect.element(textLocator).toHaveAttribute('data-part', 'addon');
  const inputLocator = page.getByRole('textbox', { name: 'Workspace', exact: true });
  await expect.element(inputLocator).toHaveAttribute('data-slot', 'input-root');
  await expect.element(inputLocator).toHaveAttribute('data-size', 'lg');
  await expect.element(inputLocator).toHaveAttribute('data-invalid');
  await expect.element(inputLocator).toBeDisabled();
  await expect.element(inputLocator).toHaveAttribute('readonly');
  const textLocator2 = page.getByText('.com', { exact: true });
  await expect.element(textLocator2).toHaveAttribute('data-slot', 'input-group-text');
  await expect.element(textLocator2).toHaveAttribute('data-scope', 'input-group');
  await expect.element(textLocator2).toHaveAttribute('data-part', 'text');
  const buttonLocator = page.getByRole('button', { name: 'Copy', exact: true });
  await expect.element(buttonLocator).toHaveAttribute('data-slot', 'input-group-button');
  await expect.element(buttonLocator).toHaveAttribute('data-size', 'lg');
  await expect.element(buttonLocator).toHaveAttribute('type', 'button');
  await expect.element(buttonLocator).toBeEnabled();
  expect(rootRef.value?.$el).toBe(group);
  expect(addonRef.value?.$el).toBe(addon);
  expect(inputRef.value?.$el).toBe(input);
  expect(textRef.value?.$el).toBe(text);
  expect(buttonRef.value?.$el).toBe(button);
});