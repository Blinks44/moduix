<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Card, CardBody } from '@moduix/vue/card';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerContent,
  DrawerDescription,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerHeader,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from '@moduix/vue/drawer';
import styles from '@/components/examples/drawer/drawer-drag-controls.module.css';

const snapPoints = [0.18, 1];
</script>

<template>
  <Drawer :snap-points="snapPoints" :default-snap-point="snapPoints[0]"
    ><DrawerTrigger as-child><Button>Open drawer</Button></DrawerTrigger
    ><DrawerBackdrop /><DrawerPositioner
      ><DrawerContent
        ><DrawerGrabber><DrawerGrabberIndicator /></DrawerGrabber
        ><DrawerHeader
          ><DrawerTitle>Drag controls</DrawerTitle><DrawerCloseIcon /><DrawerDescription
            >Content dragging is enabled; interactive regions do not start a
            drag.</DrawerDescription
          ></DrawerHeader
        ><DrawerBody :class="styles.body"
          ><Card size="sm" :class="styles.card"
            ><CardBody
              ><Button data-no-drag variant="outline">Interactive no-drag region</Button></CardBody
            ></Card
          ></DrawerBody
        ></DrawerContent
      ></DrawerPositioner
    ></Drawer
  >
</template>