<script setup lang="ts">
import { MenuRadioItemGroup as ArkMenuRadioItemGroup } from '@ark-ui/vue/menu';
import type { MenuRadioItemGroupProps, MenuRadioItemGroupEmits } from '@ark-ui/vue/menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuRadioItemGroupProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
interface Emits extends /* @vue-ignore */ MenuRadioItemGroupEmits {}
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuRadioItemGroup
    v-bind="attrs"
    :class="cn('grid', className)"
    data-slot="menu-radio-item-group"
  >
    <slot />
  </ArkMenuRadioItemGroup>
</template>