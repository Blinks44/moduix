import { Button, Popover } from '@moduix/react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './animations.module.css';

export const animationMotionCssProperties: CssPropertyInput[] = [
  ['--popup-motion-duration', 'component default', 'Controls popup content animation duration.'],
  ['--popup-motion-easing', 'component default', 'Controls popup content animation easing.'],
  [
    '--popup-motion-starting-opacity',
    'component default',
    'Controls content opacity while a popup is entering.',
  ],
  ['--popup-motion-ending-opacity', 'component default', 'Controls popup content exit opacity.'],
  [
    '--popup-motion-starting-scale',
    'component default',
    'Controls popup content scale while it is entering.',
  ],
  [
    '--popup-motion-ending-scale',
    'component default',
    'Controls popup content scale while it is leaving.',
  ],
  [
    '--popup-motion-starting-translate-x',
    'component default',
    'Controls popup content horizontal offset while it is entering.',
  ],
  [
    '--popup-motion-ending-translate-x',
    'component default',
    'Controls popup content horizontal offset while it is leaving.',
  ],
  [
    '--popup-motion-starting-translate-y',
    'component default',
    'Controls popup content vertical offset while it is entering.',
  ],
  [
    '--popup-motion-ending-translate-y',
    'component default',
    'Controls popup content vertical offset while it is leaving.',
  ],
];

export const animationMotionPlaygroundCssProperties: CssPropertyInput[] = [
  ['--popup-motion-duration', 'var(--duration-fast)', 'Shared popup content duration.'],
  ['--popup-motion-easing', 'ease', 'Shared popup content easing.'],
  ['--popup-motion-starting-opacity', '0', 'Popup content enter opacity.'],
  ['--popup-motion-ending-opacity', '0', 'Popup content exit opacity.'],
  ['--popup-motion-starting-scale', 'var(--scale-popup)', 'Popup content enter scale.'],
  ['--popup-motion-ending-scale', 'var(--scale-popup)', 'Popup content exit scale.'],
  ['--popup-motion-starting-translate-x', '0', 'Popup content enter horizontal offset.'],
  ['--popup-motion-ending-translate-x', '0', 'Popup content exit horizontal offset.'],
  ['--popup-motion-starting-translate-y', '0', 'Popup content enter vertical offset.'],
  ['--popup-motion-ending-translate-y', '0', 'Popup content exit vertical offset.'],
];

type RecipeCardProps = {
  title: string;
  description: string;
  popupClassName: string;
};

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function RecipeCard({ title, description, popupClassName }: RecipeCardProps) {
  return (
    <div className={styles.recipeCard}>
      <div>
        <p className={styles.recipeTitle}>{title}</p>
        <p className={styles.recipeDescription}>{description}</p>
      </div>

      <Popover positioning={{ gutter: 10 }}>
        <Popover.Trigger asChild>
          <Button variant="outline">Preview</Button>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content className={`${styles.popup} ${popupClassName}`}>
            <div className={styles.popupHeader}>
              <p className={styles.label}>{title}</p>
              <p className={styles.caption}>Same structure, different motion recipe.</p>
            </div>
          </Popover.Content>
        </Popover.Positioner>
      </Popover>
    </div>
  );
}

export function MotionRecipesExample() {
  return (
    <div className={styles.recipesGrid}>
      <RecipeCard
        title="Fade"
        description="No scale or offset, only opacity."
        popupClassName={styles.fadePopup}
      />
      <RecipeCard
        title="Slide Up"
        description="Moves upward into place without zoom."
        popupClassName={styles.slideUpPopup}
      />
      <RecipeCard
        title="Slide Down"
        description="Drops into place from above."
        popupClassName={styles.slideDownPopup}
      />
      <RecipeCard
        title="Slide Left"
        description="Moves in from the right edge into place."
        popupClassName={styles.slideLeftPopup}
      />
      <RecipeCard
        title="Slide Right"
        description="Moves in from the left edge into place."
        popupClassName={styles.slideRightPopup}
      />
      <RecipeCard
        title="Zoom"
        description="Keeps the current scale-in feel."
        popupClassName={styles.zoomPopup}
      />
      <RecipeCard
        title="Lift"
        description="Small upward slide plus subtle zoom for menus and cards."
        popupClassName={styles.liftPopup}
      />
      <RecipeCard
        title="Drop In"
        description="Small downward slide plus scale for heavier overlays."
        popupClassName={styles.dropInPopup}
      />
      <RecipeCard
        title="Soft Pop"
        description="A slower, more expressive scale-in for short confirmation surfaces."
        popupClassName={styles.softPopPopup}
      />
    </div>
  );
}

export function MotionPlaygroundExample() {
  return (
    <div className={styles.stack}>
      <Popover positioning={{ gutter: 12 }}>
        <div className={styles.playgroundTrigger}>
          <Popover.Trigger asChild>
            <Button>Open motion playground</Button>
          </Popover.Trigger>
        </div>
        <Popover.Positioner>
          <Popover.Content className={styles.playgroundPopup}>
            <div className={styles.playgroundHeader}>
              <span className={styles.playgroundKicker}>Animations</span>
              <p className={styles.playgroundTitle}>Tune shared popup motion</p>
              <p className={styles.playgroundDescription}>
                Change the shared popup tokens in the Playground tab to test the motion contract
                used by every supported popup surface.
              </p>
            </div>
          </Popover.Content>
        </Popover.Positioner>
      </Popover>
    </div>
  );
}

export function AnimationMotionPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={animationMotionCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function AnimationMotionPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  const properties = animationMotionPlaygroundCssProperties.map(normalizeCssProperty);
  const playgroundValues = { ...values };

  for (const property of properties) {
    if (playgroundValues[property.name] === 'component default') {
      playgroundValues[property.name] = property.defaultValue;
    }
  }

  return (
    <CSSPropertiesEditor
      properties={properties}
      values={playgroundValues}
      onChange={(update) => {
        onChange((current) => {
          const normalizedCurrent = { ...current };

          for (const property of properties) {
            if (normalizedCurrent[property.name] === 'component default') {
              normalizedCurrent[property.name] = property.defaultValue;
            }
          }

          const normalizedNext = typeof update === 'function' ? update(normalizedCurrent) : update;
          const next = { ...current };

          for (const property of properties) {
            next[property.name] =
              normalizedNext[property.name] === property.defaultValue
                ? 'component default'
                : normalizedNext[property.name];
          }

          return next;
        });
      }}
      onReset={onReset}
    />
  );
}