import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
  AccordionRootProvider,
  useAccordion,
  useAccordionContext,
  useAccordionItemContext,
} from '../src';
import SsrAccordion from './fixtures/SsrAccordion.vue';

const accordionComponents = {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
  AccordionRootProvider,
};

const items = [
  { value: 'first', label: 'First item', content: 'First content' },
  { value: 'second', label: 'Second item', content: 'Second content' },
];

const TestAccordion = defineComponent({
  components: accordionComponents,
  props: {
    collapsible: Boolean,
    disabled: Boolean,
    lazyMount: Boolean,
    modelValue: { type: Array<string>, default: undefined },
    orientation: { type: String, default: 'vertical' },
  },
  emits: ['update:modelValue', 'valueChange'],
  setup() {
    return { items };
  },
  template: `
    <Accordion
      :collapsible="collapsible"
      :default-value="modelValue === undefined ? ['first'] : undefined"
      :lazy-mount="lazyMount"
      :model-value="modelValue"
      :orientation="orientation"
      @update:model-value="$emit('update:modelValue', $event)"
      @value-change="$emit('valueChange', $event)"
    >
      <AccordionItem
        v-for="item in items"
        :key="item.value"
        :disabled="disabled && item.value === 'second'"
        :value="item.value"
      >
        <AccordionItemTrigger>{{ item.label }}</AccordionItemTrigger>
        <AccordionItemContent>
          <AccordionItemBody>{{ item.content }}</AccordionItemBody>
        </AccordionItemContent>
      </AccordionItem>
    </Accordion>
  `,
});

test('preserves Ark semantics, Vue refs, anatomy, attrs, and moduix hooks', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const triggerRef = ref<ComponentPublicInstance>();
  const bodyRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: accordionComponents,
    setup() {
      return { bodyRef, rootRef, triggerRef };
    },
    template: `
      <Accordion ref="rootRef" :default-value="['first']" data-probe="root">
        <AccordionItem value="first">
          <AccordionItemTrigger ref="triggerRef">
            First item
            <AccordionItemIndicator />
          </AccordionItemTrigger>
          <AccordionItemContent>
            <AccordionItemBody ref="bodyRef">First content</AccordionItemBody>
          </AccordionItemContent>
        </AccordionItem>
      </Accordion>
    `,
  });

  render(Harness);

  const trigger = screen.getByRole('button', { name: 'First item' });
  const body = screen.getByText('First content');
  const content = body.parentElement;
  const root = rootRef.value?.$el as HTMLElement;

  expect(root!.getAttribute('data-slot')).toBe('accordion-root');
  expect(root!.getAttribute('data-scope')).toBe('accordion');
  expect(root!.getAttribute('data-probe')).toBe('root');
  expect(triggerRef.value?.$el).toBe(trigger);
  const triggerLocator = page.getByRole('button', { name: 'First item', exact: true });
  await expect.element(triggerLocator).toHaveAttribute('type', 'button');
  await expect.element(triggerLocator).toHaveAttribute('data-slot', 'accordion-item-trigger');
  await expect.element(triggerLocator).toHaveAttribute('aria-expanded', 'true');
  await expect.element(triggerLocator).toHaveAttribute('aria-controls', content?.id);
  expect(
    Boolean(trigger.querySelector('[data-slot="accordion-item-indicator"] svg')?.isConnected),
  ).toBe(true);
  expect(content!.getAttribute('data-slot')).toBe('accordion-item-content');
  expect(content!.getAttribute('aria-labelledby')).toBe(trigger.id);
  expect(bodyRef.value?.$el).toBe(body);
  await expect.element(page.getByText('First content')).toHaveAttribute('data-part', 'item-body');
  await expect
    .element(page.getByText('First content'))
    .toHaveAttribute('data-slot', 'accordion-item-body');
});

