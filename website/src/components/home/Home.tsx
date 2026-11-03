import { Button } from '@moduix/react/button';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';
import { Field, FieldLabel } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@moduix/react/segment-group';
import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
} from '@moduix/react/slider';
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/react/switch';
import { useI18n, useLang } from '@rspress/core/runtime';
import { CodeBlockRuntime, Link } from '@rspress/core/theme';
import { ArrowRight, Check, Code, Copy } from 'lucide-react';
import { useState, type UIEvent } from 'react';
import { getLocalizedPath } from '@/utils/localized-path';
import reactPackage from '../../../../packages/react/package.json';
import { getComponentCategories } from '../docs/component-gallery';
import { usePreset } from '../docs/nav-menus';
import { ScaledPreview } from '../docs/scaled-preview';
import {
  ColorPickerTile,
  ComboboxTile,
  DatePickerTile,
  FileUploadTile,
  SignaturePadTile,
  TagsInputTile,
  ToastTile,
  TourTile,
} from './home-tiles';
import styles from './Home.module.css';

type T = ReturnType<typeof useI18n<typeof import('i18n')>>;
type Framework = 'react' | 'solid' | 'vue';

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
] as const;

const arkMajor = reactPackage.peerDependencies['@ark-ui/react'].match(/\d+/)?.[0];
const version = reactPackage.version.split('.').slice(0, 2).join('.');

const switchCode: Record<Framework, { file: string; lang: string; code: string }> = {
  react: {
    file: 'Notifications.tsx',
    lang: 'tsx',
    code: `import { Switch, SwitchControl, SwitchLabel } from '@moduix/react/switch';

<Switch defaultChecked>
  <SwitchLabel>Product updates</SwitchLabel>
  <SwitchControl />
</Switch>`,
  },
  solid: {
    file: 'Notifications.tsx',
    lang: 'tsx',
    code: `import { Switch, SwitchControl, SwitchLabel } from '@moduix/solid/switch';

<Switch defaultChecked>
  <SwitchLabel>Product updates</SwitchLabel>
  <SwitchControl />
</Switch>`,
  },
  vue: {
    file: 'Notifications.vue',
    lang: 'vue',
    code: `<script setup>
import { Switch, SwitchControl, SwitchLabel } from '@moduix/vue/switch';
</script>

<template>
  <Switch default-checked>
    <SwitchLabel>Product updates</SwitchLabel>
    <SwitchControl />
  </Switch>
</template>`,
  },
};

const buttonCode: Record<Framework, { file: string; lang: string; code: string }> = {
  react: {
    file: 'Button.tsx',
    lang: 'tsx',
    code: `import { Button } from
  '@moduix/react/button';

export default function Demo() {
  return (
    <Button variant="outline">
      Save changes
    </Button>
  );
}`,
  },
  solid: {
    file: 'Button.tsx',
    lang: 'tsx',
    code: `import { Button } from
  '@moduix/solid/button';

export default function Demo() {
  return (
    <Button variant="outline">
      Save changes
    </Button>
  );
}`,
  },
  vue: {
    file: 'Button.vue',
    lang: 'vue',
    code: `<script setup>
import { Button } from
  '@moduix/vue/button';
</script>

<template>
  <Button variant="outline">
    Save changes
  </Button>
</template>`,
  },
};

const featured = [
  {
    title: 'Color Picker',
    href: '/docs/color-picker',
    category: 'categoryForms',
    width: 158,
    preview: <ColorPickerTile />,
  },
  {
    title: 'Date Picker',
    href: '/docs/date-picker',
    category: 'categoryForms',
    width: 178,
    preview: <DatePickerTile />,
  },
  {
    title: 'Tour',
    href: '/docs/tour',
    category: 'categoryOverlays',
    width: 230,
    preview: <TourTile />,
  },
  {
    title: 'Signature Pad',
    href: '/docs/signature-pad',
    category: 'categoryForms',
    width: 220,
    preview: <SignaturePadTile />,
  },
  {
    title: 'Combobox',
    href: '/docs/combobox',
    category: 'categoryForms',
    width: 170,
    preview: <ComboboxTile />,
  },
  {
    title: 'File Upload',
    href: '/docs/file-upload',
    category: 'categoryForms',
    width: 210,
    preview: <FileUploadTile />,
  },
  {
    title: 'Toast',
    href: '/docs/toast',
    category: 'categoryFeedback',
    width: 210,
    preview: <ToastTile />,
  },
  {
    title: 'Tags Input',
    href: '/docs/tags-input',
    category: 'categoryForms',
    width: 210,
    preview: <TagsInputTile />,
  },
] as const;

