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
  DrawerHeader,
  DrawerPositioner,
  DrawerTitle,
} from '@moduix/vue/drawer';
import { ref } from 'vue';
import styles from '@/components/examples/drawer/drawer-controlled.module.css';

const open = ref(false);
const snapPoints = [0.18, 1];
</script>

<template>
  <Button type="button" @click="open = !open">{{ open ? 'Close' : 'Open' }} drawer</Button>
  <Drawer v-model:open="open" :snap-points="snapPoints" :default-snap-point="snapPoints[0]"
    ><DrawerBackdrop /><DrawerPositioner
      ><DrawerContent
        ><DrawerHeader
          ><DrawerTitle>Controlled drawer</DrawerTitle><DrawerCloseIcon /><DrawerDescription
            >Open: {{ String(open) }}</DrawerDescription
          ></DrawerHeader
        ><DrawerBody :class="styles.body"
          ><Card size="sm" :class="styles.card"
            ><CardBody>The trigger and close controls update the same state.</CardBody></Card
          ></DrawerBody
        ></DrawerContent
      ></DrawerPositioner
    ></Drawer
  >
</template>