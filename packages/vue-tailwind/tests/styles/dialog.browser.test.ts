import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseIcon,
  DialogCloseTrigger,
  DialogContext,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRootProvider,
  DialogTitle,
  DialogTrigger,
  useDialog,
} from '@/index';

const dialogComponents = {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseIcon,
  DialogCloseTrigger,
  DialogContext,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRootProvider,
  DialogTitle,
  DialogTrigger,
};

test.each(['element', 'getter'] as const)(
  'supports portalRef, context, RootProvider, refs, and asChild (%s)',
  async (targetType) => {
    const contentRef = ref<ComponentPublicInstance>();
    const portalTarget = ref<HTMLElement>();
    const Harness = defineComponent({
      components: dialogComponents,
      setup() {
        const dialog = useDialog({ defaultOpen: true });
        return { contentRef, dialog, getPortal: () => portalTarget.value, portalTarget };
      },
      template: `<div><div ref="portalTarget" data-testid="portal"></div><DialogRootProvider :value="dialog" :portal-ref="${targetType === 'getter' ? 'getPortal' : 'portalTarget'}"><DialogBackdrop /><DialogPositioner><DialogContent ref="contentRef"><DialogTitle>Preferences</DialogTitle><DialogContext v-slot="context"><output>Open: {{ context.open ? "true" : "false" }}</output></DialogContext></DialogContent></DialogPositioner></DialogRootProvider></div>`,
    });
    render(Harness);
    await expect.element(page.getByTestId('portal').getByRole('dialog')).toBeAttached();
    await expect.element(page.getByText('Open: true')).toBeAttached();
    expect(contentRef.value?.$el).toBe(document.querySelector('[role="dialog"]'));
  },
);

test('lets consumer Tailwind utilities override part defaults', async () => {
  const Harness = defineComponent({
    components: dialogComponents,
    template:
      '<Dialog default-open :portalled="false"><DialogPositioner><DialogContent class="p-4"><DialogTitle>Preferences</DialogTitle><DialogCloseIcon class="size-8" /></DialogContent></DialogPositioner></Dialog>',
  });
  render(Harness);
  await expect.element(page.getByRole('dialog')).toHaveCSS('padding', '16px');
  await expect
    .element(page.getByRole('button', { name: 'Close dialog' }))
    .toHaveCSS('width', '32px');
});