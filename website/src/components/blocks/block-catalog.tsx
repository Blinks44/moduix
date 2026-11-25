import { useI18n, useLang, usePages } from '@rspress/core/runtime';
import { Link } from '@rspress/core/theme';
import { ArrowUpRight, Check, Search, Terminal } from 'lucide-react';
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
import { useExampleSelection } from '../mdx/example-panel';
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
const SettingsPage = lazy(() =>
  import('./settings-page').then((m) => ({ default: m.SettingsPage })),
);
const PricingPlans = lazy(() =>
  import('./pricing-plans').then((m) => ({ default: m.PricingPlans })),
);
const EmptyStates = lazy(() => import('./empty-states').then((m) => ({ default: m.EmptyStates })));
const AiChat = lazy(() => import('./ai-chat').then((m) => ({ default: m.AiChat })));
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

const categories = [
  { id: 'all', label: 'All' },
  { id: 'app', label: 'App' },
  { id: 'saas', label: 'SaaS' },
  { id: 'access', label: 'Access' },
  { id: 'data', label: 'Data' },
  { id: 'people', label: 'People' },
  { id: 'visuals', label: 'Visuals' },
] as const;

type BlockCategory = Exclude<(typeof categories)[number]['id'], 'all'>;

type BlockEntry = {
  slug: string;
  category: BlockCategory;
  keywords: string;
  width: number;
  Component: ComponentType;
};

