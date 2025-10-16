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

/**
 * PUBLIC_INTERFACE
 */
export function Input({
  id, label, value, onChange, type = 'text', required, pattern, maxLength, help, ariaInvalid
}: Props): React.ReactElement {
  /** Accessible input with label, optional pattern, and help text. */
  const helpId = help ? `${id}-help` : undefined;
  return (
    <div style={{ marginBottom: 'var(--spacing-4)' }}>
      <label className="label-base" htmlFor={id}>{label}{required ? ' *' : ''}</label>
      <input
        id={id}
        name={id}
        className="input-base"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={helpId}
        aria-invalid={ariaInvalid}
        required={required}
        pattern={pattern}
        maxLength={maxLength}
      />
      {help && <div id={helpId} className="help-text">{help}</div>}
    </div>
  );
}
