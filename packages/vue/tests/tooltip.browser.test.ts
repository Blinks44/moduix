import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { computed, createSSRApp, defineComponent, ref } from 'vue';
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
import TestTooltip from './fixtures/TestTooltip.vue';

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

test('preserves Ark open-change details and keeps trigger focus after Escape', async () => {
  const details: Array<{ open: boolean }> = [];
  const Harness = defineComponent({
    components: tooltipComponents,
    setup() {
      return { details, open: ref(false) };
    },
    template: `
      <Tooltip v-model:open="open" :open-delay="0" :portalled="false"
        @open-change="details.push($event)">
        <TooltipTrigger>Save</TooltipTrigger>
        <TooltipBody>Save changes</TooltipBody>
      </Tooltip>
    `,
  });
  render(Harness);
  const trigger = page.getByRole('button', { name: 'Save' });
  await trigger.focus();
  await trigger.hover();
  await expect.element(page.getByRole('tooltip')).toHaveText('Save changes');
  expect(details).toEqual([{ open: true }]);
  await trigger.press('Escape');
  await expect.element(page.getByRole('tooltip')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
  expect(details).toEqual([{ open: true }, { open: false }]);
});

test('keeps a disabled control keyboard discoverable and reacts to native tabindex changes', async () => {
  const tabindex = ref<number>();
  const App = defineComponent({
    components: { ...tooltipComponents, Button },
    setup() {
      return { tabindex };
    },
    template: `
      <button>Before tooltip</button>
      <Tooltip :open-delay="0" :portalled="false">
        <TooltipDisabledTrigger :tabindex="tabindex" aria-label="Create project is unavailable">
          <Button disabled>Create project</Button>
        </TooltipDisabledTrigger>
        <TooltipBody>Projects are unavailable while offline.</TooltipBody>
      </Tooltip>
    `,
  });
  render(App);
  const trigger = page.getByLabel('Create project is unavailable');
  await expect.element(trigger).toHaveAttribute('data-slot', 'tooltip-disabled-trigger');
  await expect.element(trigger).toHaveAttribute('tabindex', '0');
  await expect.element(page.getByRole('button', { name: 'Create project' })).toBeDisabled();
  await page.getByRole('button', { name: 'Before tooltip' }).press('Tab');
  await expect.element(trigger).toBeFocused();
  await expect
    .element(page.getByRole('tooltip'))
    .toHaveText('Projects are unavailable while offline.');
  tabindex.value = -1;
  await expect.element(trigger).toHaveAttribute('tabindex', '-1');
  tabindex.value = 2;
  await expect.element(trigger).toHaveAttribute('tabindex', '2');
});

test('preserves Body content/ref, default portal, inline rendering and fallback arrow', async () => {
  const bodyRef = ref<ComponentPublicInstance>();
  const Portalled = defineComponent({
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
  const { container, unmount } = render(Portalled);
  await expect.element(page.getByRole('tooltip')).toHaveText('Save changes');
  const portalledContent = document.querySelector('[role="tooltip"]');
  expect(container.contains(portalledContent)).toBe(false);
  expect(bodyRef.value?.$el).toBe(portalledContent);
  expect(bodyRef.value?.$el.getAttribute('data-slot')).toBe('tooltip-content');
  unmount();

  const Inline = defineComponent({
    components: tooltipComponents,
    template: `
      <Tooltip open :portalled="false">
        <TooltipTrigger>Save</TooltipTrigger>
        <TooltipBody><TooltipArrow />Save changes</TooltipBody>
      </Tooltip>
    `,
  });
  const inline = render(Inline);
  await expect.element(page.getByRole('tooltip')).toHaveText('Save changes');
  expect(inline.container.contains(document.querySelector('[role="tooltip"]'))).toBe(true);
  await expect.element(page.locator('[data-slot="tooltip-arrow-tip"]')).toHaveCount(1);
});

test('keeps provider state reactive through the context hook and slot', async () => {
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
      <button>Before tooltip</button>
      <TooltipRootProvider :value="tooltip" :portalled="false">
        <TooltipTrigger>Save</TooltipTrigger>
        <TooltipBody>Save changes</TooltipBody>
        <ContextValue />
        <TooltipContext v-slot="context"><output>Open slot: {{ String(context.open) }}</output></TooltipContext>
      </TooltipRootProvider>
    `,
  });
  render(ProviderTooltip);
  await expect.element(page.getByText('closed', { exact: true })).toBeVisible();
  await expect.element(page.getByText('Open slot: false')).toBeVisible();
  await page.getByRole('button', { name: 'Before tooltip' }).press('Tab');
  await expect.element(page.getByRole('button', { name: 'Save' })).toBeFocused();
  await expect.element(page.getByText('open', { exact: true })).toBeVisible();
  await expect.element(page.getByText('Open slot: true')).toBeVisible();
  await expect.element(page.getByRole('tooltip')).toHaveText('Save changes');
});

test('forwards refs on native parts and keeps asChild composition native', () => {
  const triggerRef = ref<ComponentPublicInstance>();
  const disabledTriggerRef = ref<ComponentPublicInstance>();
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
        <TooltipPositioner ref="positionerRef">
          <TooltipContent ref="contentRef">
            <TooltipArrow ref="arrowRef"><TooltipArrowTip ref="arrowTipRef" /></TooltipArrow>
            Explicit content
          </TooltipContent>
        </TooltipPositioner>
      </Tooltip>
    `,
  });
  render(App);
  expect(triggerRef.value?.$el.getAttribute('data-slot')).toBe('tooltip-trigger');
  expect(disabledTriggerRef.value?.$el.getAttribute('data-slot')).toBe('tooltip-disabled-trigger');
  expect(positionerRef.value?.$el.getAttribute('data-slot')).toBe('tooltip-positioner');
  expect(contentRef.value?.$el.getAttribute('data-slot')).toBe('tooltip-content');
  expect(arrowRef.value?.$el.getAttribute('data-slot')).toBe('tooltip-arrow');
  expect(arrowTipRef.value?.$el.getAttribute('data-slot')).toBe('tooltip-arrow-tip');
  expect(composedTriggerRef.value?.$el.getAttribute('href')).toBe('#save');
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
      </Tooltip>
      <Tooltip open :portalled="false">
        <TooltipTrigger>Body hint</TooltipTrigger>
        <TooltipBody ref="bodyRef" as-child data-testid="custom-body"><p>Body host</p></TooltipBody>
      </Tooltip>
    `,
  });
  render(App);
  const trigger = document.querySelector('[data-testid="custom-trigger"]')!;
  const positioner = document.querySelector('[data-testid="custom-positioner"]')!;
  const content = document.querySelector('[data-testid="custom-content"]')!;
  const arrow = document.querySelector('[data-testid="custom-arrow"]')!;
  const tip = document.querySelector('[data-testid="custom-tip"]')!;
  const body = document.querySelector('[data-testid="custom-body"]')!;
  expect(trigger.tagName).toBe('A');
  expect([...trigger.classList]).toContain('consumer-trigger');
  expect(positioner.tagName).toBe('SECTION');
  expect(positioner.getAttribute('data-slot')).toBe('tooltip-positioner');
  expect(content.tagName).toBe('ARTICLE');
  expect([...content.classList]).toContain('consumer-content');
  await expect.element(page.getByTestId('custom-content')).toHaveCSS('color', 'rgb(255, 0, 0)');
  expect(content.getAttribute('role')).toBe('tooltip');
  expect(arrow.tagName).toBe('ASIDE');
  expect(arrow.getAttribute('data-slot')).toBe('tooltip-arrow');
  expect(tip.tagName).toBe('SPAN');
  expect([...tip.classList]).toContain('consumer-tip');
  expect(tip.getAttribute('data-slot')).toBe('tooltip-arrow-tip');
  expect(arrowTipRef.value?.$el).toBe(tip);
  expect(body.tagName).toBe('P');
  expect(bodyRef.value?.$el).toBe(body);
  expect(body.parentElement?.getAttribute('data-slot')).toBe('tooltip-positioner');
  await page.getByTestId('custom-trigger').click();
  expect(calls).toEqual(['trigger']);
});

test('preserves lazy mounting, retained content and explicit eager presence', async () => {
  const App = defineComponent({
    components: tooltipComponents,
    setup() {
      return { open: ref(false), retain: ref(false) };
    },
    template: `
      <button @click="open = true">Open hint</button>
      <button @click="open = false">Close hint</button>
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
  const content = page.getByTestId('content');
  await expect.element(content).toHaveCount(0);
  await expect.element(page.getByTestId('eager')).not.toBeVisible();
  await page.getByRole('button', { name: 'Open hint' }).click();
  await expect.element(content).toBeVisible();
  const firstContent = document.querySelector('[data-testid="content"]');
  await page.getByRole('button', { name: 'Close hint' }).click();
  await expect.element(content).toHaveCount(0);
  await page.getByRole('button', { name: 'Retain content' }).click();
  await page.getByRole('button', { name: 'Open hint' }).click();
  await expect.element(content).toBeVisible();
  const retainedContent = document.querySelector('[data-testid="content"]');
  expect(retainedContent).not.toBe(firstContent);
  await page.getByRole('button', { name: 'Close hint' }).click();
  await expect.element(content).not.toBeVisible();
  expect(document.querySelector('[data-testid="content"]')).toBe(retainedContent);
});

test('keeps trigger-value models, complete details and accessible descriptions connected', async () => {
  // Park the pointer before mounting triggers so only deliberate hovers emit callbacks.
  render(defineComponent({ template: '<button>Before tooltip</button>' }));
  await page.getByRole('button', { name: 'Before tooltip' }).hover();
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
  const save = document.querySelector('[data-value="save"]');
  const share = document.querySelector('[data-value="share"]');
  await page.getByRole('button', { name: 'Save' }).hover();
  await expect.element(page.getByRole('tooltip')).toBeVisible();
  const content = document.querySelector('[role="tooltip"]')!;
  await expect
    .element(page.getByRole('button', { name: 'Save' }))
    .toHaveAttribute('aria-describedby', content.id);
  expect(details).toEqual([{ value: 'save', triggerElement: save }]);
  await page.getByRole('button', { name: 'Share' }).hover();
  await expect.element(page.getByText('share', { exact: true })).toBeVisible();
  expect(document.querySelector('[role="tooltip"]')).toBe(content);
  expect(details).toEqual([
    { value: 'save', triggerElement: save },
    { value: 'share', triggerElement: share },
  ]);
  await expect
    .element(page.getByRole('button', { name: 'Share' }))
    .toHaveAttribute('aria-describedby', content.id);
});

test('supports reactive custom portal targets through RootProvider', async () => {
  const first = document.createElement('div');
  const second = document.createElement('div');
  document.body.append(first, second);
  const target = ref(first);
  const App = defineComponent({
    components: tooltipComponents,
    setup() {
      return { target, tooltip: useTooltip({ defaultOpen: true }) };
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
    await expect.element(page.getByRole('tooltip')).toHaveText('Save changes');
    const content = document.querySelector('[role="tooltip"]');
    expect(first.contains(content)).toBe(true);
    expect(container.contains(content)).toBe(false);
    target.value = second;
    await expect.poll(() => second.contains(content)).toBe(true);
    expect(first.contains(content)).toBe(false);
  } finally {
    unmount();
    first.remove();
    second.remove();
  }
});

test('hydrates inline and portalled anatomy without replacing server nodes', async () => {
  const context: { teleports?: Record<string, string> } = {};
  const html = await renderToString(createSSRApp(TestTooltip), context);
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
  const app = createSSRApp(TestTooltip);
  try {
    app.mount(host);
    await expect.element(page.getByRole('tooltip')).toHaveCount(2);
    const hydratedParts = [...document.querySelectorAll('[data-scope="tooltip"]')];
    expect(hydratedParts.map((element) => element.id)).toEqual(serverIds);
    hydratedParts.forEach((element, index) => expect(element).toBe(parts[index]));
    await expect.element(page.getByText('Closed hint')).toHaveCount(0);
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
    const trigger = page.getByRole('button', { name: 'Closed save' });
    await trigger.hover();
    await expect.element(page.getByText('Closed hint')).toBeVisible();
    await trigger.press('Escape');
    await expect.element(page.getByText('Closed hint')).toHaveCount(0);
  } finally {
    app.unmount();
    host.remove();
    for (const node of teleportNodes) node.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});