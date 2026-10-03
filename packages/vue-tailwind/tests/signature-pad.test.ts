import {
  useSignaturePad as useArkSignaturePad,
  SignaturePadRoot as ArkSignaturePadRoot,
  SignaturePadControl as ArkSignaturePadControl,
  SignaturePadSegment as ArkSignaturePadSegment,
} from '@ark-ui/vue/signature-pad';
import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { computed, createSSRApp, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  Field,
  SignaturePad,
  SignaturePadCanvas,
  SignaturePadClearTrigger,
  SignaturePadHiddenInput,
  SignaturePadLabel,
  SignaturePadRootProvider,
  useSignaturePad,
  useSignaturePadContext,
} from '../src';

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
  setup(props) {
    return {
      label: props.label,
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

test('serializes an explicit hidden input with Ark defaults', () => {
  const App = defineComponent({
    components: signaturePadComponents,
    template: `
      <form>
        <SignaturePad :default-paths="['M1,1 L2,2']" name="signature">
          <SignaturePadParts />
        </SignaturePad>
      </form>
    `,
  });

  const { container } = render(App);
  const form = container.querySelector('form');
  const input = container.querySelector('input[hidden]');

  expect(input).toHaveAttribute('name', 'signature');
  expect(new FormData(form! as HTMLFormElement).get('signature')).toBe(defaultPaths.join(' '));
});

test('keeps the clear action and callback details Ark-shaped', async () => {
  const drawEnds: string[][] = [];
  const App = defineComponent({
    components: signaturePadComponents,
    setup: () => ({ drawEnds, translations }),
    template: `
      <SignaturePad
        :default-paths="['M1,1 L2,2']"
        :translations="translations"
        @draw-end="drawEnds.push($event.paths)"
      >
        <SignaturePadParts />
      </SignaturePad>
    `,
  });

  const { container } = render(App);
  await fireEvent.click(screen.getByRole('button', { name: 'Clear signature' }));

  await waitFor(() => {
    expect(container.querySelector('input[hidden]')).toHaveValue('');
    expect(drawEnds).toEqual([[]]);
  });
});

test('keeps the disabled control and clear action unavailable', () => {
  const App = defineComponent({
    components: signaturePadComponents,
    setup: () => ({ translations }),
    template: `
      <SignaturePad :default-paths="['M1,1 L2,2']" disabled :translations="translations">
        <SignaturePadParts label="Disabled signature" />
      </SignaturePad>
    `,
  });

  render(App);

  expect(screen.getByRole('application', { name: 'Signature drawing area' })).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  expect(screen.getByRole('button', { name: 'Clear signature' })).toBeDisabled();
});

test('prevents the clear action from changing read-only signatures', () => {
  const drawEnds: string[][] = [];
  const App = defineComponent({
    components: signaturePadComponents,
    setup: () => ({ drawEnds, translations }),
    template: `
      <Field read-only>
        <SignaturePad
          :default-paths="['M1,1 L2,2']"
          :translations="translations"
          @draw-end="drawEnds.push($event.paths)"
        >
          <SignaturePadParts label="Read-only signature" />
        </SignaturePad>
      </Field>
    `,
  });

  render(App);

  const clearTrigger = screen.getByRole('button', { name: 'Clear signature' });

  expect(clearTrigger).toBeDisabled();
  fireEvent.click(clearTrigger);
  expect(screen.getByRole('application', { name: 'Signature drawing area' })).toBeInTheDocument();
  expect(drawEnds).toEqual([]);
});

test('forwards Canvas control props and ref', () => {
  const canvasRef = ref<ComponentPublicInstance>();
  const App = defineComponent({
    components: signaturePadComponents,
    setup: () => ({ canvasRef, translations }),
    template: `
      <SignaturePad :translations="translations">
        <SignaturePadLabel>Signature</SignaturePadLabel>
        <SignaturePadCanvas
          ref="canvasRef"
          aria-label="Contract signature area"
          data-testid="canvas"
        />
      </SignaturePad>
    `,
  });

  render(App);

  const canvas = screen.getByTestId('canvas');
  expect(canvasRef.value?.$el).toBe(canvas);
  expect(canvas).toHaveAttribute('data-slot', 'signature-pad-control');
  expect(canvas).toHaveAccessibleName('Contract signature area');
});

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
  expect(root).toHaveAttribute('data-slot', 'signature-pad-root');
  expect(root).toHaveAttribute('data-probe', 'root');

  await fireEvent.click(screen.getByRole('button', { name: /clear signature/i }));
  await waitFor(() => expect(screen.getByText('Paths: 0')).toBeInTheDocument());
  expect(paths.value).toEqual([]);
  expect(changes).toEqual([[]]);
});

