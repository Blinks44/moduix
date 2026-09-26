import { expect, test } from '@rstest/core';
import { render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  Fieldset,
  FieldsetContext,
  FieldsetErrorText,
  FieldsetHelperText,
  FieldsetLegend,
  FieldsetRootProvider,
  useFieldset,
  useFieldsetContext,
} from '../src';

const fieldsetComponents = {
  Fieldset,
  FieldsetContext,
  FieldsetErrorText,
  FieldsetHelperText,
  FieldsetLegend,
  FieldsetRootProvider,
} as unknown as Record<string, Component>;

test('connects the legend, description, and error text to the native fieldset', async () => {
  render({
    components: fieldsetComponents,
    template: `
      <Fieldset invalid>
        <FieldsetLegend>Contact details</FieldsetLegend>
        <FieldsetHelperText>We only use these details to contact you.</FieldsetHelperText>
        <FieldsetErrorText>Enter a valid email address.</FieldsetErrorText>
      </Fieldset>
    `,
  });

  const fieldset = screen.getByRole('group', { name: 'Contact details' });
  const helperText = screen.getByText('We only use these details to contact you.');
  const errorText = screen.getByText('Enter a valid email address.');

  expect(fieldset).toHaveAttribute('data-invalid');
  await waitFor(() => expect(fieldset.getAttribute('aria-describedby')).toContain(helperText.id));
  expect(fieldset.getAttribute('aria-describedby')).toContain(errorText.id);
  expect(errorText).toHaveAttribute('aria-live', 'polite');
});

test('renders error text only while invalid', async () => {
  const invalid = ref(false);
  const Harness = defineComponent({
    components: fieldsetComponents,
    setup() {
      return { invalid };
    },
    template: `
      <Fieldset :invalid="invalid">
        <FieldsetErrorText>Enter a valid email address.</FieldsetErrorText>
      </Fieldset>
    `,
  });

  render(Harness);
  expect(screen.queryByText('Enter a valid email address.')).not.toBeInTheDocument();

  invalid.value = true;
  await nextTick();
  expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument();
});

test('disables native descendants', () => {
  render({
    components: fieldsetComponents,
    template: `
      <Fieldset disabled>
        <FieldsetLegend>Shipping address</FieldsetLegend>
        <input aria-label="Street" />
      </Fieldset>
    `,
  });

  expect(screen.getByRole('textbox', { name: 'Street' })).toBeDisabled();
});

test('preserves native composition and forwards refs through asChild', () => {
  const refs = {
    root: ref<ComponentPublicInstance | null>(null),
    legend: ref<ComponentPublicInstance | null>(null),
  };
  const Harness = defineComponent({
    components: fieldsetComponents,
    setup() {
      return { rootRef: refs.root, legendRef: refs.legend };
    },
    template: `
      <Fieldset as-child ref="rootRef">
        <fieldset>
          <FieldsetLegend as-child ref="legendRef"><legend>Account details</legend></FieldsetLegend>
        </fieldset>
      </Fieldset>
    `,
  });

  render(Harness);

  expect(refs.root.value?.$el).toBe(screen.getByRole('group', { name: 'Account details' }));
  expect(refs.root.value?.$el).toHaveAttribute('data-slot', 'fieldset-root');
  expect(refs.legend.value?.$el).toHaveAttribute('data-slot', 'fieldset-legend');
});

test('keeps RootProvider and state context exports Ark-shaped', () => {
  const ContextState = defineComponent({
    setup() {
      return { fieldset: useFieldsetContext() };
    },
    template: '<output data-testid="hook-state">{{ String(fieldset.invalid) }}</output>',
  });
  const Harness = defineComponent({
    components: { ...fieldsetComponents, ContextState },
    setup() {
      return { fieldset: useFieldset({ invalid: true }) };
    },
    template: `
      <FieldsetRootProvider :value="fieldset">
        <FieldsetLegend>Account details</FieldsetLegend>
        <FieldsetContext v-slot="context">
          <output data-testid="render-prop-state">{{ String(context.invalid) }}</output>
        </FieldsetContext>
        <ContextState />
      </FieldsetRootProvider>
    `,
  });

  render(Harness);
  expect(screen.getByRole('group', { name: 'Account details' })).toHaveAttribute(
    'data-slot',
    'fieldset-root-provider',
  );
  expect(screen.getByTestId('render-prop-state')).toHaveTextContent('true');
  expect(screen.getByTestId('hook-state')).toHaveTextContent('true');
});

test('renders and hydrates the public anatomy without changing generated ids', async () => {
  const App = defineComponent({
    components: fieldsetComponents,
    template: `
      <Fieldset invalid>
        <FieldsetLegend>Hydrated fieldset</FieldsetLegend>
        <FieldsetHelperText>Helper text</FieldsetHelperText>
        <FieldsetErrorText>Error text</FieldsetErrorText>
      </Fieldset>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="fieldset-root"');
  expect(html).toContain('data-slot="fieldset-legend"');
  expect(html).toContain('aria-live="polite"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);
  app.mount(host);
  await nextTick();

  expect(host.querySelectorAll('[data-slot="fieldset-root"]')).toHaveLength(1);
  expect(host.querySelectorAll('[data-slot="fieldset-legend"]')).toHaveLength(1);
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);

  app.unmount();
  host.remove();
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render({
    components: fieldsetComponents,
    template: `
      <Fieldset class="gap-2 max-w-64">
        <FieldsetLegend class="text-primary">Styled fieldset</FieldsetLegend>
        <FieldsetHelperText class="text-primary">Visible to project members.</FieldsetHelperText>
      </Fieldset>
    `,
  });

  const fieldset = screen.getByRole('group', { name: 'Styled fieldset' });
  expect(fieldset).toHaveClass('gap-2', 'max-w-64');
  expect(fieldset).not.toHaveClass('gap-4', 'max-w-none');
  expect(
    screen.getByRole('group', { name: 'Styled fieldset' }).querySelector('legend'),
  ).toHaveClass('text-primary');
});