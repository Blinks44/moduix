/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const defaultChecked = true;
const externalCommand = 'Toggle externally';

import { Button, Switch, useSwitch } from '@moduix/react';
import styles from './switch-demo.module.css';

export function SwitchRootProviderDemo() {
  const switchApi = useSwitch({ defaultChecked: true });

  return (
    <div className={styles.stack}>
      <Button variant="outline" onClick={() => switchApi.toggleChecked()}>
        Toggle externally
      </Button>
      <Switch.RootProvider value={switchApi}>
        <Switch.Control />
        <Switch.Label>External state owner</Switch.Label>
      </Switch.RootProvider>
    </div>
  );
}

//#endregion