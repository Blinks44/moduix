<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerContent,
  DrawerHeader,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
  type DrawerSize,
} from '@moduix/vue/drawer';
import styles from '@/components/examples/drawer/drawer-sizes.module.css';

const sizes: DrawerSize[] = ['sm', 'md', 'lg', 'xl'];
</script>

<template>
  <div :class="styles.row">
    <Drawer v-for="size in sizes" :key="size" swipe-direction="end">
      <DrawerTrigger as-child
        ><Button variant="outline">Open {{ size }}</Button></DrawerTrigger
      >
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent :size="size">
          <DrawerHeader>
            <DrawerTitle>Size {{ size }}</DrawerTitle>
            <DrawerCloseIcon />
          </DrawerHeader>
          <DrawerBody>
            The size prop picks the width of a side drawer. On narrow screens the drawer leaves a
            gap at the opposite edge.
          </DrawerBody>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  </div>
</template>