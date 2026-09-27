<script setup lang="ts">
import { EditableRootProvider as ArkEditableRootProvider } from '@ark-ui/vue/editable';
import type { EditableRootProviderProps } from '@ark-ui/vue/editable';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Editable.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ EditableRootProviderProps {
  class?: HTMLAttributes['class'];
  value: EditableRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkEditableRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="editable-root-provider"
  >
    <slot />
  </ArkEditableRootProvider>
</template>