const presets = [
  {
    value: 'calm',
    title: 'Calm',
    descriptionKey: 'homeThemeCalm',
    control: 'Control 36px · radius 10px',
  },
  {
    value: 'dense',
    title: 'Dense',
    descriptionKey: 'homeThemeDense',
    control: 'Control 34px · radius 7px',
  },
  {
    value: 'soft',
    title: 'Soft',
    descriptionKey: 'homeThemeSoft',
    control: 'Control 40px · radius 16px',
  },
  {
    value: 'contrast',
    title: 'Contrast',
    descriptionKey: 'homeThemeContrast',
    control: 'Control 36px · radius 6px',
  },
] as const;

const setups = [
  { name: 'Vite', supportKey: 'homeStartAll', href: '/docs/installation/vite' },
  { name: 'Next.js', support: 'React', href: '/docs/installation/nextjs' },
  { name: 'React Router', support: 'React', href: '/docs/installation/react-router' },
  { name: 'TanStack Start', support: 'React · Solid', href: '/docs/installation/tanstack-start' },
  { name: 'Nuxt', support: 'Vue', href: '/docs/installation/nuxt' },
  { name: 'SolidStart', support: 'Solid', href: '/docs/installation/solid-start' },
  { name: 'Astro', supportKey: 'homeStartAll', href: '/docs/installation/astro' },
  { name: 'Rsbuild', supportKey: 'homeStartAll', href: '/docs/installation/rsbuild' },
] as const;

// The phone layout of 05 · Start lists four setups and links to the rest.
const phoneSetups: string[] = ['Vite', 'Next.js', 'Nuxt', 'SolidStart'];

function Eyebrow({ index, children }: { index: string; children: string }) {
  return (
    <p className={styles.eyebrow}>
      {index} · {children}
    </p>
  );
}

