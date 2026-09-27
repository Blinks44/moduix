<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Card, CardBody } from '@moduix/vue/card';
import { Drawer, DrawerBackdrop, DrawerBody, DrawerCloseIcon, DrawerContent, DrawerDescription, DrawerGrabber, DrawerGrabberIndicator, DrawerHeader, DrawerPositioner, DrawerTitle, DrawerTrigger } from '@moduix/vue/drawer';
import styles from '@/components/examples/drawer/drawer-snap-points.module.css';

const snapPoints = [0.25, 0.5, 1];
</script>

<template>
  <Drawer :snap-points="snapPoints" :default-snap-point="snapPoints[1]"><DrawerTrigger as-child><Button>Open with snap points</Button></DrawerTrigger><DrawerBackdrop /><DrawerPositioner><DrawerContent><DrawerGrabber><DrawerGrabberIndicator /></DrawerGrabber><DrawerHeader><DrawerTitle>Snap points</DrawerTitle><DrawerCloseIcon /><DrawerDescription>Drag between the configured snap points.</DrawerDescription></DrawerHeader><DrawerBody :class="styles.body"><Card size="sm" :class="styles.card"><CardBody>25% · 50% · 100%</CardBody></Card></DrawerBody></DrawerContent></DrawerPositioner></Drawer>
</template>
