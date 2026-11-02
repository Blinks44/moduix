'use client';

import { useState } from 'react';
import { AppShell, type AppPage } from './app-shell';

export function WorkspaceRoute() {
  const [page, setPage] = useState<AppPage>('Projects');

  return (
    <AppShell page={page} onNavigate={setPage}>
      <h1>{page}</h1>
      <p>Your workspace content goes here.</p>
    </AppShell>
  );
}