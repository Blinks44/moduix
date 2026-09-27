<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Card, CardBody } from '@moduix/vue/card';
import { DrawerBackdrop, DrawerBody, DrawerCloseIcon, DrawerCloseTrigger, DrawerContent, DrawerDescription, DrawerFooter, DrawerGrabber, DrawerGrabberIndicator, DrawerHeader, DrawerPositioner, DrawerRootProvider, DrawerTitle, useDrawer } from '@moduix/vue/drawer';
import styles from '@/components/examples/drawer/drawer-nested.module.css';

const items = ['Passkeys enabled', 'Two-factor authentication on', '3 signed-in devices'];
const snapPoints = [0.42, 1];
const accountDrawer = useDrawer({ snapPoints, defaultSnapPoint: snapPoints[0] });
const securityDrawer = useDrawer({ snapPoints, defaultSnapPoint: snapPoints[0] });
</script>

<template>
  <div><Button @click="accountDrawer.setOpen(true)">Open account drawer</Button><DrawerRootProvider :value="accountDrawer"><DrawerBackdrop /><DrawerPositioner><DrawerContent><DrawerGrabber><DrawerGrabberIndicator /></DrawerGrabber><DrawerHeader><DrawerTitle>Account</DrawerTitle><DrawerCloseIcon /><DrawerDescription>Review account preferences.</DrawerDescription></DrawerHeader><DrawerBody :class="styles.body"><Card size="sm" :class="styles.card"><CardBody><Button variant="outline" @click="securityDrawer.setOpen(true)">Security settings</Button></CardBody></Card></DrawerBody></DrawerContent></DrawerPositioner></DrawerRootProvider><DrawerRootProvider :value="securityDrawer"><DrawerPositioner><DrawerContent><DrawerGrabber><DrawerGrabberIndicator /></DrawerGrabber><DrawerHeader><DrawerTitle>Security</DrawerTitle><DrawerCloseIcon /><DrawerDescription>Nested drawers keep their own focus state.</DrawerDescription></DrawerHeader><DrawerBody :class="styles.body"><Card size="sm" :class="styles.card"><CardBody><ul><li v-for="item in items" :key="item">{{ item }}</li></ul></CardBody></Card></DrawerBody><DrawerFooter><DrawerCloseTrigger as-child><Button variant="outline">Done</Button></DrawerCloseTrigger></DrawerFooter></DrawerContent></DrawerPositioner></DrawerRootProvider></div>
</template>
