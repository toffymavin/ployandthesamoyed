/* content */
const ITEMS = [
  { id: 'scarf', slot: 'neck', name: 'Yellow scarf', lv: 1 },
  { id: 'pawmedal', slot: 'neck', name: 'Golden paw medal', ck: 7, note: 'For 7 days together' },
  { id: 'starclip', slot: 'hat', name: 'Star hair clip', ck: 14, note: 'For 14 days together' },
  { id: 'santa', slot: 'hat', name: 'Santa hat', lv: 2 },
  { id: 'bell', slot: 'neck', name: 'Jingle bell collar', lv: 3 },
  { id: 'antlers', slot: 'hat', name: 'Reindeer antlers', lv: 4 },
  { id: 'bow', slot: 'hat', name: 'Big yellow bow', lv: 5 },
  { id: 'crew', slot: 'hat', name: 'Little crew cap', lv: 6 },
  { id: 'wings', slot: 'neck', name: 'Crew wings collar', lv: 7 },
  { id: 'beanie', slot: 'hat', name: 'Fur beanie', fur: 60, note: 'Knitted from 60 fur tufts' },
  { id: 'sakura', slot: 'neck', name: 'Sakura scarf', city: 'tokyo' },
  { id: 'hachimaki', slot: 'hat', name: 'Osaka headband', city: 'osaka' },
  { id: 'bunny', slot: 'hat', name: 'Bunny ear band', city: 'seoul' },
  { id: 'boba', slot: 'neck', name: 'Bubble tea charm', city: 'taipei' },
  { id: 'lantern', slot: 'neck', name: 'Lantern charm', city: 'hongkong' },
  { id: 'orchid', slot: 'hat', name: 'Orchid hair clip', city: 'singapore' },
  { id: 'sunhat', slot: 'hat', name: 'Beach sun hat', city: 'sydney' },
  { id: 'beret', slot: 'hat', name: 'Paris beret', city: 'paris' },
  { id: 'guard', slot: 'hat', name: 'Royal guard hat', city: 'london' },
  { id: 'ski', slot: 'hat', name: 'Alpine ski hat', city: 'zurich' },
  { id: 'pretzel', slot: 'neck', name: 'Pretzel charm', city: 'germany' },
  { id: 'ch_rome', slot: 'neck', name: 'Rome charm', city: 'rome' },
  { id: 'ch_venice', slot: 'neck', name: 'Venice charm', city: 'venice' },
  { id: 'ch_milan', slot: 'neck', name: 'Milan charm', city: 'milan' },
  { id: 'ch_barcelona', slot: 'neck', name: 'Barcelona charm', city: 'barcelona' },
  { id: 'ch_lisbon', slot: 'neck', name: 'Lisbon charm', city: 'lisbon' },
  { id: 'ch_amsterdam', slot: 'neck', name: 'Amsterdam charm', city: 'amsterdam' },
  { id: 'ch_brussels', slot: 'neck', name: 'Brussels charm', city: 'brussels' },
  { id: 'ch_munich', slot: 'neck', name: 'Munich charm', city: 'munich' },
  { id: 'ch_vienna', slot: 'neck', name: 'Vienna charm', city: 'vienna' },
  { id: 'ch_prague', slot: 'neck', name: 'Prague charm', city: 'prague' },
  { id: 'ch_copenhagen', slot: 'neck', name: 'Copenhagen charm', city: 'copenhagen' },
  { id: 'ch_stockholm', slot: 'neck', name: 'Stockholm charm', city: 'stockholm' },
  { id: 'ch_oslo', slot: 'neck', name: 'Oslo charm', city: 'oslo' },
  { id: 'ch_athens', slot: 'neck', name: 'Athens charm', city: 'athens' },
  { id: 'ch_istanbul', slot: 'neck', name: 'Istanbul charm', city: 'istanbul' },
  { id: 'ch_sapporo', slot: 'neck', name: 'Sapporo charm', city: 'sapporo' },
  { id: 'ch_busan', slot: 'neck', name: 'Busan charm', city: 'busan' },
  { id: 'ch_beijing', slot: 'neck', name: 'Beijing charm', city: 'beijing' },
  { id: 'ch_shanghai', slot: 'neck', name: 'Shanghai charm', city: 'shanghai' },
  { id: 'ch_chengdu', slot: 'neck', name: 'Chengdu charm', city: 'chengdu' },
  { id: 'ch_hanoi', slot: 'neck', name: 'Hanoi charm', city: 'hanoi' },
  { id: 'ch_siemreap', slot: 'neck', name: 'Siem Reap charm', city: 'siemreap' },
  { id: 'ch_yangon', slot: 'neck', name: 'Yangon charm', city: 'yangon' },
  { id: 'ch_kualalumpur', slot: 'neck', name: 'Kuala Lumpur charm', city: 'kualalumpur' },
  { id: 'ch_bali', slot: 'neck', name: 'Bali charm', city: 'bali' },
  { id: 'ch_jakarta', slot: 'neck', name: 'Jakarta charm', city: 'jakarta' },
  { id: 'ch_kathmandu', slot: 'neck', name: 'Kathmandu charm', city: 'kathmandu' },
  { id: 'ch_delhi', slot: 'neck', name: 'Delhi charm', city: 'delhi' },
  { id: 'ch_colombo', slot: 'neck', name: 'Colombo charm', city: 'colombo' },
  { id: 'ch_maldives', slot: 'neck', name: 'Maldives charm', city: 'maldives' },
  { id: 'ch_dubai', slot: 'neck', name: 'Dubai charm', city: 'dubai' },
  { id: 'crown', slot: 'hat', name: 'Flower crown', shop: 30 },
  { id: 'party', slot: 'hat', name: 'Party hat', shop: 35 },
  { id: 'bandana', slot: 'neck', name: 'Polka bandana', shop: 25 },
  { id: 'bowtie', slot: 'neck', name: 'Red bow tie', shop: 20 }
];
const FOODS = [
  {
    id: 'treat',
    ic: 'treat',
    name: 'Market treats',
    h: 12,
    j: 8,
    c: 0,
    snack: 1,
    say: ['Saved treats taste the best!', 'Treat time! Thank you, Ploy!']
  },
  {
    id: 'kibble',
    ic: 'bowl',
    name: 'Puppy kibble',
    h: 25,
    j: 2,
    c: 0,
    say: ['Crunchy and reliable. Thank you, Ploy!', 'Kibble again? …Okay, I love it.']
  },
  {
    id: 'somtam',
    ic: 'somtam',
    name: 'Som tam',
    fav: 1,
    h: 20,
    j: 10,
    c: 0,
    say: ['Spicy!! …but if Ploy loves it, I love it.', 'My tongue is on fire. Totally worth it.']
  },
  {
    id: 'steak',
    ic: 'steak',
    name: 'Steak',
    fav: 1,
    h: 35,
    j: 8,
    c: 0,
    say: ['Steak!! Ploy has the best taste in the world.', 'Medium rare? Ploy, you spoil me.']
  },
  {
    id: 'burger',
    ic: 'burger',
    name: 'Burger',
    fav: 1,
    h: 30,
    j: 8,
    c: -6,
    say: ['Burger date with Ploy! Best day ever.', "There's sauce on my nose, isn't there?"]
  }
];
const QUESTS = [
  { id: 'feed', t: 'Feed {n} 3 times', g: 3, xp: 30 },
  { id: 'fav', t: "Share one of Ploy's favorite foods", g: 1, xp: 20 },
  { id: 'play', t: 'Play together twice', g: 2, xp: 30 },
  { id: 'bath', t: 'Give {n} a bath', g: 1, xp: 20 },
  { id: 'pat', t: 'Give 15 head pats', g: 15, xp: 20 },
  { id: 'fur', t: 'Pick up 5 fur tufts', g: 5, xp: 25 }
];
const LETTERS = [
  {
    lv: 3,
    title: 'A paw-written note',
    from: '{n}',
    p: [
      'Today I learned three things: snow is cold, burgers are the best, and you are my favorite person in this whole world.',
      'Thank you for taking me home.'
    ]
  },
  {
    lv: 5,
    title: 'For when you fly',
    from: '{n}',
    p: [
      "I know you fly all over the sky. When you're far away, I keep your spot on the sofa warm.",
      "I'm practicing my smile so it's ready the moment you land. Fly safe and come back soon."
    ]
  },
  {
    lv: 7,
    title: 'All grown up',
    from: '{n}',
    p: [
      'Look at me! All grown up and twice as fluffy. Sorry about the fur on your uniform.',
      "Whatever time zone you're in, I'm still your Samoyed."
    ]
  },
  {
    lv: 10,
    title: 'The last letter',
    from: 'the one who made this game for you',
    p: [
      "If you're reading this, you looked after {n} all the way to the last level, which means you kept opening a little game I made. That makes me really happy.",
      'I made it because you love Samoyeds, and because I wanted something small to make you smile between flights.',
      'Thank you for playing.'
    ]
  }
];
const LINES = {
  gen: [
    "I saved you a window seat. It's the warm spot on the sofa.",
    "They say Samoyeds smile so icicles can't form. I just smile because you're here.",
    "Can I come on your next flight? I'm very good at sitting.",
    "Every stall here gave me a snack. I'm very popular.",
    "If you're tired from flying, I can be your pillow.",
    'I practiced my smile all day. How is it?',
    'Ploy is the best crew in the whole sky.',
    'Snow is just sky fluff. Like me!',
    'Do you think the som tam stall gives free samples?',
    'The market lights are on. My favorite time with you.'
  ],
  hungry: [
    'My tummy is making airplane noises…',
    'Steak? Burger? Anything, Ploy?',
    'I would do a trick for a snack. Any trick.'
  ],
  dirty: [
    'I rolled in a snowy puddle. Bath please?',
    "I'm more grey than white right now…",
    '*sneeze* Too much dust on me!'
  ],
  messy: [
    'My fur is all tangled… brush me, Ploy?',
    'I look like a dandelion. Brush please?',
    'My fluff is out of control!'
  ],
  tired: ['So… sleepy… one little nap?', 'My paws are tired. Bedtime?'],
  sad: ['Play with me, Ploy? Just a little?', 'I missed you. Can we play?'],
  pat: ['how r uuuu', 'More pats, Ploy!', '*happy Samoyed smile*', 'AwoooOo.', 'miss you'],
  play: ['Again! Again!', 'I caught it! Did you see?!', 'Zoomies!!', "I'm shedding from happiness. Sorry!"],
  bath: [
    "Bubbles! Now I'm fluffier than snow.",
    'Squeaky clean and extra floofy.',
    'Do I smell like strawberries now?'
  ],
  wel: [
    'Welcome back, Ploy! Did you land safe?',
    "You're back! I counted snowflakes while you were gone.",
    'Ploy! How was the flight? Tell me everything!'
  ]
};
const timeLine = () => {
  const h = new Date().getHours();
  return h < 5
    ? "Ploy, it's so late. Jet lag again? Let's both rest."
    : h < 11
      ? 'Good morning, Ploy! Did you eat breakfast?'
      : h < 15
        ? 'Lunch time! Som tam? Steak? Both?'
        : h >= 21
          ? "It's getting late. Rest well before your next flight."
          : null;
};
