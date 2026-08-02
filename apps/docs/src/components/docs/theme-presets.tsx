import { createListCollection } from '@ark-ui/react/collection';
import { Badge } from '@moduix/react/badge';
import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Input } from '@moduix/react/input';
import { Select } from '@moduix/react/select';
import { useLang } from '@rspress/core/runtime';
import { useState } from 'react';
import styles from './theme-presets.module.css';
import '@moduix/react/presets/contrast.css';
import '@moduix/react/presets/dense.css';
import '@moduix/react/presets/soft.css';

const presets = [
  {
    value: 'calm',
    title: 'Calm',
    description: 'The balanced moduix foundation. Quiet surfaces and a neutral rhythm.',
    controlSize: '36px',
    popupSize: '32px',
  },
  {
    value: 'dense',
    title: 'Dense',
    description: 'Compact spacing and blue structure for admin and data-heavy interfaces.',
    controlSize: '34px',
    popupSize: '30px',
  },
  {
    value: 'soft',
    title: 'Soft',
    description: 'Rounded surfaces and a warmer violet accent for product workflows.',
    controlSize: '40px',
    popupSize: '34px',
  },
  {
    value: 'contrast',
    title: 'Contrast',
    description: 'Sharper borders and clearer contrast for focused, technical interfaces.',
    controlSize: '36px',
    popupSize: '32px',
  },
];

const russianPresetDescriptions: Record<string, string> = {
  calm: 'Сбалансированная основа moduix. Спокойные поверхности и нейтральный ритм.',
  dense:
    'Компактные интервалы и синяя структура для административных интерфейсов и работы с данными.',
  soft: 'Скруглённые поверхности и более тёплый фиолетовый акцент для продуктовых сценариев.',
  contrast: 'Более чёткие границы и контраст для сфокусированных технических интерфейсов.',
};

const getStageCollection = (isRussian: boolean) =>
  createListCollection({
    items: isRussian
      ? [
          { label: 'Планирование', value: 'planning' },
          { label: 'На проверке', value: 'review' },
          { label: 'Готово к выпуску', value: 'ready' },
        ]
      : [
          { label: 'Planning', value: 'planning' },
          { label: 'In review', value: 'review' },
          { label: 'Ready to ship', value: 'ready' },
        ],
  });

function ThemePresets() {
  const isRussian = useLang() === 'ru';
  const t = (english: string, russian: string) => (isRussian ? russian : english);
  const [preset, setPreset] = useState('calm');
  const [mode, setMode] = useState('light');
  const activePreset = presets.find((item) => item.value === preset) ?? presets[0];
  const stageCollection = getStageCollection(isRussian);

  return (
    <section
      className={styles.root}
      aria-label={t('Theme preset preview', 'Предпросмотр пресета темы')}
    >
      <div className={styles.controls}>
        <div className={styles.presetList} aria-label={t('Theme presets', 'Пресеты тем')}>
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
              <small>{isRussian ? russianPresetDescriptions[item.value] : item.description}</small>
            </button>
          ))}
        </div>

        <div
          className={styles.modeList}
          aria-label={t('Preview color mode', 'Цветовой режим предпросмотра')}
        >
          <button
            type="button"
            data-active={mode === 'light' || undefined}
            aria-pressed={mode === 'light'}
            onClick={() => setMode('light')}
          >
            {t('Light', 'Светлый')}
          </button>
          <button
            type="button"
            data-active={mode === 'dark' || undefined}
            aria-pressed={mode === 'dark'}
            onClick={() => setMode('dark')}
          >
            {t('Dark', 'Тёмный')}
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
            <span>{t('moduix preset', 'пресет moduix')}</span>
            <strong>{activePreset.title}</strong>
          </div>
          <div className={styles.previewMeta}>
            <span>
              {t('Controls', 'Элементы управления')} <strong>{activePreset.controlSize}</strong>
            </span>
            <span>
              {t('Popup rows', 'Строки всплывающих списков')}{' '}
              <strong>{activePreset.popupSize}</strong>
            </span>
            <Badge variant="secondary">{mode}</Badge>
          </div>
        </div>

        <div className={styles.previewCanvas}>
          <Card className={styles.previewCard}>
            <Card.Header>
              <div>
                <Card.Title>{t('Release workspace', 'Пространство выпуска')}</Card.Title>
                <Card.Description>
                  {t(
                    'One visual decision, applied across the system.',
                    'Одно визуальное решение, применённое во всей системе.',
                  )}
                </Card.Description>
              </div>
              <Card.Action>
                <Badge>{t('Ready', 'Готово')}</Badge>
              </Card.Action>
            </Card.Header>
            <Card.Body className={styles.previewBody}>
              <label className={styles.field}>
                {t('Project name', 'Название проекта')}
                <Input defaultValue={t('Spring release', 'Весенний выпуск')} />
              </label>
              <Select collection={stageCollection} defaultValue={['review']} portalled={false}>
                <Select.Label>{t('Stage', 'Этап')}</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder={t('Select a stage', 'Выберите этап')} />
                    <Select.Indicator />
                  </Select.Trigger>
                </Select.Control>
                <Select.Positioner>
                  <Select.Content>
                    <Select.ItemGroup>
                      <Select.ItemGroupLabel>
                        {t('Workflow', 'Процесс работы')}
                      </Select.ItemGroupLabel>
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
                <span>{t('12 tasks', '12 задач')}</span>
                <span>{t('4 reviewers', '4 проверяющих')}</span>
              </div>
            </Card.Body>
            <Card.Footer>
              <Button>{t('Create workspace', 'Создать пространство')}</Button>
              <Button variant="outline">{t('Preview', 'Предпросмотр')}</Button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </section>
  );
}

export { ThemePresets };