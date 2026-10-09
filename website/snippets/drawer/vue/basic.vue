<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerHeader,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from '@moduix/vue/drawer';
import styles from '@/components/examples/drawer/drawer-basic.module.css';

const snapPoints = [0.45, 1];
const notifications = [
  'Your weekly report is ready to review.',
  'Maya mentioned you in the project update.',
  'Two tasks are due tomorrow.',
];
</script>

<template>
  <Drawer :snap-points="snapPoints" :default-snap-point="snapPoints[0]">
    <DrawerTrigger as-child><Button>Open drawer</Button></DrawerTrigger>
    <DrawerBackdrop />
    <DrawerPositioner>
      <DrawerContent>
        <DrawerGrabber><DrawerGrabberIndicator /></DrawerGrabber>
        <DrawerHeader
          ><DrawerTitle>Notifications</DrawerTitle><DrawerCloseIcon /><DrawerDescription
            >Three updates need your attention.</DrawerDescription
          ></DrawerHeader
        >
        <DrawerBody :class="styles.body"
          ><ul>
            <li v-for="notification in notifications" :key="notification">{{ notification }}</li>
          </ul></DrawerBody
        >
        <DrawerFooter
          ><Button>View inbox</Button
          ><DrawerCloseTrigger as-child
            ><Button variant="outline">Close</Button></DrawerCloseTrigger
          ></DrawerFooter
        >
      </DrawerContent>
    </DrawerPositioner>
  </Drawer>
</template>