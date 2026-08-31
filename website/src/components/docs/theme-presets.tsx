import { createListCollection } from '@ark-ui/react/collection';
import { Badge } from '@moduix/react/badge';
import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Input } from '@moduix/react/input';
import { Select } from '@moduix/react/select';
import { useI18n } from '@rspress/core/runtime';
import { useState } from 'react';
import styles from './theme-presets.module.css';
import '@moduix/react/presets/contrast.css';
import '@moduix/react/presets/dense.css';
import '@moduix/react/presets/soft.css';

const presets = [
  {
    value: 'calm',
    title: 'Calm',
    descriptionKey: 'themePresetCalmDescription',
    controlSize: '36px',
    popupSize: '32px',
  },
  {
    value: 'dense',
    title: 'Dense',
    descriptionKey: 'themePresetDenseDescription',
    controlSize: '34px',
    popupSize: '30px',
  },
  {
    value: 'soft',
    title: 'Soft',
    descriptionKey: 'themePresetSoftDescription',
    controlSize: '40px',
    popupSize: '34px',
  },
  {
    value: 'contrast',
    title: 'Contrast',
    descriptionKey: 'themePresetContrastDescription',
    controlSize: '36px',
    popupSize: '32px',
  },
] as const;

const stages = [
  { value: 'planning', labelKey: 'themePreviewPlanning' },
  { value: 'review', labelKey: 'themePreviewInReview' },
  { value: 'ready', labelKey: 'themePreviewReadyToShip' },
] as const;

function ThemePresets() {
  const t = useI18n<typeof import('i18n')>();
  const [preset, setPreset] = useState('calm');
  const [mode, setMode] = useState('light');
  const activePreset = presets.find((item) => item.value === preset) ?? presets[0];
  const stageCollection = createListCollection({
    items: stages.map((item) => ({ value: item.value, label: t(item.labelKey) })),
  });

  return (
    <section className={styles.root} aria-label={t('themePresetPreviewLabel')}>
      <div className={styles.controls}>
        <div className={styles.presetList} aria-label={t('themePresetListLabel')}>
          {presets.map((item) => (
            <button
              key={item.value}
              type="button"
              className={styles.presetButton}
              data-active={item.value === preset || undefined}
              aria-pressed={item.value === preset}
              onClick={() => setPreset(item.value)}
            >
              <span>{item.title}</span>
              <small>{t(item.descriptionKey)}</small>
            </button>
          ))}
        </div>

        <div className={styles.modeList} aria-label={t('themePreviewColorModeLabel')}>
          <button
            type="button"
            data-active={mode === 'light' || undefined}
            aria-pressed={mode === 'light'}
            onClick={() => setMode('light')}
          >
            {t('themePreviewLight')}
          </button>
          <button
            type="button"
            data-active={mode === 'dark' || undefined}
            aria-pressed={mode === 'dark'}
            onClick={() => setMode('dark')}
          >
            {t('themePreviewDark')}
          </button>
        </div>
      </div>

      <div
        className={styles.preview}
        data-moduix-color-scheme={mode}
        data-moduix-theme={preset === 'calm' ? undefined : preset}
      >
        <div className={styles.previewHeader}>
          <div>
            <span>{t('themePreviewLabel')}</span>
            <strong>{activePreset.title}</strong>
          </div>
          <div className={styles.previewMeta}>
            <span>
              {t('themePreviewControls')} <strong>{activePreset.controlSize}</strong>
            </span>
            <span>
              {t('themePreviewPopupRows')} <strong>{activePreset.popupSize}</strong>
            </span>
            <Badge variant="secondary">
              {t(mode === 'light' ? 'themePreviewLight' : 'themePreviewDark')}
            </Badge>
          </div>
        </div>

        <div className={styles.previewCanvas}>
          <Card className={styles.previewCard}>
            <Card.Header>
              <div>
                <Card.Title>{t('themePreviewReleaseWorkspace')}</Card.Title>
                <Card.Description>{t('themePreviewOneVisualDecision')}</Card.Description>
              </div>
              <Card.Action>
                <Badge>{t('themePreviewReady')}</Badge>
              </Card.Action>
            </Card.Header>
            <Card.Body className={styles.previewBody}>
              <label className={styles.field}>
                {t('themePreviewProjectName')}
                <Input defaultValue={t('themePreviewSpringRelease')} />
              </label>
              <Select collection={stageCollection} defaultValue={['review']} portalled={false}>
                <Select.Label>{t('themePreviewStage')}</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder={t('themePreviewSelectStage')} />
                    <Select.Indicator />
                  </Select.Trigger>
                </Select.Control>
                <Select.Positioner>
                  <Select.Content>
                    <Select.ItemGroup>
                      <Select.ItemGroupLabel>{t('themePreviewWorkflow')}</Select.ItemGroupLabel>
                      {stageCollection.items.map((item) => (
                        <Select.Item key={item.value} item={item}>
                          <Select.ItemText>{item.label}</Select.ItemText>
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.ItemGroup>
                  </Select.Content>
                </Select.Positioner>
              </Select>
              <div className={styles.stats}>
                <span>{t('themePreviewTaskCount')}</span>
                <span>{t('themePreviewReviewerCount')}</span>
              </div>
            </Card.Body>
            <Card.Footer>
              <Button>{t('themePreviewCreateWorkspace')}</Button>
              <Button variant="outline">{t('themePreviewPreview')}</Button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </section>
  );
}

export { ThemePresets };