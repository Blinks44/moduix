import { useI18n, useLang, usePages } from '@rspress/core/runtime';
import { Link } from '@rspress/core/theme';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { ScaledPreview } from '../docs/scaled-preview';
import { AnalyticsOverview } from './analytics-overview';
import { AppHeader } from './app-header';
import { AppShellExample, AppShellPreview } from './app-shell/app-shell-example';
import { AutoplayGallery } from './autoplay-gallery';
import styles from './block-catalog.module.css';
import DataTableBasic from './data-table/basic';
import { ExpandableAvatarGroup } from './expandable-avatar-group';
import { FileUploadManager } from './file-upload-manager';
import { ForgotPassword } from './forgot-password/forgot-password';
import { LoginSimple } from './login-simple/login-simple';
import { ParallaxCard } from './parallax-card';
import { ResetPassword } from './reset-password/reset-password';
import { SidebarDashboard } from './sidebar-dashboard';
import { SignUp } from './sign-up/sign-up';
import { VerificationCode } from './verification-code/verification-code';

const prevent = (event: { preventDefault: () => void }) => event.preventDefault();

// Docs · Blocks in Moduix.sketch. Each card previews the real block, laid out at `width` and scaled
// to the card, so the preview never drifts from the block page. Order follows the blocks sidebar.
const blocks: { slug: string; width: number; preview: ReactNode }[] = [
  { slug: 'app-header', width: 760, preview: <AppHeader /> },
  { slug: 'sidebar-dashboard', width: 1000, preview: <SidebarDashboard /> },
  {
    slug: 'app-shell',
    width: 1280,
    preview: (
      <AppShellPreview>
        <AppShellExample />
      </AppShellPreview>
    ),
  },
  { slug: 'login-simple', width: 420, preview: <LoginSimple onSubmit={prevent} /> },
  { slug: 'sign-up', width: 420, preview: <SignUp onSubmit={prevent} /> },
  { slug: 'forgot-password', width: 420, preview: <ForgotPassword onSubmit={prevent} /> },
  { slug: 'reset-password', width: 420, preview: <ResetPassword onSubmit={prevent} /> },
  { slug: 'verification-code', width: 420, preview: <VerificationCode onSubmit={prevent} /> },
  { slug: 'data-table', width: 900, preview: <DataTableBasic /> },
  { slug: 'analytics-overview', width: 900, preview: <AnalyticsOverview /> },
  { slug: 'file-upload-manager', width: 520, preview: <FileUploadManager /> },
  { slug: 'expandable-avatar-group', width: 360, preview: <ExpandableAvatarGroup /> },
  { slug: 'autoplay-gallery', width: 720, preview: <AutoplayGallery /> },
  { slug: 'parallax-card', width: 420, preview: <ParallaxCard /> },
];

export function BlockCatalog({ note }: { note: string }) {
  const t = useI18n<typeof import('i18n')>();
  const lang = useLang();
  const { pages } = usePages();
  const items = blocks.flatMap((block) => {
    const page = pages.find(
      (item) => item.lang === lang && item.routePath.endsWith(`/blocks/${block.slug}`),
    );
    return page ? [{ ...block, page }] : [];
  });

  if (import.meta.env.SSG_MD) {
    return items
      .map(({ page }) => `- [${page.title}](${page.routePath}.md): ${page.description ?? ''}`)
      .join('\n');
  }

  return (
    <>
      <p className={`rp-not-doc ${styles.note}`}>{note}</p>
      <ul className={`rp-not-doc ${styles.grid}`}>
        {items.map(({ slug, width, preview, page }) => (
          <li key={slug} className={styles.card}>
            <ScaledPreview className={styles.preview} width={width}>
              {preview}
            </ScaledPreview>
            <div className={styles.footer}>
              <div>
                <Link className={styles.title} href={page.routePath}>
                  {page.title}
                </Link>
                <p className={styles.description}>{page.description}</p>
              </div>
              <Link
                className={styles.open}
                href={page.routePath}
                aria-label={`${t('blockPreview')}: ${page.title}`}
              >
                {t('blockPreview')}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}