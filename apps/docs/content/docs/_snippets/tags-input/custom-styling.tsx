/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { TagsInput } from '@moduix/react';
import styles from './tags-input-demo.module.css';

export function CustomStylingTagsInput() {
  return (
    <TagsInput className={styles.customRoot} defaultValue={['Design', 'API']}>
      <TagsInput.Label>Workstreams</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Context>
          {(tagsInput) =>
            tagsInput.value.map((item, index) => (
              <TagsInput.Item key={`${item}-${index}`} index={index} value={item}>
                <TagsInput.ItemPreview>
                  <TagsInput.ItemText>{item}</TagsInput.ItemText>
                  <TagsInput.ItemDeleteTrigger aria-label={`Remove ${item}`} />
                </TagsInput.ItemPreview>
                <TagsInput.ItemInput />
              </TagsInput.Item>
            ))
          }
        </TagsInput.Context>
        <TagsInput.Input placeholder="Add workstream" />
        <TagsInput.ClearTrigger aria-label="Clear workstreams" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  );
}

//#endregion