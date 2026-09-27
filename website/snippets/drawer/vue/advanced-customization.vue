<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Card, CardBody } from '@moduix/vue/card';
import { Checkbox, CheckboxControl, CheckboxHiddenInput, CheckboxLabel } from '@moduix/vue/checkbox';
import { Drawer, DrawerBackdrop, DrawerCloseTrigger, DrawerContent, DrawerDescription, DrawerGrabber, DrawerGrabberIndicator, DrawerPositioner, DrawerTitle, DrawerTrigger } from '@moduix/vue/drawer';
import styles from '@/components/examples/drawer/drawer-advanced-customization.module.css';
</script>

<template>
  <Drawer swipe-direction="end"><DrawerTrigger as-child><Button>Open preferences</Button></DrawerTrigger><DrawerBackdrop /><DrawerPositioner><DrawerContent :class="styles.content"><DrawerGrabber><DrawerGrabberIndicator /></DrawerGrabber><DrawerTitle>Preferences</DrawerTitle><DrawerDescription>Choose how you want notifications delivered.</DrawerDescription><Card size="sm" :class="styles.card"><CardBody><Checkbox default-checked><CheckboxControl /><CheckboxLabel>Email notifications</CheckboxLabel><CheckboxHiddenInput /></Checkbox></CardBody></Card><DrawerCloseTrigger as-child><Button variant="outline">Done</Button></DrawerCloseTrigger></DrawerContent></DrawerPositioner></Drawer>
</template>
