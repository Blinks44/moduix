<script lang="ts">
import type { ToasterBaseProps } from '@ark-ui/vue/toast';
import { defineComponent } from 'vue';
import type { HTMLAttributes, VNodeChild } from 'vue';
import type { PortalRef } from '@/lib/moduix/overlayPortal/context';

export interface Props
  extends
    /* @vue-ignore */ Omit<ToasterBaseProps, 'toaster'>,
    /* @vue-ignore */ Omit<HTMLAttributes, 'dir'> {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
  portalRef?: PortalRef;
  portalled?: boolean;
  toaster?: ToasterBaseProps['toaster'];
}

const VNodeOutlet = defineComponent((props: { value: VNodeChild }) => () => props.value, {
  props: ['value'],
});
</script>

<script setup lang="ts">
import { Toaster as ArkToaster } from '@ark-ui/vue/toast';
import type { ToastOptions } from '@ark-ui/vue/toast';
import { clsx } from 'clsx';
import { computed, toValue, useAttrs } from 'vue';
import Spinner from '../spinner/Spinner.vue';
import styles from './Toast.module.css';
import Toast from './Toast.vue';
import ToastActionTrigger from './ToastActionTrigger.vue';
import ToastCloseTrigger from './ToastCloseTrigger.vue';
import ToastDescription from './ToastDescription.vue';
import { defaultToaster } from './toastStore';
import ToastTitle from './ToastTitle.vue';

defineOptions({ inheritAttrs: false });

const {
  asChild,
  class: className,
  portalRef,
  portalled = true,
  toaster = defaultToaster,
} = defineProps<Props>();
defineSlots<{ default?: (toast: ToastOptions) => unknown }>();

const attrs = useAttrs();
const portalTarget = computed(() => toValue(portalRef) ?? 'body');
</script>

<template>
  <Teleport :disabled="!portalled" :to="portalTarget">
    <ArkToaster
      v-bind="attrs"
      :as-child="asChild"
      :class="clsx(styles.toaster, className)"
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