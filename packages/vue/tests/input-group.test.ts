import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  Field,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from '../src';
import styles from '../src/components/input-group/InputGroup.module.css';

const components = {
  Field,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} as unknown as Record<string, Component>;

test('keeps the Input slot that drives grouped field state styling', () => {
  render({
    components,
    template: `
      <Field disabled id="workspace" invalid read-only>
        <FieldLabel>Workspace</FieldLabel>
        <InputGroup
          class="consumer-root"
          data-part="consumer-part"
          data-scope="consumer-scope"
          data-size="xs"
          data-slot="consumer-slot"
          data-testid="input-group"
          size="lg"
        >
          <InputGroupAddon
            class="consumer-addon"
            data-part="consumer-part"
            data-scope="consumer-scope"
            data-slot="consumer-slot"
          >@</InputGroupAddon>
          <InputGroupInput />
          <InputGroupText
            class="consumer-text"
            data-part="consumer-part"
            data-scope="consumer-scope"
            data-slot="consumer-slot"
          >.com</InputGroupText>
          <InputGroupButton class="consumer-button" data-slot="consumer-slot">Copy</InputGroupButton>
        </InputGroup>
      </Field>
    `,
  });

  const group = screen.getByTestId('input-group');
  const addon = screen.getByText('@');
  const input = screen.getByRole('textbox', { name: 'Workspace' });
  const text = screen.getByText('.com');
  const button = screen.getByRole('button', { name: 'Copy' });

  expect(group).toHaveAttribute('data-slot', 'input-group-root');
  expect(group).toHaveAttribute('data-scope', 'input-group');
  expect(group).toHaveAttribute('data-part', 'root');
  expect(group).toHaveAttribute('data-size', 'lg');
  expect(group).toHaveClass(styles.root, 'consumer-root');
  expect(addon).toHaveAttribute('data-slot', 'input-group-addon');
  expect(addon).toHaveAttribute('data-scope', 'input-group');
  expect(addon).toHaveAttribute('data-part', 'addon');
  expect(addon).toHaveClass(styles.addon, 'consumer-addon');
  expect(input).toHaveAttribute('data-slot', 'input-root');
  expect(input).toHaveAttribute('data-size', 'lg');
  expect(input).toHaveAttribute('data-invalid');
  expect(input).toBeDisabled();
  expect(input).toHaveAttribute('readonly');
  expect(text).toHaveAttribute('data-slot', 'input-group-text');
  expect(text).toHaveAttribute('data-scope', 'input-group');
  expect(text).toHaveAttribute('data-part', 'text');
  expect(text).toHaveClass(styles.text, 'consumer-text');
  expect(button).toHaveAttribute('data-slot', 'input-group-button');
  expect(button).toHaveAttribute('data-size', 'lg');
  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveClass(styles.button, 'consumer-button');
  expect(button).toBeEnabled();
});

test('keeps the group size context reactive and allows a local input size', async () => {
  const size = ref<'sm' | 'xl'>('sm');
  const Harness = defineComponent({
    components,
    setup() {
      return { size };
    },
    template: `
      <InputGroup :size="size" data-testid="responsive-group">
        <InputGroupInput aria-label="Workspace" />
        <InputGroupInput aria-label="Small workspace" size="xs" />
        <InputGroupButton>Copy</InputGroupButton>
      </InputGroup>
    `,
  });

  render(Harness);
  const group = screen.getByTestId('responsive-group');
  const input = screen.getByRole('textbox', { name: 'Workspace' });
  const localInput = screen.getByRole('textbox', { name: 'Small workspace' });
  const button = screen.getByRole('button', { name: 'Copy' });

  expect(group).toHaveAttribute('data-size', 'sm');
  expect(input).toHaveAttribute('data-size', 'sm');
  expect(localInput).toHaveAttribute('data-size', 'xs');
  expect(button).toHaveAttribute('data-size', 'sm');

  size.value = 'xl';
  await nextTick();

  expect(group).toHaveAttribute('data-size', 'xl');
  expect(input).toHaveAttribute('data-size', 'xl');
  expect(localInput).toHaveAttribute('data-size', 'xs');
  expect(button).toHaveAttribute('data-size', 'xl');
});

