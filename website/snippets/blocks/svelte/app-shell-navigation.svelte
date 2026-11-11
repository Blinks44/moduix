<script module lang="ts">
  export type AppPage = 'Projects' | 'Team' | 'Reports' | 'Settings';
</script>

<script lang="ts">
  import styles from './app-shell.module.css';

  let {
    page,
    workspace,
    onnavigate,
  }: { page: AppPage; workspace: string; onnavigate?: (page: AppPage) => void } = $props();
  const pages: AppPage[] = ['Projects', 'Team', 'Reports', 'Settings'];
</script>

<div class={styles.brand}>
  <span class={styles.brandMark}>A</span>
  <div>
    <strong>{workspace}</strong><span>moduix + Svelte</span>
  </div>
</div>
<nav aria-label="Workspace">
  <p class={styles.navHeading}>Workspace</p>
  {#each pages as item (item)}
    <button
      type="button"
      class={styles.navItem}
      aria-current={page === item ? 'page' : undefined}
      onclick={() => onnavigate?.(item)}
    >
      {item}
    </button>
  {/each}
  <p class={[styles.navHeading, styles.resources]}>Resources</p>
  <a class={styles.navItem} href="https://moduix.dev/docs/quick-start">Documentation</a>
  <a class={styles.navItem} href="https://moduix.dev/docs/components">Components</a>
</nav>
<div class={styles.user}>
  <span class={styles.avatar}>AL</span>
  <div><strong>Ada Lovelace</strong><span>ada@acme.dev</span></div>
</div>