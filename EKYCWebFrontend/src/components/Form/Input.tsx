import React from 'react';

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  pattern?: string;
  maxLength?: number;
  help?: string;
  ariaInvalid?: boolean;
};

// PUBLIC_INTERFACE
export function Input({
  id, label, value, onChange, type = 'text', required, pattern, maxLength, help, ariaInvalid
}: Props): React.ReactElement {
  /** Accessible input with label, optional pattern, and help text. */
  const helpId = help ? `${id}-help` : undefined;
  return (
    <div style={{ marginBottom: 12 }}>
      <label htmlFor={id} style={{ display: 'block', marginBottom: 4 }}>{label}{required ? ' *' : ''}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={helpId}
        aria-invalid={ariaInvalid}
        required={required}
        pattern={pattern}
        maxLength={maxLength}
        style={{ padding: 8, borderRadius: 6, border: '1px solid var(--border-color)', minWidth: 260 }}
      />
      {help && <div id={helpId} style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{help}</div>}
    </div>
  );
}
