<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Card, CardBody } from '@moduix/vue/card';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerContent,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPositioner,
  DrawerStack,
  DrawerTitle,
  DrawerTrigger,
} from '@moduix/vue/drawer';
import styles from '@/components/examples/drawer/drawer-indent-background.module.css';

const snapPoints = [0.18, 1];
</script>

<template>
  <DrawerStack
    ><div :class="styles.stage">
      <DrawerIndentBackground /><Drawer
        :modal="false"
        :portalled="false"
        :snap-points="snapPoints"
        :default-snap-point="snapPoints[0]"
        ><DrawerIndent :class="styles.indent"
          ><DrawerTrigger as-child
            ><Button>Open indented drawer</Button></DrawerTrigger
          ></DrawerIndent
        ><DrawerBackdrop :class="styles.backdrop" /><DrawerPositioner :class="styles.positioner"
          ><DrawerContent
            ><DrawerGrabber><DrawerGrabberIndicator /></DrawerGrabber
            ><DrawerHeader><DrawerTitle>Indent effect</DrawerTitle><DrawerCloseIcon /></DrawerHeader
            ><DrawerBody :class="styles.body"
              ><Card size="sm" :class="styles.card"
                ><CardBody>The background and surface move together.</CardBody></Card
              ></DrawerBody
            ></DrawerContent
          ></DrawerPositioner
        ></Drawer
      >
    </div></DrawerStack
  >
</template>