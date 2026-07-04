/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { InputGroup } from '@moduix/react';

const customHandle = 'custom-group';

export function CustomInputGroupDemo() {
  return (
    <InputGroup className="input-group-demo-custom-group">
      <InputGroup.Addon className="input-group-demo-custom-addon">@</InputGroup.Addon>
      <InputGroup.Input placeholder={customHandle} />
      <InputGroup.Button className="input-group-demo-custom-button">Check</InputGroup.Button>
    </InputGroup>
  );
}

//#endregion