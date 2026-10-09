<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Card, CardBody } from '@moduix/vue/card';
import {
  Drawer,
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
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@moduix/vue/scroll-area';
import styles from '@/components/examples/drawer/drawer-non-modal.module.css';

const paragraphs = [
  'A non-modal drawer keeps quick controls visible without preventing work in the surrounding page.',
  'The grabber owns drawer movement while the content remains a normal reading and scrolling region.',
  'Scrollable content can include release notes, filters, activity history, or supporting explanation.',
  'The page outside the drawer remains available for pointer interaction and can continue to scroll independently.',
  'Use a dedicated viewport when the panel contains more content than fits beside its persistent controls.',
];
const snapPoints = [0.18, 1];
</script>

<template>
  <Drawer
    :modal="false"
    :prevent-scroll="false"
    :snap-points="snapPoints"
    :default-snap-point="snapPoints[0]"
    ><DrawerTrigger as-child><Button>Open non-modal drawer</Button></DrawerTrigger
    ><DrawerPositioner
      ><DrawerContent :draggable="false"
        ><DrawerGrabber :class="styles.grabber"
          ><DrawerGrabberIndicator :class="styles.grabberIndicator" /><DrawerHeader
            :class="styles.header"
            ><DrawerTitle>Non-modal drawer</DrawerTitle
            ><DrawerCloseIcon data-no-drag /><DrawerDescription
              >The page remains interactive while this drawer is open.</DrawerDescription
            ></DrawerHeader
          ></DrawerGrabber
        ><DrawerBody :class="styles.body"
          ><ScrollArea :class="styles.scrollArea"
            ><ScrollAreaViewport :class="styles.viewport"
              ><ScrollAreaContent :class="styles.content"
                ><Card
                  v-for="paragraph in paragraphs"
                  :key="paragraph"
                  size="sm"
                  :class="styles.card"
                  ><CardBody
                    ><p :class="styles.paragraph">{{ paragraph }}</p></CardBody
                  ></Card
                ></ScrollAreaContent
              ></ScrollAreaViewport
            ><ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar
            ><ScrollAreaCorner /></ScrollArea></DrawerBody></DrawerContent></DrawerPositioner
  ></Drawer>
</template>