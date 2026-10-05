<script setup lang="ts">
import {
  Marquee,
  MarqueeContext,
  MarqueeViewport,
  MarqueeContent,
  MarqueeItem,
} from '../../src/components/marquee';
</script>
<template>
  <Marquee aria-label="Partner logos"
    ><MarqueeViewport
      ><MarqueeContent><MarqueeItem>Atlas</MarqueeItem></MarqueeContent></MarqueeViewport
    ><MarqueeContext v-slot="context"
      ><button type="button" @click="context.pause">Pause marquee</button></MarqueeContext
    ></Marquee
  >
</template>