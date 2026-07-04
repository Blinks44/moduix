/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const totalSteps = 3;

<Tour.Content>
  <Tour.ProgressText />
  <Tour.Title />
  <Tour.Description />
  <div className={styles.progressTrack}>
    <div className={styles.progressFill} style={{ width: `${tour.getProgressPercent()}%` }} />
  </div>
</Tour.Content>;

//#endregion