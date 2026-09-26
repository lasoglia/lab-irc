import React from 'react';

/**
 * Labelled form input — supports text, email, password, number, and textarea.
 */
export function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  hint,
  multiline = false,
  rows = 4,
  id,
  required = false,
}) {
  const [focused, setFocused] = React.useState(false);
  const inputId = id ?? `lab-input-${Math.random().toString(36).slice(2)}`;

  const fieldStyle = {
    width: '100%', fontFamily: 'inherit', fontSize: 15,
    color: 'var(--lab-ink, #ECEAF5)',
    background: 'var(--lab-surface-2, #272438)',
    border: '1.5px solid',
    borderColor: focused ? 'var(--lab-viola, #8B5CF6)' : 'var(--lab-line, #322E45)',
    borderRadius: 'var(--lab-radius-sm, 12px)',
    padding: '11px 14px', outline: 'none',
    boxShadow: focused ? '0 0 0 3px rgba(139,92,246,.25)' : 'none',
    transition: 'border-color .15s ease, box-shadow .15s ease',
    resize: multiline ? 'vertical' : 'none',
    display: 'block', boxSizing: 'border-box',
  };

  const handlers = {
    onFocus: () => setFocused(true),
    onBlur:  () => setFocused(false),
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {label && (
        <label htmlFor={inputId} style={{
          display: 'block', fontWeight: 600, fontSize: 14,
          color: 'var(--lab-ink-soft, #C7C3DA)', marginBottom: 5,
        }}>
          {label}{required && <span style={{ color: 'var(--lab-rosso)', marginLeft: 4 }}>*</span>}
        </label>
      )}
      {multiline
        ? <textarea id={inputId} rows={rows} placeholder={placeholder} value={value}
            onChange={onChange} style={fieldStyle} {...handlers} />
        : <input id={inputId} type={type} placeholder={placeholder} value={value}
            onChange={onChange} required={required} style={fieldStyle} {...handlers} />
      }
      {hint && (
        <span style={{ fontSize: 12.5, color: 'var(--lab-muted)', marginTop: 4 }}>
          {hint}
        </span>
      )}
    </div>
  );
}
