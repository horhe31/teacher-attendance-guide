/* Pure reference tools. Rules are limited to the reviewed November 2026 source. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.GuideRules = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  function parseDate(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const date = new Date(value + 'T00:00:00Z');
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : null;
  }
  function deadlineFor(portal, value) {
    if (!['pfi', 'ati', 'ranking'].includes(portal)) return { error: 'portal' };
    const event = parseDate(value);
    if (!event) return { error: 'date' };
    const earliest = portal === 'pfi' ? '2026-09-26' : '2026-11-01';
    if (value < earliest || value > '2026-11-30') return { error: 'outside' };
    if (portal === 'pfi' && value <= '2026-10-25') return { date: '2026-11-08', reason: 'September 26–October 25 special window.', afterCap: false };
    if (value <= '2026-11-05') return { date: '2026-11-10', reason: portal === 'pfi' ? 'October 26–November 5 special window.' : 'November 1–5 special window.', afterCap: false };
    const fiveDays = new Date(event.getTime() + 5 * 86400000).toISOString().slice(0, 10);
    const cap = portal === 'ati' ? '2026-11-21' : '2026-11-30';
    return { date: fiveDays < cap ? fiveDays : cap, reason: fiveDays < cap ? 'Event date is day zero. Add five calendar days.' : 'The monthly cap is earlier than, or equal to, event +5 days.', afterCap: value > cap };
  }
  function pfiClass(value) {
    if (value === '' || value === null || value === undefined) return null;
    const gross = Number(value);
    if (!Number.isFinite(gross) || gross < 0) return null;
    if (gross < 4000) return { level: 1, band: 'Below ₱4,000', amounts: [300, 400, 750] };
    if (gross < 8000) return { level: 2, band: '₱4,000–₱7,999.99', amounts: [600, 800, 1500] };
    if (gross < 13000) return { level: 3, band: '₱8,000–₱12,999.99', amounts: [1200, 1600, 3000] };
    return { level: 4, band: '₱13,000 and above', amounts: [1950, 2600, 4875] };
  }
  function atiExample(scenario) {
    const examples = {
      qualified: { labels: ['August', 'September', 'October'], values: [1300, 1600, 1900], note: 'Qualified months advance to the next amount.' },
      failed: { labels: ['August', 'September', 'October'], values: [1300, 0, 1000], note: 'A not-qualified month pays ₱0. The next qualified month restarts at ₱1,000.' },
      incomplete: { labels: ['Current month', 'Next qualified month'], values: [0, 1000], note: 'Incomplete data pays ₱0 for the current month. Do not assume perfect attendance.' }
    };
    return examples[scenario] || examples.qualified;
  }
  return Object.freeze({ deadlineFor, pfiClass, atiExample });
});
