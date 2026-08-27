import type { ReactNode } from 'react';
import { CardPreviewFrame } from '../docs/card-preview-frame';
import styles from './recipe-card-previews.module.css';

function RecipeCardPreview({ children }: { children: ReactNode }) {
  return <CardPreviewFrame>{children}</CardPreviewFrame>;
}

function AppHeaderCardPreview() {
  return (
    <RecipeCardPreview>
      <div className={styles.appHeader}>
        <span className={styles.headerLogo} />
        <span className={styles.headerNavigation} />
        <span className={styles.headerNavigation} />
        <span className={styles.headerNavigation} />
        <span className={styles.headerAction} />
      </div>
    </RecipeCardPreview>
  );
}

function SidebarDashboardCardPreview() {
  return (
    <RecipeCardPreview>
      <div className={styles.dashboard}>
        <div className={styles.dashboardSidebar}>
          <span className={styles.sidebarBrand} />
          <span className={styles.sidebarLink} />
          <span className={styles.sidebarLink} />
          <span className={styles.sidebarLink} />
        </div>
        <div className={styles.dashboardContent}>
          <span className={styles.dashboardTitle} />
          <div className={styles.dashboardStats}>
            <span />
            <span />
          </div>
          <span className={styles.dashboardTable} />
        </div>
      </div>
    </RecipeCardPreview>
  );
}

function LoginSimpleCardPreview() {
  return (
    <RecipeCardPreview>
      <div className={`${styles.accountForm} ${styles.loginForm}`}>
        <span className={styles.formTitle} />
        <span className={styles.formDescription} />
        <span className={styles.formLabel} />
        <span className={styles.formInput} />
        <span className={styles.formLabel} />
        <span className={styles.formInput} />
        <div className={styles.formOptions}>
          <span className={styles.rememberOption}>
            <span />
            <span />
          </span>
          <span className={styles.formLink} />
        </div>
        <span className={styles.formAction} />
      </div>
    </RecipeCardPreview>
  );
}

function SignUpCardPreview() {
  return (
    <RecipeCardPreview>
      <div className={`${styles.accountForm} ${styles.signUpForm}`}>
        <span className={styles.formTitle} />
        <span className={styles.formDescription} />
        <span className={`${styles.formInput} ${styles.compactInput}`} />
        <span className={`${styles.formInput} ${styles.compactInput}`} />
        <span className={`${styles.formInput} ${styles.compactInput}`} />
        <span className={styles.termsOption}>
          <span />
          <span />
        </span>
        <span className={styles.formAction} />
      </div>
    </RecipeCardPreview>
  );
}

function ForgotPasswordCardPreview() {
  return (
    <RecipeCardPreview>
      <div className={`${styles.accountForm} ${styles.recoveryForm}`}>
        <span className={styles.recoveryIcon}>
          <span />
        </span>
        <span className={styles.formTitle} />
        <span className={styles.formDescription} />
        <span className={styles.formInput} />
        <span className={styles.formAction} />
      </div>
    </RecipeCardPreview>
  );
}

function ResetPasswordCardPreview() {
  return (
    <RecipeCardPreview>
      <div className={`${styles.accountForm} ${styles.resetForm}`}>
        <span className={styles.formTitle} />
        <span className={styles.formDescription} />
        <span className={styles.formLabel} />
        <span className={styles.formInput} />
        <span className={styles.formLabel} />
        <span className={styles.formInput} />
        <span className={styles.passwordStrength}>
          <span />
        </span>
        <span className={styles.formAction} />
      </div>
    </RecipeCardPreview>
  );
}

function VerificationCodeCardPreview() {
  return (
    <RecipeCardPreview>
      <div className={styles.codeForm}>
        <span className={styles.formTitle} />
        <span className={styles.formDescription} />
        <div className={styles.codeCells}>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <span className={styles.formAction} />
      </div>
    </RecipeCardPreview>
  );
}

function DataTableCardPreview() {
  return (
    <RecipeCardPreview>
      <div className={styles.dataTable}>
        <div className={styles.tableToolbar}>
          <span />
          <span />
        </div>
        <div className={styles.tableHeader}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.tableRow}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.tableRow}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.tableRow}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </RecipeCardPreview>
  );
}

function FileUploadManagerCardPreview() {
  return (
    <RecipeCardPreview>
      <div className={styles.uploadCard}>
        <span className={styles.uploadIcon} />
        <div className={styles.uploadDetails}>
          <span className={styles.uploadTitle} />
          <span className={styles.uploadMeta} />
          <span className={styles.uploadProgress}>
            <span />
          </span>
        </div>
      </div>
    </RecipeCardPreview>
  );
}

function ExpandableAvatarGroupCardPreview() {
  return (
    <RecipeCardPreview>
      <div className={styles.avatarGroup}>
        <span className={styles.avatar} />
        <span className={styles.avatar} />
        <span className={styles.avatar} />
        <span className={styles.avatar} />
        <span className={styles.avatarCount} />
      </div>
    </RecipeCardPreview>
  );
}

function ParallaxCardCardPreview() {
  return (
    <RecipeCardPreview>
      <div className={styles.parallaxCard}>
        <span className={styles.parallaxImage} />
        <div className={styles.parallaxOverlay}>
          <span />
          <span />
        </div>
      </div>
    </RecipeCardPreview>
  );
}

function AutoplayGalleryCardPreview() {
  return (
    <RecipeCardPreview>
      <div className={styles.autoplayGallery}>
        <div className={styles.autoplayGalleryCopy}>
          <span />
          <span />
        </div>
        <div className={styles.autoplayGalleryIndicators}>
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </RecipeCardPreview>
  );
}

export {
  AppHeaderCardPreview,
  AutoplayGalleryCardPreview,
  DataTableCardPreview,
  ExpandableAvatarGroupCardPreview,
  FileUploadManagerCardPreview,
  ForgotPasswordCardPreview,
  LoginSimpleCardPreview,
  ParallaxCardCardPreview,
  ResetPasswordCardPreview,
  SidebarDashboardCardPreview,
  SignUpCardPreview,
  VerificationCodeCardPreview,
};