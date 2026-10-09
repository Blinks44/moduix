<script setup lang="ts">
import {
  Drawer,
  DrawerBackdrop,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from '../../src/components/drawer';
</script>

<template>
  <Drawer default-open :portalled="false">
    <DrawerTrigger>Open drawer</DrawerTrigger>
    <DrawerBackdrop />
    <DrawerPositioner
      ><DrawerContent>
        <DrawerTitle>Preferences</DrawerTitle>
        <DrawerDescription>Description</DrawerDescription>
        <DrawerCloseTrigger>Close drawer</DrawerCloseTrigger>
      </DrawerContent></DrawerPositioner
    >
  </Drawer>
</template>