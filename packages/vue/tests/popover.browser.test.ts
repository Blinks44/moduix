import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverArrowTip,
  PopoverBody,
  PopoverCloseIcon,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverContext,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverIndicator,
  PopoverPositioner,
  PopoverRootProvider,
  PopoverTitle,
  PopoverTrigger,
} from '@/index';
import TestPopover from './fixtures/TestPopover.vue';

// Zag 1.43.3 checks the title before lazy content mounts; enable after the upstream fix.

const popoverComponents = {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverArrowTip,
  PopoverBody,
  PopoverCloseIcon,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverContext,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverIndicator,
  PopoverPositioner,
  PopoverRootProvider,
  PopoverTitle,
  PopoverTrigger,
};

const PopoverSurface = defineComponent({
  components: popoverComponents,
  template: `
    <PopoverPositioner>
      <PopoverContent data-testid="content">
        <PopoverArrow />
        <PopoverHeader>
          <PopoverTitle>Notifications</PopoverTitle>
          <PopoverDescription>Latest updates</PopoverDescription>
          <PopoverCloseIcon />
        </PopoverHeader>
        <PopoverBody>Updates are ready.</PopoverBody>
        <PopoverFooter><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter>
      </PopoverContent>
    </PopoverPositioner>
  `,
});

test('labels lazily mounted content with its title', async () => {
  render({
    components: { Popover, PopoverTrigger, PopoverPositioner, PopoverContent, PopoverTitle },
    template: `
      <Popover :portalled="false">
        <PopoverTrigger>Open preferences</PopoverTrigger>
        <PopoverPositioner>
          <PopoverContent><PopoverTitle>Preferences</PopoverTitle></PopoverContent>
        </PopoverPositioner>
      </Popover>
    `,
  });
  await page.getByRole('button', { name: 'Open preferences' }).click();
  await expect.element(page.getByRole('dialog')).toBeVisible();
  await expect.element(page.getByRole('dialog', { name: 'Preferences' })).toBeVisible();
});

test('preserves open-change details, v-model, and focus restoration', async () => {
  const details: Array<{ open: boolean }> = [];
  const Harness = defineComponent({
    components: { ...popoverComponents, PopoverSurface },
    setup() {
      const open = ref(false);
      return {
        details,
        onOpenChange: (detail: { open: boolean }) => details.push(detail),
        open,
      };
    },
    template: `
      <Popover v-model:open="open" :portalled="false" @open-change="onOpenChange">
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverSurface />
      </Popover>
    `,
  });

  render(Harness);
  const trigger = page.getByRole('button', { name: 'Open popover' });
  await trigger.click();
  await expect.element(page.getByTestId('content')).toBeVisible();
  await page.locator('[data-slot="popover-close-trigger"]').click();
  await expect.element(page.getByTestId('content')).toHaveCount(0);
  await expect.element(trigger).toBeFocused();
  expect(details).toEqual([{ open: true }, { open: false }]);
});

test('portals overlays outside the root tree by default', async () => {
  const Harness = defineComponent({
    components: { ...popoverComponents, PopoverSurface },
    template: `<Popover default-open><PopoverTrigger>Open</PopoverTrigger><PopoverSurface /></Popover>`,
  });

  const { container } = render(Harness);
  expect(container.querySelector('[data-testid="content"]')).toBeNull();
  await expect.element(page.getByTestId('content')).toBeAttached();
});

test('reports the active trigger value and marks the current trigger', async () => {
  const Harness = defineComponent({
    components: { ...popoverComponents, PopoverSurface },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `
      <Popover :portalled="false" @trigger-value-change="value = $event.value ?? ''">
        <PopoverTrigger value="first">First</PopoverTrigger>
        <PopoverTrigger value="second">Second</PopoverTrigger>
        <PopoverSurface />
      </Popover>
      <output>{{ value }}</output>
    `,
  });

  render(Harness);
  const first = page.getByRole('button', { name: 'First' });
  const second = page.getByRole('button', { name: 'Second' });
  await second.click();
  await expect.element(page.getByText('second', { exact: true })).toBeAttached();
  await expect.element(second).toHaveAttribute('data-current');
  await expect.element(first).not.toHaveAttribute('data-current');
  await first.click();
  await expect.element(page.getByText('first', { exact: true })).toBeAttached();
  await expect.element(first).toHaveAttribute('data-current');
  await expect.element(second).not.toHaveAttribute('data-current');
  await expect.element(page.getByTestId('content')).toBeVisible();
});

test('hydrates the open popover without replacing hosts or generated IDs', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestPopover));
  document.body.append(host);
  const trigger = host.querySelector('[data-slot="popover-trigger"]')!;
  const content = host.querySelector('[data-slot="popover-content"]')!;
  const titleId = host.querySelector('[data-slot="popover-title"]')!.id;
  const app = createSSRApp(TestPopover);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  try {
    app.mount(host);
    expect(host.querySelector('[data-slot="popover-trigger"]')).toBe(trigger);
    expect(host.querySelector('[data-slot="popover-content"]')).toBe(content);
    expect(titleId).not.toBe('');
    expect(host.querySelector('[data-slot="popover-title"]')!.id).toBe(titleId);
    await expect.element(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: 'Close popover' }).click();
    await expect.element(page.getByRole('dialog')).toHaveCount(0);
    await expect.element(page.getByRole('button', { name: 'Open popover' })).toBeFocused();
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});

