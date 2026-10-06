import {
  useSignaturePad as useArkSignaturePad,
  SignaturePadRoot as ArkSignaturePadRoot,
  SignaturePadControl as ArkSignaturePadControl,
  SignaturePadSegment as ArkSignaturePadSegment,
} from '@ark-ui/vue/signature-pad';
import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
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
import styles from '../src/components/signature-pad/SignaturePad.module.css';
import SsrSignaturePad from './fixtures/SsrSignaturePad.vue';

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

test.each([false, true])(
  'preserves omitted disabled and read-only clear guards with asChild=%s',
  async (asChild) => {
    const paths = ref([...defaultPaths]);
    const rootDisabled = ref(true);
    const disabled = ref<boolean>();
    const readOnly = ref(false);
    const triggerRef = ref<ComponentPublicInstance>();
    const changes = rs.fn();
    const click = rs.fn();
    const App = defineComponent({
      components: signaturePadComponents,
      setup: () => ({
        paths,
        rootDisabled,
        disabled,
        readOnly,
        triggerRef,
        changes,
        click,
        asChild,
      }),
      template: `
      <SignaturePad v-model:paths="paths" :disabled="rootDisabled" :read-only="readOnly" @draw-end="changes">
        <SignaturePadClearTrigger ref="triggerRef" :as-child="asChild" :disabled="disabled"
          aria-label="Reset signature" class="consumer-clear" style="color: red"
          title="Reset drawing" data-testid="clear" @click="click">
          <template v-if="asChild" #default><button type="button">Reset</button></template>
        </SignaturePadClearTrigger>
      </SignaturePad>
    `,
    });

    render(App);
    const trigger = screen.getByTestId('clear');
    await expect.element(page.getByTestId('clear')).toBeDisabled();
    expect(trigger).toBe(
      screen.getByRole(trigger!.getAttribute('role') || 'button', { name: 'Reset signature' }),
    );
    expect(triggerRef.value?.$el).toBe(trigger);
    await expect
      .element(page.getByTestId('clear'))
      .toHaveAttribute('data-slot', 'signature-pad-clear-trigger');
    expect([...trigger!.classList]).toEqual(expect.arrayContaining(['consumer-clear']));
    await expect.element(page.getByTestId('clear')).toHaveCSS('color', 'rgb(255, 0, 0)');
    await expect.element(page.getByTestId('clear')).toHaveAttribute('title', 'Reset drawing');
    expect(trigger.querySelector('svg') !== null).toBe(!asChild);
    if ((trigger as HTMLButtonElement).disabled) {
      (trigger as HTMLButtonElement).click();
    } else {
      await page.getByTestId('clear').click();
    }
    expect(changes).not.toHaveBeenCalled();
    expect(paths.value).toEqual(defaultPaths);

    rootDisabled.value = false;
    await expect.element(page.getByTestId('clear')).not.toBeDisabled();
    disabled.value = true;
    await expect.element(page.getByTestId('clear')).toBeDisabled();
    disabled.value = false;
    await expect.element(page.getByTestId('clear')).not.toBeDisabled();
    readOnly.value = true;
    await expect.element(page.getByTestId('clear')).toBeDisabled();
    if ((trigger as HTMLButtonElement).disabled) {
      (trigger as HTMLButtonElement).click();
    } else {
      await page.getByTestId('clear').click();
    }
    expect(changes).not.toHaveBeenCalled();
    expect(paths.value).toEqual(defaultPaths);
    readOnly.value = false;
    disabled.value = undefined;
    await expect.element(page.getByTestId('clear')).not.toBeDisabled();
    click.mockClear();
    if ((trigger as HTMLButtonElement).disabled) {
      (trigger as HTMLButtonElement).click();
    } else {
      await page.getByTestId('clear').click();
    }
    await expect.poll(() => paths.value).toEqual([]);
    expect(changes).toHaveBeenCalledTimes(1);
    expect(click).toHaveBeenCalledTimes(1);
    await expect.element(page.getByTestId('clear')).toHaveAttribute('hidden');
    expect(triggerRef.value?.$el).toBe(trigger);
  },
);

test('serializes an explicit hidden input with Ark defaults', async () => {
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

  await expect.element(page.locator('input[hidden]')).toHaveAttribute('name', 'signature');
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

  render(App);
  await page.getByRole('button', { name: 'Clear signature', exact: true }).click();

  await expect.element(page.locator('input[hidden]')).toHaveValue('');
  await expect.poll(() => drawEnds).toEqual([[]]);
});

