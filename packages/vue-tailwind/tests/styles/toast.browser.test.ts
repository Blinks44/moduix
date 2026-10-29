import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { defineComponent } from 'vue';
import {
  Toast,
  ToastActionTrigger,
  ToastCloseTrigger,
  ToastDescription,
  ToastTitle,
  ToastToaster,
  createToaster,
} from '@/index';

const toastComponents = {
  Toast,
  ToastActionTrigger,
  ToastCloseTrigger,
  ToastDescription,
  ToastTitle,
  ToastToaster,
};

test('lets consumer Tailwind utilities override conflicting defaults', async () => {
  const toaster = createToaster({ placement: 'bottom', duration: Infinity });
  const Harness = defineComponent({
    components: toastComponents,
    setup() {
      return { toaster };
    },
    template: `
      <ToastToaster :toaster="toaster" :portalled="false">
        <template #default>
          <Toast class="w-full bg-primary p-6">
            <ToastTitle class="text-lg" />
            <ToastDescription />
          </Toast>
        </template>
      </ToastToaster>
    `,
  });

  render(Harness);
  toaster.create({ title: 'Custom styles', description: 'Consumer utilities win.' });

  const root = (await screen.findByText('Custom styles')).closest('[data-slot="toast-root"]');
  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-full', 'bg-primary', 'p-6']));
  expect([...screen.getByText('Custom styles').classList]).toEqual(
    expect.arrayContaining(['text-lg']),
  );

  await expect.element(page.locator('[data-slot="toast-root"]')).toHaveCSS('padding', '24px');
});