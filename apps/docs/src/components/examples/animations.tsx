import { Button } from '@moduix/react/button';
import { Popover } from '@moduix/react/popover';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput, CssVariables } from '../mdx/reference';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable, ExampleFrame } from '../mdx/reference';
import styles from './animations.module.css';

const animationMotionCssProperties: CssPropertyInput[] = [
  [
    '--moduix-popup-motion-duration',
    'component default',
    'Controls popup content animation duration.',
  ],
  ['--moduix-popup-motion-easing', 'component default', 'Controls popup content animation easing.'],
  [
    '--moduix-popup-motion-starting-opacity',
    'component default',
    'Controls content opacity while a popup is entering.',
  ],
  [
    '--moduix-popup-motion-ending-opacity',
    'component default',
    'Controls popup content exit opacity.',
  ],
  [
    '--moduix-popup-motion-starting-scale',
    'component default',
    'Controls popup content scale while it is entering.',
  ],
  [
    '--moduix-popup-motion-ending-scale',
    'component default',
    'Controls popup content scale while it is leaving.',
  ],
  [
    '--moduix-popup-motion-starting-translate-x',
    'component default',
    'Controls popup content horizontal offset while it is entering.',
  ],
  [
    '--moduix-popup-motion-ending-translate-x',
    'component default',
    'Controls popup content horizontal offset while it is leaving.',
  ],
  [
    '--moduix-popup-motion-starting-translate-y',
    'component default',
    'Controls popup content vertical offset while it is entering.',
  ],
  [
    '--moduix-popup-motion-ending-translate-y',
    'component default',
    'Controls popup content vertical offset while it is leaving.',
  ],
];

const animationMotionPlaygroundCssProperties: CssPropertyInput[] = [
  [
    '--moduix-popup-motion-duration',
    'var(--moduix-duration-fast)',
    'Shared popup content duration.',
  ],
  ['--moduix-popup-motion-easing', 'ease', 'Shared popup content easing.'],
  ['--moduix-popup-motion-starting-opacity', '0', 'Popup content enter opacity.'],
  ['--moduix-popup-motion-ending-opacity', '0', 'Popup content exit opacity.'],
  [
    '--moduix-popup-motion-starting-scale',
    'var(--moduix-scale-popup)',
    'Popup content enter scale.',
  ],
  ['--moduix-popup-motion-ending-scale', 'var(--moduix-scale-popup)', 'Popup content exit scale.'],
  ['--moduix-popup-motion-starting-translate-x', '0', 'Popup content enter horizontal offset.'],
  ['--moduix-popup-motion-ending-translate-x', '0', 'Popup content exit horizontal offset.'],
  ['--moduix-popup-motion-starting-translate-y', '0', 'Popup content enter vertical offset.'],
  ['--moduix-popup-motion-ending-translate-y', '0', 'Popup content exit vertical offset.'],
];

const initialMotionValues = Object.fromEntries(
  animationMotionCssProperties.map((property) => {
    const normalizedProperty = normalizeCssProperty(property);
    return [normalizedProperty.name, normalizedProperty.defaultValue];
  }),
) as CssVariables;

type AnimationLocale = 'en' | 'ru';

type AnimationExampleProps = {
  locale?: AnimationLocale;
};

type RecipeCardProps = {
  title: string;
  description: string;
  popupClassName: string;
};

const animationMotionDescriptionsRu: Record<string, string> = {
  '--moduix-popup-motion-duration':
    'Управляет длительностью анимации содержимого всплывающих компонентов.',
  '--moduix-popup-motion-easing': 'Управляет кривой анимации содержимого всплывающих компонентов.',
  '--moduix-popup-motion-starting-opacity':
    'Управляет opacity содержимого при появлении всплывающего компонента.',
  '--moduix-popup-motion-ending-opacity':
    'Управляет opacity содержимого при исчезновении всплывающего компонента.',
  '--moduix-popup-motion-starting-scale':
    'Управляет scale содержимого при появлении всплывающего компонента.',
  '--moduix-popup-motion-ending-scale':
    'Управляет scale содержимого при исчезновении всплывающего компонента.',
  '--moduix-popup-motion-starting-translate-x':
    'Управляет горизонтальным смещением содержимого при появлении всплывающего компонента.',
  '--moduix-popup-motion-ending-translate-x':
    'Управляет горизонтальным смещением содержимого при исчезновении всплывающего компонента.',
  '--moduix-popup-motion-starting-translate-y':
    'Управляет вертикальным смещением содержимого при появлении всплывающего компонента.',
  '--moduix-popup-motion-ending-translate-y':
    'Управляет вертикальным смещением содержимого при исчезновении всплывающего компонента.',
};

