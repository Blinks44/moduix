import { createListCollection } from '@ark-ui/react/collection';
import { Badge, Button, Card, Input, Select } from '@moduix/react';
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

const stageCollection = createListCollection({
  items: [
    { label: 'Planning', value: 'planning' },
    { label: 'In review', value: 'review' },
    { label: 'Ready to ship', value: 'ready' },
  ],
});

function ThemePresets() {
  const [preset, setPreset] = useState('calm');
  const [mode, setMode] = useState('light');
  const activePreset = presets.find((item) => item.value === preset) ?? presets[0];

  return (
    <section className={styles.root} aria-label="Theme preset preview">
      <div className={styles.controls}>
        <div className={styles.presetList} aria-label="Theme presets">
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
              <small>{item.description}</small>
            </button>
          ))}
        </div>

        <div className={styles.modeList} aria-label="Preview color mode">
          <button
            type="button"
            data-active={mode === 'light' || undefined}
            aria-pressed={mode === 'light'}
            onClick={() => setMode('light')}
          >
            Light
          </button>
          <button
            type="button"
            data-active={mode === 'dark' || undefined}
            aria-pressed={mode === 'dark'}
            onClick={() => setMode('dark')}
          >
            Dark
          </button>
        </div>
      </div>

      <div
        className={`${styles.preview} ${mode === 'dark' ? 'dark' : ''}`}
        data-moduix-theme={preset === 'calm' ? undefined : preset}
      >
        <div className={styles.previewHeader}>
          <div>
            <span>moduix preset</span>
            <strong>{activePreset.title}</strong>
          </div>
          <div className={styles.previewMeta}>
            <span>
              Controls <strong>{activePreset.controlSize}</strong>
            </span>
            <span>
              Popup rows <strong>{activePreset.popupSize}</strong>
            </span>
            <Badge variant="secondary">{mode}</Badge>
          </div>
        </div>

        <div className={styles.previewCanvas}>
          <Card className={styles.previewCard}>
            <Card.Header>
              <div>
                <Card.Title>Release workspace</Card.Title>
                <Card.Description>One visual decision, applied across the system.</Card.Description>
              </div>
              <Card.Action>
                <Badge>Ready</Badge>
              </Card.Action>
            </Card.Header>
            <Card.Body className={styles.previewBody}>
              <label className={styles.field}>
                Project name
                <Input defaultValue="Spring release" />
              </label>
              <Select collection={stageCollection} defaultValue={['review']} portalled={false}>
                <Select.Label>Stage</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select a stage" />
                  </Select.Trigger>
                  <Select.Indicators>
                    <Select.Indicator />
                  </Select.Indicators>
                </Select.Control>
                <Select.Positioner>
                  <Select.Content>
                    <Select.ItemGroup>
                      <Select.ItemGroupLabel>Workflow</Select.ItemGroupLabel>
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
                <span>12 tasks</span>
                <span>4 reviewers</span>
              </div>
            </Card.Body>
            <Card.Footer>
              <Button>Create workspace</Button>
              <Button variant="outline">Preview</Button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </section>
  );
}

export { ThemePresets };