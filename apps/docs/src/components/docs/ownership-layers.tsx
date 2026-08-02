import { useLang } from '@rspress/core/runtime';
import styles from './ownership-layers.module.css';

export function OwnershipLayers() {
  const isRussian = useLang() === 'ru';
  const layers = isRussian
    ? [
        { label: 'Поведение', value: 'Ark UI' },
        { label: 'Представление', value: 'moduix CSS' },
        { label: 'Владение', value: 'Пакет или исходный код' },
      ]
    : [
        { label: 'Behavior', value: 'Ark UI' },
        { label: 'Presentation', value: 'moduix CSS' },
        { label: 'Ownership', value: 'Package or source' },
      ];

  return (
    <section className={styles.root} aria-labelledby="ownership-layers-title">
      <div className={styles.summary}>
        <p className={styles.eyebrow}>
          {isRussian ? 'Контракт дизайн-системы' : 'Design-system contract'}
        </p>
        <h2 id="ownership-layers-title">
          {isRussian ? 'Одна система, три понятных слоя' : 'One system, three clear layers'}
        </h2>
        <p>
          {isRussian
            ? 'Ark UI владеет поведением взаимодействий, moduix предоставляет слой стилизованных компонентов, а вашему приложению принадлежат итоговая тема и композиция.'
            : 'Ark UI owns interaction behavior, moduix supplies the styled component layer, and your application owns the final theme and composition.'}
        </p>
      </div>
      <div className={styles.details}>
        <div className={styles.layers} role="list">
          {layers.map((layer, index) => (
            <article className={styles.layer} key={layer.label} role="listitem">
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className={styles.layerContent}>
                <span>{layer.label}</span>
                <strong>{layer.value}</strong>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.tokens}>
          <div className={styles.tokensHeader}>
            <strong>{isRussian ? 'Стилизация на основе токенов' : 'Token-first styling'}</strong>
            <span>{isRussian ? 'настраивается темой' : 'themeable'}</span>
          </div>
          <div className={styles.meter} aria-hidden="true">
            <span />
          </div>
        </div>
        <p className={styles.note}>
          {isRussian
            ? 'Глобальные семантические токены задают визуальный язык; общие токены семейства согласуют связанные элементы управления; переменные компонентов остаются доступны для осознанных исключений.'
            : 'Global semantic tokens establish the visual language; shared family tokens keep related controls aligned; component variables remain available for deliberate exceptions.'}
        </p>
      </div>
    </section>
  );
}