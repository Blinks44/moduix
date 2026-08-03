import { createListCollection } from '@ark-ui/react/collection';
import { Badge } from '@moduix/react/badge';
import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Input } from '@moduix/react/input';
import { Select } from '@moduix/react/select';
import { useI18n } from '@rspress/core/runtime';
import { useState } from 'react';
import styles from './theme-presets.module.css';

type Translate = ReturnType<typeof useI18n<typeof import('i18n')>>;
import '@moduix/react/presets/contrast.css';
import '@moduix/react/presets/dense.css';
import '@moduix/react/presets/soft.css';

const presets = [
  {
    value: 'calm',
    title: 'Calm',
    descriptionKey: 'ThemePresetsCalmDescription',
    controlSize: '36px',
    popupSize: '32px',
  },
  {
    value: 'dense',
    title: 'Dense',
    descriptionKey: 'ThemePresetsDenseDescription',
    controlSize: '34px',
    popupSize: '30px',
  },
  {
    value: 'soft',
    title: 'Soft',
    descriptionKey: 'ThemePresetsSoftDescription',
    controlSize: '40px',
    popupSize: '34px',
  },
  {
    value: 'contrast',
    title: 'Contrast',
    descriptionKey: 'ThemePresetsContrastDescription',
    controlSize: '36px',
    popupSize: '32px',
  },
] as const;

const getStageCollection = (t: Translate) =>
  createListCollection({
    items: [
      { label: t('ThemePresetsStagePlanning'), value: 'planning' },
      { label: t('ThemePresetsStageReview'), value: 'review' },
      { label: t('ThemePresetsStageReady'), value: 'ready' },
    ],
  });

function ThemePresets() {
  const t = useI18n<typeof import('i18n')>();
  const [preset, setPreset] = useState('calm');
  const [mode, setMode] = useState('light');
  const activePreset = presets.find((item) => item.value === preset) ?? presets[0];
  const stageCollection = getStageCollection(t);

  return (
    <section className={styles.root} aria-label={t('ThemePresetsPreviewAriaLabel')}>
      <div className={styles.controls}>
        <div className={styles.presetList} aria-label={t('ThemePresetsListAriaLabel')}>
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

        <div className={styles.modeList} aria-label={t('ThemePresetsColorModeAriaLabel')}>
          <button
            type="button"
            data-active={mode === 'light' || undefined}
            aria-pressed={mode === 'light'}
            onClick={() => setMode('light')}
          >
            {t('ThemePresetsLight')}
          </button>
          <button
            type="button"
            data-active={mode === 'dark' || undefined}
            aria-pressed={mode === 'dark'}
            onClick={() => setMode('dark')}
          >
            {t('ThemePresetsDark')}
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
            <span>{t('ThemePresetsLabel')}</span>
            <strong>{activePreset.title}</strong>
          </div>
          <div className={styles.previewMeta}>
            <span>
              {t('ThemePresetsControls')} <strong>{activePreset.controlSize}</strong>
            </span>
            <span>
              {t('ThemePresetsPopupRows')} <strong>{activePreset.popupSize}</strong>
            </span>
            <Badge variant="secondary">{mode}</Badge>
          </div>
        </div>

        <div className={styles.previewCanvas}>
          <Card className={styles.previewCard}>
            <Card.Header>
              <div>
                <Card.Title>{t('ThemePresetsWorkspace')}</Card.Title>
                <Card.Description>{t('ThemePresetsDescription')}</Card.Description>
              </div>
              <Card.Action>
                <Badge>{t('ThemePresetsReady')}</Badge>
              </Card.Action>
            </Card.Header>
            <Card.Body className={styles.previewBody}>
              <label className={styles.field}>
                {t('ThemePresetsProjectName')}
                <Input defaultValue={t('ThemePresetsSpringRelease')} />
              </label>
              <Select collection={stageCollection} defaultValue={['review']} portalled={false}>
                <Select.Label>{t('ThemePresetsStage')}</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder={t('ThemePresetsSelectStage')} />
                    <Select.Indicator />
                  </Select.Trigger>
                </Select.Control>
                <Select.Positioner>
                  <Select.Content>
                    <Select.ItemGroup>
                      <Select.ItemGroupLabel>{t('ThemePresetsWorkflow')}</Select.ItemGroupLabel>
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
                <span>{t('ThemePresetsTaskCount')}</span>
                <span>{t('ThemePresetsReviewerCount')}</span>
              </div>
            </Card.Body>
            <Card.Footer>
              <Button>{t('ThemePresetsCreateWorkspace')}</Button>
              <Button variant="outline">{t('ThemePresetsPreview')}</Button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </section>
  );
}

export { ThemePresets };