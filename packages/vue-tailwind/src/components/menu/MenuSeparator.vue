<script setup lang="ts">
import { MenuSeparator as ArkMenuSeparator } from '@ark-ui/vue/menu';
import type { MenuSeparatorProps } from '@ark-ui/vue/menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuSeparatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuSeparator
    v-bind="attrs"
    :class="cn('mx-3 my-1.5 h-px border-0 bg-border', className)"
    data-slot="menu-separator"
  />
</template>