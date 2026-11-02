import { useState } from 'react';
import { AppShell, type AppPage } from './app-shell';
import styles from './app-shell-example.module.css';

export function AppShellExample() {
  const [page, setPage] = useState<AppPage>('Projects');

  return (
    <div className={styles.preview}>
      <AppShell page={page} onNavigate={setPage}>
        <h1>{page}</h1>
        <p>Your workspace content goes here.</p>
      </AppShell>
    </div>
  );
}