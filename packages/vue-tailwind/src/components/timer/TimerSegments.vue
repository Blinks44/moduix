<script lang="ts">
import type { TimerAreaProps, TimerItemProps } from '@ark-ui/vue/timer';
import { defineComponent } from 'vue';
import type { HTMLAttributes, VNodeChild } from 'vue';

export interface Props extends /* @vue-ignore */ Omit<TimerAreaProps, 'asChild' | 'children'> {
  class?: HTMLAttributes['class'];
  separator?: VNodeChild;
  types?: TimerItemProps['type'][];
}

const VNodeOutlet = defineComponent((props: { value: VNodeChild }) => () => props.value, {
  props: ['value'],
});
</script>

<script setup lang="ts">
import { useAttrs } from 'vue';
import TimerArea from './TimerArea.vue';
import TimerItem from './TimerItem.vue';
import TimerSeparator from './TimerSeparator.vue';

defineOptions({ inheritAttrs: false });

const {
  class: className,
  separator = ':',
  types = ['hours', 'minutes', 'seconds'] as TimerItemProps['type'][],
} = defineProps<Props>();
defineSlots<{ default?: never }>();

const attrs = useAttrs();
</script>

<template>
  <TimerArea v-bind="attrs" :class="className">
    <template v-for="(type, index) in types" :key="`${type}-${index}`">
      <TimerItem :type="type" />
      <TimerSeparator v-if="index < types.length - 1">
        <VNodeOutlet :value="separator" />
      </TimerSeparator>
    </template>
  </TimerArea>
</template>