<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'col'> {
  class?: HTMLAttributes['class'];
  htmlWidth?: string | number;
  width?: HTMLArkProps<'col'>['width'];
}

const { class: className, htmlWidth, width } = defineProps<Props>();
const slots = defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ark.col
    v-bind="attrs"
    :width="htmlWidth ?? width"
    :class="className"
    data-scope="table"
    data-part="column"
    data-slot="table-column"
  >
    <template v-if="slots.default" #default><slot /></template>
  </ark.col>
</template>