test('moves focus between vertical triggers with arrow keys', async () => {
  render(TestAccordion);

  const firstTriggerLocator = page.getByRole('button', { name: 'First item', exact: true });
  await firstTriggerLocator.click();
  await firstTriggerLocator.press('ArrowDown');
  const secondTriggerLocator = page.getByRole('button', { name: 'Second item', exact: true });
  await expect.element(secondTriggerLocator).toBeFocused();

  await secondTriggerLocator.press('ArrowUp');
  await expect.element(firstTriggerLocator).toBeFocused();

  await firstTriggerLocator.press('End');
  await expect.element(secondTriggerLocator).toBeFocused();
  await secondTriggerLocator.press('Home');
  await expect.element(firstTriggerLocator).toBeFocused();
});

test('keeps Ark value details and ignores disabled items', async () => {
  const values: string[][] = [];
  render(TestAccordion, {
    props: {
      disabled: true,
      onValueChange: (details: { value: string[] }) => values.push(details.value),
    },
  });

  await expect
    .element(page.getByRole('button', { name: 'Second item', exact: true }))
    .toBeDisabled();
  expect(values).toEqual([]);
});

test('supports v-model and notifies each Vue listener once', async () => {
  const details: string[][] = [];
  const Harness = defineComponent({
    components: { TestAccordion },
    setup() {
      const value = ref(['first']);
      return { details, value };
    },
    template: `
      <TestAccordion v-model="value" @value-change="details.push($event.value)" />
      <output>Open items: {{ value.join(', ') }}</output>
    `,
  });

  render(Harness);
  await page.getByRole('button', { name: 'Second item', exact: true }).click();

  await expect.element(page.getByText('Open items: second')).toBeAttached();
  expect(details).toEqual([['second']]);
});

test('mounts lazy content only after its item opens', async () => {
  render(TestAccordion, { props: { lazyMount: true } });

  await expect.element(page.getByText('Second content')).toHaveCount(0);
  await page.getByRole('button', { name: 'Second item', exact: true }).click();
  await expect.element(page.getByText('Second content')).toBeVisible();
});

test('uses horizontal keyboard navigation', async () => {
  render(TestAccordion, { props: { orientation: 'horizontal' } });

  await page.getByRole('button', { name: 'First item', exact: true }).click();
  await page.getByRole('button', { name: 'First item', exact: true }).press('ArrowRight');
  await expect
    .element(page.getByRole('button', { name: 'Second item', exact: true }))
    .toBeFocused();
});

test('preserves the omitted and explicit collapsible Boolean contract', async () => {
  const Omitted = defineComponent({
    components: accordionComponents,
    template: `
      <Accordion :default-value="['first']">
        <AccordionItem value="first">
          <AccordionItemTrigger>First item</AccordionItemTrigger>
          <AccordionItemContent><AccordionItemBody>First content</AccordionItemBody></AccordionItemContent>
        </AccordionItem>
      </Accordion>
    `,
  });
  const { unmount } = render(Omitted);

  const collapsibleTriggerLocator = page.getByRole('button', { name: 'First item', exact: true });
  await collapsibleTriggerLocator.click();
  await expect.element(collapsibleTriggerLocator).toHaveAttribute('aria-expanded', 'true');
  unmount();

  render(TestAccordion, { props: { collapsible: true } });

  await collapsibleTriggerLocator.click();
  await expect.element(collapsibleTriggerLocator).toHaveAttribute('aria-expanded', 'false');
});

test('preserves semantic hosts and refs with asChild', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const bodyRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: accordionComponents,
    setup() {
      return { bodyRef, rootRef };
    },
    template: `
      <Accordion ref="rootRef" as-child :default-value="['first']">
        <section aria-label="Frequently asked questions">
          <AccordionItem value="first">
            <AccordionItemTrigger>First item</AccordionItemTrigger>
            <AccordionItemContent>
              <AccordionItemBody ref="bodyRef" as-child><article>First content</article></AccordionItemBody>
            </AccordionItemContent>
          </AccordionItem>
        </section>
      </Accordion>
    `,
  });

  render(Harness);
  const root = screen.getByRole('region', { name: 'Frequently asked questions' });
  const body = screen.getByRole('article');

  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Frequently asked questions', exact: true }))
    .toHaveAttribute('data-slot', 'accordion-root');
  expect(rootRef.value?.$el).toBe(root);
  await expect
    .element(page.getByRole('article'))
    .toHaveAttribute('data-slot', 'accordion-item-body');
  await expect.element(page.getByRole('article')).toHaveAttribute('data-part', 'item-body');
  expect(bodyRef.value?.$el).toBe(body);
});