test('preserves RootProvider state and moduix read-only behavior', () => {
  const App = defineComponent({
    components: signaturePadComponents,
    setup() {
      return {
        readOnlyPad: useSignaturePad({ defaultPaths, readOnly: true, translations }),
        signaturePad: useSignaturePad({ defaultPaths, translations }),
      };
    },
    template: `
      <SignaturePadRootProvider :value="signaturePad" data-probe="provider">
        <SignaturePadParts label="Provider signature" />
      </SignaturePadRootProvider>
      <SignaturePadRootProvider :value="readOnlyPad">
        <SignaturePadParts label="Read-only provider signature" />
      </SignaturePadRootProvider>
    `,
  });

  render(App);

  const provider = screen
    .getByText('Provider signature')
    .closest('[data-slot="signature-pad-root-provider"]');
  expect(provider).toHaveAttribute('data-probe', 'provider');
  expect(provider?.querySelector('input[hidden]')).toHaveValue(defaultPaths.join(' '));
  const clearTriggers = screen.getAllByRole('button', { name: 'Clear signature' });
  expect(clearTriggers[0]).not.toBeDisabled();
  expect(clearTriggers[1]).toBeDisabled();
});

test('renders Ark anatomy and lets consumer classes win', () => {
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
  const label = container.querySelector('[data-slot="signature-pad-label"]');
  const control = container.querySelector('[data-slot="signature-pad-control"]');
  const segment = container.querySelector('[data-slot="signature-pad-segment"]');
  const clearTrigger = container.querySelector('[data-slot="signature-pad-clear-trigger"]');
  const guide = container.querySelector('[data-slot="signature-pad-guide"]');

  expect(root).toHaveClass('box-border', 'inline-flex', 'w-70', 'consumer-root');
  expect(root?.className.endsWith('consumer-root')).toBe(true);
  expect(label).toHaveClass('text-sm', 'consumer-label');
  expect(control).toHaveClass('h-40', 'consumer-control');
  expect(segment).toHaveClass('fill-current');
  expect(clearTrigger).toHaveClass('absolute', 'end-2', 'top-2');
  expect(guide).toHaveClass('border-dashed');
});

test('updates clear-trigger attrs and preserves one consumer class through asChild', async () => {
  const label = ref('Clear initial signature');
  const probe = ref('initial');
  const triggerRef = ref<ComponentPublicInstance>();
  const App = defineComponent({
    components: signaturePadComponents,
    setup: () => ({ label, probe, triggerRef }),
    template: `
      <SignaturePad :default-paths="['M1,1 L2,2']">
        <SignaturePadLabel>Signature</SignaturePadLabel>
        <SignaturePadClearTrigger ref="triggerRef" as-child :aria-label="label" :data-probe="probe" class="consumer-trigger">
          <button type="button">Clear</button>
        </SignaturePadClearTrigger>
      </SignaturePad>
    `,
  });
  render(App);
  label.value = 'Clear updated signature';
  probe.value = 'updated';
  await waitFor(() => {
    const trigger = screen.getByRole('button', { name: 'Clear updated signature' });
    expect(trigger).toHaveAttribute('data-probe', 'updated');
    expect(triggerRef.value?.$el).toBe(trigger);
    expect(
      trigger.className.split(' ').filter((token) => token === 'consumer-trigger'),
    ).toHaveLength(1);
  });
});

test('commits pointer strokes and preserves uncontrolled drawing details', async () => {
  const paths = ref<string[]>([]);
  const draws: { paths: string[]; currentPath: string | null }[] = [];
  const ends: { paths: string[]; getDataUrl: unknown }[] = [];
  const App = defineComponent({
    components: signaturePadComponents,
    setup: () => ({ paths, draws, ends, translations }),
    template: `
      <SignaturePad :translations="translations" @draw="paths = $event.paths; draws.push($event)" @draw-end="ends.push($event)">
        <SignaturePadLabel>Signature</SignaturePadLabel>
        <SignaturePadCanvas />
      </SignaturePad>
    `,
  });
  const { container } = render(App);
  const control = screen.getByRole('application', { name: 'Signature drawing area' });
  // Happy DOM does not implement native pointer capture.
  Object.defineProperties(control, {
    setPointerCapture: { value: rs.fn() },
    hasPointerCapture: { value: () => true },
    releasePointerCapture: { value: rs.fn() },
  });
  await fireEvent.pointerDown(control, {
    button: 0,
    pointerId: 1,
    pointerType: 'pen',
    clientX: 20,
    clientY: 25,
  });
  await new Promise((resolve) => setTimeout(resolve, 0));
  await fireEvent.pointerMove(document, {
    pointerId: 1,
    pointerType: 'pen',
    clientX: 60,
    clientY: 55,
  });
  await fireEvent.pointerUp(control, {
    button: 0,
    pointerId: 1,
    pointerType: 'pen',
    clientX: 80,
    clientY: 70,
  });
  await waitFor(() => expect(paths.value).toHaveLength(1));
  expect(paths.value[0]).toMatch(/^M/);
  expect(draws.some((details) => details.currentPath !== null)).toBe(true);
  expect(ends).toHaveLength(1);
  expect(ends[0].paths).toEqual(paths.value);
  expect(ends[0].getDataUrl).toBeTypeOf('function');
  expect(container.querySelector('[data-part="segment-path"]')).toHaveAttribute(
    'd',
    paths.value[0],
  );
});

