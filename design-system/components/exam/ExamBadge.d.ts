/**
 * Status pill for the exam platform lifecycle.
 * Uses the institutional blue/gold palette (`--exam-*` tokens) rather than the
 * main "Notte Studio" accent colours.
 */
export interface ExamBadgeProps {
  /**
   * Exam or submission lifecycle state.
   * - `bozza` — draft, not visible to students
   * - `pubblicata` — live; students can access via the link
   * - `chiusa` — closed; no new submissions accepted
   * - `corretta` — manually graded
   * - `consegnata` — submitted by student; awaiting teacher review
   * - `in_corso` — student is currently taking the exam
   */
  status: 'bozza' | 'pubblicata' | 'chiusa' | 'corretta' | 'consegnata' | 'in_corso';
}
