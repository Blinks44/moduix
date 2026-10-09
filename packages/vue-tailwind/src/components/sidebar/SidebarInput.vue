<script setup lang="ts">
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import Input from '../input/Input.vue';
import type { Emits as InputEmits, Props as InputProps } from '../input/Input.vue';

defineOptions({ inheritAttrs: false });
export interface Props extends /* @vue-ignore */ InputProps {
  class?: HTMLAttributes['class'];
}
const props = defineProps<Props>();
export interface Emits extends /* @vue-ignore */ InputEmits {}
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <Input
    v-bind="attrs"
    :class="cn('w-full group-data-[state=collapsed]/sidebar-panel:hidden', props.class)"
    ><slot
  /></Input>
</template>