/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Text } from '@moduix/react';
import styles from '@/components/examples/text.module.css';

export function TextClassNameDemo() {
  return <Text className={styles.customText}>Customized body copy with local CSS variables.</Text>;
}

//#endregion