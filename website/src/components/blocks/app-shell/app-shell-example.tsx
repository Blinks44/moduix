import { useState, type ReactNode } from 'react';
import { AppShell, type AppPage } from './app-shell';
import styles from './app-shell-example.module.css';

export function AppShellPreview({ children }: { children: ReactNode }) {
  return <div className={styles.preview}>{children}</div>;
}

export function AppShellExample() {
  const [page, setPage] = useState<AppPage>('Projects');

  return (
    <AppShell page={page} onNavigate={setPage}>
      <h1>{page}</h1>
      <p>Your workspace content goes here.</p>
    </AppShell>
  );
}