const animationMotionPlaygroundDescriptionsRu: Record<string, string> = {
  '--moduix-popup-motion-duration':
    'Общая длительность анимации содержимого всплывающих компонентов.',
  '--moduix-popup-motion-easing': 'Общая кривая анимации содержимого всплывающих компонентов.',
  '--moduix-popup-motion-starting-opacity':
    'Opacity содержимого при появлении всплывающего компонента.',
  '--moduix-popup-motion-ending-opacity':
    'Opacity содержимого при исчезновении всплывающего компонента.',
  '--moduix-popup-motion-starting-scale':
    'Scale содержимого при появлении всплывающего компонента.',
  '--moduix-popup-motion-ending-scale':
    'Scale содержимого при исчезновении всплывающего компонента.',
  '--moduix-popup-motion-starting-translate-x':
    'Горизонтальное смещение содержимого при появлении всплывающего компонента.',
  '--moduix-popup-motion-ending-translate-x':
    'Горизонтальное смещение содержимого при исчезновении всплывающего компонента.',
  '--moduix-popup-motion-starting-translate-y':
    'Вертикальное смещение содержимого при появлении всплывающего компонента.',
  '--moduix-popup-motion-ending-translate-y':
    'Вертикальное смещение содержимого при исчезновении всплывающего компонента.',
};

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function localizeCssProperties(
  properties: CssPropertyInput[],
  descriptions: Record<string, string> | undefined,
) {
  if (!descriptions) return properties;

  return properties.map((property) => {
    const { name, defaultValue, description } = normalizeCssProperty(property);
    return [name, defaultValue, descriptions[name] ?? description] as CssPropertyInput;
  });
}

function RecipeCard({
  title,
  description,
  popupClassName,
  locale,
}: RecipeCardProps & Required<AnimationExampleProps>) {
  return (
    <div className={styles.recipeCard}>
      <div>
        <p className={styles.recipeTitle}>{title}</p>
        <p className={styles.recipeDescription}>{description}</p>
      </div>

      <Popover positioning={{ gutter: 10 }}>
        <Popover.Trigger asChild>
          <Button variant="outline">{locale === 'ru' ? 'Предпросмотр' : 'Preview'}</Button>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content className={`${styles.popup} ${popupClassName}`}>
            <div className={styles.popupHeader}>
              <p className={styles.label}>{title}</p>
              <p className={styles.caption}>
                {locale === 'ru'
                  ? 'Та же структура, другой рецепт анимации.'
                  : 'Same structure, different motion recipe.'}
              </p>
            </div>
          </Popover.Content>
        </Popover.Positioner>
      </Popover>
    </div>
  );
}

export function MotionRecipesExample({ locale = 'en' }: AnimationExampleProps) {
  const recipes: RecipeCardProps[] =
    locale === 'ru'
      ? [
          {
            title: 'Затухание',
            description: 'Без масштаба и смещения — только opacity.',
            popupClassName: styles.fadePopup,
          },
          {
            title: 'Сдвиг вверх',
            description: 'Поднимается на место без масштабирования.',
            popupClassName: styles.slideUpPopup,
          },
          {
            title: 'Сдвиг вниз',
            description: 'Опускается на место сверху.',
            popupClassName: styles.slideDownPopup,
          },
          {
            title: 'Сдвиг влево',
            description: 'Перемещается на место с правого края.',
            popupClassName: styles.slideLeftPopup,
          },
          {
            title: 'Сдвиг вправо',
            description: 'Перемещается на место с левого края.',
            popupClassName: styles.slideRightPopup,
          },
          {
            title: 'Масштабирование',
            description: 'Сохраняет текущее ощущение увеличения.',
            popupClassName: styles.zoomPopup,
          },
          {
            title: 'Подъём',
            description: 'Небольшой сдвиг вверх и лёгкое масштабирование для меню и карточек.',
            popupClassName: styles.liftPopup,
          },
          {
            title: 'Появление сверху',
            description: 'Небольшой сдвиг вниз и масштабирование для более тяжёлых оверлеев.',
            popupClassName: styles.dropInPopup,
          },
          {
            title: 'Мягкое появление',
            description:
              'Более медленное и выразительное увеличение для коротких поверхностей подтверждения.',
            popupClassName: styles.softPopPopup,
          },
        ]
      : [
          {
            title: 'Fade',
            description: 'No scale or offset, only opacity.',
            popupClassName: styles.fadePopup,
          },
          {
            title: 'Slide Up',
            description: 'Moves upward into place without zoom.',
            popupClassName: styles.slideUpPopup,
          },
          {
            title: 'Slide Down',
            description: 'Drops into place from above.',
            popupClassName: styles.slideDownPopup,
          },
          {
            title: 'Slide Left',
            description: 'Moves in from the right edge into place.',
            popupClassName: styles.slideLeftPopup,
          },
          {
            title: 'Slide Right',
            description: 'Moves in from the left edge into place.',
            popupClassName: styles.slideRightPopup,
          },
          {
            title: 'Zoom',
            description: 'Keeps the current scale-in feel.',
            popupClassName: styles.zoomPopup,
          },
          {
            title: 'Lift',
            description: 'Small upward slide plus subtle zoom for menus and cards.',
            popupClassName: styles.liftPopup,
          },
          {
            title: 'Drop In',
            description: 'Small downward slide plus scale for heavier overlays.',
            popupClassName: styles.dropInPopup,
          },
          {
            title: 'Soft Pop',
            description: 'A slower, more expressive scale-in for short confirmation surfaces.',
            popupClassName: styles.softPopPopup,
          },
        ];

  return (
    <div className={styles.recipesGrid}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.popupClassName} {...recipe} locale={locale} />
      ))}
    </div>
  );
}

