import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
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
} from '@/index';
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

test('unmounts content after it closes by default', async () => {
  const Harness = defineComponent({
    components: { ...hoverCardComponents, HoverCardSurface },
    setup() {
      const open = ref(true);
      return { open };
    },
    template: `
      <button type="button" @click="open = false">Close</button>
      <HoverCard :open="open" :portalled="false">
        <HoverCardTrigger>Profile</HoverCardTrigger>
        <HoverCardSurface />
      </HoverCard>
    `,
  });

  render(Harness);

  await expect.element(page.getByTestId('content')).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect.element(page.getByTestId('content')).toHaveCount(0);
});

test('scrolls long body content inside the content height and uses shared popup motion', async () => {
  const Harness = defineComponent({
    components: hoverCardComponents,
    template: `
      <HoverCard open :portalled="false">
        <HoverCardTrigger>Profile</HoverCardTrigger>
        <HoverCardPositioner>
          <HoverCardContent data-testid="content" style="max-height: 120px">
            <HoverCardBody>
              <div style="height: 400px">Long profile</div>
            </HoverCardBody>
          </HoverCardContent>
        </HoverCardPositioner>
      </HoverCard>
    `,
  });

  render(Harness);

  await expect.element(page.getByTestId('content')).toBeVisible();
  const content = document.querySelector<HTMLElement>('[data-slot="hover-card-content"]')!;
  const body = document.querySelector<HTMLElement>('[data-slot="hover-card-body"]')!;
  expect(content.offsetHeight).toBeLessThanOrEqual(120);
  expect(body.offsetHeight).toBeLessThan(content.offsetHeight);
  expect(body.scrollHeight).toBeGreaterThan(body.clientHeight);
  expect(getComputedStyle(content).animationName).toBe('moduix-popup-in');
});