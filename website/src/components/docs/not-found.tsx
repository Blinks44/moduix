import { useI18n, useSite } from '@rspress/core/runtime';
import { Link, SearchButton } from '@rspress/core/theme';
import { Blocks, Component, House, Rocket } from 'lucide-react';
import { useLocalizedPath } from '@/utils/localized-path';
import styles from './not-found.module.css';

// The 404 frame in Moduix.sketch. The search field opens the header's search panel, so only one
// panel listens for ⌘K.
function openHeaderSearch() {
  document.querySelector<HTMLElement>('.rp-nav .rp-search-button')?.click();
}

export function NotFound() {
  const t = useI18n<typeof import('i18n')>();
  const { site } = useSite();

  // Like the native 404: a default-locale prefix such as /en/docs/button redirects to /docs/button.
  if (site.lang && typeof window !== 'undefined') {
    const prefix = new RegExp(`/${site.lang}(/|$)`);
    if (prefix.test(location.pathname)) {
      location.replace(location.pathname.replace(prefix, '/'));
      return null;
    }
  }

  const links = [
    { href: useLocalizedPath('/docs/quick-start'), label: t('notFoundQuickStart'), icon: Rocket },
    { href: useLocalizedPath('/docs/components'), label: t('navComponents'), icon: Component },
    { href: useLocalizedPath('/blocks'), label: t('navBlocks'), icon: Blocks },
    { href: useLocalizedPath('/'), label: t('notFoundHome'), icon: House },
  ];

  return (
    <main className={styles.root}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>{t('notFoundTitle')}</h1>
      <p className={styles.description}>{t('notFoundDescription')}</p>
      <div className={styles.search}>
        <SearchButton setFocused={openHeaderSearch} />
      </div>
      <nav className={styles.links}>
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <Icon aria-hidden="true" />
            {label}
          </Link>
        ))}
      </nav>
    </main>
  );
}