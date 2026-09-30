<script setup lang="ts">
import type { MenuRootEmits, MenuRootProps } from '@ark-ui/vue/menu';
import { provide, useAttrs, type HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import type { PortalRef } from '../../internal/overlayPortal/context';
import { Menu } from '../menu';
import { SplitButtonContextKey, type SplitButtonSize, type SplitButtonVariant } from './context';

defineOptions({ inheritAttrs: false });
interface Props extends /* @vue-ignore */ MenuRootProps {
  ariaLabel?: string;
  ariaLabelledby?: string;
  class?: HTMLAttributes['class'];
  positioning?: MenuRootProps['positioning'];
  portalled?: boolean;
  portalRef?: PortalRef;
  size?: SplitButtonSize;
  variant?: SplitButtonVariant;
}
interface Emits extends /* @vue-ignore */ MenuRootEmits {}
const {
  ariaLabel,
  ariaLabelledby,
  class: className,
  positioning,
  portalled = true,
  portalRef,
  size = 'md',
  variant = 'default',
} = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
provide(SplitButtonContextKey, { size: () => size, variant: () => variant });
</script>

<template>
  <div
    role="group"
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    data-scope="split-button"
    data-part="root"
    data-slot="split-button-root"
    :class="cn('inline-flex items-stretch', className)"
  >
    <Menu
      v-bind="attrs"
      :portalled="portalled"
      :portal-ref="portalRef"
      :positioning="{ placement: 'bottom-end', gutter: 4, ...positioning }"
    >
      <slot />
    </Menu>
  </div>
</template>