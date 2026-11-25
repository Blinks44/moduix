<script module lang="ts">
  export type AppPage = 'Projects' | 'Team' | 'Reports' | 'Settings';
</script>

<script lang="ts">
  let {
    page,
    workspace,
    onnavigate,
  }: { page: AppPage; workspace: string; onnavigate?: (page: AppPage) => void } = $props();
  const pages: AppPage[] = ['Projects', 'Team', 'Reports', 'Settings'];
</script>

<div
  class="mb-0.5 flex min-w-0 items-center gap-2.5 px-2 pt-1 pb-5 [&_div>span]:block [&_div>span]:text-xs [&_div>span]:text-muted-foreground [&_strong]:block [&_strong]:text-sm [&_strong]:font-semibold"
>
  <span
    class="grid size-control-sm flex-none place-items-center rounded-md bg-primary text-primary-foreground"
    >A</span
  >
  <div>
    <strong>{workspace}</strong><span>moduix + Svelte</span>
  </div>
</div>
<nav aria-label="Workspace">
  <p class="m-0 mb-0.5 px-3 py-1 text-xs font-semibold text-muted-foreground">Workspace</p>
  {#each pages as item (item)}
    <button
      type="button"
      class="mb-0.5 block min-h-control-sm w-full cursor-pointer rounded-md border border-transparent bg-transparent px-[0.6875rem] py-[0.3125rem] text-start text-muted-foreground no-underline hover:bg-muted focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring aria-[current=page]:border-border aria-[current=page]:bg-card aria-[current=page]:text-foreground"
      aria-current={page === item ? 'page' : undefined}
      onclick={() => onnavigate?.(item)}
    >
      {item}
    </button>
  {/each}
  <p class="m-0 mt-5 mb-0.5 px-3 py-1 text-xs font-semibold text-muted-foreground">Resources</p>
  <a
    class="mb-0.5 block min-h-control-sm w-full cursor-pointer rounded-md border border-transparent bg-transparent px-[0.6875rem] py-[0.3125rem] text-start text-muted-foreground no-underline hover:bg-muted focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring aria-[current=page]:border-border aria-[current=page]:bg-card aria-[current=page]:text-foreground"
    href="https://moduix.dev/docs/quick-start">Documentation</a
  >
  <a
    class="mb-0.5 block min-h-control-sm w-full cursor-pointer rounded-md border border-transparent bg-transparent px-[0.6875rem] py-[0.3125rem] text-start text-muted-foreground no-underline hover:bg-muted focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring aria-[current=page]:border-border aria-[current=page]:bg-card aria-[current=page]:text-foreground"
    href="https://moduix.dev/docs/components">Components</a
  >
</nav>
<div
  class="mt-auto flex items-center gap-2.5 p-2 [&_div>span]:block [&_div>span]:text-xs [&_div>span]:text-muted-foreground [&_strong]:block [&_strong]:text-sm [&_strong]:font-semibold"
>
  <span class="grid size-control-sm flex-none place-items-center rounded-full bg-border text-xs"
    >AL</span
  >
  <div><strong>Ada Lovelace</strong><span>ada@acme.dev</span></div>
</div>