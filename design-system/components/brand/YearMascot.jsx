import React from 'react';
import '../../../assets/mascotte/lab-mascotte.js';

/**
 * Year mascot: usa il web component <lab-mascotte> del pacchetto
 * assets/mascotte/ (Claude Design). Occhi (o ago) che seguono il cursore,
 * battito di ciglia, frase al clic (niente AMDG al 7° clic).
 * Props come nel design system: year, size, speak, halo, still.
 * `aureola` resta come vecchio nome di `halo`.
 */
export function YearMascot({ year = 1, size = 55, speak = true, halo, aureola, still = false, fumetto = 'sinistra' }) {
  const conAureola = halo ?? aureola ?? true;
  return React.createElement('lab-mascotte', {
    anno: String(year),
    size: String(size),
    aureola: conAureola ? undefined : 'false',
    parla: speak ? undefined : 'false',
    statica: still ? '' : undefined,
    fumetto,
  });
}
