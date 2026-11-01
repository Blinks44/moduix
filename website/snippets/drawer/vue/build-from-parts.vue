<script setup lang="ts">
import { X as XIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import { Card, CardBody } from '@moduix/vue/card';
import { CloseButton } from '@moduix/vue/close-button';
import {
  Drawer,
  DrawerBackdrop,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from '@moduix/vue/drawer';
import styles from '@/components/examples/drawer/drawer-build-from-parts.module.css';

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
        <div :class="styles.header">
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerCloseTrigger as-child>
            <CloseButton aria-label="Close drawer" :class="styles.closeButton">
              <XIcon :stroke-width="3" />
            </CloseButton>
          </DrawerCloseTrigger>
          <DrawerDescription :class="styles.description">
            Three updates need your attention.
          </DrawerDescription>
        </div>
        <div :class="styles.body">
          <Card size="sm" :class="styles.card">
            <CardBody>
              <ul>
                <li v-for="notification in notifications" :key="notification">
                  {{ notification }}
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
        <div :class="styles.footer">
          <Button>View inbox</Button>
          <DrawerCloseTrigger as-child><Button variant="outline">Close</Button></DrawerCloseTrigger>
        </div>
      </DrawerContent>
    </DrawerPositioner>
  </Drawer>
</template>