// Docs · Blocks in Moduix.sketch. Each card previews the real block, laid out at `width` and scaled
// to the card, so the preview never drifts from the block page. Order follows the blocks sidebar.
const blocks: BlockEntry[] = [
  {
    slug: 'app-header',
    category: 'app',
    keywords: 'navbar navigation search command account menu',
    width: 760,
    Component: AppHeader,
  },
  {
    slug: 'sidebar-dashboard',
    category: 'app',
    keywords: 'layout navigation workspace sidebar',
    width: 1000,
    Component: SidebarDashboard,
  },
  {
    slug: 'app-shell',
    category: 'app',
    keywords: 'layout frame drawer responsive navigation',
    width: 1280,
    Component: AppShellCard,
  },
  {
    slug: 'projects-dashboard',
    category: 'app',
    keywords: 'crud tracker metrics table dialog toast',
    width: 1000,
    Component: ProjectsDashboard,
  },
  {
    slug: 'settings-page',
    category: 'app',
    keywords: 'account profile preferences notifications danger zone security',
    width: 760,
    Component: SettingsPage,
  },
  {
    slug: 'pricing-plans',
    category: 'saas',
    keywords: 'billing subscription tiers plans monthly yearly checkout',
    width: 960,
    Component: PricingPlans,
  },
  {
    slug: 'empty-states',
    category: 'saas',
    keywords: 'zero state no results inbox permissions placeholder',
    width: 700,
    Component: EmptyStates,
  },
  {
    slug: 'ai-chat',
    category: 'saas',
    keywords: 'assistant llm copilot prompt messages conversation',
    width: 720,
    Component: AiChat,
  },
  {
    slug: 'login-simple',
    category: 'access',
    keywords: 'auth sign in email password form',
    width: 420,
    Component: LoginSimple,
  },
  {
    slug: 'sign-up',
    category: 'access',
    keywords: 'auth register onboarding account form',
    width: 420,
    Component: SignUp,
  },
  {
    slug: 'forgot-password',
    category: 'access',
    keywords: 'auth recovery email form',
    width: 420,
    Component: ForgotPassword,
  },
  {
    slug: 'reset-password',
    category: 'access',
    keywords: 'auth password update form',
    width: 420,
    Component: ResetPassword,
  },
  {
    slug: 'verification-code',
    category: 'access',
    keywords: 'auth otp 2fa mfa pin code',
    width: 420,
    Component: VerificationCode,
  },
  {
    slug: 'data-table',
    category: 'data',
    keywords: 'grid sorting filtering pagination tanstack table',
    width: 900,
    Component: DataTableBasic,
  },
  {
    slug: 'analytics-overview',
    category: 'data',
    keywords: 'charts kpi revenue sparklines metrics dashboard',
    width: 900,
    Component: AnalyticsOverview,
  },
  {
    slug: 'file-upload-manager',
    category: 'data',
    keywords: 'dropzone attachments upload files',
    width: 520,
    Component: FileUploadManager,
  },
  {
    slug: 'expandable-avatar-group',
    category: 'people',
    keywords: 'team members collaborators stack avatars',
    width: 360,
    Component: ExpandableAvatarGroup,
  },
  {
    slug: 'autoplay-gallery',
    category: 'visuals',
    keywords: 'carousel media slider images',
    width: 720,
    Component: AutoplayGallery,
  },
  {
    slug: 'parallax-card',
    category: 'visuals',
    keywords: 'tilt hover motion showcase card',
    width: 420,
    Component: ParallaxCard,
  },
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
  const { framework, styling } = useExampleSelection();
  const [activeCategory, setActiveCategory] = useState<'all' | BlockCategory>('all');
  const [query, setQuery] = useState('');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

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

  const namespace = `${framework.value}${styling.value === 'tailwind' ? '-tailwind' : ''}`;
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = items.filter((item) => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (!normalizedQuery) return true;
    const haystack =
      `${item.page.title} ${item.page.description ?? ''} ${item.slug} ${item.category} ${item.keywords}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  const copyCli = async (slug: string) => {
    const command = `pnpm dlx shadcn@latest add @moduix-${namespace}/${slug}`;
    await navigator.clipboard.writeText(command);
    setCopiedSlug(slug);
    setTimeout(() => {
      setCopiedSlug((current) => (current === slug ? null : current));
    }, 1500);
  };

  return (
    <>
      <p className={`rp-not-doc ${styles.note}`}>{note}</p>

      <div className={`rp-not-doc ${styles.toolbar}`}>
        <label className={styles.search}>
          <Search aria-hidden="true" />
          <input
            type="search"
            value={query}
            placeholder="Search blocks (pricing, settings, auth, chat…)"
            aria-label="Search blocks"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className={styles.filters} role="group" aria-label="Filter blocks by category">
          {categories.map((category) => {
            const count =
              category.id === 'all'
                ? items.length
                : items.filter((item) => item.category === category.id).length;
            return (
              <button
                key={category.id}
                type="button"
                className={styles.filterChip}
                aria-pressed={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              >
                <span>{category.label}</span>
                <span className={styles.count}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={`rp-not-doc ${styles.empty}`}>
          <p>No blocks matched “{query}”.</p>
          <button
            type="button"
            className={styles.resetButton}
            onClick={() => {
              setQuery('');
              setActiveCategory('all');
            }}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <ul className={`rp-not-doc ${styles.grid}`}>
          {filtered.map(({ slug, width, Component, page }, index) => {
            const isCopied = copiedSlug === slug;
            return (
              <li key={slug} className={styles.card}>
                <LazyCardPreview width={width} eager={index < 4}>
                  <Component />
                </LazyCardPreview>
                <div className={styles.footer}>
                  <div className={styles.meta}>
                    <Link className={styles.title} href={page.routePath}>
                      {page.title}
                    </Link>
                    <p className={styles.description}>{page.description}</p>
                  </div>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.cliButton}
                      aria-label={`Copy CLI command for ${page.title}`}
                      title={`pnpm dlx shadcn@latest add @moduix-${namespace}/${slug}`}
                      onClick={() => copyCli(slug)}
                    >
                      {isCopied ? <Check aria-hidden="true" /> : <Terminal aria-hidden="true" />}
                      <span>{isCopied ? 'Copied' : 'CLI'}</span>
                    </button>
                    <Link
                      className={styles.open}
                      href={page.routePath}
                      aria-label={`${t('blockPreview')}: ${page.title}`}
                    >
                      {t('blockPreview')}
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}