test('keeps provider and context composition connected', async () => {
  const RootState = defineComponent({
    setup() {
      const accordion = useAccordionContext();
      const openSecond = () => accordion.value.setValue(['second']);
      return { openSecond };
    },
    template: '<button type="button" @click="openSecond">Open second from context</button>',
  });
  const ItemState = defineComponent({
    setup() {
      return { item: useAccordionItemContext() };
    },
    template: '<span>First item is {{ item.expanded ? "open" : "closed" }}</span>',
  });
  const Harness = defineComponent({
    components: { ...accordionComponents, ItemState, RootState },
    setup() {
      return { accordion: useAccordion({ defaultValue: ['first'] }) };
    },
    template: `
      <AccordionRootProvider :value="accordion">
        <RootState />
        <AccordionItem value="first">
          <AccordionItemTrigger>First item <ItemState /></AccordionItemTrigger>
          <AccordionItemContent><AccordionItemBody>First content</AccordionItemBody></AccordionItemContent>
        </AccordionItem>
        <AccordionItem value="second">
          <AccordionItemTrigger>Second item</AccordionItemTrigger>
          <AccordionItemContent><AccordionItemBody>Second content</AccordionItemBody></AccordionItemContent>
        </AccordionItem>
      </AccordionRootProvider>
    `,
  });

  render(Harness);
  const firstTrigger = screen.getByRole('button', { name: /First item/ });

  await expect.element(page.getByText('First item is open')).toBeAttached();

  await page.getByRole('button', { name: 'Open second from context', exact: true }).click();
  await expect
    .element(page.getByRole('button', { name: 'Second item', exact: true }))
    .toHaveAttribute('aria-expanded', 'true');
  await expect
    .element(page.getByRole('button', { name: /First item/, exact: true }))
    .toHaveAttribute('aria-expanded', 'false');
  await expect.element(page.getByText('First item is closed')).toBeAttached();
  expect(Boolean(firstTrigger.closest('[data-slot="accordion-root-provider"]')?.isConnected)).toBe(
    true,
  );
});

test('hydrates stable hosts and ids and remains interactive', async () => {
  const html = await renderToString(createSSRApp(SsrAccordion));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="accordion-root"]');
  const serverNodes = [...host.querySelectorAll('[data-slot]')];
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  expect(serverRoot).not.toBeNull();
  expect(serverIds.length).toBeGreaterThan(0);
  const app = createSSRApp(SsrAccordion);
  try {
    app.mount(host);
    expect(host.querySelector('[data-slot="accordion-root"]')).toBe(serverRoot);
    expect([...host.querySelectorAll('[data-slot]')]).toEqual(serverNodes);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    await page.getByRole('button', { name: 'Second item', exact: true }).click();
    await expect.element(page.getByText('Second content', { exact: true })).toBeVisible();
  } finally {
    app.unmount();
    host.remove();
  }
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  const App = defineComponent({
    components: accordionComponents,
    template: `
      <Accordion :default-value="['first']">
        <AccordionItem value="first">
          <AccordionItemTrigger>First item</AccordionItemTrigger>
          <AccordionItemContent><AccordionItemBody class="p-0">First content</AccordionItemBody></AccordionItemContent>
        </AccordionItem>
      </Accordion>
    `,
  });

  render(App);
  const body = screen.getByText('First content');
  expect([...body!.classList]).toEqual(expect.arrayContaining(['p-0']));
  expect(body!.classList.contains('p-3')).toBe(false);
  await expect
    .element(page.getByText('First content', { exact: true }))
    .toHaveCSS('padding', '0px');
});