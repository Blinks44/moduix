<script lang="ts">
  import { Separator } from '@moduix/svelte/separator';
  import styles from '@/components/examples/separator/separator-vertical.module.css';

  const navigationItems = [
    { href: '#home', label: 'Home' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#sign-in', label: 'Sign in' },
  ];
</script>

<nav aria-label="Main navigation" class={styles.root}>
  {#each navigationItems.slice(0, 2) as item (item.href)}
    <a href={item.href} class={styles.link}>
      {item.label}
    </a>
  {/each}
  <Separator orientation="vertical" />
  <a href={navigationItems[2].href} class={styles.link}>{navigationItems[2].label}</a>
</nav>