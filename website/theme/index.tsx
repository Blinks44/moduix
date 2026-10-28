import { MDXProvider } from '@mdx-js/react';
import {
  addLeadingSlash,
  addTrailingSlash,
  useDark,
  useFrontmatter,
  useHead,
  useI18n,
  useLang,
  usePage,
  useSite,
} from '@rspress/core/runtime';
import {
  CodeBlockRuntime as OriginalCodeBlockRuntime,
  FallbackHeading as OriginalFallbackHeading,
  Layout as OriginalLayout,
  Link,
  LlmsContainer,
  LlmsCopyButton,
  LlmsViewOptions,
  PackageManagerTabs,
  type RootProps,
  Tab,
  Tabs as OriginalTabs,
} from '@rspress/core/theme-original';
import { clsx } from 'clsx';
import {
  Clock,
  CornerDownLeft,
  FileText,
  Hash,
  Menu,
  Moon,
  PanelLeft,
  Search,
  Sun,
  TextAlignStart,
  X,
} from 'lucide-react';
import { Children, isValidElement, useEffect, type ComponentProps, type SVGProps } from 'react';
import './index.css';
import {
  BlockLinks,
  ComponentBreadcrumb,
  ComponentLinks,
  PageBreadcrumb,
} from '@/components/docs/component-header';
import { NavMenus } from '@/components/docs/nav-menus';
import { NotFound } from '@/components/docs/not-found';
import { BlockInstall } from '@/components/mdx/block-install';
import { ComponentInstall } from '@/components/mdx/component-install';
import {
  Card,
  Cards,
  CssPropertiesSection,
  ExampleCode,
  ExampleFrame,
  PreviewFrame,
  PrimitiveReference,
  ShadcnInstallOptions,
  StyleTrackCard,
  StyleTrackCards,
} from '@/components/mdx/Components';
import { ExamplePanel, FrameworkCode } from '@/components/mdx/example-panel';
import { PropChips, UsageCode } from '@/components/mdx/usage';
import { Tag } from './components/Tag';
import { moduixShikiTheme } from './shiki-theme';

export * from '@rspress/core/theme-original';

// Lucide icons from the Moduix.sketch Icon/* symbols. Native components import icons from
// `@rspress/core/theme`, so these named exports replace the built-in ones.
export {
  FileText as IconTitle,
  Hash as IconHeader,
  TextAlignStart as IconFile,
  CornerDownLeft as IconJump,
  PanelLeft as IconMenu,
  Search as IconSearch,
  X as IconClose,
};

// SwitchAppearance passes fill="currentColor" for its filled icons; Lucide icons are outlines.
export function IconSun(props: SVGProps<SVGSVGElement>) {
  return <Sun {...props} fill="none" />;
}

export function IconMoon(props: SVGProps<SVGSVGElement>) {
  return <Moon {...props} fill="none" />;
}

// The hamburger keeps one icon for both states; CSS shows the close icon while the nav screen is open.
export function IconSmallMenu(props: SVGProps<SVGSVGElement>) {
  return (
    <span className="moduix-hamburger-icon">
      <Menu {...props} data-state="closed" />
      <X {...props} data-state="open" />
    </span>
  );
}

function DocDescription() {
  const { frontmatter } = useFrontmatter();
  const description =
    typeof frontmatter.description === 'string' ? frontmatter.description.trim() : '';

  return description ? <p className="moduix-doc-description">{description}</p> : null;
}

// Exported so every `CodeBlockRuntime` from `@rspress/core/theme` uses the build-time Shiki theme.
// Rspress omits `theme` from the option type but spreads `shikiOptions` after its default.
export function CodeBlockRuntime({
  shikiOptions,
  ...props
}: ComponentProps<typeof OriginalCodeBlockRuntime>) {
  return (
    <OriginalCodeBlockRuntime
      height={520}
      {...props}
      shikiOptions={{ ...shikiOptions, theme: moduixShikiTheme } as typeof shikiOptions}
    />
  );
}

function SocialMetadata() {
  const t = useI18n<typeof import('i18n')>();
  const { frontmatter } = useFrontmatter();
  const { page } = usePage();
  const { site } = useSite();
  const pageTitle = typeof frontmatter.title === 'string' ? frontmatter.title : page.title;
  const component =
    typeof frontmatter.component === 'string' ? frontmatter.component.trim() : undefined;
  const isCustomPage = frontmatter.pageType === 'custom' || page.pageType === 'custom';
  const title = !pageTitle
    ? site.title
    : isCustomPage
      ? pageTitle
      : component
        ? t('seoComponentTitle').replace('{name}', pageTitle)
        : pageTitle.includes(site.title)
          ? pageTitle
          : `${pageTitle} - ${site.title}`;
  const description = page.description || site.description;

  // Rspress sets a generic "<page> - <site>" title; raise priority so search engines
  // see the framework-specific title for component pages and the full home title.
  useHead(
    {
      title,
      meta: [
        { property: 'og:title', content: title },
        { name: 'twitter:title', content: title },
        ...(description ? [{ name: 'twitter:description', content: description }] : []),
      ],
    },
    { tagPriority: 'high' },
  );

  return null;
}

