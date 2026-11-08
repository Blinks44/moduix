<script lang="ts">
  import { LocaleProvider } from '@moduix/svelte/locale';
  import {
    Marquee,
    MarqueeContent,
    MarqueeEdge,
    MarqueeItem,
    MarqueeViewport,
  } from '@moduix/svelte/marquee';
  import styles from '@/components/examples/marquee/marquee-rtl.module.css';

  const partners = [
    { name: 'أطلس', mark: 'AT' },
    { name: 'بيكون', mark: 'BC' },
    { name: 'كومباس', mark: 'CP' },
    { name: 'دلتا', mark: 'DL' },
    { name: 'إيكو', mark: 'EC' },
    { name: 'فاوندري', mark: 'FD' },
  ];
</script>

<LocaleProvider locale="ar">
  <Marquee aria-label="شعارات الشركاء" class={styles.root}>
    <MarqueeEdge side="start" />
    <MarqueeViewport>
      <MarqueeContent>
        {#each partners as item (item.mark)}
          <MarqueeItem class={styles.item}>
            <span>{item.mark}</span>
            <span>{item.name}</span>
          </MarqueeItem>
        {/each}
      </MarqueeContent>
    </MarqueeViewport>
    <MarqueeEdge side="end" />
  </Marquee>
</LocaleProvider>