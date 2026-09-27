<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Card, CardBody } from '@moduix/vue/card';
import { Drawer, DrawerBackdrop, DrawerBody, DrawerCloseIcon, DrawerContent, DrawerGrabber, DrawerGrabberIndicator, DrawerHeader, DrawerPositioner, DrawerTitle, DrawerTrigger } from '@moduix/vue/drawer';
import { ScrollArea, ScrollAreaContent, ScrollAreaCorner, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from '@moduix/vue/scroll-area';
import styles from '@/components/examples/drawer/drawer-scrollable.module.css';

const sections = ['Keyboard and focus', 'Viewport overflow', 'Close affordances', 'Mobile ergonomics', 'Persistent panels', 'Status updates', 'Error handling', 'Long descriptions'];
const snapPoints = [0.3, 1];
</script>

<template>
  <Drawer :snap-points="snapPoints" :default-snap-point="snapPoints[0]"><DrawerTrigger as-child><Button>Open scrollable drawer</Button></DrawerTrigger><DrawerBackdrop /><DrawerPositioner><DrawerContent><DrawerGrabber><DrawerGrabberIndicator /></DrawerGrabber><DrawerHeader><DrawerTitle>Scrollable drawer</DrawerTitle><DrawerCloseIcon /></DrawerHeader><DrawerBody :class="styles.body"><ScrollArea :class="styles.scrollArea"><ScrollAreaViewport :class="styles.viewport"><ScrollAreaContent :class="styles.content"><Card v-for="section in sections" :key="section" size="sm" :class="styles.card"><CardBody><strong>{{ section }}</strong><p>Keep long content readable in a dedicated viewport.</p></CardBody></Card></ScrollAreaContent></ScrollAreaViewport><ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar><ScrollAreaCorner /></ScrollArea></DrawerBody></DrawerContent></DrawerPositioner></Drawer>
</template>