test('forwards native hook emits once alongside prop callbacks', async () => {
  const emit = rs.fn();
  const onDraw = rs.fn();
  const onDrawEnd = rs.fn();
  const App = defineComponent({
    components: signaturePadComponents,
    setup: () => ({
      signaturePad: useSignaturePad({ defaultPaths, translations, onDraw, onDrawEnd }, emit),
    }),
    template: `
      <SignaturePadRootProvider :value="signaturePad">
        <SignaturePadParts />
      </SignaturePadRootProvider>
    `,
  });

  render(App);
  await page.getByRole('button', { name: 'Clear signature', exact: true }).click();

  await expect.poll(() => onDrawEnd).toHaveBeenCalledTimes(1);
  expect(onDraw).toHaveBeenCalledTimes(1);
  expect(emit.mock.calls.map(([event]) => event)).toEqual(['update:paths', 'draw', 'drawEnd']);
  expect(emit).toHaveBeenCalledWith('update:paths', []);
  expect(emit).toHaveBeenCalledWith('draw', onDraw.mock.calls[0][0]);
  expect(emit).toHaveBeenCalledWith('drawEnd', onDrawEnd.mock.calls[0][0]);
  expect(onDrawEnd.mock.calls[0][0].paths).toEqual([]);
});

test('keeps the disabled control and clear action unavailable', async () => {
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

  await expect
    .element(page.getByRole('application', { name: 'Signature drawing area', exact: true }))
    .toHaveAttribute('aria-disabled', 'true');
  await expect
    .element(page.getByRole('button', { name: 'Clear signature', exact: true }))
    .toBeDisabled();
});

test('prevents the clear action from changing read-only signatures', async () => {
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

  await expect
    .element(page.getByRole('button', { name: 'Clear signature', exact: true }))
    .toBeDisabled();
  (clearTrigger as HTMLButtonElement).click();
  await expect
    .element(page.getByRole('application', { name: 'Signature drawing area', exact: true }))
    .toBeAttached();
  expect(drawEnds).toEqual([]);
});

test('forwards Canvas control props and ref', async () => {
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
  await expect
    .element(page.getByTestId('canvas'))
    .toHaveAttribute('data-slot', 'signature-pad-control');
  expect(canvas).toBe(
    screen.getByRole(canvas!.getAttribute('role') || 'button', { name: 'Contract signature area' }),
  );
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
  await expect
    .element(page.getByRole('region', { name: 'Custom signature', exact: true }))
    .toHaveAttribute('data-slot', 'signature-pad-root');
  await expect
    .element(page.getByRole('region', { name: 'Custom signature', exact: true }))
    .toHaveAttribute('data-probe', 'root');

  await page.getByRole('button', { name: 'Clear signature', exact: true }).nth(0).click();
  await expect.element(page.getByText('Paths: 0')).toBeAttached();
  expect(paths.value).toEqual([]);
  expect(changes).toEqual([[]]);
});

test('preserves RootProvider state and moduix read-only behavior', async () => {
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
    .closest('[data-slot="signature-pad-root-provider"]')!;
  expect(provider!.getAttribute('data-probe')).toBe('provider');
  expect(provider.querySelector<HTMLInputElement>('input[hidden]')!.value).toBe(
    defaultPaths.join(' '),
  );
  await expect
    .element(page.getByRole('button', { name: 'Clear signature', exact: true }).nth(0))
    .not.toBeDisabled();
  await expect
    .element(page.getByRole('button', { name: 'Clear signature', exact: true }).nth(1))
    .toBeDisabled();
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
  const label = container.querySelector('[data-slot="signature-pad-label"]');
  const control = container.querySelector('[data-slot="signature-pad-control"]');
  const segment = container.querySelector('[data-slot="signature-pad-segment"]');
  const clearTrigger = container.querySelector('[data-slot="signature-pad-clear-trigger"]');
  const guide = container.querySelector('[data-slot="signature-pad-guide"]');

  expect([...root!.classList]).toEqual(expect.arrayContaining([styles.root, 'consumer-root']));
  expect(root?.className.endsWith('consumer-root')).toBe(true);
  await expect
    .element(page.locator('[data-slot="signature-pad-root"]'))
    .toHaveAttribute('data-scope', 'signature-pad');
  expect([...label!.classList]).toEqual(expect.arrayContaining([styles.label, 'consumer-label']));
  expect([...control!.classList]).toEqual(
    expect.arrayContaining([styles.control, 'consumer-control']),
  );
  expect([...segment!.classList]).toEqual(expect.arrayContaining([styles.segment]));
  expect([...clearTrigger!.classList]).toEqual(expect.arrayContaining([styles.clearTrigger]));
  expect([...guide!.classList]).toEqual(expect.arrayContaining([styles.guide]));
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
  await expect
    .element(page.getByRole('button', { name: 'Clear updated signature', exact: true }))
    .toBeAttached();
  const trigger = screen.getByRole('button', { name: 'Clear updated signature' });
  await expect
    .element(page.getByRole('button', { name: 'Clear updated signature', exact: true }))
    .toHaveAttribute('data-probe', 'updated');
  await expect.poll(() => triggerRef.value?.$el).toBe(trigger);
  await expect
    .poll(() => trigger.className.split(' ').filter((token) => token === 'consumer-trigger'))
    .toHaveLength(1);
});