test('keeps close-icon labels, attrs and fallback content reactive', async () => {
  const label = ref<string | undefined>('Dismiss first');
  const labelledby = ref<string | undefined>();
  const custom = ref(false);
  render({
    components: popoverComponents,
    setup: () => ({ label, labelledby, custom }),
    template: `
      <Popover default-open :portalled="false">
        <PopoverPositioner><PopoverContent>
          <PopoverTitle>Preview</PopoverTitle>
          <PopoverCloseIcon :aria-label="label" :aria-labelledby="labelledby"
            class="consumer-close" style="color: red" title="Dismiss preview" data-testid="close">
            <template v-if="custom" #default><span>Custom close</span></template>
          </PopoverCloseIcon>
        </PopoverContent></PopoverPositioner>
      </Popover>
    `,
  });
  const button = page.getByTestId('close');
  await expect.element(button).toHaveJSProperty('tagName', 'BUTTON');
  await expect.element(button).toHaveAttribute('aria-label', 'Dismiss first');
  expect(Array.from(document.querySelector('[data-testid="close"]')!.classList)).toEqual(
    expect.arrayContaining(['consumer-close']),
  );
  await expect.element(button).toHaveCSS('color', 'rgb(255, 0, 0)');
  await expect.element(button).toHaveAttribute('title', 'Dismiss preview');
  await expect.element(button.locator('svg')).toBeAttached();
  label.value = 'Dismiss second';
  await expect.element(button).toHaveAttribute('aria-label', 'Dismiss second');
  labelledby.value = 'dismiss-label';
  label.value = undefined;
  await expect.element(button).toHaveAttribute('aria-labelledby', 'dismiss-label');
  await expect.element(button).toHaveAttribute('aria-label', 'Close popover');
  label.value = '';
  await expect.element(button).toHaveAttribute('aria-label', '');
  custom.value = true;
  await expect.element(button).toHaveText('Custom close');
  await expect.element(button.locator('svg')).toHaveCount(0);
  custom.value = false;
  await expect.element(button.locator('svg')).toBeAttached();
});

test('follows runtime changes to portalled', async () => {
  const portalled = ref(true);
  const Harness = defineComponent({
    components: { ...popoverComponents, PopoverSurface },
    setup: () => ({ portalled }),
    template: `
      <div data-testid="host">
        <Popover default-open :portalled="portalled"><PopoverSurface /></Popover>
      </div>
    `,
  });

  const { container } = render(Harness);
  await expect.element(page.getByTestId('content')).toBeAttached();
  expect(container.querySelector('[data-testid="content"]')).toBeNull();
  portalled.value = false;
  await expect.element(page.getByTestId('host').getByTestId('content')).toBeAttached();
});

test('forwards consumer classes to the styled parts', () => {
  const Harness = defineComponent({
    components: popoverComponents,
    template: `
      <Popover default-open :portalled="false">
        <PopoverTrigger class="consumer-trigger">Open</PopoverTrigger>
        <PopoverPositioner><PopoverContent class="consumer-content">
          <PopoverHeader><PopoverTitle>Title</PopoverTitle><PopoverCloseIcon class="consumer-close" /></PopoverHeader>
          <PopoverBody class="consumer-body">Body</PopoverBody><PopoverFooter class="consumer-footer">Footer</PopoverFooter>
        </PopoverContent></PopoverPositioner>
      </Popover>
    `,
  });

  render(Harness);
  for (const [slot, className] of [
    ['popover-trigger', 'consumer-trigger'],
    ['popover-content', 'consumer-content'],
    ['popover-close-icon', 'consumer-close'],
    ['popover-body', 'consumer-body'],
    ['popover-footer', 'consumer-footer'],
  ]) {
    expect(document.querySelector(`[data-slot="${slot}"]`)!.classList.contains(className)).toBe(
      true,
    );
  }
});

test('reports trigger value details and current trigger state', async () => {
  const Harness = defineComponent({
    components: { ...popoverComponents, PopoverSurface },
    setup() {
      const value = ref('');
      return { value };
    },
    template: `
      <Popover :portalled="false" @trigger-value-change="value = $event.value ?? ''">
        <PopoverTrigger value="first">First</PopoverTrigger><PopoverTrigger value="second">Second</PopoverTrigger><PopoverSurface />
      </Popover><output>{{ value }}</output>
    `,
  });

  render(Harness);
  const first = page.getByRole('button', { name: 'First' });
  const second = page.getByRole('button', { name: 'Second' });
  await second.click();
  await expect.element(page.getByText('second', { exact: true })).toBeAttached();
  await expect.element(second).toHaveAttribute('data-current');
  await expect.element(first).not.toHaveAttribute('data-current');
  await first.click();
  await expect.element(page.getByText('first', { exact: true })).toBeAttached();
  await expect.element(first).toHaveAttribute('data-current');
  await expect.element(second).not.toHaveAttribute('data-current');
  await expect.element(page.getByTestId('content')).toBeVisible();
});