function MotionPlaygroundExample({ locale }: Required<AnimationExampleProps>) {
  return (
    <div className={styles.stack}>
      <Popover positioning={{ gutter: 12 }}>
        <div className={styles.playgroundTrigger}>
          <Popover.Trigger asChild>
            <Button>
              {locale === 'ru' ? 'Открыть песочницу анимации' : 'Open motion playground'}
            </Button>
          </Popover.Trigger>
        </div>
        <Popover.Positioner>
          <Popover.Content className={styles.playgroundPopup}>
            <div className={styles.playgroundHeader}>
              <span className={styles.playgroundKicker}>
                {locale === 'ru' ? 'Анимации' : 'Animations'}
              </span>
              <p className={styles.playgroundTitle}>
                {locale === 'ru'
                  ? 'Настройте общую анимацию всплывающих компонентов'
                  : 'Tune shared popup motion'}
              </p>
              <p className={styles.playgroundDescription}>
                {locale === 'ru'
                  ? 'Измените общие токены всплывающих компонентов на вкладке Playground, чтобы проверить контракт анимации, используемый каждой поддерживаемой всплывающей поверхностью.'
                  : 'Change the shared popup tokens in the Playground tab to test the motion contract used by every supported popup surface.'}
              </p>
            </div>
          </Popover.Content>
        </Popover.Positioner>
      </Popover>
    </div>
  );
}

export function AnimationMotionPlayground({ locale = 'en' }: AnimationExampleProps) {
  const properties = localizeCssProperties(
    animationMotionCssProperties,
    locale === 'ru' ? animationMotionDescriptionsRu : undefined,
  ).map(normalizeCssProperty);
  const [values, setValues] = React.useState<CssVariables>(initialMotionValues);
  const appliedValues = React.useMemo(
    () =>
      Object.fromEntries(
        properties
          .map(({ name, defaultValue }) => [name, values[name], defaultValue] as const)
          .filter(([, value, defaultValue]) => value !== defaultValue),
      ) as CssVariables,
    [properties, values],
  );

  React.useEffect(() => {
    const previousValues = new Map<string, string>();

    for (const [name, value] of Object.entries(appliedValues)) {
      previousValues.set(name, document.documentElement.style.getPropertyValue(name));
      document.documentElement.style.setProperty(name, String(value));
    }

    return () => {
      for (const [name, value] of previousValues) {
        if (value) document.documentElement.style.setProperty(name, value);
        else document.documentElement.style.removeProperty(name);
      }
    };
  }, [appliedValues]);

  const context: CSSPropertiesEditorContext = {
    properties,
    values,
    onChange: setValues,
    onReset: () => setValues(initialMotionValues),
  };

  return (
    <div className={styles.motionPlayground}>
      <ExampleFrame>
        <MotionPlaygroundExample locale={locale} />
      </ExampleFrame>
      <div className={styles.motionPanel}>
        <AnimationMotionPropertiesPanel locale={locale} />
      </div>
      <div className={styles.motionPanel}>
        <AnimationMotionPlaygroundPanel {...context} locale={locale} />
      </div>
    </div>
  );
}

function AnimationMotionPropertiesPanel({ locale }: Required<AnimationExampleProps>) {
  return (
    <CSSPropertiesReferenceTable
      properties={localizeCssProperties(
        animationMotionCssProperties,
        locale === 'ru' ? animationMotionDescriptionsRu : undefined,
      ).map(normalizeCssProperty)}
    />
  );
}

function AnimationMotionPlaygroundPanel({
  values,
  onChange,
  onReset,
  locale,
}: CSSPropertiesEditorContext & Required<AnimationExampleProps>) {
  const properties = localizeCssProperties(
    animationMotionPlaygroundCssProperties,
    locale === 'ru' ? animationMotionPlaygroundDescriptionsRu : undefined,
  ).map(normalizeCssProperty);
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