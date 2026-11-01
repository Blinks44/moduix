import { useI18n, useLang, usePages } from '@rspress/core/runtime';
import { Link } from '@rspress/core/theme';
import { ArrowRight, Search } from 'lucide-react';
import { useRef, useState } from 'react';
import styles from './component-gallery.module.css';

const categories = [
  {
    id: 'actions',
    slugs: ['button', 'clipboard', 'close-button', 'split-button', 'swap'],
  },
  {
    id: 'display',
    slugs: [
      'avatar',
      'badge',
      'card',
      'carousel',
      'chart',
      'heading',
      'highlight',
      'image',
      'image-cropper',
      'json-tree-view',
      'kbd',
      'list',
      'marquee',
      'qr-code',
      'table',
      'tag',
      'text',
      'timer',
      'typeset',
    ],
  },
  {
    id: 'feedback',
    slugs: [
      'alert',
      'empty',
      'progress-circular',
      'progress-linear',
      'skeleton',
      'spinner',
      'toast',
    ],
  },
  {
    id: 'forms',
    slugs: [
      'angle-slider',
      'checkbox',
      'color-picker',
      'combobox',
      'date-input',
      'date-picker',
      'editable',
      'field',
      'fieldset',
      'file-upload',
      'input',
      'input-group',
      'listbox',
      'native-select',
      'number-input',
      'password-input',
      'pin-input',
      'radio-group',
      'rating-group',
      'segment-group',
      'select',
      'signature-pad',
      'slider',
      'switch',
      'tags-input',
      'textarea',
      'toggle',
      'toggle-group',
    ],
  },
  {
    id: 'layout',
    slugs: [
      'accordion',
      'aspect-ratio',
      'bleed',
      'collapsible',
      'container',
      'scroll-area',
      'separator',
      'sidebar',
      'simple-grid',
      'splitter',
      'stack',
      'tree-view',
    ],
  },
  {
    id: 'navigation',
    slugs: [
      'breadcrumbs',
      'menu',
      'navigation-menu',
      'pagination',
      'steps',
      'table-of-contents',
      'tabs',
    ],
  },
  {
    id: 'overlays',
    slugs: [
      'command-palette',
      'dialog',
      'drawer',
      'floating-panel',
      'hover-card',
      'lightbox',
      'popover',
      'tooltip',
      'tour',
    ],
  },
] as const;

type ComponentCategory = (typeof categories)[number]['id'];

const categoryLabelKeys = {
  actions: 'categoryActions',
  display: 'categoryDisplay',
  feedback: 'categoryFeedback',
  forms: 'categoryForms',
  layout: 'categoryLayout',
  navigation: 'categoryNavigation',
  overlays: 'categoryOverlays',
} as const satisfies Record<ComponentCategory, string>;

// Category ids, label keys, and counts for the home page chips.
export function getComponentCategories() {
  return categories.map((category) => ({
    id: category.id,
    labelKey: categoryLabelKeys[category.id],
    count: category.slugs.length,
  }));
}

export function getComponentCategoryLabelKey(slug: string) {
  const category = categories.find((item) => (item.slugs as readonly string[]).includes(slug));
  return category ? categoryLabelKeys[category.id] : undefined;
}

// Docs · Components index in Moduix.sketch: category chips with counts, a name filter, and one
// section per category. "All" previews each category and links to the rest with "Show all N".
const previewSize = 6;

export function ComponentCatalog() {
  const t = useI18n<typeof import('i18n')>();
  const lang = useLang();
  const { pages } = usePages();
  const [active, setActive] = useState<ComponentCategory | 'all'>('all');
  const [query, setQuery] = useState('');
  const filterRef = useRef<HTMLInputElement>(null);
  const components = pages
    .filter(
      (page) =>
        page.lang === lang &&
        page.routePath.includes('/docs/') &&
        typeof page.frontmatter.component === 'string',
    )
    .map((page) => ({
      slug: page.routePath.split('/').filter(Boolean).at(-1) ?? '',
      description: page.description ?? '',
      title: page.title,
      url: page.routePath,
    }))
    .sort((left, right) => left.title.localeCompare(right.title));
  const needle = query.trim().toLowerCase();
  const sections = categories.map((category) => {
    const slugs: readonly string[] = category.slugs;
    const items = components.filter((component) => slugs.includes(component.slug));
    return {
      id: category.id,
      label: t(categoryLabelKeys[category.id]),
      items,
      matches: items.filter((component) => component.title.toLowerCase().includes(needle)),
    };
  });
  const visible = sections.filter(
    (section) => (active === 'all' || section.id === active) && section.matches.length > 0,
  );
  const clear = () => {
    setActive('all');
    setQuery('');
    filterRef.current?.focus();
  };

  if (import.meta.env.SSG_MD) {
    return sections
      .map(
        (section) =>
          `\n## ${section.label}\n\n` +
          section.items
            .map((item) => `- [${item.title}](${item.url}.md): ${item.description}`)
            .join('\n') +
          '\n',
      )
      .join('');
  }

  return (
    <div className={`rp-not-doc ${styles.catalog}`}>
      <div className={styles.toolbar}>
        <div className={styles.chips} role="group" aria-label={t('catalogCategories')}>
          {[{ id: 'all' as const, label: t('catalogAll'), items: components }, ...sections].map(
            (section) => (
              <button
                key={section.id}
                type="button"
                className={styles.chip}
                aria-pressed={active === section.id}
                onClick={() => setActive(section.id)}
              >
                {section.label}
                <span className={styles.count}>{section.items.length}</span>
              </button>
            ),
          )}
        </div>
        <label className={styles.filter}>
          <Search aria-hidden="true" />
          <input
            ref={filterRef}
            type="search"
            value={query}
            placeholder={t('catalogFilter')}
            aria-label={t('catalogFilter')}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      {visible.map((section) => {
        const limited = active === 'all' && !needle;
        const items = limited ? section.matches.slice(0, previewSize) : section.matches;
        return (
          <section
            key={section.id}
            className={styles.section}
            aria-labelledby={`catalog-${section.id}`}
          >
            <header className={styles.sectionHeader}>
              <h2 id={`catalog-${section.id}`}>{section.label}</h2>
              <span className={styles.count}>{section.items.length}</span>
              {limited && section.items.length > previewSize ? (
                <button
                  type="button"
                  className={styles.showAll}
                  onClick={() => setActive(section.id)}
                >
                  {t('catalogShowAll').replace('{count}', String(section.items.length))}
                </button>
              ) : null}
            </header>
            <ul className={styles.grid}>
              {items.map((item) => (
                <li key={item.slug}>
                  <Link className={styles.card} href={item.url}>
                    <span className={styles.cardTitle}>{item.title}</span>
                    <span className={styles.cardDescription}>{item.description}</span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {visible.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>
            <Search aria-hidden="true" />
          </span>
          <strong>{t('catalogEmptyTitle')}</strong>
          <span>{t('catalogEmptyText')}</span>
          <button type="button" className={styles.clear} onClick={clear}>
            {t('catalogClear')}
          </button>
        </div>
      ) : null}
    </div>
  );
}