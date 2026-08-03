import { Button } from '@moduix/react/button';
import { Popover } from '@moduix/react/popover';
import { useI18n } from '@rspress/core/runtime';
import styles from './animations.module.css';

type TranslationKey = Parameters<ReturnType<typeof useI18n<typeof import('i18n')>>>[0];

type RecipeCardProps = {
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  popupClassName: string;
};

function RecipeCard({ titleKey, descriptionKey, popupClassName }: RecipeCardProps) {
  const t = useI18n<typeof import('i18n')>();
  const title = t(titleKey);

  return (
    <div className={styles.recipeCard}>
      <div>
        <p className={styles.recipeTitle}>{title}</p>
        <p className={styles.recipeDescription}>{t(descriptionKey)}</p>
      </div>

      <Popover positioning={{ gutter: 10 }}>
        <Popover.Trigger asChild>
          <Button variant="outline">{t('animationsRecipePreview')}</Button>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content className={`${styles.popup} ${popupClassName}`}>
            <div className={styles.popupHeader}>
              <p className={styles.label}>{title}</p>
              <p className={styles.caption}>{t('animationsRecipePreviewCaption')}</p>
            </div>
          </Popover.Content>
        </Popover.Positioner>
      </Popover>
    </div>
  );
}

const recipes: RecipeCardProps[] = [
  {
    titleKey: 'animationsRecipeFadeTitle',
    descriptionKey: 'animationsRecipeFadeDescription',
    popupClassName: styles.fadePopup,
  },
  {
    titleKey: 'animationsRecipeSlideUpTitle',
    descriptionKey: 'animationsRecipeSlideUpDescription',
    popupClassName: styles.slideUpPopup,
  },
  {
    titleKey: 'animationsRecipeSlideDownTitle',
    descriptionKey: 'animationsRecipeSlideDownDescription',
    popupClassName: styles.slideDownPopup,
  },
  {
    titleKey: 'animationsRecipeSlideLeftTitle',
    descriptionKey: 'animationsRecipeSlideLeftDescription',
    popupClassName: styles.slideLeftPopup,
  },
  {
    titleKey: 'animationsRecipeSlideRightTitle',
    descriptionKey: 'animationsRecipeSlideRightDescription',
    popupClassName: styles.slideRightPopup,
  },
  {
    titleKey: 'animationsRecipeZoomTitle',
    descriptionKey: 'animationsRecipeZoomDescription',
    popupClassName: styles.zoomPopup,
  },
  {
    titleKey: 'animationsRecipeLiftTitle',
    descriptionKey: 'animationsRecipeLiftDescription',
    popupClassName: styles.liftPopup,
  },
  {
    titleKey: 'animationsRecipeDropInTitle',
    descriptionKey: 'animationsRecipeDropInDescription',
    popupClassName: styles.dropInPopup,
  },
  {
    titleKey: 'animationsRecipeSoftPopTitle',
    descriptionKey: 'animationsRecipeSoftPopDescription',
    popupClassName: styles.softPopPopup,
  },
];

export function MotionRecipesExample() {
  return (
    <div className={styles.recipesGrid}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.popupClassName} {...recipe} />
      ))}
    </div>
  );
}