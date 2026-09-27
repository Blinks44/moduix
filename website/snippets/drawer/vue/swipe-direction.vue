<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Card, CardBody } from '@moduix/vue/card';
import { Drawer, DrawerBackdrop, DrawerBody, DrawerCloseIcon, DrawerContent, DrawerDescription, DrawerHeader, DrawerPositioner, DrawerTitle, DrawerTrigger } from '@moduix/vue/drawer';
import styles from '@/components/examples/drawer/drawer-swipe-direction.module.css';
</script>

<template>
  <div :class="styles.root"><Drawer swipe-direction="end"><DrawerTrigger as-child><Button>Open right drawer</Button></DrawerTrigger><DrawerBackdrop /><DrawerPositioner><DrawerContent><DrawerHeader><DrawerTitle>Details</DrawerTitle><DrawerCloseIcon /><DrawerDescription>Logical end resolves to the right in LTR.</DrawerDescription></DrawerHeader><DrawerBody :class="styles.body"><Card size="sm" :class="styles.card"><CardBody>The same logical direction resolves correctly in RTL.</CardBody></Card></DrawerBody></DrawerContent></DrawerPositioner></Drawer><Drawer swipe-direction="up"><DrawerTrigger as-child><Button>Open top drawer</Button></DrawerTrigger><DrawerBackdrop /><DrawerPositioner><DrawerContent><DrawerHeader><DrawerTitle>Top drawer</DrawerTitle><DrawerCloseIcon /><DrawerDescription>Swipe up to dismiss this drawer.</DrawerDescription></DrawerHeader><DrawerBody :class="styles.body"><Card size="sm" :class="styles.card"><CardBody>Check this direction on a mobile viewport.</CardBody></Card></DrawerBody></DrawerContent></DrawerPositioner></Drawer></div>
</template>
