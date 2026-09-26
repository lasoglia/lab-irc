import React from 'react';

/**
 * Labelled form input. Supports single-line (`<input>`) and multi-line (`<textarea>`).
 * Violet focus ring and border shift on focus.
 */
export interface InputProps {
  /** Field label rendered above the input */
  label?: string;
  /** HTML input type; ignored when `multiline` is true */
  type?: 'text' | 'email' | 'password' | 'number' | 'search';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Optional helper text shown below the field */
  hint?: string;
  /** Render a textarea instead of an input */
  multiline?: boolean;
  /** Textarea row count — default: 4 */
  rows?: number;
  /** Explicit element id; auto-generated if omitted */
  id?: string;
  /** Shows a red asterisk next to the label */
  required?: boolean;
}
