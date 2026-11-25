import { useI18n, useLang, usePages } from '@rspress/core/runtime';
import { Link } from '@rspress/core/theme';
import { ArrowRight, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styles from './component-gallery.module.css';
import { ComponentThumbnail } from './component-thumbnails';

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

// Search synonyms so common UI vocabulary finds the right moduix component.
const searchSynonyms: Record<string, string[]> = {
  dialog: ['modal', 'popup', 'confirm', 'alertdialog', 'overlay'],
  drawer: ['sheet', 'slideover', 'off-canvas', 'panel', 'sidebar'],
  'date-picker': ['calendar', 'datepicker', 'schedule', 'date range'],
  'date-input': ['calendar', 'date', 'masked'],
  select: ['dropdown', 'picker', 'options', 'choice'],
  'native-select': ['dropdown', 'html select'],
  menu: ['dropdown', 'context menu', 'actions', 'popover'],
  combobox: ['autocomplete', 'typeahead', 'search select', 'dropdown'],
  'command-palette': ['cmdk', 'spotlight', 'quick search', 'launcher', 'kbd'],
  toast: ['notification', 'snackbar', 'banner', 'message', 'sonner'],
  alert: ['notification', 'banner', 'callout', 'warning', 'error'],
  tag: ['chip', 'pill', 'label', 'token'],
  badge: ['chip', 'pill', 'status', 'counter'],
  'tags-input': ['chips', 'multi-input', 'keywords', 'tokens'],
  spinner: ['loader', 'loading', 'busy', 'indicator'],
  skeleton: ['loader', 'placeholder', 'shimmer', 'loading'],
  switch: ['toggle', 'boolean', 'on off'],
  toggle: ['pressed', 'button toggle'],
  'pin-input': ['otp', 'verification code', 'passcode', '2fa'],
  'file-upload': ['dropzone', 'attachment', 'upload', 'drag and drop'],
  separator: ['divider', 'hr', 'line', 'rule'],
  clipboard: ['copy', 'copy button'],
  kbd: ['hotkey', 'shortcut', 'keycap', 'keyboard'],
  steps: ['stepper', 'wizard', 'onboarding', 'multi-step'],
  breadcrumbs: ['path', 'trail', 'navigation'],
  tooltip: ['hint', 'hover', 'title'],
  popover: ['popup', 'floating', 'flyout'],
  'hover-card': ['preview card', 'popup', 'profile card'],
  'rating-group': ['stars', 'review', 'score'],
  'segment-group': ['segmented control', 'tabs', 'pill switch'],
  accordion: ['collapse', 'faq', 'disclosure', 'expandable'],
  collapsible: ['collapse', 'disclosure', 'expand'],
  'progress-linear': ['progress bar', 'loading bar'],
  'progress-circular': ['donut', 'ring', 'radial progress'],
  carousel: ['slider', 'gallery', 'slideshow'],
  lightbox: ['gallery', 'image viewer', 'zoom', 'modal'],
  splitter: ['resizable', 'panes', 'split view'],
  'simple-grid': ['grid', 'columns', 'layout'],
  stack: ['flex', 'vstack', 'hstack', 'row', 'column'],
  'table-of-contents': ['toc', 'outline', 'anchors'],
  'navigation-menu': ['navbar', 'megamenu', 'header nav'],
  'json-tree-view': ['inspector', 'json', 'debug'],
  'tree-view': ['file tree', 'hierarchy', 'folder'],
  empty: ['empty state', 'no results', 'placeholder'],
  'floating-panel': ['window', 'draggable', 'pip'],
  tour: ['onboarding', 'walkthrough', 'spotlight', 'guide'],
  'signature-pad': ['draw', 'sign', 'canvas'],
  'color-picker': ['swatch', 'palette', 'hex', 'oklch'],
};

function matchesQuery(
  component: { slug: string; title: string; description: string },
  needle: string,
) {
  if (!needle) return true;
  if (
    component.title.toLowerCase().includes(needle) ||
    component.slug.includes(needle) ||
    component.description.toLowerCase().includes(needle)
  ) {
    return true;
  }
  const synonyms = searchSynonyms[component.slug];
  return synonyms ? synonyms.some((term) => term.includes(needle)) : false;
}

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

export function ComponentCatalog() {
  const t = useI18n<typeof import('i18n')>();
  const lang = useLang();
  const { pages } = usePages();
  const [active, setActive] = useState<ComponentCategory | 'all'>('all');
  const [query, setQuery] = useState('');
  const filterRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('category');
    if (param && categories.some((item) => item.id === param)) {
      setActive(param as ComponentCategory);
    }
  }, []);

  const selectCategory = (next: ComponentCategory | 'all') => {
    setActive(next);
    const url = new URL(window.location.href);
    if (next === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', next);
    }
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  };

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
      matches: items.filter((component) => matchesQuery(component, needle)),
    };
  });
  const visible = sections.filter(
    (section) => (active === 'all' || section.id === active) && section.matches.length > 0,
  );
  const clear = () => {
    selectCategory('all');
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
                onClick={() => selectCategory(section.id)}
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
            placeholder="Filter components, e.g. modal, calendar…"
            aria-label={t('catalogFilter')}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      {visible.map((section) => (
        <section
          key={section.id}
          className={styles.section}
          aria-labelledby={`catalog-${section.id}`}
        >
          <header className={styles.sectionHeader}>
            <h2 id={`catalog-${section.id}`}>{section.label}</h2>
            <span className={styles.count}>{section.matches.length}</span>
          </header>
          <ul className={styles.grid}>
            {section.matches.map((item) => (
              <li key={item.slug}>
                <Link className={styles.card} href={item.url}>
                  <div className={styles.thumb}>
                    <ComponentThumbnail slug={item.slug} category={section.id} />
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.cardTitle}>{item.title}</span>
                    <span className={styles.cardDescription}>{item.description}</span>
                  </div>
                  <ArrowRight className={styles.cardArrow} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

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