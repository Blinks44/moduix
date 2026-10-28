import { Button } from '@moduix/react/button';
import { Field, FieldLabel } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/react/switch';
import { useI18n } from '@rspress/core/runtime';
import styles from './theme-presets.module.css';

const presets = [
  { value: 'calm', title: 'Calm', metrics: '36 / 32px' },
  { value: 'dense', title: 'Dense', metrics: '34 / 30px' },
  { value: 'soft', title: 'Soft', metrics: '40 / 34px' },
  { value: 'contrast', title: 'Contrast', metrics: '36 / 32px' },
] as const;

function ThemePresets() {
  const t = useI18n<typeof import('i18n')>();

  return (
    <section className={styles.root} aria-label={t('themePresetsLabel')}>
      {presets.map((item) => (
        <div key={item.value} className={styles.card} data-moduix-theme={item.value}>
          <div className={styles.header}>
            <strong>{item.title}</strong>
            {item.value === 'calm' ? <span>{t('cssDefault')}</span> : null}
            <code>{item.metrics}</code>
          </div>
          <div className={styles.stage}>
            <Field>
              <FieldLabel>{t('themePresetsWorkspace')}</FieldLabel>
              <Input defaultValue="Acme Inc." />
            </Field>
            <Switch defaultChecked>
              <SwitchControl />
              <SwitchLabel>{t('themePresetsEmailUpdates')}</SwitchLabel>
              <SwitchHiddenInput />
            </Switch>
            <div className={styles.actions}>
              <Button variant="outline">{t('themePresetsCancel')}</Button>
              <Button>{t('themePresetsSave')}</Button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export { ThemePresets };