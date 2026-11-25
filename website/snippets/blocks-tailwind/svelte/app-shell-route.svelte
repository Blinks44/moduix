<script lang="ts">
  import type { AppPage } from './app-shell-navigation.svelte';
  import AppShell from './app-shell.svelte';

  let page = $state<AppPage>('Projects');
</script>

<AppShell {page} onnavigate={(next) => (page = next)}>
  <h1>{page}</h1>
  <p>Your workspace content goes here.</p>
</AppShell>