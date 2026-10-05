import { page } from '@rstest/browser';
import { expect, test, rs } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
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
};

test('updates invalid state and connects legend, description, and error text', async () => {
  const invalid = ref(false);
  render({
    components: fieldsetComponents,
    setup: () => ({ invalid }),
    template: `<Fieldset :invalid="invalid">
        <FieldsetLegend>Contact details</FieldsetLegend>
        <FieldsetHelperText>We only use these details to contact you.</FieldsetHelperText>
        <FieldsetErrorText>Enter a valid email address.</FieldsetErrorText>
      </Fieldset>`,
  });
  const fieldset = screen.getByRole('group', { name: 'Contact details' });
  const helperText = screen.getByText('We only use these details to contact you.');
  await expect
    .element(page.getByRole('group', { name: 'Contact details' }))
    .not.toHaveAttribute('data-invalid');
  const textLocator = page.getByText('Enter a valid email address.', { exact: true });
  await expect.element(textLocator).toHaveCount(0);
  invalid.value = true;
  await expect.element(textLocator).toBeVisible();
  const errorText = screen.getByText('Enter a valid email address.');
  await expect
    .element(page.getByRole('group', { name: 'Contact details' }))
    .toHaveAttribute('data-invalid');
  await expect.poll(() => fieldset.getAttribute('aria-describedby')).toContain(helperText.id);
  await expect.poll(() => fieldset.getAttribute('aria-describedby')).toContain(errorText.id);
  await expect.element(textLocator).toHaveAttribute('aria-live', 'polite');
});

test('disables native descendants', async () => {
  render({
    components: fieldsetComponents,
    template: `
      <Fieldset disabled>
        <FieldsetLegend>Shipping address</FieldsetLegend>
        <input aria-label="Street" />
      </Fieldset>
    `,
  });

  await expect.element(page.getByRole('textbox', { name: 'Street', exact: true })).toBeDisabled();
});

test('preserves native composition and forwards refs through asChild', () => {
  const refs = {
    root: ref<ComponentPublicInstance | null>(null),
    legend: ref<ComponentPublicInstance | null>(null),
  };

  render({
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

  expect(refs.root.value?.$el).toBe(screen.getByRole('group', { name: 'Account details' }));
  expect(refs.root.value?.$el?.getAttribute('data-slot')).toBe('fieldset-root');
  expect(refs.legend.value?.$el?.getAttribute('data-slot')).toBe('fieldset-legend');
});

test('keeps RootProvider and state context exports Ark-shaped', async () => {
  const ContextState = defineComponent({
    setup() {
      return { fieldset: useFieldsetContext() };
    },
    template: '<output data-testid="hook-state">{{ String(fieldset.invalid) }}</output>',
  });

  render({
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
  await expect
    .element(page.getByRole('group', { name: 'Account details', exact: true }))
    .toHaveAttribute('data-slot', 'fieldset-root-provider');
  await expect.element(page.getByTestId('render-prop-state')).toContainText('true');
  await expect.element(page.getByTestId('hook-state')).toContainText('true');
});

test('hydrates without replacing hosts or generated ids', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrFieldset));
  document.body.append(host);
  const serverRoot = host.querySelector('fieldset');
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrFieldset);
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelectorAll('fieldset')).toHaveLength(1);
    expect(host.querySelector('fieldset')).toBe(serverRoot);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    await expect
      .element(page.getByRole('group', { name: 'Hydrated fieldset' }))
      .toHaveAttribute('data-invalid');
    expect(host.querySelectorAll('[data-slot="fieldset-legend"]')).toHaveLength(1);
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});
import SsrFieldset from './fixtures/SsrFieldset.vue';