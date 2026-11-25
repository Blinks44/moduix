<script lang="ts">
import type { ToastDescriptionProps } from '@ark-ui/vue/toast';
import { defineComponent } from 'vue';
import type { HTMLAttributes, VNodeChild } from 'vue';

export interface Props extends /* @vue-ignore */ ToastDescriptionProps {
  class?: HTMLAttributes['class'];
}

const VNodeOutlet = defineComponent((props: { value: VNodeChild }) => () => props.value, {
  props: ['value'],
});
</script>

<script setup lang="ts">
import { ToastDescription as ArkToastDescription, useToastContext } from '@ark-ui/vue/toast';
import { useAttrs } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const toast = useToastContext();
</script>

<template>
  <ArkToastDescription
    v-bind="attrs"
    :class="cn('m-0 min-w-0 text-sm leading-5 wrap-anywhere text-muted-foreground', className)"
    data-slot="toast-description"
  >
    <slot v-if="$slots.default" />
    <VNodeOutlet v-else :value="toast.description" />
  </ArkToastDescription>
</template>