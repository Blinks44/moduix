<script setup lang="ts">
import { ListboxInput as ArkListboxInput } from '@ark-ui/vue/listbox';
import type { ListboxInputProps } from '@ark-ui/vue/listbox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ListboxInputProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const inputClass =
  'm-0 box-border min-h-control-md w-full rounded-md border border-border bg-background px-3 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out group-has-[[data-slot=listbox-filter-icon]]/listbox-filter:ps-9 group-has-[[data-slot=listbox-filter-icon]]/listbox-filter:pe-10 in-[[data-slot=listbox-filter]]:focus-visible:border-ring group-has-[+_[data-slot=listbox-content]:focus-visible]/listbox-filter:border-ring in-[[data-slot=listbox-filter]]:focus-visible:outline-transparent group-has-[+_[data-slot=listbox-content]]/listbox-filter:rounded-b-none group-has-[+_[data-slot=listbox-content]]/listbox-filter:border-b-0 placeholder:text-muted-foreground focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none [:is([data-slot=listbox-root],[data-slot=listbox-root-provider])[data-disabled]_&]:opacity-100';
</script>

<template>
  <ArkListboxInput v-bind="attrs" :class="cn(inputClass, props.class)" data-slot="listbox-input">
    <slot />
  </ArkListboxInput>
</template>