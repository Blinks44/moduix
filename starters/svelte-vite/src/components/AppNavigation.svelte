<script lang="ts">
  import type { Page } from '../data';

  let {
    page,
    workspace,
    onNavigate,
  }: { page: Page; workspace: string; onNavigate: (page: Page) => void } = $props();
  const pages: Page[] = ['Projects', 'Team', 'Reports', 'Settings'];
</script>

<div class="brand">
  <span class="brand-mark">A</span>
  <div>
    <strong>{workspace}</strong><span>moduix + Svelte</span>
  </div>
</div>
<nav aria-label="Workspace">
  <p class="nav-heading">Workspace</p>
  {#each pages as item (item)}
    <button
      class="nav-item"
      aria-current={page === item ? 'page' : undefined}
      onclick={() => onNavigate(item)}
    >
      {item}
    </button>
  {/each}
  <p class="nav-heading resources">Resources</p>
  <a class="nav-item" href="https://moduix.dev/docs/quick-start">Documentation</a><a
    class="nav-item"
    href="https://moduix.dev/docs/components">Components</a
  >
</nav>
<div class="user">
  <span class="avatar">AL</span>
  <div><strong>Ada Lovelace</strong><span>ada@acme.dev</span></div>
</div>