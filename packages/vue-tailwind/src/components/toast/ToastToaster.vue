<script setup lang="ts">
import { Toaster as ArkToaster } from '@ark-ui/vue/toast';
import type { ToasterBaseProps, ToastOptions } from '@ark-ui/vue/toast';
import { computed, defineComponent, toValue, useAttrs } from 'vue';
import type { HTMLAttributes, VNodeChild } from 'vue';
import { cn } from '@/lib/moduix/cn';
import type { PortalRef } from '@/lib/moduix/overlayPortal/context';
import Spinner from '../spinner/Spinner.vue';
import Toast from './Toast.vue';
import ToastActionTrigger from './ToastActionTrigger.vue';
import ToastCloseTrigger from './ToastCloseTrigger.vue';
import ToastDescription from './ToastDescription.vue';
import ToastTitle from './ToastTitle.vue';

defineOptions({ inheritAttrs: false });

export interface Props
  extends /* @vue-ignore */ ToasterBaseProps, /* @vue-ignore */ Omit<HTMLAttributes, 'dir'> {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
  portalRef?: PortalRef;
  portalled?: boolean;
  toaster: ToasterBaseProps['toaster'];
}

const { asChild, class: className, portalRef, portalled = true, toaster } = defineProps<Props>();
defineSlots<{ default?: (toast: ToastOptions) => unknown }>();

const attrs = useAttrs();
const portalTarget = computed(() => toValue(portalRef) ?? 'body');
const VNodeOutlet = defineComponent((props: { value: VNodeChild }) => () => props.value, {
  props: ['value'],
});
</script>

<template>
  <Teleport :disabled="!portalled" :to="portalTarget">
    <ArkToaster
      v-bind="attrs"
      :as-child="asChild"
      :class="
        cn(
          '[@media(max-width:40rem)]:w-[calc(100vw-env(safe-area-inset-left,0px)-env(safe-area-inset-right,0px)-var(--viewport-offset-left)-var(--viewport-offset-right))]',
          className,
        )
      "
      :toaster="toaster"
      data-slot="toast-toaster"
    >
      <template #default="toast">
        <slot v-if="$slots.default" v-bind="toast" />
        <Toast v-else>
          <ToastTitle v-if="toast.title != null && toast.type === 'loading'">
            <Spinner decorative size="sm" />
            <VNodeOutlet :value="toast.title" />
          </ToastTitle>
          <ToastTitle v-else-if="toast.title != null" />
          <ToastDescription v-if="toast.description != null" />
          <ToastActionTrigger v-if="toast.action != null">
            {{ toast.action.label }}
          </ToastActionTrigger>
          <ToastCloseTrigger v-if="toast.closable !== false" />
        </Toast>
      </template>
    </ArkToaster>
  </Teleport>
</template>