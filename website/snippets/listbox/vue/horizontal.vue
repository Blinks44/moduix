<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxItemTextContent,
  ListboxItemTextLabel,
  ListboxLabel,
} from '@moduix/vue/listbox';
import styles from '@/components/examples/listbox/listbox-horizontal.module.css';

const albums = createListCollection({
  items: [
    { title: 'Midnight Dreams', artist: 'Luna Ray' },
    { title: 'Neon Skyline', artist: 'The Electric' },
    { title: 'Acoustic Sessions', artist: 'Sarah Woods' },
    { title: 'Urban Echoes', artist: 'Metro Collective' },
    { title: 'Summer Vibes', artist: 'Coastal Waves' },
  ],
  itemToValue: (item) => item.title,
  itemToString: (item) => item.title,
});
</script>

<template>
  <Listbox :collection="albums" orientation="horizontal" :class="styles.horizontalRoot">
    <ListboxLabel>Select album</ListboxLabel>
    <ListboxContent>
      <ListboxItem v-for="item in albums.items" :key="item.title" :item="item">
        <ListboxItemText>
          <ListboxItemTextContent :class="styles.albumText">
            <ListboxItemTextLabel>{{ item.title }}</ListboxItemTextLabel>
            <span :class="styles.artist">{{ item.artist }}</span>
          </ListboxItemTextContent>
        </ListboxItemText>
        <ListboxItemIndicator />
      </ListboxItem>
    </ListboxContent>
  </Listbox>
</template>