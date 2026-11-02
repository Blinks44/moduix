import { createSignal } from 'solid-js';
import { AppShell, type AppPage } from './app-shell';

export function WorkspaceRoute() {
  const [page, setPage] = createSignal<AppPage>('Projects');

  return (
    <AppShell page={page()} onNavigate={setPage}>
      <h1>{page()}</h1>
      <p>Your workspace content goes here.</p>
    </AppShell>
  );
}