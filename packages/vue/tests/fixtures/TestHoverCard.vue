<script setup lang="ts">
import { ref } from 'vue';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardPositioner,
  HoverCardContent,
  HoverCardBody,
} from '../../src';

const open = ref(true);
</script>

<template>
  <HoverCard v-model:open="open" :portalled="false">
    <HoverCardTrigger>Profile</HoverCardTrigger>
    <HoverCardPositioner>
      <HoverCardContent><HoverCardBody>Profile details</HoverCardBody></HoverCardContent>
    </HoverCardPositioner>
  </HoverCard>
  <button type="button">Outside</button>
</template>