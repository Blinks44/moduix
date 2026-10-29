import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { computed, defineComponent, ref } from 'vue';
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
} from '@/index';

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