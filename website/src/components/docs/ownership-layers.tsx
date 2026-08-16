import { useI18n } from '@rspress/core/runtime';
import styles from './ownership-layers.module.css';

export function OwnershipLayers() {
  const t = useI18n<typeof import('i18n')>();
  const layers = [
    { label: t('ownershipLayersBehavior'), value: 'Ark UI' },
    { label: t('ownershipLayersPresentation'), value: 'moduix CSS' },
    { label: t('ownershipLayersOwnership'), value: t('ownershipLayersPackageSource') },
  ];

  return (
    <section className={styles.root} aria-labelledby="ownership-layers-title">
      <div className={styles.summary}>
        <p className={styles.eyebrow}>{t('ownershipLayersEyebrow')}</p>
        <h2 id="ownership-layers-title">{t('ownershipLayersTitle')}</h2>
        <p>{t('ownershipLayersSummary')}</p>
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
            <strong>{t('ownershipLayersTokenFirstStyling')}</strong>
            <span>{t('ownershipLayersThemeable')}</span>
          </div>
          <div className={styles.meter} aria-hidden="true">
            <span />
          </div>
        </div>
        <p className={styles.note}>{t('ownershipLayersNote')}</p>
      </div>
    </section>
  );
}