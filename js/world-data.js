/* ===== new features ===== */
const CITIES = [
  { id: 'tokyo', name: 'Tokyo', code: 'TYO', col: '#e8708e', item: 'sakura', r: 'as' },
  { id: 'osaka', name: 'Osaka', code: 'OSA', col: '#e98a2c', item: 'hachimaki', r: 'as' },
  { id: 'seoul', name: 'Seoul', code: 'SEL', col: '#3a8fc8', item: 'bunny', r: 'as' },
  { id: 'taipei', name: 'Taipei', code: 'TPE', col: '#5f9a2c', item: 'boba', r: 'as' },
  { id: 'hongkong', name: 'Hong Kong', code: 'HKG', col: '#d8344a', item: 'lantern', r: 'as' },
  { id: 'singapore', name: 'Singapore', code: 'SIN', col: '#a24fb5', item: 'orchid', r: 'as' },
  { id: 'sydney', name: 'Sydney', code: 'SYD', col: '#2a87ad', item: 'sunhat', r: 'oc' },
  { id: 'paris', name: 'Paris', code: 'PAR', col: '#2c3e6b', item: 'beret', r: 'eu' },
  { id: 'london', name: 'London', code: 'LON', col: '#7a4a22', item: 'guard', r: 'eu' },
  { id: 'zurich', name: 'Zurich', code: 'ZRH', col: '#c0283c', item: 'ski', r: 'eu' },
  { id: 'germany', name: 'Germany', code: 'GER', col: '#b8860b', item: 'pretzel', r: 'eu' },
  { id: 'rome', name: 'Rome', code: 'ROM', col: '#b5562a', item: 'ch_rome', r: 'eu' },
  { id: 'venice', name: 'Venice', code: 'VCE', col: '#1f7a8c', item: 'ch_venice', r: 'eu' },
  { id: 'milan', name: 'Milan', code: 'MIL', col: '#8a7a6a', item: 'ch_milan', r: 'eu' },
  { id: 'barcelona', name: 'Barcelona', code: 'BCN', col: '#d17a22', item: 'ch_barcelona', r: 'eu' },
  { id: 'lisbon', name: 'Lisbon', code: 'LIS', col: '#e0a400', item: 'ch_lisbon', r: 'eu' },
  { id: 'amsterdam', name: 'Amsterdam', code: 'AMS', col: '#e2672a', item: 'ch_amsterdam', r: 'eu' },
  { id: 'brussels', name: 'Brussels', code: 'BRU', col: '#6b7b8c', item: 'ch_brussels', r: 'eu' },
  { id: 'munich', name: 'Munich', code: 'MUC', col: '#2f6fb0', item: 'ch_munich', r: 'eu' },
  { id: 'vienna', name: 'Vienna', code: 'VIE', col: '#c0283c', item: 'ch_vienna', r: 'eu' },
  { id: 'prague', name: 'Prague', code: 'PRG', col: '#7a3b2e', item: 'ch_prague', r: 'eu' },
  { id: 'copenhagen', name: 'Copenhagen', code: 'CPH', col: '#d64545', item: 'ch_copenhagen', r: 'eu' },
  { id: 'stockholm', name: 'Stockholm', code: 'STO', col: '#2a6fb5', item: 'ch_stockholm', r: 'eu' },
  { id: 'oslo', name: 'Oslo', code: 'OSL', col: '#365f8a', item: 'ch_oslo', r: 'eu' },
  { id: 'athens', name: 'Athens', code: 'ATH', col: '#3a7fc4', item: 'ch_athens', r: 'eu' },
  { id: 'istanbul', name: 'Istanbul', code: 'IST', col: '#2a8a8a', item: 'ch_istanbul', r: 'eu' },
  { id: 'sapporo', name: 'Sapporo', code: 'SPK', col: '#5a8fc9', item: 'ch_sapporo', r: 'as' },
  { id: 'busan', name: 'Busan', code: 'PUS', col: '#e05a47', item: 'ch_busan', r: 'as' },
  { id: 'beijing', name: 'Beijing', code: 'PEK', col: '#c23a2b', item: 'ch_beijing', r: 'as' },
  { id: 'shanghai', name: 'Shanghai', code: 'SHA', col: '#c2407a', item: 'ch_shanghai', r: 'as' },
  { id: 'chengdu', name: 'Chengdu', code: 'CTU', col: '#4a8a3a', item: 'ch_chengdu', r: 'as' },
  { id: 'hanoi', name: 'Hanoi', code: 'HAN', col: '#c9a227', item: 'ch_hanoi', r: 'as' },
  { id: 'siemreap', name: 'Siem Reap', code: 'REP', col: '#8a6a3a', item: 'ch_siemreap', r: 'as' },
  { id: 'yangon', name: 'Yangon', code: 'RGN', col: '#d4a017', item: 'ch_yangon', r: 'as' },
  { id: 'kualalumpur', name: 'Kuala Lumpur', code: 'KUL', col: '#5b6f8a', item: 'ch_kualalumpur', r: 'as' },
  { id: 'bali', name: 'Bali', code: 'DPS', col: '#e07a3a', item: 'ch_bali', r: 'as' },
  { id: 'jakarta', name: 'Jakarta', code: 'CGK', col: '#b8862b', item: 'ch_jakarta', r: 'as' },
  { id: 'kathmandu', name: 'Kathmandu', code: 'KTM', col: '#7a5ab5', item: 'ch_kathmandu', r: 'as' },
  { id: 'delhi', name: 'Delhi', code: 'DEL', col: '#c8743a', item: 'ch_delhi', r: 'as' },
  { id: 'colombo', name: 'Colombo', code: 'CMB', col: '#8a4ab0', item: 'ch_colombo', r: 'as' },
  { id: 'maldives', name: 'Maldives', code: 'MLE', col: '#1aa3b8', item: 'ch_maldives', r: 'as' },
  { id: 'dubai', name: 'Dubai', code: 'DXB', col: '#5a7fa8', item: 'ch_dubai', r: 'as' }
];
const REG = [
  ['as', 'Asia'],
  ['eu', 'Europe'],
  ['oc', 'Oceania']
];
const cityName = id => (CITIES.find(c => c.id === id) || {}).name || 'the sky';
const DECOS = [
  { id: 'snowman', name: 'Snowman', price: 40 },
  { id: 'cushion', name: 'Yellow cushion', price: 30, note: 'A cozy nap spot' },
  { id: 'gifts', name: 'Gift pile', price: 25 },
  { id: 'lamp', name: 'Lamp post', price: 35 }
];
const TRICKS = [
  { id: 'sit', name: 'Sit', days: 2, ok: 'Sitting pretty for Ploy!' },
  { id: 'paw', name: 'Paw', days: 3, ok: 'Paw for you, Ploy!' },
  { id: 'spin', name: 'Spin', days: 4, ok: 'Wheee! Did I do it right?' },
  { id: 'smile', name: 'Samoyed smile', days: 5, ok: '*the famous Samoyed smile*' }
];
const DAILY = [
  "Welcome home from Germany! I hope the long flight back was smooth. Get some rest, you've earned it.",
  "Have a smooth flight today. Don't forget to drink water.",
  'If the passengers are difficult today, remember a Samoyed is waiting for you.',
  'You make yellow look like the best color in the world.',
  "Hope there's som tam waiting wherever you land.",
  "Fun fact: you're my favorite person to talk to.",
  'Jet lag is temporary. Being awesome is permanent.',
  "Whatever city you're in today, someone back home is cheering for you."
];
const FRIENDS = [
  { b: 'shiba', name: 'Kuma', breed: 'Shiba' },
  { b: 'corgi', name: 'Butter', breed: 'Corgi' },
  { b: 'golden', name: 'Honey', breed: 'Golden Retriever' },
  { b: 'husky', name: 'Storm', breed: 'Siberian Husky', rare: 1 },
  { b: 'pom', name: 'Mikan', breed: 'Pomeranian', rare: 1, sz: 0.68 }
];
const furBal = () => S.fur - S.spent;
const trickN = id => (S.tr[id] || { n: 0 }).n;
const learned = t => trickN(t.id) >= t.days;
