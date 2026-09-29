<script setup lang="ts">
import { PopoverAnchor as ArkPopoverAnchor } from '@ark-ui/vue/popover';
import type { PopoverAnchorProps } from '@ark-ui/vue/popover';
import { useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PopoverAnchorProps {}

defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPopoverAnchor v-bind="attrs" data-slot="popover-anchor">
    <slot />
  </ArkPopoverAnchor>
</template>