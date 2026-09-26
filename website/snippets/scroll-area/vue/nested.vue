<script setup lang="ts">
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@moduix/vue/scroll-area';
import styles from '@/components/examples/scroll-area/scroll-area-nested.module.css';

const sections = [
  {
    title: 'Outer release notes',
    body: 'The outer viewport can contain normal content and another complete ScrollArea tree.',
  },
  {
    title: 'Nested details',
    body: 'The nested root owns its own measurements, overflow state, and scrollbar parts.',
  },
];
</script>

<template>
  <ScrollArea :class="styles.root">
    <ScrollAreaViewport>
      <ScrollAreaContent>
        <div :class="styles.content">
          <section>
            <h3>Outer release notes</h3>
            <p :class="styles.description">{{ sections[0].body }}</p>
          </section>
          <ScrollArea :class="styles.nested">
            <ScrollAreaViewport>
              <ScrollAreaContent>
                <div :class="styles.nestedContent">
                  <section v-for="item in sections" :key="item.title">
                    <h3>{{ item.title }}</h3>
                    <p :class="styles.description">{{ item.body }}</p>
                  </section>
                </div>
              </ScrollAreaContent>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar>
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
            <ScrollAreaCorner />
          </ScrollArea>
        </div>
      </ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar>
      <ScrollAreaThumb />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollArea>
</template>