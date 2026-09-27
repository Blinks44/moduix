<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Card, CardBody } from '@moduix/vue/card';
import { Drawer, DrawerBackdrop, DrawerBody, DrawerCloseIcon, DrawerCloseTrigger, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerPositioner, DrawerTitle, DrawerTrigger } from '@moduix/vue/drawer';
import styles from '@/components/examples/drawer/drawer-island.module.css';
</script>

<template>
  <Drawer swipe-direction="end"><DrawerTrigger as-child><Button>Open island drawer</Button></DrawerTrigger><DrawerBackdrop /><DrawerPositioner><DrawerContent variant="island"><DrawerHeader><DrawerTitle>Quick actions</DrawerTitle><DrawerCloseIcon /><DrawerDescription>This drawer floats inside the viewport edge.</DrawerDescription></DrawerHeader><DrawerBody :class="styles.body"><Card size="sm" :class="styles.card"><CardBody>Choose an action without leaving your current context.</CardBody></Card></DrawerBody><DrawerFooter><DrawerCloseTrigger as-child><Button variant="outline">Done</Button></DrawerCloseTrigger></DrawerFooter></DrawerContent></DrawerPositioner></Drawer>
</template>
