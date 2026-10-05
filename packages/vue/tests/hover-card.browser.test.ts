import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { computed, createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  HoverCard,
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardBody,
  HoverCardContent,
  HoverCardContext,
  HoverCardPositioner,
  HoverCardRootProvider,
  HoverCardTrigger,
  useHoverCard,
  useHoverCardContext,
} from '../src';
import TestHoverCard from './fixtures/TestHoverCard.vue';

const hoverCardComponents = {
  HoverCard,
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardBody,
  HoverCardContent,
  HoverCardContext,
  HoverCardPositioner,
  HoverCardRootProvider,
  HoverCardTrigger,
};

const HoverCardSurface = defineComponent({
  components: hoverCardComponents,
  template: `
    <HoverCardPositioner>
      <HoverCardContent data-testid="content">
        <HoverCardArrow />
        <HoverCardBody>Profile details</HoverCardBody>
      </HoverCardContent>
    </HoverCardPositioner>
  `,
});

test('opens from a focused trigger, forwards Vue events, and preserves Ark state', async () => {
  const events: boolean[] = [];
  const Harness = defineComponent({
    components: { ...hoverCardComponents, HoverCardSurface },
    setup() {
      const open = ref(false);
      return { events, open };
    },
    template: `
      <output>{{ open ? 'open' : 'closed' }}</output>
      <HoverCard
        v-model:open="open"
        :open-delay="0"
        :portalled="false"
        @open-change="events.push($event.open)"
      >
        <HoverCardTrigger>Profile</HoverCardTrigger>
        <HoverCardSurface />
      </HoverCard>
    `,
  });

  render(Harness);

  await page.getByRole('button', { name: 'Profile' }).focus();

  await expect.element(page.getByText('open', { exact: true })).toBeVisible();
  await expect.element(page.getByTestId('content')).toHaveAttribute('data-state', 'open');
  expect(events).toEqual([true]);
});

test('keeps disabled and default lazy mounting behavior', async () => {
  const Disabled = defineComponent({
    components: { ...hoverCardComponents, HoverCardSurface },
    template: `
      <HoverCard disabled :open-delay="0" :portalled="false">
        <HoverCardTrigger>Profile</HoverCardTrigger>
        <HoverCardSurface />
      </HoverCard>
    `,
  });

  render(Disabled);
  await page.getByRole('button', { name: 'Profile' }).focus();
  await expect.element(page.getByTestId('content')).toHaveCount(0);

  const Closed = defineComponent({
    components: { ...hoverCardComponents, HoverCardSurface },
    template: `
      <HoverCard :portalled="false">
        <HoverCardTrigger>Closed card</HoverCardTrigger>
        <HoverCardSurface />
      </HoverCard>
    `,
  });

  render(Closed);
  await expect.element(page.getByTestId('content')).toHaveCount(0);
});

test('portals the positioner by default and supports a custom target or inline mode', async () => {
  const target = document.createElement('div');
  document.body.append(target);
  const Portalled = defineComponent({
    components: { ...hoverCardComponents, HoverCardSurface },
    setup() {
      return { target };
    },
    template: `
      <HoverCard open :portal-ref="target">
        <HoverCardTrigger>Profile</HoverCardTrigger>
        <HoverCardSurface />
      </HoverCard>
    `,
  });

  const { container, unmount } = render(Portalled);
  await expect.element(page.getByTestId('content')).toBeVisible();
  expect(container.querySelector('[data-testid="content"]')).toBeNull();
  expect(target.contains(document.querySelector('[data-testid="content"]'))).toBe(true);

  unmount();
  target.remove();

  const Inline = defineComponent({
    components: { ...hoverCardComponents, HoverCardSurface },
    template: `
      <HoverCard open :portalled="false">
        <HoverCardTrigger>Profile</HoverCardTrigger>
        <HoverCardSurface />
      </HoverCard>
    `,
  });

  const inline = render(Inline);
  await expect.element(page.getByTestId('content')).toBeVisible();
  const content = document.querySelector('[data-testid="content"]')!;
  expect(inline.container.contains(content)).toBe(true);
  await expect.element(page.locator('[data-slot="hover-card-arrow-tip"]')).toBeAttached();
  await expect.element(page.locator('[data-slot="hover-card-body"]')).toBeAttached();
  expect(document.querySelector('[data-slot="hover-card-arrow"]')?.parentElement).toBe(content);
});

test('keeps RootProvider state and Context slot composition connected', async () => {
  const ContextValue = defineComponent({
    components: { HoverCardContext },
    setup() {
      const hoverCard = useHoverCardContext();
      return { open: computed(() => hoverCard.value.open) };
    },
    template: '<output>Hook: {{ open ? "open" : "closed" }}</output>',
  });
  const ProviderHoverCard = defineComponent({
    components: { ...hoverCardComponents, ContextValue, HoverCardSurface },
    setup() {
      return { hoverCard: useHoverCard({ openDelay: 0 }) };
    },
    template: `
      <HoverCardRootProvider :value="hoverCard" :portalled="false">
        <HoverCardContext v-slot="context">
          <output>Slot: {{ context.open ? 'open' : 'closed' }}</output>
        </HoverCardContext>
        <HoverCardTrigger>Profile</HoverCardTrigger>
        <HoverCardSurface />
        <ContextValue />
      </HoverCardRootProvider>
    `,
  });

  render(ProviderHoverCard);
  await page.getByRole('button', { name: 'Profile' }).focus();

  await expect.element(page.getByText('Slot: open')).toBeVisible();
  await expect.element(page.getByText('Hook: open')).toBeVisible();
});

