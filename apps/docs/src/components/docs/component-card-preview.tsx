import type { ComponentType } from 'react';
import { CardPreviewFrame } from './card-preview-frame';
import styles from './component-card-preview.module.css';
import { actionsUtilitiesDrawings } from './component-card-preview/actions-utilities';
import { displayContentDrawings } from './component-card-preview/display-content';
import { feedbackStatusDrawings } from './component-card-preview/feedback-status';
import { formInputDrawings } from './component-card-preview/form-input';
import { layoutNavigationDrawings } from './component-card-preview/layout-navigation';
import { overlaysDialogsDrawings } from './component-card-preview/overlays-dialogs';

const drawings: Record<string, ComponentType> = {
  ...formInputDrawings,
  ...layoutNavigationDrawings,
  ...overlaysDialogsDrawings,
  ...feedbackStatusDrawings,
  ...displayContentDrawings,
  ...actionsUtilitiesDrawings,
};

function ComponentCardPreview({ component }: { component: string }) {
  const ComponentDrawing = drawings[component] ?? formInputDrawings.input;
  return (
    <CardPreviewFrame>
      <div className={styles.canvas}>
        <ComponentDrawing />
      </div>
    </CardPreviewFrame>
  );
}

export { ComponentCardPreview };