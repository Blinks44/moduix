import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent, ref } from 'vue';
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
  'portals overlays into portalRef when provided (%s)',
  async (targetType) => {
    const portalTarget = ref<HTMLElement>();
    const Harness = defineComponent({
      components: dialogComponents,
      setup() {
        return { portalTarget, getPortal: () => portalTarget.value };
      },
      template: `<div><div ref="portalTarget" data-testid="dialog-portal"></div><Dialog default-open :portal-ref="${targetType === 'getter' ? 'getPortal' : 'portalTarget'}"><DialogPositioner><DialogContent><DialogTitle>Preferences</DialogTitle></DialogContent></DialogPositioner></Dialog></div>`,
    });
    render(Harness);
    await expect.element(page.getByTestId('dialog-portal').getByRole('dialog')).toBeAttached();
  },
);