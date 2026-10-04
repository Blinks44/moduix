<script setup lang="ts">
import { Toaster as ArkToaster } from '@ark-ui/vue/toast';
import type { ToasterBaseProps, ToastOptions } from '@ark-ui/vue/toast';
import { computed, toValue, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import type { PortalRef } from '@/internal/overlayPortal/context';
import { cn } from '@/lib/moduix/cn';
import Toast from './Toast.vue';
import ToastActionTrigger from './ToastActionTrigger.vue';
import ToastCloseTrigger from './ToastCloseTrigger.vue';
import ToastDescription from './ToastDescription.vue';
import ToastTitle from './ToastTitle.vue';

defineOptions({ inheritAttrs: false });

export interface Props
  extends /* @vue-ignore */ ToasterBaseProps, /* @vue-ignore */ HTMLAttributes {
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
</script>

<template>
  <Teleport :disabled="!portalled" :to="portalTarget">
    <ArkToaster
      v-bind="attrs"
      :as-child="asChild"
      :class="cn('max-[40rem]:w-full', className)"
      :toaster="toaster"
      data-slot="toast-toaster"
    >
      <template #default="toast">
        <slot v-if="$slots.default" v-bind="toast" />
        <Toast v-else>
          <ToastTitle v-if="toast.title != null" />
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