import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { computed, createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Button } from '../src/components/button';
import {
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipBody,
  TooltipContent,
  TooltipContext,
  TooltipDisabledTrigger,
  TooltipPositioner,
  TooltipRootProvider,
  TooltipTrigger,
  useTooltip,
  useTooltipContext,
} from '../src/components/tooltip';

const tooltipComponents = {
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipBody,
  TooltipContent,
  TooltipContext,
  TooltipDisabledTrigger,
  TooltipPositioner,
  TooltipRootProvider,
  TooltipTrigger,
};

test('preserves Ark open-change details and returns focus after Escape', async () => {
  const details: Array<{ open: boolean }> = [];
  const Harness = defineComponent({
    components: tooltipComponents,
    setup() {
      const open = ref(false);
      return { details, open };
    },
    template: `
      <Tooltip
        v-model:open="open"
        :open-delay="0"
        :portalled="false"
        @open-change="details.push($event)"
      >
        <TooltipTrigger>Save</TooltipTrigger>
        <TooltipBody>Save changes</TooltipBody>
      </Tooltip>
    `,
  });

  render(Harness);

  const trigger = screen.getByRole('button', { name: 'Save' });
  trigger.focus();
  await fireEvent.pointerOver(trigger);

  const content = await screen.findByRole('tooltip');
  expect(details).toEqual([{ open: true }]);

  await fireEvent.keyDown(content, { key: 'Escape' });

  await waitFor(() => {
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
  expect(details).toEqual([{ open: true }, { open: false }]);
});

test('renders controlled content and forwards the Body ref to it', async () => {
  const bodyRef = ref<ComponentPublicInstance>();
  const App = defineComponent({
    components: tooltipComponents,
    setup() {
      return { bodyRef };
    },
    template: `
      <Tooltip open>
        <TooltipTrigger>Save</TooltipTrigger>
        <TooltipBody ref="bodyRef">Save changes</TooltipBody>
      </Tooltip>
    `,
  });

  render(App);

  await waitFor(() => {
    expect(screen.getByRole('tooltip')).toHaveTextContent('Save changes');
  });
  expect(bodyRef.value?.$el).toHaveAttribute('data-slot', 'tooltip-content');
});

test('keeps a disabled control discoverable through DisabledTrigger', async () => {
  const App = defineComponent({
    components: { ...tooltipComponents, Button },
    template: `
      <Tooltip :open-delay="0" :portalled="false">
        <TooltipDisabledTrigger aria-label="Create project is unavailable">
          <Button disabled>Create project</Button>
        </TooltipDisabledTrigger>
        <TooltipBody>Projects are unavailable while offline.</TooltipBody>
      </Tooltip>
    `,
  });

  render(App);

  const trigger = screen.getByLabelText('Create project is unavailable');
  expect(trigger).toHaveAttribute('data-slot', 'tooltip-disabled-trigger');
  expect(trigger).toHaveAttribute('tabindex', '0');
  expect(screen.getByRole('button', { name: 'Create project' })).toBeDisabled();

  trigger.focus();
  await expect(screen.findByRole('tooltip')).resolves.toHaveTextContent(
    'Projects are unavailable while offline.',
  );
});

test('preserves the native tabindex spelling and reacts to consumer changes', async () => {
  const tabindex = ref(-1);
  const App = defineComponent({
    components: { ...tooltipComponents, Button },
    setup() {
      return { tabindex };
    },
    template: `
      <Tooltip :portalled="false">
        <TooltipDisabledTrigger :tabindex="tabindex" aria-label="Unavailable action">
          <Button disabled>Save</Button>
        </TooltipDisabledTrigger>
      </Tooltip>
    `,
  });

  render(App);
  const trigger = screen.getByLabelText('Unavailable action');
  expect(trigger).toHaveAttribute('tabindex', '-1');
  tabindex.value = 2;
  await waitFor(() => expect(trigger).toHaveAttribute('tabindex', '2'));
});

test('portals the positioner by default and can render it inline', async () => {
  const Portalled = defineComponent({
    components: tooltipComponents,
    template: `
      <Tooltip open>
        <TooltipTrigger>Save</TooltipTrigger>
        <TooltipBody>Save changes</TooltipBody>
      </Tooltip>
    `,
  });

  const { container, unmount } = render(Portalled);
  const portalledContent = await screen.findByRole('tooltip');
  expect(container).not.toContainElement(portalledContent);
  unmount();

  const Inline = defineComponent({
    components: tooltipComponents,
    template: `
      <Tooltip open :portalled="false">
        <TooltipTrigger>Save</TooltipTrigger>
        <TooltipBody>Save changes</TooltipBody>
      </Tooltip>
    `,
  });

  const inlineTooltip = render(Inline);
  const inlineContent = await screen.findByRole('tooltip');
  expect(inlineTooltip.container).toContainElement(inlineContent);
});

test('renders the moduix arrow tip when TooltipArrow has no child', async () => {
  const App = defineComponent({
    components: tooltipComponents,
    template: `
      <Tooltip open :portalled="false">
        <TooltipTrigger>Save</TooltipTrigger>
        <TooltipBody>
          <TooltipArrow />
          Save changes
        </TooltipBody>
      </Tooltip>
    `,
  });

  render(App);
  await screen.findByRole('tooltip');
  expect(document.querySelector('[data-slot="tooltip-arrow-tip"]')).toBeInTheDocument();
});

test('keeps RootProvider state available through the moduix context hook', async () => {
  const ContextValue = defineComponent({
    setup() {
      const tooltip = useTooltipContext();
      return { open: computed(() => tooltip.value.open) };
    },
    template: '<output>{{ open ? "open" : "closed" }}</output>',
  });
  const ProviderTooltip = defineComponent({
    components: { ...tooltipComponents, ContextValue },
    setup() {
      return { tooltip: useTooltip({ openDelay: 0 }) };
    },
    template: `
      <TooltipRootProvider :value="tooltip" :portalled="false">
        <TooltipTrigger>Save</TooltipTrigger>
        <TooltipBody>Save changes</TooltipBody>
        <ContextValue />
      </TooltipRootProvider>
    `,
  });

  render(ProviderTooltip);
  const trigger = screen.getByRole('button', { name: 'Save' });
  trigger.focus();
  await waitFor(() => expect(screen.getByText('open')).toBeVisible());
});

test('exposes the current state through the TooltipContext slot', () => {
  const App = defineComponent({
    components: tooltipComponents,
    template:
      '<Tooltip default-open :portalled="false"><TooltipTrigger>Save</TooltipTrigger><TooltipContext v-slot="context"><output>Open slot: {{ String(context.open) }}</output></TooltipContext></Tooltip>',
  });

  render(App);
  expect(screen.getByText('Open slot: true')).toBeInTheDocument();
});

test('reports the active value when moving between triggers', async () => {
  const Harness = defineComponent({
    components: tooltipComponents,
    setup() {
      const value = ref('');
      return { value };
    },
    template: `
      <output>{{ value }}</output>
      <Tooltip
        :open-delay="0"
        :portalled="false"
        @trigger-value-change="value = $event.value ?? ''"
      >
        <TooltipTrigger value="save">Save</TooltipTrigger>
        <TooltipTrigger value="share">Share</TooltipTrigger>
        <TooltipBody>Action tooltip</TooltipBody>
      </Tooltip>
    `,
  });

  render(Harness);
  await fireEvent.pointerOver(screen.getByRole('button', { name: 'Share' }));
  await waitFor(() => expect(screen.getByText('share')).toBeVisible());
});

test('forwards refs on native parts and keeps asChild composition native', () => {
  const triggerRef = ref<ComponentPublicInstance>();
  const disabledTriggerRef = ref<ComponentPublicInstance>();
  const bodyRef = ref<ComponentPublicInstance>();
  const positionerRef = ref<ComponentPublicInstance>();
  const contentRef = ref<ComponentPublicInstance>();
  const arrowRef = ref<ComponentPublicInstance>();
  const arrowTipRef = ref<ComponentPublicInstance>();
  const composedTriggerRef = ref<ComponentPublicInstance>();
  const App = defineComponent({
    components: { ...tooltipComponents, Button },
    setup() {
      return {
        arrowRef,
        arrowTipRef,
        bodyRef,
        composedTriggerRef,
        contentRef,
        disabledTriggerRef,
        positionerRef,
        triggerRef,
      };
    },
    template: `
      <Tooltip open :portalled="false">
        <TooltipTrigger ref="triggerRef">Save</TooltipTrigger>
        <TooltipTrigger ref="composedTriggerRef" as-child aria-label="Composed save">
          <a href="#save">Composed save</a>
        </TooltipTrigger>
        <TooltipDisabledTrigger ref="disabledTriggerRef" aria-label="Disabled save">
          <Button disabled>Disabled save</Button>
        </TooltipDisabledTrigger>
        <TooltipBody ref="bodyRef">Body ref</TooltipBody>
        <TooltipPositioner ref="positionerRef">
          <TooltipContent ref="contentRef">
            <TooltipArrow ref="arrowRef">
              <TooltipArrowTip ref="arrowTipRef" />
            </TooltipArrow>
            Explicit content
          </TooltipContent>
        </TooltipPositioner>
      </Tooltip>
    `,
  });

  render(App);

  expect(triggerRef.value?.$el).toHaveAttribute('data-slot', 'tooltip-trigger');
  expect(disabledTriggerRef.value?.$el).toHaveAttribute('data-slot', 'tooltip-disabled-trigger');
  expect(bodyRef.value?.$el).toHaveAttribute('data-slot', 'tooltip-content');
  expect(positionerRef.value?.$el).toHaveAttribute('data-slot', 'tooltip-positioner');
  expect(contentRef.value?.$el).toHaveAttribute('data-slot', 'tooltip-content');
  expect(arrowRef.value?.$el).toHaveAttribute('data-slot', 'tooltip-arrow');
  expect(arrowTipRef.value?.$el).toHaveAttribute('data-slot', 'tooltip-arrow-tip');
  expect(composedTriggerRef.value?.$el).toHaveAttribute('href', '#save');
});

test('forwards attrs, styles, listeners and refs to every asChild host', async () => {
  const arrowTipRef = ref<ComponentPublicInstance>();
  const bodyRef = ref<ComponentPublicInstance>();
  const calls: string[] = [];
  const App = defineComponent({
    components: tooltipComponents,
    setup() {
      return { arrowTipRef, bodyRef, calls };
    },
    template: `
      <Tooltip open :portalled="false">
        <TooltipTrigger as-child class="consumer-trigger" @click="calls.push('trigger')">
          <a href="#save" data-testid="custom-trigger">Save</a>
        </TooltipTrigger>
        <TooltipPositioner as-child data-testid="custom-positioner">
          <section>
            <TooltipContent as-child class="consumer-content" :style="{ color: 'red' }">
              <article data-testid="custom-content">
                <TooltipArrow as-child>
                  <aside data-testid="custom-arrow">
                    <TooltipArrowTip ref="arrowTipRef" as-child class="consumer-tip">
                      <span data-testid="custom-tip">Custom tip</span>
                    </TooltipArrowTip>
                  </aside>
                </TooltipArrow>
                Save changes
              </article>
            </TooltipContent>
          </section>
        </TooltipPositioner>
        <TooltipBody ref="bodyRef" as-child data-testid="custom-body"><p>Body host</p></TooltipBody>
      </Tooltip>
    `,
  });

  render(App);
  const trigger = screen.getByTestId('custom-trigger');
  const positioner = screen.getByTestId('custom-positioner');
  const content = screen.getByTestId('custom-content');
  const arrow = screen.getByTestId('custom-arrow');
  const tip = screen.getByTestId('custom-tip');
  const body = screen.getByTestId('custom-body');
  expect(trigger.tagName).toBe('A');
  expect(trigger).toHaveClass('consumer-trigger');
  expect(positioner.tagName).toBe('SECTION');
  expect(positioner).toHaveAttribute('data-slot', 'tooltip-positioner');
  expect(content.tagName).toBe('ARTICLE');
  expect(content).toHaveClass('consumer-content');
  expect(content).toHaveStyle({ color: 'red' });
  expect(content).toHaveAttribute('role', 'tooltip');
  expect(arrow.tagName).toBe('ASIDE');
  expect(arrow).toHaveAttribute('data-slot', 'tooltip-arrow');
  expect(tip.tagName).toBe('SPAN');
  expect(tip).toHaveClass('consumer-tip');
  expect(tip).toHaveAttribute('data-slot', 'tooltip-arrow-tip');
  expect(arrowTipRef.value?.$el).toBe(tip);
  expect(body.tagName).toBe('P');
  expect(bodyRef.value?.$el).toBe(body);
  expect(body.parentElement).toHaveAttribute('data-slot', 'tooltip-positioner');
  await fireEvent.click(trigger);
  expect(calls).toEqual(['trigger']);
});

test('preserves lazy mounting, retained content and explicit eager presence', async () => {
  const App = defineComponent({
    components: tooltipComponents,
    setup() {
      return { open: ref(false), retain: ref(false) };
    },
    template: `
      <button @click="open = !open">Change open</button>
      <button @click="retain = true">Retain content</button>
      <Tooltip v-model:open="open" :unmount-on-exit="!retain" :portalled="false">
        <TooltipTrigger>Save</TooltipTrigger>
        <TooltipBody data-testid="content">Save changes</TooltipBody>
      </Tooltip>
      <Tooltip :lazy-mount="false" :unmount-on-exit="false" :portalled="false">
        <TooltipTrigger>Eager</TooltipTrigger>
        <TooltipBody data-testid="eager">Eager content</TooltipBody>
      </Tooltip>
    `,
  });

  render(App);
  expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  expect(screen.getByTestId('eager')).not.toBeVisible();
  const toggle = screen.getByRole('button', { name: 'Change open' });
  await fireEvent.click(toggle);
  const firstContent = await screen.findByTestId('content');
  expect(firstContent).toBeVisible();
  await fireEvent.click(toggle);
  await waitFor(() => expect(screen.queryByTestId('content')).not.toBeInTheDocument());
  await fireEvent.click(screen.getByRole('button', { name: 'Retain content' }));
  await fireEvent.click(toggle);
  const retainedContent = await screen.findByTestId('content');
  expect(retainedContent).not.toBe(firstContent);
  await fireEvent.click(toggle);
  await waitFor(() => expect(retainedContent).not.toBeVisible());
  expect(screen.getByTestId('content')).toBe(retainedContent);
});

test('keeps trigger-value models, complete details and accessible descriptions connected', async () => {
  const details: Array<{ value: string | null }> = [];
  const App = defineComponent({
    components: tooltipComponents,
    setup() {
      return { details, value: ref<string | null>(null) };
    },
    template: `
      <output>{{ value }}</output>
      <Tooltip v-model:trigger-value="value" :open-delay="0" :portalled="false"
        @trigger-value-change="details.push($event)">
        <TooltipTrigger value="save">Save</TooltipTrigger>
        <TooltipTrigger value="share">Share</TooltipTrigger>
        <TooltipBody>Action hint</TooltipBody>
      </Tooltip>
    `,
  });

  render(App);
  const save = screen.getByRole('button', { name: 'Save' });
  const share = screen.getByRole('button', { name: 'Share' });
  await fireEvent.pointerOver(save);
  const content = await screen.findByRole('tooltip');
  await waitFor(() => expect(save).toHaveAttribute('aria-describedby', content.id));
  expect(details).toEqual([{ value: 'save', triggerElement: save }]);
  await fireEvent.pointerMove(share);
  await waitFor(() => expect(screen.getByText('share')).toBeVisible());
  expect(screen.getByRole('tooltip')).toBe(content);
  expect(details).toEqual([
    { value: 'save', triggerElement: save },
    { value: 'share', triggerElement: share },
  ]);
  expect(share).toHaveAttribute('aria-describedby', content.id);
});

test('supports reactive custom portal targets through RootProvider', async () => {
  const first = document.createElement('div');
  const second = document.createElement('div');
  document.body.append(first, second);
  const target = ref(first);
  const App = defineComponent({
    components: tooltipComponents,
    setup() {
      const tooltip = useTooltip({ defaultOpen: true });
      return { target, tooltip };
    },
    template: `
      <TooltipRootProvider :value="tooltip" :portal-ref="() => target">
        <TooltipTrigger>Save</TooltipTrigger>
        <TooltipBody>Save changes</TooltipBody>
      </TooltipRootProvider>
    `,
  });

  const { container, unmount } = render(App);
  try {
    const content = await screen.findByRole('tooltip');
    expect(first).toContainElement(content);
    expect(container).not.toContainElement(content);
    target.value = second;
    await waitFor(() => expect(second).toContainElement(content));
    expect(first).not.toContainElement(content);
  } finally {
    unmount();
    first.remove();
    second.remove();
  }
});

test('renders and hydrates inline and portalled anatomy without replacing server nodes', async () => {
  const App = defineComponent({
    components: tooltipComponents,
    template: `
      <Tooltip default-open :portalled="false">
        <TooltipTrigger>Inline save</TooltipTrigger>
        <TooltipBody><TooltipArrow />Inline hint</TooltipBody>
      </Tooltip>
      <Tooltip default-open>
        <TooltipTrigger>Portalled save</TooltipTrigger>
        <TooltipBody><TooltipArrow />Portalled hint</TooltipBody>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>Closed save</TooltipTrigger>
        <TooltipBody>Closed hint</TooltipBody>
      </Tooltip>
    `,
  });

  const context: { teleports?: Record<string, string> } = {};
  const html = await renderToString(createSSRApp(App), context);
  expect(html).toContain('data-slot="tooltip-trigger"');
  expect(html).toContain('data-slot="tooltip-content"');

  const host = document.createElement('div');
  host.innerHTML = html;
  const teleportHost = document.createElement('div');
  teleportHost.innerHTML = context.teleports?.body ?? '';
  const teleportNodes = [...teleportHost.childNodes];
  document.body.prepend(...teleportNodes);
  document.body.append(host);
  const parts = [...document.querySelectorAll('[data-scope="tooltip"]')];
  const serverIds = parts.map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(App);
  try {
    app.mount(host);
    await nextTick();
    const hydratedParts = [...document.querySelectorAll('[data-scope="tooltip"]')];
    expect(hydratedParts.map((element) => element.id)).toEqual(serverIds);
    hydratedParts.forEach((element, index) => expect(element).toBe(parts[index]));
    expect(screen.getAllByRole('tooltip')).toHaveLength(2);
    expect(screen.queryByText('Closed hint')).not.toBeInTheDocument();
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    warn.mockRestore();
    error.mockRestore();
    app.unmount();
    host.remove();
    for (const node of teleportNodes) node.remove();
  }
});