import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  Field,
  SignaturePad,
  SignaturePadCanvas,
  SignaturePadClearTrigger,
  SignaturePadHiddenInput,
  SignaturePadLabel,
  SignaturePadRootProvider,
  useSignaturePadContext,
} from '@/index';

const defaultPaths = ['M1,1 L2,2'];

const translations = {
  clearTrigger: 'Clear signature',
  control: 'Signature drawing area',
};

const SignaturePadParts = defineComponent({
  components: {
    SignaturePadCanvas,
    SignaturePadHiddenInput,
    SignaturePadLabel,
  } as unknown as Record<string, Component>,
  props: {
    label: { type: String, default: 'Signature' },
  },
  setup() {
    return {
      signaturePad: useSignaturePadContext(),
    };
  },
  template: `
    <SignaturePadLabel>{{ label }}</SignaturePadLabel>
    <SignaturePadCanvas />
    <SignaturePadHiddenInput :value="signaturePad.paths.join(' ')" />
  `,
});

const signaturePadComponents = {
  Field,
  SignaturePad,
  SignaturePadCanvas,
  SignaturePadClearTrigger,
  SignaturePadHiddenInput,
  SignaturePadLabel,
  SignaturePadParts,
  SignaturePadRootProvider,
} as unknown as Record<string, Component>;

test('supports controlled paths through Vue v-model and preserves root asChild composition', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const paths = ref(defaultPaths);
  const changes: string[][] = [];
  const App = defineComponent({
    components: signaturePadComponents,
    setup: () => ({ changes, paths, rootRef, translations }),
    template: `
      <SignaturePad
        ref="rootRef"
        as-child
        v-model:paths="paths"
        data-probe="root"
        :translations="translations"
        @update:paths="changes.push($event)"
      >
        <section aria-label="Custom signature">
          <SignaturePadParts label="Custom signature" />
        </section>
      </SignaturePad>
      <output>Paths: {{ paths.length }}</output>
    `,
  });

  render(App);

  const root = screen.getByRole('region', { name: 'Custom signature' });
  expect(root.tagName).toBe('SECTION');
  expect(rootRef.value?.$el).toBe(root);
  await expect
    .element(page.getByRole('region', { name: 'Custom signature', exact: true }))
    .toHaveAttribute('data-slot', 'signature-pad-root');
  await expect
    .element(page.getByRole('region', { name: 'Custom signature', exact: true }))
    .toHaveAttribute('data-probe', 'root');

  await page.getByRole('button', { name: /clear signature/i, exact: true }).click();
  await expect.element(page.getByText('Paths: 0')).toBeAttached();
  expect(paths.value).toEqual([]);
  expect(changes).toEqual([[]]);
});

test('renders Ark anatomy and lets consumer classes win', async () => {
  const App = defineComponent({
    components: signaturePadComponents,
    template: `
      <SignaturePad class="consumer-root">
        <SignaturePadLabel class="consumer-label">Signature</SignaturePadLabel>
        <SignaturePadCanvas class="consumer-control" />
      </SignaturePad>
    `,
  });

  const { container } = render(App);
  const root = container.querySelector('[data-slot="signature-pad-root"]');

  expect(root?.className.endsWith('consumer-root')).toBe(true);
});