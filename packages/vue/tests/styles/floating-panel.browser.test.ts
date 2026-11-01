import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
import {
  FloatingPanel,
  FloatingPanelBody,
  FloatingPanelCloseIcon,
  FloatingPanelCloseTrigger,
  FloatingPanelContent,
  FloatingPanelContext,
  FloatingPanelControl,
  FloatingPanelDragIndicator,
  FloatingPanelDragTrigger,
  FloatingPanelFooter,
  FloatingPanelHeader,
  FloatingPanelPositioner,
  FloatingPanelResizeTriggerGroup,
  FloatingPanelRootProvider,
  FloatingPanelStageTrigger,
  FloatingPanelTitle,
  FloatingPanelTrigger,
} from '@/index';

const floatingPanelComponents = {
  FloatingPanel,
  FloatingPanelBody,
  FloatingPanelCloseIcon,
  FloatingPanelCloseTrigger,
  FloatingPanelContent,
  FloatingPanelContext,
  FloatingPanelControl,
  FloatingPanelDragIndicator,
  FloatingPanelDragTrigger,
  FloatingPanelFooter,
  FloatingPanelHeader,
  FloatingPanelPositioner,
  FloatingPanelResizeTriggerGroup,
  FloatingPanelRootProvider,
  FloatingPanelStageTrigger,
  FloatingPanelTitle,
  FloatingPanelTrigger,
} as unknown as Record<string, Component>;

const PanelContent = defineComponent({
  components: floatingPanelComponents,
  template: `
    <FloatingPanelPositioner>
      <FloatingPanelContent>
        <FloatingPanelDragTrigger>
          <FloatingPanelHeader>
            <FloatingPanelTitle>Inspector</FloatingPanelTitle>
            <FloatingPanelControl>
              <FloatingPanelStageTrigger stage="minimized" />
            </FloatingPanelControl>
          </FloatingPanelHeader>
        </FloatingPanelDragTrigger>
        <FloatingPanelBody>Panel content</FloatingPanelBody>
        <slot />
      </FloatingPanelContent>
    </FloatingPanelPositioner>
  `,
});

const rootComponents = { ...floatingPanelComponents, PanelContent };

test('marks the footer as minimized with the panel', async () => {
  const Harness = defineComponent({
    components: rootComponents,
    template:
      '<FloatingPanel default-open :portalled="false" :default-size="{ width: 360, height: 260 }"><PanelContent><FloatingPanelFooter data-testid="footer">Status</FloatingPanelFooter></PanelContent></FloatingPanel>',
  });

  render(Harness);
  await page.getByRole('button', { name: 'Minimize window', exact: true }).click();

  await expect.element(page.getByTestId('footer')).toHaveAttribute('data-minimized');
});

test('keeps Ark translations for default stage controls', async () => {
  const Harness = defineComponent({
    components: floatingPanelComponents,
    template: `
      <FloatingPanel default-open :portalled="false" :default-size="{ width: 360, height: 260 }"
        :translations="{ minimize: 'Minimieren', maximize: 'Maximieren', restore: 'Wiederherstellen' }">
        <FloatingPanelPositioner>
          <FloatingPanelContent>
            <FloatingPanelControl>
              <FloatingPanelStageTrigger stage="minimized" />
              <FloatingPanelStageTrigger stage="maximized" />
            </FloatingPanelControl>
          </FloatingPanelContent>
        </FloatingPanelPositioner>
      </FloatingPanel>
    `,
  });

  render(Harness);
  await expect
    .element(page.getByRole('button', { name: 'Minimieren', exact: true }))
    .toBeAttached();
  await expect
    .element(page.getByRole('button', { name: 'Maximieren', exact: true }))
    .toBeAttached();
});

test('lazily mounts, closes on Escape, and restores focus to its trigger', async () => {
  const Harness = defineComponent({
    components: rootComponents,
    template:
      '<FloatingPanel :portalled="false"><FloatingPanelTrigger as-child><button type="button">Open inspector</button></FloatingPanelTrigger><PanelContent /></FloatingPanel>',
  });

  render(Harness);

  await expect.element(page.getByRole('dialog')).toHaveCount(0);

  await page.getByRole('button', { name: 'Open inspector', exact: true }).click();

  await expect
    .element(page.getByRole('dialog'))
    .toHaveAttribute('data-slot', 'floating-panel-content');
  await page.getByRole('dialog').press('Escape');

  await expect.element(page.getByRole('dialog')).toHaveCount(0);
  await expect
    .element(page.getByRole('button', { name: 'Open inspector', exact: true }))
    .toBeFocused();
});

test('portals overlays inline and into a custom portal target', async () => {
  const Harness = defineComponent({
    components: floatingPanelComponents,
    setup() {
      const portalTarget = ref<HTMLDivElement>();
      return { portalTarget, getPortal: () => portalTarget.value };
    },
    template: `
      <div>
        <div data-testid="inline-host"><FloatingPanel default-open :portalled="false"><FloatingPanelPositioner><FloatingPanelContent><FloatingPanelTitle>Inline</FloatingPanelTitle></FloatingPanelContent></FloatingPanelPositioner></FloatingPanel></div>
        <div ref="portalTarget" data-testid="portal-host"></div>
        <FloatingPanel default-open :portal-ref="getPortal"><FloatingPanelPositioner><FloatingPanelContent><FloatingPanelTitle>Portalled</FloatingPanelTitle></FloatingPanelContent></FloatingPanelPositioner></FloatingPanel>
      </div>
    `,
  });

  const { container } = render(Harness);
  await expect
    .element(page.getByTestId('inline-host').getByRole('dialog', { name: 'Inline' }))
    .toBeAttached();
  await expect
    .poll(() =>
      screen.getByTestId('portal-host').contains(screen.getByRole('dialog', { name: 'Portalled' })),
    )
    .toBe(true);
  expect(Boolean(container?.isConnected)).toBe(true);
});