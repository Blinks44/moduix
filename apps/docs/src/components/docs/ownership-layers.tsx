import styles from './ownership-layers.module.css';

const layers = [
  { label: 'Behavior', value: 'Ark UI' },
  { label: 'Presentation', value: 'moduix CSS' },
  { label: 'Ownership', value: 'Package or source' },
];

export function OwnershipLayers() {
  return (
    <section className={styles.root} aria-labelledby="ownership-layers-title">
      <div className={styles.summary}>
        <p className={styles.eyebrow}>Design-system contract</p>
        <h2 id="ownership-layers-title">One system, three clear layers</h2>
        <p>
          Ark UI owns interaction behavior, moduix supplies the styled component layer, and your
          application owns the final theme and composition.
        </p>
      </div>
      <div className={styles.details}>
        <div className={styles.layers}>
          {layers.map((layer) => (
            <div className={styles.layer} key={layer.label}>
              <span>{layer.label}</span>
              <strong>{layer.value}</strong>
            </div>
          ))}
        </div>
        <div className={styles.tokens}>
          <div className={styles.tokensHeader}>
            <strong>Token-first styling</strong>
            <span>themeable</span>
          </div>
          <div className={styles.meter} aria-hidden="true">
            <span />
          </div>
        </div>
        <p className={styles.note}>
          Global semantic tokens establish the visual language; shared family tokens keep related
          controls aligned; component variables remain available for deliberate exceptions.
        </p>
      </div>
    </section>
  );
}