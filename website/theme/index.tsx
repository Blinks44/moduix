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
  IconFile,
  IconGithub,
  CodeBlockRuntime as OriginalCodeBlockRuntime,
  FallbackHeading as OriginalFallbackHeading,
  Layout as OriginalLayout,
  Link,
  LlmsContainer,
  LlmsCopyButton,
  LlmsViewOptions,
  type LlmsViewOptionsItem,
  PackageManagerTabs,
  type RootProps,
  SvgWrapper,
  Tab,
  Tabs,
  useMdUrl,
} from '@rspress/core/theme-original';
import { clsx } from 'clsx';
import { useEffect, type ComponentProps } from 'react';
import './index.css';
import {
  Card,
  Cards,
  CssPropertiesSection,
  ExampleCode,
  ExampleFrame,
  PreviewFrame,
  PrimitiveReference,
  BlockInstall,
  ShadcnInstallOptions,
  StyleTrackCard,
  StyleTrackCards,
} from '@/components/mdx/Components';
import { Tag } from './components/Tag';

export * from '@rspress/core/theme-original';

function DocDescription() {
  const { frontmatter } = useFrontmatter();
  const description =
    typeof frontmatter.description === 'string' ? frontmatter.description.trim() : '';

  return description ? <p className="moduix-doc-description">{description}</p> : null;
}

function CodeBlockRuntime(props: ComponentProps<typeof OriginalCodeBlockRuntime>) {
  return <OriginalCodeBlockRuntime height={520} {...props} />;
}

function SocialMetadata() {
  const { frontmatter } = useFrontmatter();
  const { page } = usePage();
  const { site } = useSite();
  const pageTitle = typeof frontmatter.title === 'string' ? frontmatter.title : page.title;
  const title =
    page.routePath === '/' || page.pageType === 'home' || !pageTitle
      ? site.title
      : `${pageTitle} - ${site.title}`;
  const description = page.description || site.description;

  useHead({
    meta: [
      { name: 'twitter:title', content: title },
      ...(description ? [{ name: 'twitter:description', content: description }] : []),
    ],
  });

  return null;
}

function DocActions() {
  const t = useI18n<typeof import('i18n')>();
  const { frontmatter } = useFrontmatter();
  const { pathname: markdownPath } = useMdUrl();
  const component =
    typeof frontmatter.component === 'string' ? frontmatter.component.trim() : undefined;

  if (import.meta.env.SSG_MD) return null;

  const viewOptions: LlmsViewOptionsItem[] = component
    ? [
        ...[
          ['react', 'React · CSS Modules'],
          ['react-tailwind', 'React · Tailwind'],
          ['solid', 'Solid · CSS Modules'],
          ['solid-tailwind', 'Solid · Tailwind'],
          ['vue', 'Vue · CSS Modules'],
          ['vue-tailwind', 'Vue · Tailwind'],
        ].map(([packageName, title]) => ({
          title,
          href: `https://github.com/blinks44/moduix/tree/main/packages/${packageName}/src/components/${component}`,
          icon: <SvgWrapper icon={IconGithub} />,
        })),
        {
          title: t('docViewAsMarkdown'),
          href: markdownPath,
          icon: <SvgWrapper icon={IconFile} />,
        },
        'chatgpt',
        'claude',
      ]
    : [];

  return (
    <LlmsContainer>
      <LlmsCopyButton />
      {viewOptions.length > 0 ? <LlmsViewOptions options={viewOptions} /> : null}
    </LlmsContainer>
  );
}

function DocTitle({ className, children, ...props }: ComponentProps<'h1'>) {
  const { frontmatter } = useFrontmatter();

  return (
    <>
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
      <OriginalFallbackHeading {...props} />
      <DocDescription />
      <DocActions />
    </>
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
          role="img"
          aria-label="moduix"
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
      </Link>
    </div>
  );
}

const mdxComponents = {
  Card,
  Cards,
  CodeBlockRuntime,
  CssPropertiesSection,
  ExampleCode,
  ExampleFrame,
  PreviewFrame,
  PackageManagerTabs,
  PrimitiveReference,
  BlockInstall,
  ShadcnInstallOptions,
  StyleTrackCard,
  StyleTrackCards,
  Tab,
  Tabs,
};

export function Root({ children }: RootProps) {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>;
}

export function Layout() {
  return (
    <>
      <SocialMetadata />
      <SynchronizeModuixColorScheme />
      <OriginalLayout components={{ h1: DocTitle }} navTitle={<ModuixNavTitle />} />
      <div id="__rspress_modal_container" />
    </>
  );
}

export { Tag };