<script setup lang="ts">
import {
  Slider,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from '@/components/slider';

defineProps<{ label: string }>();
</script>

<template>
  <Slider :default-value="[40]" class="grid gap-2">
    <SliderLabel class="text-sm">{{ label }}</SliderLabel>
    <SliderControl class="relative flex h-5 items-center">
      <SliderTrack class="relative h-1 w-full rounded-full bg-muted">
        <SliderRange class="absolute h-full rounded-full bg-primary" />
      </SliderTrack>
      <SliderThumb
        :index="0"
        class="block size-4 rounded-full border-2 border-primary bg-background outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
  </Slider>
</template>