function CopyCommand({ command }: { command: string }) {
  const t = useI18n<typeof import('i18n')>();
  const [copied, setCopied] = useState(false);
  return (
    <div className={styles.command}>
      <code>
        <span aria-hidden="true">$ </span>
        {command}
      </code>
      <button
        type="button"
        aria-label={t(copied ? 'exampleCopied' : 'exampleCopy')}
        onClick={async () => {
          await navigator.clipboard.writeText(command);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      </button>
    </div>
  );
}

function FrameworkDot({ framework }: { framework: Framework }) {
  return <span className={styles.dot} data-framework={framework} aria-hidden="true" />;
}

const formatHour = (hour: number) => `${String(hour % 24).padStart(2, '0')}:00`;

function NotificationsDemo({ t }: { t: T }) {
  const [quietHours, setQuietHours] = useState([22, 31]);

  return (
    <div className={styles.notifications}>
      <div>
        <p className={styles.notificationsTitle}>{t('homeDemoTitle')}</p>
        <p className={styles.notificationsText}>{t('homeDemoText')}</p>
      </div>
      {(
        [
          ['homeDemoProduct', true],
          ['homeDemoSecurity', true],
          ['homeDemoDigest', false],
        ] as const
      ).map(([key, checked]) => (
        <Switch key={key} defaultChecked={checked} className={styles.switch}>
          <SwitchLabel>{t(key)}</SwitchLabel>
          <SwitchControl />
          <SwitchHiddenInput />
        </Switch>
      ))}
      <Slider
        className={styles.quietHours}
        value={quietHours}
        onValueChange={(details) => setQuietHours(details.value)}
        min={18}
        max={34}
        getAriaValueText={({ value }) => formatHour(value)}
      >
        <div className={styles.sliderHeader}>
          <SliderLabel>{t('homeDemoQuiet')}</SliderLabel>
          <SliderValueText>{quietHours.map(formatHour).join(' – ')}</SliderValueText>
        </div>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumbs />
        </SliderControl>
      </Slider>
      <div className={styles.notificationsActions}>
        <Button variant="outline" size="sm">
          {t('homeDemoCancel')}
        </Button>
        <Button size="sm">{t('homeDemoSave')}</Button>
      </div>
    </div>
  );
}

function Hero({ t, count }: { t: T; count: number }) {
  const lang = useLang();
  const [framework, setFramework] = useState<Framework>('react');
  // Phones have no room for the overlapping code card, so the demo toolbar switches to the code.
  const [showCode, setShowCode] = useState(false);
  const sample = switchCode[framework];

  return (
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.meta}>
          v{version} · MIT · {t('homeHeroArk').replace('{version}', arkMajor ?? '')}
        </p>
        <h1 className={styles.heroTitle}>{t('homeHeroTitle')}</h1>
        <p className={styles.heroText}>{t('homeHeroText').replace('{count}', String(count))}</p>
        <div className={styles.heroActions}>
          <Button asChild size="lg">
            <Link href={getLocalizedPath('/docs/quick-start', lang)}>
              {t('homeGetStarted')}
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={getLocalizedPath('/docs/components', lang)}>
              {t('homeBrowseComponents')}
            </Link>
          </Button>
        </div>
        <CopyCommand command="pnpm add @moduix/react @ark-ui/react" />
        <div className={styles.works}>
          <p>{t('homeWorksWith')}</p>
          <ul>
            {frameworks.map((item) => (
              <li key={item.value} className={styles.frameworkChip}>
                <FrameworkDot framework={item.value} />
                {item.label}
              </li>
            ))}
            <li className={styles.worksNote}>CSS Modules · Tailwind CSS · shadcn CLI</li>
          </ul>
        </div>
      </div>

      <div className={styles.heroDemo}>
        <div className={styles.demoPanel}>
          <div className={styles.demoToolbar}>
            <div className={styles.frameworkSwitch} role="group" aria-label={t('exampleFramework')}>
              {frameworks.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  aria-pressed={framework === item.value}
                  onClick={() => setFramework(item.value)}
                >
                  <FrameworkDot framework={item.value} />
                  {item.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className={styles.demoCodeToggle}
              aria-pressed={showCode}
              onClick={() => setShowCode(!showCode)}
            >
              <Code aria-hidden="true" />
              {t('exampleCode')}
            </button>
          </div>
          <div className={styles.demoStage}>
            {showCode ? (
              <CodeBlockRuntime lang={sample.lang} code={sample.code} />
            ) : (
              <NotificationsDemo t={t} />
            )}
          </div>
        </div>
        <div className={styles.heroCode}>
          <p className={styles.heroCodeFile}>{sample.file}</p>
          <CodeBlockRuntime lang={sample.lang} code={sample.code} />
        </div>
      </div>
    </section>
  );
}

function OneApi({ t }: { t: T }) {
  // On phones the three cards collapse into one card with framework tabs.
  const [active, setActive] = useState<Framework>('react');

  return (
    <section className={styles.section}>
      <Eyebrow index="01">{t('homeApiEyebrow')}</Eyebrow>
      <h2 className={styles.title}>{t('homeApiTitle')}</h2>
      <p className={styles.lead}>{t('homeApiText')}</p>
      <div className={styles.apiGrid}>
        <div className={styles.apiTabs} role="group" aria-label={t('exampleFramework')}>
          {frameworks.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={active === item.value}
              onClick={() => setActive(item.value)}
            >
              <FrameworkDot framework={item.value} />
              {item.label}
            </button>
          ))}
        </div>
        {frameworks.map((item) => (
          <figure
            key={item.value}
            className={styles.apiCard}
            data-active={active === item.value ? '' : undefined}
          >
            <figcaption>
              <FrameworkDot framework={item.value} />
              <strong>{item.label}</strong>
              <span>@moduix/{item.value}</span>
              <span className={styles.apiFile}>{buttonCode[item.value].file}</span>
            </figcaption>
            <CodeBlockRuntime
              lang={buttonCode[item.value].lang}
              code={buttonCode[item.value].code}
            />
          </figure>
        ))}
      </div>
    </section>
  );
}

function Install({ t }: { t: T }) {
  const rows = [
    {
      name: 'CSS Modules',
      noteKey: 'homeInstallCssNote',
      pkg: '@moduix/react',
      registry: '@moduix-react/button',
    },
    {
      name: 'Tailwind CSS',
      noteKey: 'homeInstallTailwindNote',
      pkg: '@moduix/react-tailwind',
      registry: '@moduix-react-tailwind/button',
    },
  ] as const;

  return (
    <section className={`${styles.section} ${styles.install} ${styles.desktopOnly}`}>
      <div>
        <Eyebrow index="02">{t('homeInstallEyebrow')}</Eyebrow>
        <h2 className={styles.title}>{t('homeInstallTitle')}</h2>
        <p className={styles.lead}>{t('homeInstallText')}</p>
      </div>
      <div>
        <table className={styles.installTable}>
          <thead>
            <tr>
              <td />
              <th scope="col">
                {t('homeInstallPackage')}
                <span>{t('homeInstallPackageNote')}</span>
              </th>
              <th scope="col">
                {t('homeInstallRegistry')}
                <span>{t('homeInstallRegistryNote')}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <th scope="row">
                  {row.name}
                  <span>{t(row.noteKey)}</span>
                </th>
                <td>
                  <code>
                    <span>pnpm add</span>
                    {row.pkg}
                  </code>
                </td>
                <td>
                  <code>
                    <span>pnpm dlx shadcn add</span>
                    {row.registry}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={styles.installNote}>{t('homeInstallArk')}</p>
      </div>
    </section>
  );
}

function Components({
  t,
  count,
  categories,
}: {
  t: T;
  count: number;
  categories: ReturnType<typeof getComponentCategories>;
}) {
  const lang = useLang();
  // Phones show the tiles as a carousel; the dots follow the scroll position, two tiles per dot.
  const [page, setPage] = useState(0);
  const tilePages = Math.ceil(featured.length / 2);
  const handleTilesScroll = (event: UIEvent<HTMLUListElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = event.currentTarget;
    const progress = scrollWidth > clientWidth ? scrollLeft / (scrollWidth - clientWidth) : 0;
    setPage(Math.round(progress * (tilePages - 1)));
  };

  return (
    <section className={styles.section}>
      <Eyebrow index="03">{t('homeComponentsEyebrow')}</Eyebrow>
      <h2 className={styles.title}>{t('homeComponentsTitle').replace('{count}', String(count))}</h2>
      <p className={styles.lead}>{t('homeComponentsText')}</p>
      <div className={styles.componentsBar}>
        <ul className={styles.chips}>
          <li>
            <Link
              className={styles.chip}
              href={getLocalizedPath('/docs/components', lang)}
              aria-current="true"
            >
              {t('catalogAll')}
              <span>{count}</span>
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link className={styles.chip} href={getLocalizedPath('/docs/components', lang)}>
                {t(category.labelKey)}
                <span>{category.count}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link className={styles.more} href={getLocalizedPath('/docs/components', lang)}>
          {t('homeBrowseAll')}
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <ul className={styles.tiles} onScroll={handleTilesScroll}>
        {featured.map((item) => (
          <li key={item.href}>
            <Link className={styles.tile} href={getLocalizedPath(item.href, lang)}>
              <ScaledPreview className={styles.tilePreview} width={item.width}>
                {item.preview}
              </ScaledPreview>
              <strong>{item.title}</strong>
              <span>{t(item.category)}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.tileDots} aria-hidden="true">
        {Array.from({ length: tilePages }, (_, index) => (
          <span key={index} data-active={index === page ? '' : undefined} />
        ))}
      </div>
      <Link
        className={`${styles.more} ${styles.moreMobile}`}
        href={getLocalizedPath('/docs/components', lang)}
      >
        {t('homeBrowseAll')}
        <ArrowRight aria-hidden="true" />
      </Link>
    </section>
  );
}

function Themes({ t }: { t: T }) {
  const [{ value: preset }] = usePreset();

  return (
    <section className={`${styles.section} ${styles.desktopOnly}`}>
      <Eyebrow index="04">{t('homeThemesEyebrow')}</Eyebrow>
      <h2 className={styles.title}>{t('homeThemesTitle')}</h2>
      <p className={styles.lead}>{t('homeThemesText')}</p>
      <code className={styles.themeCode}>{'<html data-moduix-theme="soft">'}</code>
      <div className={styles.themeGrid}>
        {presets.map((item) => (
          <div
            key={item.value}
            className={styles.themeCard}
            data-active={preset === item.value ? '' : undefined}
            data-moduix-theme={item.value}
          >
            <div className={styles.themeHeader}>
              <div>
                <strong>{item.title}</strong>
                <span>{t(item.descriptionKey)}</span>
              </div>
              {preset === item.value ? (
                <span className={styles.themeActive}>{t('homeThemeActive')}</span>
              ) : null}
            </div>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input defaultValue="ada@moduix.dev" aria-label={`${item.title} email`} />
            </Field>
            <Checkbox defaultChecked>
              <CheckboxControl />
              <CheckboxLabel>{t('homeThemeRemember')}</CheckboxLabel>
              <CheckboxHiddenInput />
            </Checkbox>
            <SegmentGroup defaultValue="monthly" aria-label={`${item.title} billing`}>
              <SegmentGroupIndicator />
              <SegmentGroupItems
                items={[
                  { value: 'monthly', label: t('homeThemeMonthly') },
                  { value: 'yearly', label: t('homeThemeYearly') },
                ]}
              />
            </SegmentGroup>
            <Button>{t('homeThemeContinue')}</Button>
            <p className={styles.themeMeta}>{item.control}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Start({ t }: { t: T }) {
  const lang = useLang();
  return (
    <>
      <section className={styles.start}>
        <div>
          <p className={styles.startEyebrow}>05 · {t('homeStartEyebrow')}</p>
          <h2>{t('homeStartTitle')}</h2>
          <p>{t('homeStartText')}</p>
          <div className={styles.startActions}>
            <Link
              className={styles.startPrimary}
              href={getLocalizedPath('/docs/quick-start', lang)}
            >
              {t('homeQuickStart')}
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link
              className={styles.startGhost}
              href={getLocalizedPath('/docs/migrate-from-shadcn', lang)}
            >
              {t('homeMigrate')}
            </Link>
          </div>
        </div>
        <ul className={styles.setups}>
          {setups.map((item) => (
            <li key={item.name} data-phone={phoneSetups.includes(item.name) ? '' : undefined}>
              <Link href={getLocalizedPath(item.href, lang)}>
                <strong>{item.name}</strong>
                <span>{'supportKey' in item ? t(item.supportKey) : item.support}</span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Link
        className={`${styles.more} ${styles.moreMobile}`}
        href={getLocalizedPath('/docs/installation/vite', lang)}
      >
        {t('homeAllSetups').replace('{count}', String(setups.length))}
        <ArrowRight aria-hidden="true" />
      </Link>
    </>
  );
}

function Footer({ t }: { t: T }) {
  const lang = useLang();
  const columns = [
    {
      title: 'Docs',
      links: [
        [t('homeFooterIntroduction'), getLocalizedPath('/docs/', lang)],
        [t('homeFooterQuickStart'), getLocalizedPath('/docs/quick-start', lang)],
        [t('homeFooterThemes'), getLocalizedPath('/docs/themes', lang)],
        [t('homeFooterTokens'), getLocalizedPath('/docs/tokens', lang)],
        [t('homeFooterChangelog'), getLocalizedPath('/docs/changelog', lang)],
      ],
    },
    {
      title: t('homeFooterLibrary'),
      links: [
        [t('homeFooterComponents'), getLocalizedPath('/docs/components', lang)],
        [t('homeFooterBlocks'), getLocalizedPath('/blocks/', lang)],
        [t('homeFooterShadcn'), getLocalizedPath('/docs/migrate-from-shadcn', lang)],
        [t('homeFooterCompare'), getLocalizedPath('/docs/comparison', lang)],
      ],
    },
    {
      title: t('homeFooterCommunity'),
      links: [
        ['GitHub', 'https://github.com/Blinks44/moduix'],
        ['Discussions', 'https://github.com/Blinks44/moduix/discussions'],
        ['npm', 'https://www.npmjs.com/package/@moduix/react'],
        ['llms.txt', '/llms.txt'],
      ],
    },
  ];

  const phoneLinks = [
    ['Docs', getLocalizedPath('/docs/', lang)],
    [t('homeFooterComponents'), getLocalizedPath('/docs/components', lang)],
    [t('homeFooterBlocks'), getLocalizedPath('/blocks/', lang)],
    ['GitHub', 'https://github.com/Blinks44/moduix'],
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerBrand}>
        <p className={styles.footerLogo}>
          <img src="/moduix-logo.svg" alt="" width="24" height="24" />
          moduix
        </p>
        <p>{t('homeFooterText')}</p>
        <p className={styles.footerCopy}>© {new Date().getFullYear()} moduix</p>
        <ul className={styles.footerPhone}>
          {phoneLinks.map(([label, href]) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
        <p className={styles.footerPhoneCopy}>© {new Date().getFullYear()} moduix · MIT</p>
      </div>
      {columns.map((column) => (
        <nav key={column.title} aria-label={column.title}>
          <p>{column.title}</p>
          <ul>
            {column.links.map(([label, href]) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </footer>
  );
}

export function Home() {
  const t = useI18n<typeof import('i18n')>();
  const categories = getComponentCategories();
  const count = categories.reduce((total, category) => total + category.count, 0);

  return (
    <div className={styles.home}>
      <Hero t={t} count={count} />
      <OneApi t={t} />
      <Install t={t} />
      <Components t={t} count={count} categories={categories} />
      <Themes t={t} />
      <Start t={t} />
      <Footer t={t} />
    </div>
  );
}