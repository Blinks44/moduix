<script lang="ts">
  import {
    Listbox,
    ListboxContent,
    ListboxItem,
    ListboxItemIndicator,
    ListboxItemText,
    ListboxLabel,
    createListCollection,
  } from '@moduix/svelte/listbox';
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

<Listbox collection={albums} orientation="horizontal" class={styles.root}>
  <ListboxLabel>Select album</ListboxLabel>
  <ListboxContent>
    {#each albums.items as item (item.title)}
      <ListboxItem {item}>
        <ListboxItemText>
          {item.title}<span class={styles.artist}>{item.artist}</span>
        </ListboxItemText>
        <ListboxItemIndicator />
      </ListboxItem>
    {/each}
  </ListboxContent>
</Listbox>