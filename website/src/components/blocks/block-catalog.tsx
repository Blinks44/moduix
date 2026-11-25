import { useI18n, useLang, usePages } from '@rspress/core/runtime';
import { Link } from '@rspress/core/theme';
import { ArrowUpRight } from 'lucide-react';
import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from 'react';
import { ScaledPreview } from '../docs/scaled-preview';
import styles from './block-catalog.module.css';

const prevent = (event: { preventDefault: () => void }) => event.preventDefault();

const AppHeader = lazy(() => import('./app-header').then((m) => ({ default: m.AppHeader })));
const SidebarDashboard = lazy(() =>
  import('./sidebar-dashboard').then((m) => ({ default: m.SidebarDashboard })),
);
const AppShellCard = lazy(() =>
  import('./app-shell/app-shell-example').then((m) => ({
    default: () => (
      <m.AppShellPreview>
        <m.AppShellExample />
      </m.AppShellPreview>
    ),
  })),
);
const ProjectsDashboard = lazy(() =>
  import('./projects-dashboard').then((m) => ({ default: m.ProjectsDashboard })),
);
const LoginSimple = lazy(() =>
  import('./login-simple/login-simple').then((m) => ({
    default: () => <m.LoginSimple onSubmit={prevent} />,
  })),
);
const SignUp = lazy(() =>
  import('./sign-up/sign-up').then((m) => ({ default: () => <m.SignUp onSubmit={prevent} /> })),
);
const ForgotPassword = lazy(() =>
  import('./forgot-password/forgot-password').then((m) => ({
    default: () => <m.ForgotPassword onSubmit={prevent} />,
  })),
);
const ResetPassword = lazy(() =>
  import('./reset-password/reset-password').then((m) => ({
    default: () => <m.ResetPassword onSubmit={prevent} />,
  })),
);
const VerificationCode = lazy(() =>
  import('./verification-code/verification-code').then((m) => ({
    default: () => <m.VerificationCode onSubmit={prevent} />,
  })),
);
const DataTableBasic = lazy(() => import('./data-table/basic'));
const AnalyticsOverview = lazy(() =>
  import('./analytics-overview').then((m) => ({ default: m.AnalyticsOverview })),
);
const FileUploadManager = lazy(() =>
  import('./file-upload-manager').then((m) => ({ default: m.FileUploadManager })),
);
const ExpandableAvatarGroup = lazy(() =>
  import('./expandable-avatar-group').then((m) => ({ default: m.ExpandableAvatarGroup })),
);
const AutoplayGallery = lazy(() =>
  import('./autoplay-gallery').then((m) => ({ default: m.AutoplayGallery })),
);
const ParallaxCard = lazy(() =>
  import('./parallax-card').then((m) => ({ default: m.ParallaxCard })),
);

// Docs · Blocks in Moduix.sketch. Each card previews the real block, laid out at `width` and scaled
// to the card, so the preview never drifts from the block page. Order follows the blocks sidebar.
const blocks: { slug: string; width: number; Component: ComponentType }[] = [
  { slug: 'app-header', width: 760, Component: AppHeader },
  { slug: 'sidebar-dashboard', width: 1000, Component: SidebarDashboard },
  { slug: 'app-shell', width: 1280, Component: AppShellCard },
  { slug: 'projects-dashboard', width: 1000, Component: ProjectsDashboard },
  { slug: 'login-simple', width: 420, Component: LoginSimple },
  { slug: 'sign-up', width: 420, Component: SignUp },
  { slug: 'forgot-password', width: 420, Component: ForgotPassword },
  { slug: 'reset-password', width: 420, Component: ResetPassword },
  { slug: 'verification-code', width: 420, Component: VerificationCode },
  { slug: 'data-table', width: 900, Component: DataTableBasic },
  { slug: 'analytics-overview', width: 900, Component: AnalyticsOverview },
  { slug: 'file-upload-manager', width: 520, Component: FileUploadManager },
  { slug: 'expandable-avatar-group', width: 360, Component: ExpandableAvatarGroup },
  { slug: 'autoplay-gallery', width: 720, Component: AutoplayGallery },
  { slug: 'parallax-card', width: 420, Component: ParallaxCard },
];

function LazyCardPreview({
  width,
  eager,
  children,
}: {
  width: number;
  eager: boolean;
  children: ReactNode;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(eager);

  useEffect(() => {
    if (visible) return;
    const node = hostRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={hostRef} className={styles.preview}>
      {visible ? (
        <Suspense fallback={null}>
          <ScaledPreview className={styles.preview} width={width}>
            {children}
          </ScaledPreview>
        </Suspense>
      ) : null}
    </div>
  );
}

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
        {items.map(({ slug, width, Component, page }, index) => (
          <li key={slug} className={styles.card}>
            <LazyCardPreview width={width} eager={index < 4}>
              <Component />
            </LazyCardPreview>
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