test('reports the active value when moving between triggers', async () => {
  const Harness = defineComponent({
    components: { ...hoverCardComponents, HoverCardSurface },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `
      <output>{{ value }}</output>
      <HoverCard
        :open-delay="0"
        :portalled="false"
        @trigger-value-change="value = $event.value ?? ''"
      >
        <HoverCardTrigger value="sarah">Sarah</HoverCardTrigger>
        <HoverCardTrigger value="alex">Alex</HoverCardTrigger>
        <HoverCardSurface />
      </HoverCard>
    `,
  });

  render(Harness);
  await page.getByRole('button', { name: 'Alex' }).focus();
  await expect.element(page.getByText('alex', { exact: true })).toBeVisible();
  await expect.element(page.getByTestId('content')).toBeVisible();
  await page.getByRole('button', { name: 'Sarah' }).hover();
  await expect.element(page.getByText('sarah', { exact: true })).toBeVisible();
  await expect.element(page.getByTestId('content')).toBeVisible();
});

test('forwards refs, attrs, classes, and semantic asChild hosts', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const triggerRef = ref<ComponentPublicInstance>();
  const positionerRef = ref<ComponentPublicInstance>();
  const contentRef = ref<ComponentPublicInstance>();
  const arrowRef = ref<ComponentPublicInstance>();
  const arrowTipRef = ref<ComponentPublicInstance>();
  const bodyRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: hoverCardComponents,
    setup() {
      return { arrowRef, arrowTipRef, bodyRef, contentRef, positionerRef, rootRef, triggerRef };
    },
    template: `
      <HoverCard ref="rootRef" open :portalled="false">
        <HoverCardTrigger ref="triggerRef" class="trigger-class">Profile</HoverCardTrigger>
        <HoverCardTrigger as-child><a href="/profile">Composed profile</a></HoverCardTrigger>
        <HoverCardPositioner ref="positionerRef" class="positioner-class">
          <HoverCardContent ref="contentRef" class="content-class" data-testid="content">
            <HoverCardArrow ref="arrowRef" class="arrow-class">
              <HoverCardArrowTip ref="arrowTipRef" class="tip-class" />
            </HoverCardArrow>
            <HoverCardBody ref="bodyRef" class="body-class">Profile details</HoverCardBody>
          </HoverCardContent>
        </HoverCardPositioner>
      </HoverCard>
    `,
  });

  render(Harness);

  const trigger = document.querySelector('button[data-slot="hover-card-trigger"]')!;
  const composedTrigger = page.getByRole('link', { name: 'Composed profile' });
  const content = document.querySelector('[data-testid="content"]')!;
  expect(rootRef.value?.$el).toBeTruthy();
  expect(triggerRef.value?.$el).toBe(trigger);
  expect(positionerRef.value?.$el?.getAttribute('data-slot')).toBe('hover-card-positioner');
  expect(contentRef.value?.$el).toBe(content);
  expect(arrowRef.value?.$el?.getAttribute('data-slot')).toBe('hover-card-arrow');
  expect(arrowTipRef.value?.$el?.getAttribute('data-slot')).toBe('hover-card-arrow-tip');
  expect(bodyRef.value?.$el?.getAttribute('data-slot')).toBe('hover-card-body');
  await expect.element(composedTrigger).toHaveAttribute('data-slot', 'hover-card-trigger');
  expect(Array.from(trigger.classList)).toContain('trigger-class');
  expect(Array.from(positionerRef.value?.$el.classList)).toContain('positioner-class');
  expect(Array.from(content.classList)).toContain('content-class');
  expect(Array.from(arrowRef.value?.$el.classList)).toContain('arrow-class');
  expect(Array.from(arrowTipRef.value?.$el.classList)).toContain('tip-class');
  expect(Array.from(bodyRef.value?.$el.classList)).toContain('body-class');
});

test('hydrates without replacing hosts or generated IDs and remains interactive', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestHoverCard));
  document.body.append(host);
  const trigger = host.querySelector('[data-slot="hover-card-trigger"]')!;
  const content = host.querySelector('[data-slot="hover-card-content"]')!;
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(TestHoverCard);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  try {
    app.mount(host);
    expect(host.querySelector('[data-slot="hover-card-trigger"]')).toBe(trigger);
    expect(host.querySelector('[data-slot="hover-card-content"]')).toBe(content);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    await expect.element(page.getByText('Profile details')).toBeVisible();
    await page.getByRole('button', { name: 'Outside' }).click();
    await expect.element(page.locator('[data-slot="hover-card-content"]')).toHaveCount(0);
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});