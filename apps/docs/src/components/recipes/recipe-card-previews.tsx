import type { ReactNode } from 'react';
import styles from './recipe-card-previews.module.css';

function RecipeCardPreview({ children }: { children: ReactNode }) {
  return <div className={styles.preview}>{children}</div>;
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

function MobileDrawerNavigationCardPreview() {
  return (
    <RecipeCardPreview>
      <div className={styles.mobileShell}>
        <span className={styles.mobileTopBar} />
        <div className={styles.mobileDrawer}>
          <span className={styles.drawerLabel} />
          <span className={styles.drawerLink} />
          <span className={styles.drawerLink} />
          <span className={styles.drawerLink} />
        </div>
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

function AccountFormCardPreview() {
  return (
    <RecipeCardPreview>
      <div className={styles.accountForm}>
        <span className={styles.formTitle} />
        <span className={styles.formDescription} />
        <span className={styles.formLabel} />
        <span className={styles.formInput} />
        <span className={styles.formLabel} />
        <span className={styles.formInput} />
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

export {
  AccountFormCardPreview,
  AppHeaderCardPreview,
  DataTableCardPreview,
  ExpandableAvatarGroupCardPreview,
  FileUploadManagerCardPreview,
  MobileDrawerNavigationCardPreview,
  ParallaxCardCardPreview,
  SidebarDashboardCardPreview,
  VerificationCodeCardPreview,
};