test('forwards refs to ordinary parts', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const addonRef = ref<ComponentPublicInstance | null>(null);
  const inputRef = ref<ComponentPublicInstance | null>(null);
  const textRef = ref<ComponentPublicInstance | null>(null);
  const buttonRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components,
    setup() {
      return { addonRef, buttonRef, inputRef, rootRef, textRef };
    },
    template: `
      <InputGroup ref="rootRef" data-testid="ordinary-root">
        <InputGroupAddon ref="addonRef">@</InputGroupAddon>
        <InputGroupInput ref="inputRef" aria-label="Workspace" />
        <InputGroupText ref="textRef">.com</InputGroupText>
        <InputGroupButton ref="buttonRef">Copy</InputGroupButton>
      </InputGroup>
    `,
  });

  render(Harness);

  expect(rootRef.value?.$el).toBe(screen.getByTestId('ordinary-root'));
  expect(addonRef.value?.$el).toBe(screen.getByText('@'));
  expect(inputRef.value?.$el).toBe(screen.getByRole('textbox', { name: 'Workspace' }));
  expect(textRef.value?.$el).toBe(screen.getByText('.com'));
  expect(buttonRef.value?.$el).toBe(screen.getByRole('button', { name: 'Copy' }));
});

test('preserves semantic hosts with asChild composition', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const addonRef = ref<ComponentPublicInstance | null>(null);
  const textRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components,
    setup() {
      return { addonRef, rootRef, textRef };
    },
    template: `
      <InputGroup ref="rootRef" data-testid="as-child-root" as-child>
        <section aria-label="Workspace group">
          <InputGroupAddon ref="addonRef" as-child><strong>@</strong></InputGroupAddon>
          <InputGroupInput aria-label="Workspace" />
          <InputGroupText ref="textRef" as-child><em>.com</em></InputGroupText>
        </section>
      </InputGroup>
    `,
  });

  render(Harness);
  const root = screen.getByTestId('as-child-root');
  const addon = screen.getByText('@');
  const text = screen.getByText('.com');

  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'input-group-root');
  expect(rootRef.value?.$el).toBe(root);
  expect(addon.tagName).toBe('STRONG');
  expect(addon).toHaveAttribute('data-slot', 'input-group-addon');
  expect(addonRef.value?.$el).toBe(addon);
  expect(text.tagName).toBe('EM');
  expect(text).toHaveAttribute('data-slot', 'input-group-text');
  expect(textRef.value?.$el).toBe(text);
});

test('supports controlled v-model updates through InputGroupInput', async () => {
  const changes: string[] = [];
  const Harness = defineComponent({
    components,
    setup() {
      return { changes, value: ref('initial') };
    },
    template: `
      <InputGroup>
        <InputGroupInput
          v-model="value"
          aria-label="Project key"
          @update:model-value="changes.push($event)"
        />
      </InputGroup>
      <output>{{ value }}</output>
    `,
  });

  render(Harness);
  const input = screen.getByRole('textbox', { name: 'Project key' });

  expect(input).toHaveValue('initial');
  await fireEvent.update(input, 'next');

  await waitFor(() => expect(input).toHaveValue('next'));
  expect(screen.getByText('next')).toBeInTheDocument();
  expect(changes).toEqual(['next']);
});

test('renders and hydrates a semantic asChild root without changing its anatomy', async () => {
  const App = defineComponent({
    components,
    template: `
      <InputGroup as-child class="hydrated-group">
        <section aria-label="Server group">
          <InputGroupInput aria-label="Server input" />
        </section>
      </InputGroup>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('<section');
  expect(html).toContain('data-slot="input-group-root"');
  expect(html).toContain('data-slot="input-root"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);

  const section = host.querySelector('section');
  expect(host.querySelectorAll('section')).toHaveLength(1);
  expect(section).toHaveClass('hydrated-group', styles.root);
  expect(section).toHaveAttribute('data-slot', 'input-group-root');
  expect(section?.querySelector('[data-slot="input-root"]')).toBeInTheDocument();

  app.unmount();
  host.remove();
});