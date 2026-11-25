<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { useA11yLabels } from '@/lib/moduix/a11yLabels';
import { ChevronLeftIcon } from '@/lib/moduix/icons/ui';
import { useSidebar } from './context';
import styles from './Sidebar.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<HTMLArkProps<'button'>, 'class'> {
  class?: HTMLAttributes['class'];
  type?: 'button' | 'reset' | 'submit';
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
});
const slots = defineSlots<{ default?: () => unknown }>();
const emit = defineEmits<{ click: [event: MouseEvent] }>();

const attrs = useAttrs();
const { collapsed, isMobile, openMobile, side, state, toggleSidebar } = useSidebar();
const expanded = computed(() => (isMobile.value ? openMobile.value : !collapsed.value));
const triggerState = computed(() =>
  isMobile.value ? (openMobile.value ? 'expanded' : 'collapsed') : state.value,
);
const labels = useA11yLabels();
const ariaLabel = computed(() =>
  typeof attrs['aria-label'] === 'string' ? attrs['aria-label'] : labels.value.toggleSidebar,
);

const handleClick = (event: MouseEvent) => {
  emit('click', event);
  if (!event.defaultPrevented) toggleSidebar();
};
</script>

<template>
  <ark.button
    v-bind="attrs"
    :type="props.type"
    :aria-label="ariaLabel"
    :aria-expanded="expanded"
    :class="clsx(styles.trigger, props.class)"
    @click="handleClick"
    :data-side="side"
    :data-state="triggerState"
    data-scope="sidebar"
    data-part="trigger"
    data-slot="sidebar-trigger"
  >
    <ChevronLeftIcon v-if="!slots.default" />
    <slot v-else />
  </ark.button>
</template>