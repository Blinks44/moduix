import { FieldLabel, FieldRoot } from '@ark-ui/vue/field';
import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import { Input } from '../src';

const fieldComponents = { FieldLabel, FieldRoot, Input } as unknown as Record<string, Component>;

test('preserves native field state and component-owned styling hooks', () => {
  render({
    components: fieldComponents,
    template: `
      <FieldRoot disabled id="email" invalid read-only required>
        <FieldLabel>Email</FieldLabel>
        <Input
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

  expect(input).toBeDisabled();
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(input).toHaveAttribute('readonly');
  expect(input).toBeRequired();
  expect(input).toHaveAttribute('data-part', 'input');
  expect(input).toHaveAttribute('data-scope', 'field');
  expect(input).toHaveAttribute('data-size', 'md');
  expect(input).toHaveAttribute('data-slot', 'input-root');
  expect(input).toHaveAttribute('data-html-size');
  expect(input).toHaveAttribute('size', '8');
  expect(input).toHaveClass('consumer-class');
});

test('forwards the input ref on the ordinary path', () => {
  const inputRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: fieldComponents,
    setup() {
      return { inputRef };
    },
    template: '<Input ref="inputRef" aria-label="Repository" />',
  });

  render(Harness);

  const input = screen.getByRole('textbox', { name: 'Repository' });

  expect(inputRef.value?.$el).toBe(input);
  expect(input).toHaveAttribute('data-slot', 'input-root');
});

test('preserves asChild composition and forwards its ref to the semantic input', () => {
  const inputRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: fieldComponents,
    setup() {
      return { inputRef };
    },
    template: `
      <Input ref="inputRef" as-child>
        <input name="repository" aria-label="Repository" />
      </Input>
    `,
  });

  render(Harness);

  const input = screen.getByRole('textbox', { name: 'Repository' });

  expect(inputRef.value?.$el).toBe(input);
  expect(input).toHaveAttribute('name', 'repository');
  expect(input).toHaveAttribute('data-slot', 'input-root');
});

test('supports native events and controlled v-model updates', async () => {
  const changes: string[] = [];
  const Harness = defineComponent({
    components: fieldComponents,
    setup() {
      return {
        changes,
        value: ref('initial'),
      };
    },
    template: `
      <Input
        v-model="value"
        aria-label="Project key"
        @update:model-value="changes.push($event)"
      />
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

test('applies native utilities to the input', () => {
  render({ components: fieldComponents, template: '<Input aria-label="Project key" />' });
  const input = screen.getByRole('textbox', { name: 'Project key' });

  expect(input).toHaveClass(
    'w-full',
    'max-w-none',
    'min-h-control-md',
    'rounded-md',
    'border',
    'border-border',
    'bg-background',
    'px-3',
    'py-1',
    'text-md',
    'leading-6',
  );
  expect(input).toHaveClass('file:border-primary', 'file:bg-primary', 'file:px-2', 'file:py-0.5');
});

test('applies each visual size with native utilities', () => {
  render({
    components: fieldComponents,
    template: `
      <Input size="xs" aria-label="Extra-small input" />
      <Input size="sm" aria-label="Small input" />
      <Input size="md" aria-label="Medium input" />
      <Input size="lg" aria-label="Large input" />
      <Input size="xl" aria-label="Extra-large input" />
    `,
  });

  expect(screen.getByLabelText('Extra-small input')).toHaveClass(
    'min-h-control-xs',
    'px-2',
    'py-0.5',
    'text-xs',
    'leading-4',
  );
  expect(screen.getByLabelText('Small input')).toHaveClass(
    'min-h-control-sm',
    'px-2',
    'py-1',
    'text-sm',
    'leading-5',
  );
  expect(screen.getByLabelText('Medium input')).toHaveClass('min-h-control-md');
  expect(screen.getByLabelText('Large input')).toHaveClass(
    'min-h-control-lg',
    'px-4',
    'py-1',
    'text-lg',
    'leading-7',
  );
  expect(screen.getByLabelText('Extra-large input')).toHaveClass(
    'min-h-control-xl',
    'px-4',
    'py-2',
    'text-lg',
    'leading-7',
  );
});

test('lets consumer utilities replace component defaults', () => {
  render({
    components: fieldComponents,
    template: `
      <Input
        size="lg"
        :html-size="8"
        aria-label="Project key"
        class="min-h-20 w-80 max-w-sm rounded-lg bg-muted px-0 py-0 leading-5"
      />
    `,
  });

  const input = screen.getByRole('textbox', { name: 'Project key' });

  expect(input).toHaveClass(
    'w-80',
    'max-w-sm',
    'min-h-20',
    'rounded-lg',
    'bg-muted',
    'px-0',
    'py-0',
    'leading-5',
  );
  expect(input).not.toHaveClass(
    'w-full',
    'w-auto',
    'max-w-none',
    'min-h-control-lg',
    'rounded-md',
    'bg-background',
    'px-4',
    'py-1',
    'leading-7',
  );
});

test('renders and hydrates the native input with stable anatomy', async () => {
  const App = defineComponent({
    components: fieldComponents,
    template: '<Input aria-label="Server input" :html-size="8" />',
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="input-root"');
  expect(html).toContain('data-scope="field"');
  expect(html).toContain('size="8"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);

  const input = host.querySelector('input');
  expect(host.querySelectorAll('input')).toHaveLength(1);
  expect(input).toHaveAttribute('data-slot', 'input-root');
  expect(input).toHaveAttribute('size', '8');

  app.unmount();
  host.remove();
});