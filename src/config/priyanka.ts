// 💙 Central config for Priyanka's Birthday Experience
// 📅 UPDATE FRIENDSHIP_START with the real date you two became friends!

export const FRIEND_NAME = "Priyanka";

// Priyanka's birthday: May 12, 2003
export const BIRTHDAY = new Date("2003-05-12");

// ✏️ UPDATE THIS: When did you two become friends?
export const FRIENDSHIP_START = new Date("2021-01-15");

/** Calculate current age */
export function getAge(): number {
  const today = new Date();
  let age = today.getFullYear() - BIRTHDAY.getFullYear();
  const m = today.getMonth() - BIRTHDAY.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < BIRTHDAY.getDate())) age--;
  return age;
}

/** Age she's turning this birthday season */
export function getTurningAge(): number {
  const today = new Date();
  const thisYearBday = new Date(today.getFullYear(), BIRTHDAY.getMonth(), BIRTHDAY.getDate());
  return today <= thisYearBday
    ? today.getFullYear() - BIRTHDAY.getFullYear()
    : today.getFullYear() + 1 - BIRTHDAY.getFullYear();
}

/** Days until next birthday (0 = today!) */
export function getDaysUntilBirthday(): number {
  const today = new Date();
  const next = new Date(today.getFullYear(), BIRTHDAY.getMonth(), BIRTHDAY.getDate());
  if (next < today) next.setFullYear(today.getFullYear() + 1);
  return Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

/** True if today is her birthday */
export function isBirthdayToday(): boolean {
  const today = new Date();
  return today.getMonth() === BIRTHDAY.getMonth() && today.getDate() === BIRTHDAY.getDate();
}

export const WHY_SHE_MATTERS = [
  { text: "You guide me through every storm without asking for anything in return 🧭", x: 15, y: 20 },
  { text: "Sharing secrets with you feels as natural as breathing 🤫", x: 70, y: 15 },
  { text: "You never gave up on me, even when I gave up on myself 💪", x: 40, y: 45 },
  { text: "Meeting you is always the happiest moment of my day 🌟", x: 22, y: 70 },
  { text: "You teach me things no classroom ever could ✨", x: 75, y: 65 },
  { text: "After my parents, you're the one I trust most 🤝", x: 50, y: 25 },
  { text: "You listen to my feelings without any judgement 💙", x: 30, y: 55 },
  { text: "You are beautiful — in every single way 🌸", x: 65, y: 40 },
  { text: "I never want to lose you. Ever. 🌌", x: 45, y: 80 },
];

export const BIRTHDAY_WISHES = [
  "May every dream you've shared with me come true this year 🌠",
  "May your days be as bright as your smile that I treasure 😊",
  "May you always know how irreplaceable you are 💙",
  "May adventures find you around every corner 🗺️",
  "May your heart always stay as warm and kind as it is 🌻",
  "May this year bring you everything you truly deserve ✨",
  "May you never stop guiding the people who love you 🧭",
  "May you always feel as loved as you make me feel 💫",
];

export const SECRET_MESSAGES = [
  "You make every ordinary day feel extraordinary ✨",
  "Thank you for being my safe place in this chaotic world 🌍",
  "Your laugh is literally my favorite sound on this planet 😊",
  "I hope you know how deeply you are loved and cherished 💙",
  "The world became a better place the day you were born 🎂",
  "Here's to another beautiful year of us being our weird selves 🤪",
  "You guide me, teach me, and show me how beautiful life can be 🌸",
  "Blindly trusting someone is rare — you are that rare person for me 💫",
];

export const TIMELINE_MEMORIES = [
  { year: "Day 1", title: "The Day We Met", caption: "A random hello turned into a forever friendship 💫", emoji: "🌸" },
  { year: "First Secret", title: "You Trusted Me", caption: "The first secret you shared — I knew then this was real 🤫", emoji: "🔐" },
  { year: "Late Nights", title: "3AM Conversations", caption: "Sharing our deepest thoughts — the world asleep, us very much awake 🌙", emoji: "🌙" },
  { year: "Tough Days", title: "You Guided Me", caption: "When I was lost, you were the compass that brought me home 🧭", emoji: "💪" },
  { year: "Laughter", title: "The Joke That Never Gets Old", caption: "That one thing that makes us both wheeze every single time 😂", emoji: "😂" },
  { year: "Today", title: "Still My Favorite Person", caption: "And here we are — still each other's most trusted person 💙", emoji: "💙" },
];
