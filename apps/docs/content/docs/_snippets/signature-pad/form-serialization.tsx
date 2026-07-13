/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { SignaturePad } from '@moduix/react';

export function FormSerializationSignaturePadDemo() {
  return (
    <form onSubmit={handleSubmit}>
      <SignaturePad name="signature" getFormValue={(paths) => JSON.stringify(paths)}>
        <SignaturePad.Label>Sign below</SignaturePad.Label>
        <SignaturePad.Canvas />
      </SignaturePad>
      <button type="submit">Submit</button>
    </form>
  );
}

//#endregion