function DocActions() {
  const { frontmatter } = useFrontmatter();
  const component =
    typeof frontmatter.component === 'string' ? frontmatter.component.trim() : undefined;
  const block = typeof frontmatter.block === 'string' ? frontmatter.block.trim() : undefined;

  // The wide catalog pages (Components index, Browse blocks) have no page actions in the design.
  if (import.meta.env.SSG_MD || frontmatter.pageType === 'doc-wide') return null;

  return (
    <div className="moduix-doc-actions">
      {component ? <ComponentLinks component={component} /> : null}
      {block ? <BlockLinks block={block} /> : null}
      <LlmsContainer>
        <LlmsCopyButton />
        <LlmsViewOptions />
      </LlmsContainer>
    </div>
  );
}

function DocBreadcrumb() {
  const { frontmatter } = useFrontmatter();
  const component =
    typeof frontmatter.component === 'string' ? frontmatter.component.trim() : undefined;

  if (import.meta.env.SSG_MD) return null;

  return component ? <ComponentBreadcrumb /> : <PageBreadcrumb />;
}

function DocTitle({ className, children, ...props }: ComponentProps<'h1'>) {
  const { frontmatter } = useFrontmatter();

  return (
    <>
      <DocBreadcrumb />
      <h1 className={clsx('rp-toc-include', 'moduix-doc-title', className)} {...props}>
        {children} <Tag tag={frontmatter.tag} />
      </h1>
      <DocDescription />
      <DocActions />
    </>
  );
}

export function FallbackHeading(props: ComponentProps<typeof OriginalFallbackHeading>) {
  if (props.level !== 1) return <OriginalFallbackHeading {...props} />;

  return (
    <>
      <DocBreadcrumb />
      <OriginalFallbackHeading {...props} />
      <DocDescription />
      <DocActions />
    </>
  );
}

// Footer date from `plugins/last-updated-date.js`, as a long localized date.
export function LastUpdated() {
  const t = useI18n<typeof import('i18n')>();
  const lang = useLang();
  const { page } = usePage();
  const date = (page as { lastUpdatedDate?: string }).lastUpdatedDate;

  if (!date) return null;

  return (
    <div className="rp-last-updated">
      <Clock aria-hidden="true" />
      <p>
        {t('lastUpdatedText')}{' '}
        <time dateTime={date}>
          {new Intl.DateTimeFormat(lang, { dateStyle: 'long', timeZone: 'UTC' }).format(
            new Date(date),
          )}
        </time>
      </p>
    </div>
  );
}

function SynchronizeModuixColorScheme() {
  const dark = useDark();

  useEffect(() => {
    document.documentElement.dataset.moduixColorScheme = dark ? 'dark' : 'light';
  }, [dark]);

  return null;
}

function ModuixNavTitle() {
  const { site } = useSite();
  const lang = useLang();
  const href = lang === (site.lang ?? '') ? '/' : addLeadingSlash(addTrailingSlash(lang));

  return (
    <div className="rp-nav__title">
      <Link href={href} className="rp-nav__title__link">
        <svg
          className="moduix-nav-logo"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="none"
        >
          <rect x="1.4" y="1.4" width="8.2" height="8.2" rx="1.1" fill="currentColor" />
          <rect x="1.4" y="12.3" width="8.2" height="8.2" rx="1.1" fill="currentColor" />
          <rect x="1.4" y="22.4" width="8.2" height="8.2" rx="1.1" fill="currentColor" />
          <rect x="11.9" y="1.4" width="8.2" height="8.2" rx="1.1" fill="currentColor" />
          <rect x="22.4" y="1.4" width="8.2" height="8.2" rx="1.1" fill="currentColor" />
          <rect x="22.4" y="12.3" width="8.2" height="8.2" rx="1.1" fill="currentColor" />
          <rect x="22.4" y="22.4" width="8.2" height="8.2" rx="1.1" fill="currentColor" />
        </svg>
        <span className="moduix-nav-wordmark">moduix</span>
      </Link>
    </div>
  );
}

const mdxComponents = {
  Card,
  Cards,
  CodeBlockRuntime,
  ComponentInstall,
  CssPropertiesSection,
  ExampleCode,
  ExampleFrame,
  ExamplePanel,
  FrameworkCode,
  PreviewFrame,
  PackageManagerTabs,
  PrimitiveReference,
  PropChips,
  BlockInstall,
  ShadcnInstallOptions,
  StyleTrackCard,
  StyleTrackCards,
  Tab,
  Tabs,
  UsageCode,
};

// Framework and styling tabs from the Sketch layout: the native Tabs keep their behavior, and the
// wrapper exposes the group and tab values so CSS can draw the framework switcher with its dots.
function Tabs(props: ComponentProps<typeof OriginalTabs>) {
  const values = Children.toArray(props.children)
    .map((child) => (isValidElement<{ value?: string }>(child) ? child.props.value : undefined))
    .join(' ');

  return (
    <div className="moduix-tabs" data-group={props.groupId} data-values={values}>
      <OriginalTabs {...props} />
    </div>
  );
}

export function Root({ children }: RootProps) {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>;
}

export function Layout() {
  return (
    <>
      <SocialMetadata />
      <SynchronizeModuixColorScheme />
      <OriginalLayout
        components={{ h1: DocTitle }}
        navTitle={<ModuixNavTitle />}
        afterRightNavItems={<NavMenus />}
        NotFoundLayout={NotFound}
      />
      <div id="__rspress_modal_container" />
    </>
  );
}

export { Tag };