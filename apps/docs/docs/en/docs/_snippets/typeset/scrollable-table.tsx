import { Typeset } from '@moduix/react';

export default function TypesetScrollableTableDemo() {
  return (
    <Typeset>
      <Typeset.Scroll>
        <table className="wide-table">
          <thead>
            <tr>
              <th>Context</th>
              <th>Size</th>
              <th>Leading</th>
              <th>Flow</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Documentation</td>
              <td>1.125rem</td>
              <td>1.9</td>
              <td>1.75em</td>
            </tr>
          </tbody>
        </table>
      </Typeset.Scroll>
    </Typeset>
  );
}