<script lang="ts">
  import { MarqueeItem } from '@/components/marquee';
  import styles from './Marquee.stories.module.css';
  import { partners } from './partners';
</script>

{#each partners as item (item.name)}
  <MarqueeItem class={styles.item}>
    <span class={styles.mark}>{item.mark}</span>
    <span>{item.name}</span>
  </MarqueeItem>
{/each}