test('commits pointer strokes and preserves uncontrolled drawing details', async () => {
  const paths = ref<string[]>([]);
  const draws: { paths: string[]; currentPath: string | null }[] = [];
  const ends: { paths: string[]; getDataUrl: (type: 'image/png') => Promise<string> }[] = [];
  const handleDraw = (details: (typeof draws)[number]) => {
    paths.value = details.paths;
    draws.push(details);
  };
  const App = defineComponent({
    components: signaturePadComponents,
    setup: () => ({ handleDraw, ends, translations }),
    template: `
      <SignaturePad :translations="translations" @draw="handleDraw" @draw-end="ends.push($event)">
        <SignaturePadLabel>Signature</SignaturePadLabel>
        <SignaturePadCanvas />
      </SignaturePad>
    `,
  });
  render(App);
  const control = screen.getByRole('application', { name: 'Signature drawing area' });
  const area = page.getByRole('application', { name: 'Signature drawing area' });
  await area.hover({ position: { x: 20, y: 25 } });
  const { left, top } = control.getBoundingClientRect();
  // Rstest has no drag API; native hover registers the mouse pointer for capture.
  const pointer = {
    bubbles: true,
    cancelable: true,
    button: 0,
    buttons: 1,
    pointerId: 1,
    pointerType: 'mouse',
    clientX: left + 20,
    clientY: top + 25,
  };
  await area.dispatchEvent('pointerdown', pointer);
  await expect.element(page.locator('[data-part="segment-path"]')).toHaveAttribute('d');
  await area.dispatchEvent('pointermove', { ...pointer, clientX: left + 60, clientY: top + 55 });
  await area.dispatchEvent('pointerup', {
    ...pointer,
    buttons: 0,
    clientX: left + 80,
    clientY: top + 70,
  });
  await expect.poll(() => paths.value).toHaveLength(1);
  expect(paths.value[0]).toMatch(/^M/);
  expect(draws.some((details) => details.currentPath !== null)).toBe(true);
  expect(ends).toHaveLength(1);
  expect(ends[0].paths).toEqual(paths.value);
  expect(await ends[0].getDataUrl('image/png')).toMatch(/^data:image\/png;base64,/);
  await expect
    .element(page.locator('[data-part="segment-path"]'))
    .toHaveAttribute('d', paths.value[0]);
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
  const area = page.getByRole('application', { name: 'Signature drawing area' });
  await area.hover({ position: { x: 20, y: 25 } });
  const { left, top } = control.getBoundingClientRect();
  // Rstest has no drag API; native hover registers the mouse pointer for capture.
  const pointer = {
    bubbles: true,
    cancelable: true,
    button: 0,
    buttons: 1,
    pointerId: 1,
    pointerType: 'mouse',
    clientX: left + 20,
    clientY: top + 25,
  };
  await area.dispatchEvent('pointerdown', pointer);
  await expect.element(page.locator('[data-part="segment-path"]')).toHaveAttribute('d');
  await area.dispatchEvent('pointermove', { ...pointer, clientX: left + 60, clientY: top + 55 });
  await area.dispatchEvent('pointerup', {
    ...pointer,
    buttons: 0,
    clientX: left + 80,
    clientY: top + 70,
  });
  await expect.poll(() => paths.value).toHaveLength(1);
  expect(committed).toEqual([paths.value]);
});

test('hydrates signature-pad without replacing hosts or IDs and remains interactive', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrSignaturePad));
  document.body.append(host);
  const parts = [...host.querySelectorAll('[data-slot]')];
  const ids = [...host.querySelectorAll('[id]')].map((element) => element.id);
  expect(parts.length).toBeGreaterThan(0);
  expect(ids.length).toBeGreaterThan(0);
  const app = createSSRApp(SsrSignaturePad);
  try {
    app.mount(host);
    const hydrated = [...host.querySelectorAll('[data-slot]')];
    expect(hydrated).toHaveLength(parts.length);
    hydrated.forEach((part, index) => expect(part).toBe(parts[index]));
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(ids);
    await page.getByRole('button', { name: 'Clear signature' }).click();
    await expect
      .element(page.getByRole('button', { name: 'Clear signature', includeHidden: true }))
      .toBeHidden();
  } finally {
    app.unmount();
    host.remove();
  }
});
test('accepts the raw Ark API without read-only metadata', async () => {
  render(
    defineComponent({
      components: signaturePadComponents,
      setup: () => ({ pad: useArkSignaturePad({ defaultPaths, translations }) }),
      template:
        '<SignaturePadRootProvider :value="pad"><SignaturePadParts /></SignaturePadRootProvider>',
    }),
  );
  await expect
    .element(page.getByRole('button', { name: 'Clear signature', exact: true }))
    .not.toBeDisabled();
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
  await expect
    .element(page.getByRole('button', { name: 'Clear signature', exact: true }))
    .toBeDisabled();
  await expect.element(page.getByTestId('read-only')).toContainText('true');
  readOnly.value = false;
  await expect
    .element(page.getByRole('button', { name: 'Clear signature', exact: true }))
    .not.toBeDisabled();
  await expect.element(page.getByTestId('read-only')).toContainText('false');
  readOnly.value = true;
  await expect
    .element(page.getByRole('button', { name: 'Clear signature', exact: true }))
    .toBeDisabled();
  await expect.element(page.getByTestId('read-only')).toContainText('true');
});