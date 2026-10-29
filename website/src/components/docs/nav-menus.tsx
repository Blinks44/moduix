import { Menu } from '@ark-ui/react/menu';
import { Portal } from '@ark-ui/react/portal';
import { useI18n, useLang, useLocation, useSite } from '@rspress/core/runtime';
import { useStorageValue } from '@rspress/core/theme';
import { ArrowRight, Check, ChevronDown, Languages, Palette } from 'lucide-react';
import { useEffect } from 'react';
import { getLocalizedPath, useLocalizedPath } from '@/utils/localized-path';
import styles from './nav-menus.module.css';
import '@moduix/react/presets/contrast.css';
import '@moduix/react/presets/dense.css';
import '@moduix/react/presets/soft.css';

// `index.html` reads the same key before hydration to avoid a flash of the default preset.
const presetStorageKey = 'moduix.preset';

const presets = [
  { value: 'calm', title: 'Calm', hintKey: 'presetMenuCalmHint' },
  { value: 'dense', title: 'Dense', hintKey: 'presetMenuDenseHint' },
  { value: 'soft', title: 'Soft', hintKey: 'presetMenuSoftHint' },
  { value: 'contrast', title: 'Contrast', hintKey: 'presetMenuContrastHint' },
] as const;

/** The site-wide preset, shared by the header menu and the Themes page gallery. */
export function usePreset() {
  const [stored, setPreset] = useStorageValue(presetStorageKey, 'calm');
  const preset = presets.find((item) => item.value === stored) ?? presets[0];

  useEffect(() => {
    const root = document.documentElement;
    if (preset.value === 'calm') delete root.dataset.moduixTheme;
    else root.dataset.moduixTheme = preset.value;
  }, [preset.value]);

  return [preset, setPreset] as const;
}

function Swatch({ preset }: { preset: string }) {
  return <span className={styles.swatch} data-preset={preset} aria-hidden="true" />;
}

function PresetMenu() {
  const t = useI18n<typeof import('i18n')>();
  const themesPath = useLocalizedPath('/docs/themes');
  const [preset, setPreset] = usePreset();

  return (
    <Menu.Root positioning={{ placement: 'bottom-start', gutter: 4 }}>
      <Menu.Trigger className={styles.trigger} aria-label={t('presetMenuLabel')}>
        <Palette aria-hidden="true" />
        {preset.title}
        <ChevronDown className={styles.chevron} aria-hidden="true" />
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content className={styles.content}>
            <Menu.RadioItemGroup
              value={preset.value}
              onValueChange={(details) => setPreset(details.value)}
            >
              {presets.map((item) => (
                <Menu.RadioItem key={item.value} value={item.value} className={styles.presetItem}>
                  <Swatch preset={item.value} />
                  <span className={styles.presetText}>
                    <Menu.ItemText className={styles.presetName}>{item.title}</Menu.ItemText>
                    <span className={styles.presetHint}>{t(item.hintKey)}</span>
                  </span>
                  <Menu.ItemIndicator className={styles.check}>
                    <Check aria-hidden="true" />
                  </Menu.ItemIndicator>
                </Menu.RadioItem>
              ))}
            </Menu.RadioItemGroup>
            <Menu.Separator className={styles.separator} />
            <Menu.Item value="themes" asChild className={styles.footerLink}>
              <a href={themesPath}>
                {t('presetMenuCustomize')}
                <ArrowRight aria-hidden="true" />
              </a>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

function PresetGrid() {
  const t = useI18n<typeof import('i18n')>();
  const [preset, setPreset] = usePreset();

  return (
    <div className={styles.grid} role="group" aria-labelledby="moduix-preset-grid-label">
      <span id="moduix-preset-grid-label" className={styles.gridLabel}>
        {t('presetMenuLabel')}
      </span>
      {presets.map((item) => (
        <button
          key={item.value}
          type="button"
          className={styles.gridItem}
          aria-pressed={item.value === preset.value}
          onClick={() => setPreset(item.value)}
        >
          <Swatch preset={item.value} />
          {item.title}
        </button>
      ))}
    </div>
  );
}

function LanguageMenu() {
  const t = useI18n<typeof import('i18n')>();
  const lang = useLang();
  const { site } = useSite();
  const { pathname, search, hash } = useLocation();
  const locales = site.locales ?? [];
  const localePrefix = new RegExp(`^/(?:${locales.map((item) => item.lang).join('|')})(?=/|$)`);
  const pagePath = pathname.replace(localePrefix, '') || '/';

  if (locales.length < 2) return null;

  return (
    <Menu.Root positioning={{ placement: 'bottom-end', gutter: 4 }}>
      <Menu.Trigger className={styles.trigger} aria-label={t('languagesText')}>
        <Languages aria-hidden="true" />
        {lang.toUpperCase()}
        <ChevronDown className={styles.chevron} aria-hidden="true" />
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content className={styles.content}>
            {locales.map((item) => (
              <Menu.Item
                key={item.lang}
                value={item.lang}
                asChild
                className={styles.languageItem}
                data-current={item.lang === lang ? '' : undefined}
              >
                <a
                  href={`${getLocalizedPath(pagePath, item.lang)}${search}${hash}`}
                  hrefLang={item.lang}
                  lang={item.lang}
                  aria-current={item.lang === lang ? 'true' : undefined}
                >
                  {item.lang === lang ? (
                    <Check className={styles.check} aria-hidden="true" />
                  ) : null}
                  <span className={styles.languageName}>{item.label}</span>
                  <span className={styles.languageCode}>{item.lang.toUpperCase()}</span>
                </a>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

/**
 * Rendered through `afterRightNavItems`, so it lands in the desktop nav and in the mobile nav
 * screen. CSS shows the menus on desktop and the preset grid on mobile, where Rspress keeps its own
 * appearance and language rows.
 */
export function NavMenus() {
  return (
    <>
      <li className={styles.desktop}>
        <PresetMenu />
      </li>
      <li className={`${styles.desktop} ${styles.language}`}>
        <LanguageMenu />
      </li>
      <li className={styles.screen}>
        <PresetGrid />
      </li>
    </>
  );
}