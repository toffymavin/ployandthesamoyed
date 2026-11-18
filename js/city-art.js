/* ===== round 3 ===== */
/* --- city stamp art (80x80 box) --- */
function stampArt(id, col, on) {
  const F = on ? col : '#d8ccaa',
    L = on ? '#2a2420' : '#c4b68e',
    W = on ? '#fff' : '#efe6cc',
    S2 = on ? '#9fd3f2' : '#e9dfc2';
  const A = {
    tokyo: `<circle cx="62" cy="18" r="9" fill="${on ? '#ffb3c1' : W}"/><path d="M40 4V12" stroke="${L}" stroke-width="2"/><path d="M40 10L46 38L56 72H24L34 38Z" fill="${F}" stroke="${L}" stroke-width="2" stroke-linejoin="round"/><rect x="31" y="34" width="18" height="6" fill="${W}" stroke="${L}" stroke-width="1.6"/><rect x="28" y="54" width="24" height="5" fill="${W}" stroke="${L}" stroke-width="1.6"/><path d="M36 72Q40 62 44 72" fill="${W}"/>`,
    osaka: `<path d="M12 72L18 56H62L68 72Z" fill="${on ? '#b8b0a2' : W}" stroke="${L}" stroke-width="2"/><rect x="22" y="40" width="36" height="16" fill="${W}" stroke="${L}" stroke-width="2"/><path d="M14 42Q40 32 66 42L58 36H22Z" fill="${F}" stroke="${L}" stroke-width="2" stroke-linejoin="round"/><rect x="29" y="24" width="22" height="13" fill="${W}" stroke="${L}" stroke-width="2"/><path d="M21 26Q40 14 59 26L52 21H28Z" fill="${F}" stroke="${L}" stroke-width="2" stroke-linejoin="round"/><circle cx="23" cy="24" r="2" fill="${on ? '#f1c232' : L}"/><circle cx="57" cy="24" r="2" fill="${on ? '#f1c232' : L}"/>`,
    seoul: `<path d="M8 36Q40 18 72 36Q66 31 62 31H18Q14 31 8 36Z" fill="${F}" stroke="${L}" stroke-width="2" stroke-linejoin="round"/><rect x="16" y="31" width="48" height="6" fill="${on ? '#5f9a2c' : W}" stroke="${L}" stroke-width="1.6"/>${[20, 32, 48, 60].map(x => `<rect x="${x - 2.5}" y="37" width="5" height="25" fill="${on ? '#d8344a' : W}" stroke="${L}" stroke-width="1.4"/>`).join('')}<rect x="10" y="62" width="60" height="8" fill="${W}" stroke="${L}" stroke-width="2"/>`,
    taipei: `<path d="M40 2V12" stroke="${L}" stroke-width="2"/>${[0, 1, 2, 3, 4, 5]
      .map(i => {
        const y = 60 - i * 8;
        return `<path d="M33 ${y}H47L49 ${y - 8}H31Z" fill="${F}" stroke="${L}" stroke-width="1.6" stroke-linejoin="round"/>`;
      })
      .join(
        ''
      )}<rect x="35" y="12" width="10" height="4" fill="${F}" stroke="${L}" stroke-width="1.4"/><rect x="31" y="60" width="18" height="12" fill="${F}" stroke="${L}" stroke-width="1.6"/>`,
    hongkong: `${[
      [6, 30, 10],
      [18, 20, 9],
      [29, 34, 8],
      [39, 14, 10],
      [51, 26, 9],
      [62, 36, 12]
    ]
      .map(
        ([x, y, w]) =>
          `<rect x="${x}" y="${y}" width="${w}" height="${60 - y}" fill="${on ? '#8aa3b8' : W}" stroke="${L}" stroke-width="1.4"/>`
      )
      .join(
        ''
      )}<rect x="0" y="58" width="80" height="14" fill="${S2}"/><path d="M20 62H58L54 68H26Z" fill="${on ? '#7a4a22' : W}" stroke="${L}" stroke-width="1.6"/><path d="M32 62V36L46 42L44 62ZM46 62V44L56 48L55 62Z" fill="${F}" stroke="${L}" stroke-width="1.6" stroke-linejoin="round"/>`,
    singapore: `${[
      [8, 34, 10],
      [22, 26, 8],
      [56, 30, 9],
      [68, 38, 8]
    ]
      .map(
        ([x, y, w]) =>
          `<rect x="${x}" y="${y}" width="${w}" height="${72 - y}" fill="${on ? '#b9c7d4' : W}" stroke="${L}" stroke-width="1.3"/>`
      )
      .join(
        ''
      )}<g transform="translate(40 40)">${[0, 72, 144, 216, 288].map(r => `<ellipse cx="0" cy="-12" rx="8" ry="13" fill="${F}" stroke="${L}" stroke-width="1.6" transform="rotate(${r})"/>`).join('')}<circle r="6" fill="${on ? '#ffd23f' : W}" stroke="${L}" stroke-width="1.6"/></g>`,
    sydney: `<rect x="0" y="62" width="80" height="10" fill="${S2}"/><rect x="8" y="56" width="66" height="7" fill="${on ? '#d9c7a2' : W}" stroke="${L}" stroke-width="1.6"/>${[
      [12, 56, 26, 24],
      [24, 56, 40, 18],
      [38, 56, 54, 24],
      [50, 56, 66, 32]
    ]
      .map(
        ([a, b, c, d]) =>
          `<path d="M${a} ${b}Q${a + 2} ${d} ${c} ${d - 2}Q${c - 6} ${d + 12} ${c - 2} ${b}Z" fill="${W}" stroke="${L}" stroke-width="1.6" stroke-linejoin="round"/>`
      )
      .join('')}`,
    paris: `<path d="M40 3L43 28L49 44L60 72H51Q40 54 29 72H20L31 44L37 28Z" fill="${F}" stroke="${L}" stroke-width="1.8" stroke-linejoin="round"/><path d="M34 28H46M30 44H50" stroke="${L}" stroke-width="2.4"/><path d="M38 34L42 40M42 34L38 40M35 50L45 60M45 50L35 60" stroke="${on ? '#fff' : L}" stroke-width="1" opacity=".6"/>`,
    london: `<path d="M32 22L40 4L48 22Z" fill="${F}" stroke="${L}" stroke-width="1.8" stroke-linejoin="round"/><rect x="32" y="22" width="16" height="50" fill="${F}" stroke="${L}" stroke-width="1.8"/><circle cx="40" cy="32" r="6" fill="${W}" stroke="${L}" stroke-width="1.6"/><path d="M40 32V28.5M40 32L42.5 33.5" stroke="${L}" stroke-width="1.2" stroke-linecap="round"/><path d="M35 44V68M40 44V68M45 44V68" stroke="${L}" stroke-width="1" opacity=".5"/>`,
    zurich: `<path d="M0 64L22 26L38 50L52 30L80 64Z" fill="${F}" stroke="${L}" stroke-width="1.8" stroke-linejoin="round"/><path d="M15 38L22 26L29 37L25 35L21 39ZM46 39L52 30L58 39L54 37L50 40Z" fill="${W}"/><rect x="0" y="62" width="80" height="10" fill="${S2}"/>`,
    germany: `<rect x="12" y="20" width="56" height="10" fill="${F}" stroke="${L}" stroke-width="1.8"/><rect x="34" y="12" width="12" height="8" fill="${F}" stroke="${L}" stroke-width="1.6"/>${[16, 25, 34, 43, 52, 61].map(x => `<rect x="${x}" y="30" width="5" height="34" fill="${on ? '#e9d7a6' : W}" stroke="${L}" stroke-width="1.3"/>`).join('')}<rect x="10" y="64" width="60" height="7" fill="${F}" stroke="${L}" stroke-width="1.8"/>`,
    rome: `<path d="M6 66V36Q40 18 74 36V66Z" fill="${F}" stroke="${L}" stroke-width="1.8" stroke-linejoin="round"/><path d="M6 46Q40 30 74 46M6 56Q40 42 74 56" stroke="${L}" stroke-width="1.4" fill="none"/>${[12, 22, 32, 42, 52, 62].map(x => `<path d="M${x} 66v-6a3 3 0 0 1 6 0v6" fill="${W}" stroke="${L}" stroke-width="1.2"/><path d="M${x} 52v-3a3 3 0 0 1 6 0v3" fill="${W}" stroke="${L}" stroke-width="1.1"/>`).join('')}`,
    venice: `<rect x="0" y="54" width="80" height="18" fill="${S2}"/><path d="M6 50Q40 64 74 46Q70 56 40 58Q14 58 6 50Z" fill="${on ? '#2a2420' : W}" stroke="${L}" stroke-width="1.8" stroke-linejoin="round"/><path d="M74 46l4-6" stroke="${L}" stroke-width="2"/><path d="M50 52L60 14" stroke="${L}" stroke-width="2"/><circle cx="40" cy="38" r="5" fill="${W}" stroke="${L}" stroke-width="1.5"/><path d="M34 52v-10h12v10" fill="${F}" stroke="${L}" stroke-width="1.6"/><path d="M34 33h12" stroke="${F}" stroke-width="3"/><path d="M14 10q10-6 20 0" stroke="${F}" stroke-width="2" fill="none"/>`,
    milan: `<path d="M10 70V36L40 24L70 36V70Z" fill="${W}" stroke="${L}" stroke-width="1.8" stroke-linejoin="round"/>${[10, 20, 30, 40, 50, 60, 70].map((x, i) => `<path d="M${x - 2.5} ${i == 3 ? 24 : 36}V${i == 3 ? 6 : 16 + (i % 2) * 6}L${x} ${i == 3 ? 2 : 12 + (i % 2) * 6}L${x + 2.5} ${i == 3 ? 6 : 16 + (i % 2) * 6}V${i == 3 ? 24 : 36}Z" fill="${F}" stroke="${L}" stroke-width="1.2" stroke-linejoin="round"/>`).join('')}<path d="M34 70V52a6 6 0 0 1 12 0V70" fill="${F}" stroke="${L}" stroke-width="1.5"/><circle cx="40" cy="40" r="5" fill="${on ? '#9fd3f2' : W}" stroke="${L}" stroke-width="1.4"/>`,
    barcelona: `${[
      [16, 26],
      [30, 10],
      [50, 10],
      [64, 26]
    ]
      .map(
        ([x, y]) =>
          `<path d="M${x - 6} 70V${y + 14}Q${x} ${y - 6} ${x + 6} ${y + 14}V70Z" fill="${F}" stroke="${L}" stroke-width="1.6" stroke-linejoin="round"/><circle cx="${x}" cy="${y + 2}" r="2.4" fill="${on ? '#ffd23f' : W}" stroke="${L}" stroke-width="1"/>${[0, 1, 2].map(k => `<circle cx="${x}" cy="${y + 22 + k * 9}" r="1.4" fill="${L}"/>`).join('')}`
      )
      .join('')}<path d="M8 70h64" stroke="${L}" stroke-width="2"/>`,
    lisbon: `<path d="M4 64L76 50" stroke="${L}" stroke-width="2"/><g transform="rotate(-11 40 48)"><rect x="12" y="30" width="56" height="24" rx="5" fill="${F}" stroke="${L}" stroke-width="1.8"/><rect x="12" y="46" width="56" height="8" fill="${W}" stroke="${L}" stroke-width="1.4"/>${[18, 30, 42, 54].map(x => `<rect x="${x}" y="34" width="8" height="8" rx="1" fill="${on ? '#9fd3f2' : W}" stroke="${L}" stroke-width="1.2"/>`).join('')}<path d="M40 30V16M34 16h12" stroke="${L}" stroke-width="1.8"/><circle cx="22" cy="57" r="4" fill="${L}"/><circle cx="58" cy="57" r="4" fill="${L}"/></g>`,
    amsterdam: `<rect x="0" y="62" width="80" height="10" fill="${S2}"/>${[
      [6, '#e2672a'],
      [24, '#3a8fc8'],
      [42, '#5f9a2c'],
      [60, '#c0283c']
    ]
      .map(
        ([x, c]) =>
          `<path d="M${x} 62V24l3-4v-4l6-6 6 6v4l3 4V62Z" fill="${on ? c : W}" stroke="${L}" stroke-width="1.5" stroke-linejoin="round"/><rect x="${x + 5}" y="30" width="8" height="7" fill="${W}" stroke="${L}" stroke-width="1"/><rect x="${x + 5}" y="44" width="8" height="7" fill="${W}" stroke="${L}" stroke-width="1"/>`
      )
      .join('')}`,
    brussels: `<path d="M24 22L56 22M24 22L40 40M56 22L40 40M24 22L24 58M56 22L56 58M40 40L24 58M40 40L56 58M40 6V40" stroke="${L}" stroke-width="2.6"/>${[
      [40, 6],
      [24, 22],
      [56, 22],
      [40, 40],
      [24, 58],
      [56, 58]
    ]
      .map(
        ([x, y]) =>
          `<circle cx="${x}" cy="${y}" r="7" fill="${W}" stroke="${L}" stroke-width="1.6"/><circle cx="${x - 2}" cy="${y - 2}" r="2.6" fill="${F}" opacity=".7"/>`
      )
      .join('')}<path d="M16 70h48" stroke="${L}" stroke-width="2"/>`,
    munich: `${[24, 56].map(x => `<rect x="${x - 9}" y="26" width="18" height="44" fill="${on ? '#b5562a' : W}" stroke="${L}" stroke-width="1.8"/><path d="M${x - 9} 26Q${x - 11} 12 ${x} 8Q${x + 11} 12 ${x + 9} 26Z" fill="${on ? '#3f8f6a' : W}" stroke="${L}" stroke-width="1.8"/><path d="M${x} 8V2" stroke="${L}" stroke-width="1.6"/><rect x="${x - 3}" y="34" width="6" height="10" rx="3" fill="${W}" stroke="${L}" stroke-width="1"/>`).join('')}<rect x="33" y="44" width="14" height="26" fill="${on ? '#c26a3a' : W}" stroke="${L}" stroke-width="1.6"/><path d="M8 70h64" stroke="${L}" stroke-width="2"/>`,
    vienna: `<circle cx="40" cy="34" r="26" fill="none" stroke="${F}" stroke-width="3.4"/><circle cx="40" cy="34" r="26" fill="none" stroke="${L}" stroke-width="1"/>${[0, 30, 60, 90, 120, 150].map(r => `<path d="M40 8V60" stroke="${L}" stroke-width="1" transform="rotate(${r} 40 34)"/>`).join('')}${[0, 60, 120, 180, 240, 300].map(r => `<rect x="36" y="4" width="8" height="7" rx="1.5" fill="${on ? '#d8344a' : W}" stroke="${L}" stroke-width="1.1" transform="rotate(${r} 40 34)"/>`).join('')}<circle cx="40" cy="34" r="4" fill="${W}" stroke="${L}" stroke-width="1.4"/><path d="M40 34L26 70M40 34L54 70M18 70h44" stroke="${L}" stroke-width="2.2"/>`,
    prague: `${[26, 54].map(x => `<rect x="${x - 8}" y="30" width="16" height="40" fill="${on ? '#d9c7a2' : W}" stroke="${L}" stroke-width="1.6"/><path d="M${x - 9} 30L${x} 4L${x + 9} 30Z" fill="${F}" stroke="${L}" stroke-width="1.6" stroke-linejoin="round"/><path d="M${x - 9} 24l-3 6M${x + 9} 24l3 6" stroke="${L}" stroke-width="1.4"/><circle cx="${x}" cy="2" r="2" fill="${on ? '#f1c232' : L}"/>`).join('')}<rect x="34" y="44" width="12" height="26" fill="${on ? '#e9d7a6' : W}" stroke="${L}" stroke-width="1.4"/><path d="M34 44L40 36L46 44" fill="${F}" stroke="${L}" stroke-width="1.4"/>`,
    copenhagen: `<rect x="0" y="60" width="80" height="12" fill="${S2}"/>${[
      [4, '#f1c232'],
      [20, '#d64545'],
      [36, '#3a8fc8'],
      [52, '#e98a2c'],
      [66, '#5f9a2c']
    ]
      .map(
        ([x, c], i) =>
          `<path d="M${x} 60V${26 + (i % 2) * 6}h${i == 4 ? 12 : 14}V60Z" fill="${on ? c : W}" stroke="${L}" stroke-width="1.4"/><path d="M${x - 1} ${26 + (i % 2) * 6}L${x + (i == 4 ? 6 : 7)} ${18 + (i % 2) * 6}L${x + (i == 4 ? 13 : 15)} ${26 + (i % 2) * 6}Z" fill="${on ? '#7a3b2e' : W}" stroke="${L}" stroke-width="1.3" stroke-linejoin="round"/><rect x="${x + 3}" y="${36 + (i % 2) * 6}" width="${i == 4 ? 6 : 8}" height="6" fill="${W}" stroke="${L}" stroke-width=".9"/>`
      )
      .join(
        ''
      )}<path d="M22 64h30l-4 5H26Z" fill="${on ? '#7a4a22' : W}" stroke="${L}" stroke-width="1.3"/><path d="M36 64V48" stroke="${L}" stroke-width="1.4"/>`,
    stockholm: `<rect x="0" y="62" width="80" height="10" fill="${S2}"/><rect x="8" y="46" width="64" height="16" fill="${on ? '#b5562a' : W}" stroke="${L}" stroke-width="1.6"/><rect x="30" y="14" width="20" height="48" fill="${on ? '#b5562a' : W}" stroke="${L}" stroke-width="1.6"/><path d="M28 14h24l-4-6H32Z" fill="${on ? '#3f8f6a' : W}" stroke="${L}" stroke-width="1.4"/>${[34, 40, 46].map(x => `<path d="M${x - 3} 6l1.5-3 1.5 2 1.5-2 1.5 3z" fill="${on ? '#f1c232' : W}" stroke="${L}" stroke-width=".9"/>`).join('')}${[16, 24, 56, 64].map(x => `<rect x="${x - 2}" y="50" width="4" height="7" fill="${W}"/>`).join('')}`,
    oslo: `<rect x="0" y="58" width="80" height="14" fill="${S2}"/><path d="M6 46Q40 62 74 46L68 58H12Z" fill="${on ? '#a9743a' : W}" stroke="${L}" stroke-width="1.8" stroke-linejoin="round"/><path d="M6 46q-4-10 2-14q2 6-2 14M74 46q4-10-2-14q-2 6 2 14" fill="${on ? '#a9743a' : W}" stroke="${L}" stroke-width="1.5"/><path d="M40 52V6" stroke="${L}" stroke-width="2"/><path d="M24 12h32v26H24z" fill="${W}" stroke="${L}" stroke-width="1.6"/>${[0, 1, 2, 3].map(i => `<path d="M${24 + i * 8} 12h4v26h-4z" fill="${F}"/>`).join('')}${[18, 30, 42, 54, 62].map(x => `<circle cx="${x}" cy="51" r="3" fill="${on ? '#f1c232' : W}" stroke="${L}" stroke-width="1"/>`).join('')}`,
    athens: `<path d="M8 28L40 12L72 28Z" fill="${W}" stroke="${L}" stroke-width="1.8" stroke-linejoin="round"/><rect x="8" y="28" width="64" height="6" fill="${F}" stroke="${L}" stroke-width="1.6"/>${[13, 23, 33, 43, 53, 63].map(x => `<rect x="${x}" y="34" width="5" height="28" fill="${W}" stroke="${L}" stroke-width="1.3"/>`).join('')}<rect x="5" y="62" width="70" height="5" fill="${W}" stroke="${L}" stroke-width="1.5"/><rect x="2" y="67" width="76" height="5" fill="${W}" stroke="${L}" stroke-width="1.5"/>`,
    istanbul: `${[10, 70].map(x => `<path d="M${x - 3} 70V18L${x} 4L${x + 3} 18V70Z" fill="${W}" stroke="${L}" stroke-width="1.5" stroke-linejoin="round"/><path d="M${x - 4} 34h8M${x - 4} 50h8" stroke="${L}" stroke-width="1.5"/>`).join('')}<path d="M20 70V46Q20 40 26 40H54Q60 40 60 46V70Z" fill="${W}" stroke="${L}" stroke-width="1.6"/><path d="M22 40Q40 6 58 40Z" fill="${F}" stroke="${L}" stroke-width="1.8"/><path d="M40 16V8" stroke="${L}" stroke-width="1.5"/><path d="M38 8a3 3 0 1 0 4 0" fill="none" stroke="${on ? '#f1c232' : L}" stroke-width="1.4"/>${[28, 40, 52].map(x => `<path d="M${x - 3} 70v-10a3 3 0 0 1 6 0v10" fill="${F}" stroke="${L}" stroke-width="1.2"/>`).join('')}`,
    sapporo: `<rect x="20" y="36" width="40" height="34" fill="${W}" stroke="${L}" stroke-width="1.8"/><path d="M16 38L40 24L64 38Z" fill="${F}" stroke="${L}" stroke-width="1.8" stroke-linejoin="round"/><rect x="32" y="8" width="16" height="18" fill="${W}" stroke="${L}" stroke-width="1.6"/><path d="M30 10L40 2L50 10Z" fill="${F}" stroke="${L}" stroke-width="1.6"/><circle cx="40" cy="17" r="5" fill="${W}" stroke="${L}" stroke-width="1.4"/><path d="M40 17V14M40 17l2 1" stroke="${L}" stroke-width="1"/>${[26, 36, 46].map(x => `<rect x="${x}" y="46" width="7" height="10" fill="${on ? '#9fd3f2' : W}" stroke="${L}" stroke-width="1"/>`).join('')}${[
      [8, 14],
      [70, 20],
      [10, 50],
      [72, 52]
    ]
      .map(
        ([x, y]) =>
          `<g stroke="${F}" stroke-width="1.6" stroke-linecap="round"><path d="M${x} ${y - 5}v10M${x - 4.3} ${y - 2.5}l8.6 5M${x - 4.3} ${y + 2.5}l8.6-5"/></g>`
      )
      .join('')}`,
    busan: `<rect x="0" y="60" width="80" height="12" fill="${S2}"/><path d="M28 60L32 18H48L52 60Z" fill="${F}" stroke="${L}" stroke-width="1.8" stroke-linejoin="round"/><path d="M30 44h20M31 30h18" stroke="${W}" stroke-width="3"/><rect x="31" y="10" width="18" height="8" fill="${on ? '#ffd23f' : W}" stroke="${L}" stroke-width="1.5"/><path d="M29 10L40 2L51 10Z" fill="${F}" stroke="${L}" stroke-width="1.5"/><path d="M50 14l18-6M50 14l18 4" stroke="${on ? '#ffd23f' : L}" stroke-width="1.4" opacity=".8"/><path d="M4 60q8-6 16 0" stroke="${W}" stroke-width="2" fill="none"/>`,
    beijing: `<rect x="10" y="60" width="60" height="10" fill="${W}" stroke="${L}" stroke-width="1.6"/>${[
      [52, 22, 30],
      [40, 30, 42],
      [28, 38, 54]
    ]
      .map(
        ([w, h, y], i) =>
          `<rect x="${40 - w / 2 + 4}" y="${y}" width="${w - 8}" height="${i == 2 ? 6 : 8}" fill="${on ? '#d8344a' : W}" stroke="${L}" stroke-width="1.3"/><path d="M${40 - w / 2} ${y}Q40 ${y - 14} ${40 + w / 2} ${y}Z" fill="${on ? '#2a5f9e' : W}" stroke="${L}" stroke-width="1.6" stroke-linejoin="round"/>`
      )
      .join(
        ''
      )}<rect x="20" y="42" width="40" height="18" fill="${on ? '#d8344a' : W}" stroke="${L}" stroke-width="1.3"/><circle cx="40" cy="16" r="3" fill="${on ? '#f1c232' : L}"/>`,
    shanghai: `<rect x="0" y="62" width="80" height="10" fill="${S2}"/><path d="M34 62L38 8H42L46 62" fill="${W}" stroke="${L}" stroke-width="1.6"/><path d="M30 62L38 46M50 62L42 46" stroke="${L}" stroke-width="1.6"/><circle cx="40" cy="46" r="8" fill="${F}" stroke="${L}" stroke-width="1.6"/><circle cx="40" cy="22" r="5.5" fill="${F}" stroke="${L}" stroke-width="1.5"/><path d="M40 8V2" stroke="${L}" stroke-width="1.4"/>${[
      [8, 34, 8],
      [18, 26, 8],
      [56, 30, 9],
      [67, 40, 8]
    ]
      .map(
        ([x, y, w]) =>
          `<rect x="${x}" y="${y}" width="${w}" height="${62 - y}" fill="${on ? '#b9c7d4' : W}" stroke="${L}" stroke-width="1.2"/>`
      )
      .join('')}`,
    chengdu: `<path d="M14 64Q12 38 26 32Q40 24 54 32Q68 38 66 64Z" fill="${W}" stroke="${L}" stroke-width="1.8"/><circle cx="40" cy="30" r="17" fill="${W}" stroke="${L}" stroke-width="1.8"/><circle cx="26" cy="16" r="6" fill="${on ? '#2a2420' : L}"/><circle cx="54" cy="16" r="6" fill="${on ? '#2a2420' : L}"/><ellipse cx="33" cy="30" rx="4.5" ry="6" fill="${on ? '#2a2420' : L}" transform="rotate(20 33 30)"/><ellipse cx="47" cy="30" rx="4.5" ry="6" fill="${on ? '#2a2420' : L}" transform="rotate(-20 47 30)"/><circle cx="34" cy="29" r="1.4" fill="#fff"/><circle cx="46" cy="29" r="1.4" fill="#fff"/><ellipse cx="40" cy="37" rx="3" ry="2" fill="${on ? '#2a2420' : L}"/><path d="M66 70V8M60 18q6-2 6 4M66 34q6-6 10-4" stroke="${F}" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M14 64q2 6 10 6M66 64q-2 6-10 6" fill="${on ? '#2a2420' : L}" stroke="${L}" stroke-width="1.4"/>`,
    hanoi: `<path d="M6 44L40 8L74 44Q40 54 6 44Z" fill="${on ? '#f3dd8a' : W}" stroke="${L}" stroke-width="1.8" stroke-linejoin="round"/><path d="M40 8L22 46M40 8L40 50M40 8L58 46" stroke="${on ? '#c9a227' : L}" stroke-width="1.2"/><path d="M14 46q26 26 52 0" stroke="${F}" stroke-width="2" fill="none"/><g transform="translate(40 64)">${[-50, -25, 0, 25, 50].map(r => `<ellipse cx="0" cy="-6" rx="3.5" ry="7" fill="${on ? '#ff8fa3' : W}" stroke="${L}" stroke-width="1" transform="rotate(${r})"/>`).join('')}</g>`,
    siemreap: `<rect x="0" y="62" width="80" height="10" fill="${S2}"/>${[
      [14, 30, 8],
      [28, 22, 9],
      [40, 10, 11],
      [52, 22, 9],
      [66, 30, 8]
    ]
      .map(
        ([x, y, w]) =>
          `<path d="M${x - w} 58Q${x - w} ${y + 10} ${x} ${y}Q${x + w} ${y + 10} ${x + w} 58Z" fill="${F}" stroke="${L}" stroke-width="1.6" stroke-linejoin="round"/>${[0, 1, 2].map(k => `<path d="M${x - w + 2 + k} ${y + 16 + k * 10}h${2 * w - 4 - 2 * k}" stroke="${L}" stroke-width="1" opacity=".6"/>`).join('')}`
      )
      .join(
        ''
      )}<rect x="4" y="56" width="72" height="6" fill="${on ? '#d9c7a2' : W}" stroke="${L}" stroke-width="1.4"/>`,
    yangon: `<path d="M10 70Q14 58 22 56H58Q66 58 70 70Z" fill="${F}" stroke="${L}" stroke-width="1.6"/><path d="M22 56Q22 40 40 36Q58 40 58 56Z" fill="${F}" stroke="${L}" stroke-width="1.8"/><path d="M32 38Q36 22 40 8Q44 22 48 38Z" fill="${F}" stroke="${L}" stroke-width="1.6" stroke-linejoin="round"/>${[16, 24, 30].map(y => `<path d="M${40 - (y - 8) / 3.5} ${y}h${(y - 8) / 1.75}" stroke="${L}" stroke-width="1"/>`).join('')}<path d="M40 8V2" stroke="${L}" stroke-width="1.6"/><circle cx="40" cy="2" r="1.8" fill="${on ? '#fff' : L}"/><path d="M28 46q12 6 24 0" stroke="${W}" stroke-width="1.5" fill="none" opacity=".7"/>`,
    kualalumpur: `${[26, 54].map(x => `<path d="M${x - 8} 70V30L${x - 6} 26V18L${x - 3} 14V8L${x} 2L${x + 3} 8V14L${x + 6} 18V26L${x + 8} 30V70Z" fill="${on ? '#cfd8e0' : W}" stroke="${L}" stroke-width="1.6" stroke-linejoin="round"/>${[36, 44, 52, 60].map(y => `<path d="M${x - 8} ${y}h16" stroke="${L}" stroke-width=".9" opacity=".6"/>`).join('')}`).join('')}<rect x="34" y="38" width="12" height="4" fill="${F}" stroke="${L}" stroke-width="1.2"/><path d="M34 38l4 6M46 38l-4 6" stroke="${L}" stroke-width="1"/>`,
    bali: `<circle cx="40" cy="30" r="14" fill="${on ? '#ffb24a' : W}" stroke="${L}" stroke-width="1.4"/><rect x="0" y="62" width="80" height="10" fill="${S2}"/><path d="M8 62V20L14 14L18 18L22 10L26 18L30 14L34 22V62Z" fill="${F}" stroke="${L}" stroke-width="1.6" stroke-linejoin="round"/><path d="M72 62V20L66 14L62 18L58 10L54 18L50 14L46 22V62Z" fill="${F}" stroke="${L}" stroke-width="1.6" stroke-linejoin="round"/>${[30, 40, 50].map(y => `<path d="M8 ${y}h26M46 ${y}h26" stroke="${L}" stroke-width="1" opacity=".5"/>`).join('')}`,
    jakarta: `<rect x="16" y="58" width="48" height="12" fill="${W}" stroke="${L}" stroke-width="1.6"/><path d="M26 58L32 50H48L54 58Z" fill="${W}" stroke="${L}" stroke-width="1.6"/><path d="M37 50L38 16H42L43 50Z" fill="${W}" stroke="${L}" stroke-width="1.6"/><rect x="35" y="12" width="10" height="4" fill="${L}"/><path d="M40 12Q34 6 38 0Q40 4 42 2Q46 6 40 12Z" fill="${on ? '#f1c232' : W}" stroke="${L}" stroke-width="1.3"/>`,
    kathmandu: `<path d="M6 70Q8 52 40 48Q72 52 74 70Z" fill="${W}" stroke="${L}" stroke-width="1.8"/><rect x="28" y="30" width="24" height="18" fill="${on ? '#f1c232' : W}" stroke="${L}" stroke-width="1.6"/><path d="M31 37q3-3 6 0M43 37q3-3 6 0" stroke="${on ? '#1f4b8a' : L}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M40 40q-2 3 0 4" stroke="${on ? '#1f4b8a' : L}" stroke-width="1.6" fill="none"/><path d="M32 30L40 6L48 30Z" fill="${on ? '#f1c232' : W}" stroke="${L}" stroke-width="1.6" stroke-linejoin="round"/>${[14, 20, 26].map(y => `<path d="M${40 - (y - 6) / 3} ${y}h${(y - 6) / 1.5}" stroke="${L}" stroke-width="1"/>`).join('')}<path d="M40 6L8 34M40 6L72 34" stroke="${F}" stroke-width="1.2" stroke-dasharray="3 2"/>${[14, 22, 58, 66].map((x, i) => `<path d="M${x} ${28 - Math.abs(x - 40) * 0.0 + ((x < 40 ? 40 - x : x - 40) - 18) * -0.8}l3 4h-6z" fill="${['#d8344a', '#3a8fc8', '#5f9a2c', '#f1c232'][i]}"/>`).join('')}`,
    delhi: `<path d="M14 70V24H66V70H50V44Q40 32 30 44V70Z" fill="${F}" stroke="${L}" stroke-width="1.8" stroke-linejoin="round"/><rect x="10" y="16" width="60" height="8" fill="${F}" stroke="${L}" stroke-width="1.6"/><rect x="26" y="8" width="28" height="8" fill="${F}" stroke="${L}" stroke-width="1.5"/><path d="M34 8Q40 2 46 8" fill="${F}" stroke="${L}" stroke-width="1.4"/><path d="M22 28h36" stroke="${L}" stroke-width="1" opacity=".5"/><text x="40" y="22" text-anchor="middle" font-size="4.5" font-family="sans-serif" fill="${L}" opacity=".6">INDIA</text>`,
    colombo: `<rect x="0" y="62" width="80" height="10" fill="${S2}"/><path d="M37 62L38 26H42L43 62Z" fill="${W}" stroke="${L}" stroke-width="1.5"/><g transform="translate(40 22)">${[-40, -20, 0, 20, 40].map(r => `<ellipse cx="0" cy="-8" rx="4" ry="9" fill="${F}" stroke="${L}" stroke-width="1.2" transform="rotate(${r})"/>`).join('')}</g><path d="M40 13V4" stroke="${L}" stroke-width="1.4"/><path d="M10 62q4-14 2-24M12 38q-8-2-10 4M12 38q8-4 12 0M12 38q-4-6-8-4" stroke="${on ? '#5f9a2c' : L}" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    maldives: `<rect x="0" y="54" width="80" height="18" fill="${S2}"/><circle cx="62" cy="16" r="8" fill="${on ? '#ffd23f' : W}" stroke="${L}" stroke-width="1.2"/>${[
      [10, 46],
      [30, 46],
      [50, 46]
    ]
      .map(
        ([x, y], i) =>
          `<path d="M${x + 2} ${y}v12M${x + 16} ${y}v12" stroke="${L}" stroke-width="1.4"/><rect x="${x}" y="${y - 8}" width="20" height="10" fill="${on ? '#e9d7a6' : W}" stroke="${L}" stroke-width="1.3"/><path d="M${x - 3} ${y - 8}L${x + 10} ${y - 18}L${x + 23} ${y - 8}Z" fill="${F}" stroke="${L}" stroke-width="1.4" stroke-linejoin="round"/>`
      )
      .join(
        ''
      )}<path d="M4 60h72" stroke="${L}" stroke-width="1.4"/><path d="M6 66q6-3 12 0t12 0M44 68q6-3 12 0t12 0" stroke="${W}" stroke-width="1.6" fill="none"/>`,
    dubai: `<path d="M37 70L38.5 30L40 2L41.5 30L43 70Z" fill="${on ? '#cfd8e0' : W}" stroke="${L}" stroke-width="1.5" stroke-linejoin="round"/><path d="M33 70V44L37 40M47 70V40L43 34M29 70V54L35 50M51 70V52L45 48" stroke="${L}" stroke-width="1.4" fill="${on ? '#cfd8e0' : W}"/><path d="M0 70Q20 60 40 66T80 64V72H0Z" fill="${on ? '#e9c27a' : W}" stroke="${L}" stroke-width="1.2"/><circle cx="14" cy="18" r="6" fill="${on ? '#ffb24a' : W}"/><path d="M60 22q4-6 8 0" stroke="${F}" stroke-width="1.6" fill="none"/>`
  };
  return A[id] || '';
}
function stampSVG(c, v) {
  const ink = v ? c.col : '#d8ccaa';
  let perf = '';
  for (let x = 4; x <= 96; x += 8)
    perf += `<circle cx="${x}" cy="0" r="3.2"/><circle cx="${x}" cy="124" r="3.2"/>`;
  for (let y = 4; y <= 120; y += 8)
    perf += `<circle cx="0" cy="${y}" r="3.2"/><circle cx="100" cy="${y}" r="3.2"/>`;
  return `<svg viewBox="0 0 100 124" class="stp" aria-hidden="true"><defs><mask id="pm-${c.id}"><rect width="100" height="124" fill="#fff"/><g fill="#000">${perf}</g></mask></defs><g mask="url(#pm-${c.id})"><rect width="100" height="124" fill="${v ? '#fffdf6' : '#f6efdc'}"/><rect x="7" y="7" width="86" height="110" fill="none" stroke="${ink}" stroke-width="3"/></g><g transform="translate(10 12)">${stampArt(c.id, c.col, !!v)}</g><text x="50" y="104" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="700" font-size="${v && c.name.length > 9 ? (c.name.length > 10 ? 9.5 : 10.5) : 12}" fill="${v ? '#2a2420' : '#b8a97e'}">${v ? c.name.toUpperCase() : '?'}</text>${v ? `<g opacity=".55" fill="none" stroke="${c.col}" stroke-width="1.6"><circle cx="76" cy="26" r="13"/><path d="M52 22q6-3 12 0t12 0 12 0M52 30q6-3 12 0t12 0 12 0"/></g><text x="76" y="29" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="700" font-size="7" fill="${c.col}" opacity=".7">${c.code}</text>` : ''}</svg>`;
}
