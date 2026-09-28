import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
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
  await fireEvent.focusIn(screen.getByRole('button', { name: 'Profile' }));
  await waitFor(() => expect(screen.getByText('open')).toBeVisible());
  expect(await screen.findByTestId('content')).toHaveAttribute('data-state', 'open');
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
  await fireEvent.focusIn(screen.getByRole('button', { name: 'Profile' }));
  expect(screen.queryByTestId('content')).not.toBeInTheDocument();

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
  expect(screen.queryByTestId('content')).not.toBeInTheDocument();
});

test('portals the positioner by default and supports a custom target or inline mode', () => {
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
  expect(container).not.toContainElement(screen.getByTestId('content'));
  expect(target).toContainElement(screen.getByTestId('content'));
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
  expect(inline.container).toContainElement(screen.getByTestId('content'));
});

test('renders the moduix arrow tip and preserves the explicit anatomy', () => {
  const App = defineComponent({
    components: hoverCardComponents,
    template: `
      <HoverCard open :portalled="false">
        <HoverCardTrigger>Profile</HoverCardTrigger>
        <HoverCardPositioner>
          <HoverCardContent data-testid="content">
            <HoverCardArrow />
            <HoverCardBody>Profile details</HoverCardBody>
          </HoverCardContent>
        </HoverCardPositioner>
      </HoverCard>
    `,
  });
  render(App);
  const arrow = document.querySelector('[data-slot="hover-card-arrow"]');
  const content = screen.getByTestId('content');
  expect(document.querySelector('[data-slot="hover-card-arrow-tip"]')).toBeInTheDocument();
  expect(document.querySelector('[data-slot="hover-card-body"]')).toBeInTheDocument();
  expect(arrow?.parentElement).toBe(content);
});

test('keeps RootProvider state and Context slot composition connected', async () => {
  const ContextValue = defineComponent({
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
  await fireEvent.focusIn(screen.getByRole('button', { name: 'Profile' }));
  await waitFor(() => expect(screen.getByText('Slot: open')).toBeVisible());
  expect(screen.getByText('Hook: open')).toBeVisible();
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
      <HoverCard :open-delay="0" :portalled="false" @trigger-value-change="value = $event.value ?? ''">
        <HoverCardTrigger value="sarah">Sarah</HoverCardTrigger>
        <HoverCardTrigger value="alex">Alex</HoverCardTrigger>
        <HoverCardSurface />
      </HoverCard>
    `,
  });
  render(Harness);
  await fireEvent.focusIn(screen.getByRole('button', { name: 'Alex' }));
  await waitFor(() => expect(screen.getByText('alex')).toBeVisible());
});

test('forwards refs, attrs, consumer classes, and semantic asChild hosts', () => {
  const triggerRef = ref<ComponentPublicInstance>();
  const positionerRef = ref<ComponentPublicInstance>();
  const contentRef = ref<ComponentPublicInstance>();
  const arrowRef = ref<ComponentPublicInstance>();
  const arrowTipRef = ref<ComponentPublicInstance>();
  const bodyRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: hoverCardComponents,
    setup() {
      return { arrowRef, arrowTipRef, bodyRef, contentRef, positionerRef, triggerRef };
    },
    template: `
      <HoverCard open :portalled="false">
        <HoverCardTrigger ref="triggerRef" class="gap-2 text-destructive">Profile</HoverCardTrigger>
        <HoverCardTrigger as-child><a href="/profile">Composed profile</a></HoverCardTrigger>
        <HoverCardPositioner ref="positionerRef" class="max-w-none">
          <HoverCardContent ref="contentRef" data-testid="content" class="bg-card p-4">
            <HoverCardArrow ref="arrowRef" class="[--arrow-size:1rem]">
              <HoverCardArrowTip ref="arrowTipRef" class="border-primary" />
            </HoverCardArrow>
            <HoverCardBody ref="bodyRef" class="overflow-hidden">Profile details</HoverCardBody>
          </HoverCardContent>
        </HoverCardPositioner>
      </HoverCard>
    `,
  });
  render(Harness);
  const trigger = screen.getByRole('button', { name: 'Profile' });
  const content = screen.getByTestId('content');
  expect(triggerRef.value?.$el).toBe(trigger);
  expect(positionerRef.value?.$el).toHaveAttribute('data-slot', 'hover-card-positioner');
  expect(contentRef.value?.$el).toBe(content);
  expect(arrowRef.value?.$el).toHaveAttribute('data-slot', 'hover-card-arrow');
  expect(arrowTipRef.value?.$el).toHaveAttribute('data-slot', 'hover-card-arrow-tip');
  expect(bodyRef.value?.$el).toHaveAttribute('data-slot', 'hover-card-body');
  expect(screen.getByRole('link', { name: 'Composed profile' })).toHaveAttribute(
    'data-slot',
    'hover-card-trigger',
  );
  expect(trigger).toHaveClass('gap-2', 'text-destructive');
  expect(trigger).not.toHaveClass('text-primary');
  expect(content).toHaveClass('bg-card', 'p-4');
  expect(content).not.toHaveClass('bg-popover', 'p-2');
  expect(positionerRef.value?.$el).toHaveClass('max-w-none');
  expect(arrowRef.value?.$el).toHaveClass('[--arrow-size:1rem]');
  expect(arrowTipRef.value?.$el).toHaveClass('border-primary');
  expect(bodyRef.value?.$el).toHaveClass('min-h-0', 'overflow-hidden');
});

test('renders and hydrates the public anatomy on the server', async () => {
  const App = defineComponent({
    components: hoverCardComponents,
    template: `
      <HoverCard open :portalled="false">
        <HoverCardTrigger>Profile</HoverCardTrigger>
        <HoverCardPositioner>
          <HoverCardContent><HoverCardBody>Profile details</HoverCardBody></HoverCardContent>
        </HoverCardPositioner>
      </HoverCard>
    `,
  });
  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="hover-card-trigger"');
  expect(html).toContain('data-slot="hover-card-content"');
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