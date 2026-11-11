<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { List, ListIndicator, ListItem } from '@/components/list';
  import AccentListItem from './AccentListItem.svelte';
  import styles from './List.stories.module.css';
  import ReleaseList from './ReleaseList.svelte';

  const defaultItems = [
    'Use semantic list markup for grouped content.',
    'Keep spacing and typography on the library scale.',
    'Style markers with native ::marker selectors.',
  ];

  const { Story } = defineMeta({
    title: 'Components/List',
    component: List,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Basic" asChild>
  <List class={styles.list}>
    {#each defaultItems as item (item)}<ListItem>{item}</ListItem>{/each}
  </List>
</Story>

<Story name="Ordered" asChild>
  <List as="ol" start={3} class={styles.list}>
    <ListItem>Prepare the release notes.</ListItem>
    <ListItem>Publish the package.</ListItem>
    <ListItem>Announce the release.</ListItem>
  </List>
</Story>

<Story name="Markerless" asChild>
  <List marker="none" class={styles.list}>
    <ListItem>Semantics stay intact without visible markers.</ListItem>
    <ListItem>Useful for grouped metadata or key-value blocks.</ListItem>
    <ListItem>Spacing and text tokens still come from the root.</ListItem>
  </List>
</Story>

<Story name="Row" asChild>
  <List marker="none" class={styles.rowList}>
    <ListItem>Semantic HTML</ListItem>
    <ListItem>Responsive spacing</ListItem>
    <ListItem>Composable styling</ListItem>
  </List>
</Story>

<Story name="Sizes" asChild>
  <div class={styles.stack}>
    <List size="xs">
      <ListItem>Compact supporting content.</ListItem>
      <ListItem>Still uses native list semantics and markers.</ListItem>
    </List>
    <List size="md">
      <ListItem>Default body content for a release summary.</ListItem>
      <ListItem
        >Items can wrap across multiple lines without losing their marker alignment.</ListItem
      >
    </List>
    <List size="xl">
      <ListItem>Large, high-emphasis content.</ListItem>
      <ListItem>Use this scale sparingly for short, scannable statements.</ListItem>
    </List>
  </div>
</Story>

<Story name="Tones" asChild>
  <div class={styles.stack}>
    <List tone="muted"><ListItem>Muted list tone</ListItem></List>
    <List tone="primary"><ListItem>Primary list tone</ListItem></List>
    <List tone="destructive"><ListItem>Destructive list tone</ListItem></List>
  </div>
</Story>

<Story name="Native Items" asChild>
  <List class={styles.list}>
    <li>Use native li elements when a wrapper component is unnecessary.</li>
    <li>The root still controls spacing, marker style, size, and tone.</li>
    <li>Reach for ListItem when you want the stable item slot.</li>
  </List>
</Story>

<Story name="Advanced Customization" exportName="CustomItemComposition" asChild>
  <List class={styles.accentList}>
    <ListItem
      >{#snippet asChild(props)}<AccentListItem {...props()}
          >Native markers stay available for per-item styling.</AccentListItem
        >{/snippet}</ListItem
    >
    <ListItem
      >{#snippet asChild(props)}<AccentListItem {...props()}
          >A class on the root still controls the indentation.</AccentListItem
        >{/snippet}</ListItem
    >
    <ListItem
      >{#snippet asChild(props)}<AccentListItem {...props()}
          >asChild keeps the semantic li contract for a custom item.</AccentListItem
        >{/snippet}</ListItem
    >
  </List>
</Story>

<Story name="Custom Root Composition" asChild>
  <List
    >{#snippet asChild(props)}<ReleaseList {...props({ class: styles.list })}>
        <ListItem>Prepare the release notes.</ListItem>
        <ListItem>Publish the package.</ListItem>
        <ListItem>Announce the release.</ListItem>
      </ReleaseList>{/snippet}</List
  >
</Story>

<Story name="Nested" asChild>
  <List class={styles.list}>
    <ListItem>
      Prepare the release
      <List as="ol">
        <ListItem>Update the changelog.</ListItem>
        <ListItem>Bump the package versions.</ListItem>
      </List>
    </ListItem>
    <ListItem>Publish the packages.</ListItem>
  </List>
</Story>

<Story name="With Indicator" asChild>
  <List marker="none" class={styles.list}>
    <ListItem
      ><ListIndicator
        ><svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          ><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg
        ></ListIndicator
      >Tests pass in every adapter.</ListItem
    >
    <ListItem
      ><ListIndicator
        ><svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          ><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg
        ></ListIndicator
      >Long items wrap next to the indicator instead of under it, so the text stays aligned.</ListItem
    >
  </List>
</Story>