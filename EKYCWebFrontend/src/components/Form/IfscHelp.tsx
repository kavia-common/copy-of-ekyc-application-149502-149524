import React from 'react';
import { describeIfscPattern } from '../../accessibility/aria-helpers';

type Props = {
  ifsc: string;
  branchInfo: string | null;
};

/**
 * PUBLIC_INTERFACE
 */
export function IfscHelp({ ifsc, branchInfo }: Props): React.ReactElement {
  /** IFSC helper: shows format guidance and branch information when available. */
  const valid = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
  return (
    <div role="note" aria-live="polite" style={{ fontSize: 13, marginTop: 'var(--spacing-1)', marginBottom: 'var(--spacing-3)' }}>
      <div>{describeIfscPattern()}</div>
      {ifsc && !valid && <div style={{ color: '#c2410c' }}>Entered IFSC does not match expected format.</div>}
      {valid && branchInfo && <div style={{ color: '#166534' }}>Branch: {branchInfo}</div>}
      {valid && !branchInfo && <div style={{ color: '#4b5563' }}>Looking up branch…</div>}
    </div>
  );
}