// Ark Vue 5.39.2 emits drawEnd before the controlled paths prop reflects the committed stroke.
// Re-enable after upstream supplies the committed paths in the event details.
test.skip('includes the committed paths in controlled drawEnd details in direct Ark', async () => {
  const paths = ref<string[]>([]);
  const committed: string[][] = [];
  const App = defineComponent({
    components: { ArkSignaturePadRoot, ArkSignaturePadControl, ArkSignaturePadSegment },
    setup: () => ({ paths, committed, translations }),
    template: `
      <ArkSignaturePadRoot v-model:paths="paths" :translations="translations" @draw-end="committed.push($event.paths)">
        <ArkSignaturePadControl><ArkSignaturePadSegment /></ArkSignaturePadControl>
      </ArkSignaturePadRoot>
    `,
  });
  render(App);
  const control = screen.getByRole('application', { name: 'Signature drawing area' });
  Object.defineProperties(control, {
    setPointerCapture: { value: rs.fn() },
    hasPointerCapture: { value: () => true },
    releasePointerCapture: { value: rs.fn() },
  });
  await fireEvent.pointerDown(control, {
    button: 0,
    pointerId: 1,
    pointerType: 'pen',
    clientX: 20,
    clientY: 25,
  });
  await new Promise((resolve) => setTimeout(resolve, 0));
  await fireEvent.pointerMove(document, {
    pointerId: 1,
    pointerType: 'pen',
    clientX: 60,
    clientY: 55,
  });
  await fireEvent.pointerUp(control, {
    button: 0,
    pointerId: 1,
    pointerType: 'pen',
    clientX: 80,
    clientY: 70,
  });
  await waitFor(() => expect(paths.value).toHaveLength(1));
  expect(committed).toEqual([paths.value]);
});

test('renders and hydrates generated ids consistently', async () => {
  const App = defineComponent({
    components: signaturePadComponents,
    template: `
      <SignaturePad>
        <SignaturePadLabel>Signature</SignaturePadLabel>
        <SignaturePadCanvas />
      </SignaturePad>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="signature-pad-root"');
  expect(html).toContain('data-slot="signature-pad-control"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);
  app.mount(host);
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
  app.unmount();
  host.remove();
});

type RawSignaturePadApi = ReturnType<typeof useArkSignaturePad>['value'];
const nativeProviderType: RawSignaturePadApi extends InstanceType<
  typeof SignaturePadRootProvider
>['$props']['value']
  ? true
  : false = true;

test('accepts the raw Ark API without read-only metadata', () => {
  expect(nativeProviderType).toBe(true);
  render(
    defineComponent({
      components: signaturePadComponents,
      setup: () => ({ pad: useArkSignaturePad({ defaultPaths, translations }) }),
      template:
        '<SignaturePadRootProvider :value="pad"><SignaturePadParts /></SignaturePadRootProvider>',
    }),
  );
  expect(screen.getByRole('button', { name: 'Clear signature' })).not.toBeDisabled();
});

test('keeps hook metadata reactive and lets explicit false override Field read-only', async () => {
  const readOnly = ref<boolean | undefined>();
  const Provider = defineComponent({
    components: signaturePadComponents,
    setup: () => ({
      pad: useSignaturePad(
        computed(() => ({ defaultPaths, translations, readOnly: readOnly.value })),
      ),
    }),
    template: `
      <SignaturePadRootProvider :value="pad">
        <SignaturePadParts />
        <output data-testid="read-only">{{ pad.readOnly }}</output>
      </SignaturePadRootProvider>
    `,
  });
  render({ components: { Field, Provider }, template: '<Field read-only><Provider /></Field>' });
  const clear = screen.getByRole('button', { name: 'Clear signature' });
  expect(clear).toBeDisabled();
  expect(screen.getByTestId('read-only')).toHaveTextContent('true');
  readOnly.value = false;
  await waitFor(() => {
    expect(clear).not.toBeDisabled();
    expect(screen.getByTestId('read-only')).toHaveTextContent('false');
  });
  readOnly.value = true;
  await waitFor(() => {
    expect(clear).toBeDisabled();
    expect(screen.getByTestId('read-only')).toHaveTextContent('true');
  });
});