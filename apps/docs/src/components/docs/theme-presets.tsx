import { Badge, Button, Card, Input } from '@moduix/react';
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
  },
  {
    value: 'dense',
    title: 'Dense',
    description: 'Compact spacing and blue structure for admin and data-heavy interfaces.',
  },
  {
    value: 'soft',
    title: 'Soft',
    description: 'Rounded surfaces and a warmer violet accent for product workflows.',
  },
  {
    value: 'contrast',
    title: 'Contrast',
    description: 'Sharper borders and clearer contrast for focused, technical interfaces.',
  },
];

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
          <Badge variant="secondary">{mode}</Badge>
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
              <div className={styles.stats}>
                <span>12 tasks</span>
                <span>4 reviewers</span>
              </div>
            </Card.Body>
            <Card.Footer>
              <Button size="sm">Create workspace</Button>
              <Button size="sm" variant="outline">
                Preview
              </Button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </section>
  );
}

export { ThemePresets };