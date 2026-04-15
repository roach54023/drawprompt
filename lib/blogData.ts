import { getDailyChallenge, dimensions } from "./promptData";

export interface BlogPost {
  date: string;       // YYYY-MM-DD
  slug: string;       // same as date
  title: string;
  prompt: string;
  theme: string;
  subject: string;
  mood: string;
  moodColor: string;
}

const MOOD_COLORS: Record<string, string> = {
  melancholic: "#60a5fa",
  epic: "#f59e0b",
  mysterious: "#a78bfa",
  hopeful: "#34d399",
  tense: "#f87171",
  peaceful: "#6ee7b7",
  whimsical: "#f472b6",
  dark_romantic: "#e879f9",
};

/** Generate a deterministic daily prompt for any given date string */
function getDailyForDate(dateStr: string): { prompt: string; mood: string; theme: string; subject: string } {
  const [year, month, day] = dateStr.split("-").map(Number);
  const seed = year * 10000 + month * 100 + day;
  const primes = [2, 3, 5, 7, 11, 13];
  const keys = ["theme", "subject", "mood", "colorPalette", "style", "challenge"] as const;

  const values: Record<string, string> = {};
  const optionIds: Record<string, string> = {};

  keys.forEach((key, i) => {
    const dim = dimensions[key];
    const optionIndex = (seed * primes[i]) % dim.options.length;
    const option = dim.options[optionIndex];
    optionIds[key] = option.id;
    const validValues = option.values.filter((v) => v.trim() !== "");
    const valueIndex = (seed * primes[i] * 7) % validValues.length;
    values[key] = validValues[valueIndex];
  });

  const parts: string[] = [];
  if (values.mood) parts.push(capitalize(values.mood));
  if (values.subject && values.theme) parts.push(`${values.subject} ${values.theme}`);
  if (values.colorPalette) parts.push(values.colorPalette);
  if (values.style) parts.push(values.style);
  if (values.challenge && values.challenge.trim()) parts.push(values.challenge);

  const themeOption = dimensions.theme.options.find((o) => o.id === optionIds.theme);
  const subjectOption = dimensions.subject.options.find((o) => o.id === optionIds.subject);
  const moodOption = dimensions.mood.options.find((o) => o.id === optionIds.mood);

  return {
    prompt: parts.join(", "),
    mood: moodOption?.label ?? "",
    theme: themeOption?.label ?? "",
    subject: subjectOption?.label ?? "",
  };
}

function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

/** Generate the last N days of blog posts */
export function getRecentBlogPosts(count = 30): BlogPost[] {
  const posts: BlogPost[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const { prompt, mood, theme, subject } = getDailyForDate(dateStr);

    const displayDate = d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    posts.push({
      date: dateStr,
      slug: dateStr,
      title: `Drawing Prompt: ${displayDate}`,
      prompt,
      theme,
      subject,
      mood,
      moodColor: MOOD_COLORS[mood.toLowerCase().replace(" ", "_")] ?? "#7c6af7",
    });
  }

  return posts;
}

export function getBlogPost(slug: string): BlogPost | null {
  const { prompt, mood, theme, subject } = getDailyForDate(slug);
  const d = new Date(slug + "T12:00:00");
  if (isNaN(d.getTime())) return null;

  const displayDate = d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return {
    date: slug,
    slug,
    title: `Drawing Prompt: ${displayDate}`,
    prompt,
    theme,
    subject,
    mood,
    moodColor: MOOD_COLORS[mood.toLowerCase().replace(" ", "_")] ?? "#7c6af7",
  };
}
