<script setup lang="ts">
import { TimerItem as ArkTimerItem, TimerRoot as ArkTimerRoot } from '@ark-ui/vue/timer';
import { Timer, TimerItem } from '../../src/components/timer';
const { native = false } = defineProps<{ native?: boolean }>();
const Root = native ? ArkTimerRoot : Timer;
const Item = native ? ArkTimerItem : TimerItem;
</script>
<template>
  <Root :start-ms="12000" :target-ms="60000"
    ><Item type="seconds" as-child><span data-testid="item-host">12</span></Item></Root
  >
</template>