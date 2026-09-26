import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
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

async function focusAndClick(trigger: HTMLElement) {
  trigger.focus();
  await fireEvent.focusIn(trigger);
  await waitFor(() => expect(trigger).toHaveAttribute('data-focus'));
  await fireEvent.click(trigger);
}

test('preserves Ark semantics, Vue refs, anatomy, attrs, and moduix hooks', () => {
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

  expect(root).toHaveAttribute('data-slot', 'accordion-root');
  expect(root).toHaveAttribute('data-scope', 'accordion');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(triggerRef.value?.$el).toBe(trigger);
  expect(trigger).toHaveAttribute('type', 'button');
  expect(trigger).toHaveAttribute('data-slot', 'accordion-item-trigger');
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(trigger).toHaveAttribute('aria-controls', content?.id);
  expect(trigger.querySelector('[data-slot="accordion-item-indicator"] svg')).toBeInTheDocument();
  expect(content).toHaveAttribute('data-slot', 'accordion-item-content');
  expect(content).toHaveAttribute('aria-labelledby', trigger.id);
  expect(bodyRef.value?.$el).toBe(body);
  expect(body).toHaveAttribute('data-part', 'item-body');
  expect(body).toHaveAttribute('data-slot', 'accordion-item-body');
});

test('moves focus between vertical triggers with arrow keys', async () => {
  render(TestAccordion);

  const firstTrigger = screen.getByRole('button', { name: 'First item' });
  const secondTrigger = screen.getByRole('button', { name: 'Second item' });

  firstTrigger.focus();
  await fireEvent.focusIn(firstTrigger);
  await waitFor(() => expect(firstTrigger).toHaveAttribute('data-focus'));
  await fireEvent.keyDown(firstTrigger, { key: 'ArrowDown' });
  await waitFor(() => expect(secondTrigger).toHaveFocus());

  await fireEvent.focusIn(secondTrigger);
  await waitFor(() => expect(secondTrigger).toHaveAttribute('data-focus'));
  await fireEvent.keyDown(secondTrigger, { key: 'ArrowUp' });
  await waitFor(() => expect(firstTrigger).toHaveFocus());

  await fireEvent.keyDown(firstTrigger, { key: 'End' });
  await waitFor(() => expect(secondTrigger).toHaveFocus());
  await fireEvent.keyDown(secondTrigger, { key: 'Home' });
  await waitFor(() => expect(firstTrigger).toHaveFocus());
});

test('keeps Ark value details and ignores disabled items', async () => {
  const values: string[][] = [];
  render(TestAccordion, {
    props: {
      disabled: true,
      onValueChange: (details: { value: string[] }) => values.push(details.value),
    },
  });

  const disabledTrigger = screen.getByRole('button', { name: 'Second item' });
  expect(disabledTrigger).toBeDisabled();
  await fireEvent.click(disabledTrigger);
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
  await focusAndClick(screen.getByRole('button', { name: 'Second item' }));

  await waitFor(() => expect(screen.getByText('Open items: second')).toBeInTheDocument());
  expect(details).toEqual([['second']]);
});

test('mounts lazy content only after its item opens', async () => {
  render(TestAccordion, { props: { lazyMount: true } });

  expect(screen.queryByText('Second content')).not.toBeInTheDocument();
  await focusAndClick(screen.getByRole('button', { name: 'Second item' }));
  await waitFor(() => expect(screen.getByText('Second content')).toBeVisible());
});

test('uses horizontal keyboard navigation', async () => {
  render(TestAccordion, { props: { orientation: 'horizontal' } });

  const firstTrigger = screen.getByRole('button', { name: 'First item' });
  const secondTrigger = screen.getByRole('button', { name: 'Second item' });
  firstTrigger.focus();
  await fireEvent.focusIn(firstTrigger);
  await waitFor(() => expect(firstTrigger).toHaveAttribute('data-focus'));
  await fireEvent.keyDown(firstTrigger, { key: 'ArrowRight' });
  await waitFor(() => expect(secondTrigger).toHaveFocus());
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
  const omittedTrigger = screen.getByRole('button', { name: 'First item' });
  await focusAndClick(omittedTrigger);
  await waitFor(() => expect(omittedTrigger).toHaveAttribute('aria-expanded', 'true'));
  unmount();

  render(TestAccordion, { props: { collapsible: true } });
  const collapsibleTrigger = screen.getByRole('button', { name: 'First item' });
  await focusAndClick(collapsibleTrigger);
  await waitFor(() => expect(collapsibleTrigger).toHaveAttribute('aria-expanded', 'false'));
});

test('preserves semantic hosts and refs with asChild', () => {
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
  expect(root).toHaveAttribute('data-slot', 'accordion-root');
  expect(rootRef.value?.$el).toBe(root);
  expect(body).toHaveAttribute('data-slot', 'accordion-item-body');
  expect(body).toHaveAttribute('data-part', 'item-body');
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
  const secondTrigger = screen.getByRole('button', { name: 'Second item' });
  expect(screen.getByText('First item is open')).toBeInTheDocument();

  await fireEvent.click(screen.getByRole('button', { name: 'Open second from context' }));
  await waitFor(() => expect(secondTrigger).toHaveAttribute('aria-expanded', 'true'));
  expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
  expect(screen.getByText('First item is closed')).toBeInTheDocument();
  expect(firstTrigger.closest('[data-slot="accordion-root-provider"]')).toBeInTheDocument();
});

test('renders the public anatomy on the server', async () => {
  const App = defineComponent({
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

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="accordion-root"');
  expect(html).toContain('data-slot="accordion-item-trigger"');
  expect(html).toContain('aria-expanded="true"');

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