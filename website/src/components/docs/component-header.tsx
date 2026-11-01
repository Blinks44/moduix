import { useFrontmatter, useI18n, useLocation, usePage, useSidebar } from '@rspress/core/runtime';
import { Link } from '@rspress/core/theme';
import { ArrowUpRight } from 'lucide-react';
import { useExampleSelection } from '@/components/mdx/example-panel';
import { useLocalizedPath } from '@/utils/localized-path';
import { getComponentCategoryLabelKey } from './component-gallery';
import styles from './component-header.module.css';

const repository = 'https://github.com/Blinks44/moduix';

// The gallery lists pages by their URL slug, which can differ from the package name (`toc`).
export function ComponentBreadcrumb() {
  const t = useI18n<typeof import('i18n')>();
  const { pathname } = useLocation();
  const componentsPath = useLocalizedPath('/docs/components');
  const category = getComponentCategoryLabelKey(pathname.split('/').pop() ?? '');

  return (
    <nav className={`rp-not-doc ${styles.breadcrumb}`} aria-label="Breadcrumb">
      <Link href={componentsPath}>{t('navComponents')}</Link>
      {category ? (
        <>
          <span aria-hidden="true">/</span>
          <span>{t(category)}</span>
        </>
      ) : null}
    </nav>
  );
}

// Ark utility and collection pages have no moduix package, so they get only the Ark and issue links.
export function ComponentLinks({ component }: { component?: string }) {
  const t = useI18n<typeof import('i18n')>();
  const { frontmatter } = useFrontmatter();
  const { page } = usePage();
  const { framework, styling } = useExampleSelection();
  const packageName = `${framework.value}${styling.value === 'tailwind' ? '-tailwind' : ''}`;
  const ark = typeof frontmatter.ark === 'string' ? frontmatter.ark : undefined;
  const links = [
    ...(component
      ? [
          [
            t('componentSource'),
            `${repository}/tree/main/packages/${packageName}/src/components/${component}`,
          ],
          ['npm', `https://www.npmjs.com/package/@moduix/${packageName}`],
        ]
      : []),
    ...(ark ? [['Ark UI', ark]] : []),
    [
      t('componentReportIssue'),
      `${repository}/issues/new?title=${encodeURIComponent(`[${page.title}] `)}`,
    ],
  ];

  return (
    <ul className={`rp-not-doc ${styles.links}`}>
      {links.map(([label, href]) => (
        <li key={href}>
          <a href={href} target="_blank" rel="noreferrer">
            {label}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
type SidebarEntries = ReturnType<typeof useSidebar>;

const normalizePath = (path: string) => path.replace(/(\.html|\/index)?\/?$/, '') || '/';

// The sidebar section header above the current page, such as "Get started" or "Access".
function findSection(
  items: SidebarEntries,
  pathname: string,
  section?: string,
): string | undefined {
  for (const item of items) {
    if ('sectionHeaderText' in item) section = item.sectionHeaderText;
    else if ('link' in item && item.link && normalizePath(item.link) === pathname) return section;
    if ('items' in item) {
      const found = findSection(item.items, pathname, section);
      if (found) return found;
    }
  }
  return undefined;
}

// Breadcrumb of a guide or block page: its sidebar section, under Blocks for block pages.
export function PageBreadcrumb() {
  const t = useI18n<typeof import('i18n')>();
  const sidebar = useSidebar();
  const { pathname } = useLocation();
  const blocksPath = useLocalizedPath('/blocks');
  const section = findSection(sidebar, normalizePath(decodeURIComponent(pathname)));
  const isBlock = pathname.startsWith(`${blocksPath}/`);
  // Browse blocks sits above the sidebar sections, so it shows the Blocks root as its crumb.
  const isBlocksIndex = normalizePath(decodeURIComponent(pathname)) === normalizePath(blocksPath);

  if (isBlocksIndex) {
    return (
      <nav className={`rp-not-doc ${styles.breadcrumb}`} aria-label="Breadcrumb">
        <span>{t('navBlocks')}</span>
      </nav>
    );
  }

  if (!section) return null;

  return (
    <nav className={`rp-not-doc ${styles.breadcrumb}`} aria-label="Breadcrumb">
      {isBlock ? (
        <>
          <Link href={blocksPath}>{t('navBlocks')}</Link>
          <span aria-hidden="true">/</span>
        </>
      ) : null}
      <span>{section}</span>
    </nav>
  );
}

const blockSources = {
  react: (block: string) => `website/src/components/blocks/${block}`,
  solid: (block: string) => `website/snippets/blocks/solid/${block}.tsx`,
  vue: (block: string) => `website/snippets/blocks/vue/${block}.vue`,
};

export function BlockLinks({ block }: { block: string }) {
  const t = useI18n<typeof import('i18n')>();
  const { page } = usePage();
  const { framework } = useExampleSelection();
  const links = [
    [t('componentSource'), `${repository}/tree/main/${blockSources[framework.value](block)}`],
    [
      t('componentReportIssue'),
      `${repository}/issues/new?title=${encodeURIComponent(`[${page.title}] `)}`,
    ],
  ];

  return (
    <ul className={`rp-not-doc ${styles.links}`}>
      {links.map(([label, href]) => (
        <li key={href}>
          <a href={href} target="_blank" rel="noreferrer">
            {label}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}