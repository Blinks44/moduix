import { useI18n } from '@rspress/core/runtime';
import { Link, PackageManagerTabs, Tab, Tabs } from '@rspress/core/theme';
import { ArrowUpRight } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { useLocalizedPath } from '@/utils/localized-path';
import styles from './Components.module.css';
import {
  CSSPropertiesReferenceTable,
  ExampleFrame,
  PreviewFrame,
  normalizeCssProperties,
  type CssPropertyInput,
} from './reference';

function PrimitiveReference({ href }: { href: string }) {
  const t = useI18n<typeof import('i18n')>();

  return (
    <aside className={styles.reference}>
      <div>
        <strong>{t('primitiveReferenceTitle')}</strong>
        <p>{t('primitiveReferenceDescription')}</p>
      </div>
      <a className={styles.referenceLink} href={href} target="_blank" rel="noreferrer">
        {t('primitiveReferenceLink')}
        <ArrowUpRight aria-hidden="true" />
      </a>
    </aside>
  );
}

function ShadcnInstall({
  packageName,
  itemKind = 'component',
  copiedSource = false,
  dependencies = [],
}: {
  packageName: string | string[];
  itemKind?: 'component' | 'recipe';
  copiedSource?: boolean;
  dependencies?: string[];
}) {
  const packageNames = Array.isArray(packageName) ? packageName : [packageName];
  const t = useI18n<typeof import('i18n')>();
  const installMessage =
    itemKind === 'recipe' ? t('shadcnInstallRecipe') : t('shadcnInstallComponent');
  const copyMessage = itemKind === 'recipe' ? t('shadcnCopyRecipe') : t('shadcnCopyComponent');

  return (
    <div className={styles.install}>
      <p>{copiedSource ? copyMessage : installMessage}</p>
      <PackageManagerTabs
        command={`shadcn@latest add ${packageNames.map((name) => `@moduix-react/${name}`).join(' ')}`}
        dlx
      />
      {dependencies.length > 0 ? (
        <>
          <p>{t('shadcnExampleRequires')}</p>
          <PackageManagerTabs command={`install ${dependencies.join(' ')}`} />
        </>
      ) : null}
    </div>
  );
}

function CssPropertiesSection({ properties }: { properties: CssPropertyInput[] }) {
  const t = useI18n<typeof import('i18n')>();
  const normalizedProperties = normalizeCssProperties(properties);

  return (
    <div className={styles.cssProperties}>
      <Tabs values={[{ label: t('cssVariables'), value: 'CSS Variables' }]}>
        <Tab value="CSS Variables">
          <CSSPropertiesReferenceTable properties={normalizedProperties} />
        </Tab>
      </Tabs>
    </div>
  );
}

function Cards({ children }: { children: ReactNode }) {
  return <div className={styles.cards}>{children}</div>;
}

function Card({
  title,
  description,
  href,
  icon,
  preview,
}: {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
  preview?: ReactNode;
}) {
  const localizedHref = useLocalizedPath(href);

  return (
    <Link className={styles.card} data-preview={preview ? '' : undefined} href={localizedHref}>
      {preview ? (
        <div className={styles.cardPreview} aria-hidden="true">
          {preview}
        </div>
      ) : null}
      <div className={styles.cardBody}>
        {icon ? <span className={styles.cardIcon}>{icon}</span> : null}
        <strong>{title}</strong>
        <span className={styles.cardDescription}>{description}</span>
      </div>
    </Link>
  );
}

function PreviewMeta({ children, ...props }: ComponentProps<'div'>) {
  return (
    <div {...props} data-preview-meta>
      {children}
    </div>
  );
}

export {
  Card,
  Cards,
  CssPropertiesSection,
  ExampleFrame,
  PreviewFrame,
  PreviewMeta,
  PrimitiveReference,
  ShadcnInstall,
};