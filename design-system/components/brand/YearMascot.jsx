import React from 'react';
import '../../../assets/mascotte/lab-mascotte.js';

/**
 * Year mascot: usa il web component <lab-mascotte> del pacchetto
 * assets/mascotte/ (Claude Design). Occhi (o ago) che seguono il cursore,
 * battito di ciglia, frase al clic.
 */
export function YearMascot({ year = 1, size = 55, speak = true, aureola = true }) {
  return React.createElement('lab-mascotte', {
    anno: String(year),
    size: String(size),
    aureola: aureola ? undefined : 'false',
    parla: speak ? undefined : 'false',
    fumetto: 'sinistra',
  });
}
