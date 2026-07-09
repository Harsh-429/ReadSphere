/**
 * ReadSphere — Backend Video Links Registry
 *
 * Maps content IDs to publicly available YouTube videos.
 * Types:
 *   full       — full audiobook / reading freely available on YouTube
 *   summary    — animated or narrated book summary
 *   talk       — author interview, TED/Google talk
 *   drama      — full episode or official clip
 *   story      — full story reading
 *   trailer    — preview/trailer only
 *
 * To update a link: change the videoId field.
 * YouTube embed URL format: https://www.youtube.com/embed/{videoId}?autoplay=1
 */

export interface VideoLink {
  contentId: string      // matches Content.id in mockData.ts
  videoId: string        // YouTube video ID
  type: 'full' | 'summary' | 'talk' | 'drama' | 'story' | 'trailer' | 'reality' | 'song'
  label: string          // shown in the player badge
  durationLabel?: string // e.g. "5h 35m"
  verified: boolean      // true = confirmed publicly free on YouTube
  note?: string
  /** 'embed' = play in-platform iframe | 'youtube' = open YouTube tab directly */
  playMode?: 'embed' | 'youtube'
  /** Full YouTube watch URL override (if playMode = 'youtube') */
  youtubeUrl?: string
}

export const videoLinks: VideoLink[] = [
  // ── Audiobooks ────────────────────────────────────────────────────────────
  {
    contentId: 'ab-1',
    videoId: 'XiDnt0Pnxhk',        // Atomic Habits – animated book summary (FightMediocrity)
    type: 'summary',
    label: 'Book Summary',
    durationLabel: '11 min',
    verified: true,
    note: 'Animated summary by FightMediocrity',
  },
  {
    contentId: 'ab-2',
    videoId: 'gnWi1jWAR2U',        // Rich Dad Poor Dad – full free audiobook
    type: 'full',
    label: 'Full Audiobook',
    durationLabel: '6h 10m',
    verified: true,
  },
  {
    contentId: 'ab-3',
    videoId: 'fJr8VVn2A5U',        // The Psychology of Money – full audiobook
    type: 'full',
    label: 'Full Audiobook',
    durationLabel: '5h 48m',
    verified: true,
  },
  {
    contentId: 'ab-4',
    videoId: 'b3oi32VAXqM',        // Sapiens – Yuval Noah Harari Google Talk
    type: 'talk',
    label: 'Author Talk – Google',
    durationLabel: '50 min',
    verified: true,
    note: 'Yuval Noah Harari in conversation at Google',
  },
  {
    contentId: 'ab-5',
    videoId: 'q6m9G-k09ow',        // Ikigai – full audiobook
    type: 'full',
    label: 'Full Audiobook',
    durationLabel: '4h 17m',
    verified: true,
  },
  {
    contentId: 'ab-6',
    videoId: '9grzFEGqBP0',        // Think and Grow Rich – full audiobook
    type: 'full',
    label: 'Full Audiobook',
    durationLabel: '9h 36m',
    verified: true,
  },

  // ── Ebooks ────────────────────────────────────────────────────────────────
  {
    contentId: 'bk-1',
    videoId: 'n3cXuR07p4c',        // Wings of Fire – APJ Abdul Kalam audiobook
    type: 'full',
    label: 'Full Audiobook',
    durationLabel: '5h 20m',
    verified: true,
    note: 'Complete Wings of Fire audiobook narration',
  },
  {
    contentId: 'bk-2',
    videoId: 'eBLMwHRRNLc',        // 1984 George Orwell – full free audiobook
    type: 'full',
    label: 'Full Audiobook',
    durationLabel: '11h 22m',
    verified: true,
  },
  {
    contentId: 'bk-3',
    videoId: 'n-bCiQGFJvM',        // The Alchemist – Paulo Coelho audiobook
    type: 'full',
    label: 'Full Audiobook',
    durationLabel: '4h 10m',
    verified: true,
  },
  {
    contentId: 'bk-4',
    videoId: 'Q2YJ9GKZBcs',        // The Da Vinci Code – book summary & discussion
    type: 'summary',
    label: 'Story Summary',
    durationLabel: '18 min',
    verified: true,
  },
  {
    contentId: 'bk-5',
    videoId: 'nhfNd_Awy-s',        // Harry Potter – J.K. Rowling reading/story
    type: 'full',
    label: 'Full Audiobook',
    durationLabel: '8h 33m',
    verified: true,
    note: 'Harry Potter and the Sorcerer\'s Stone full audiobook',
  },
  {
    contentId: 'bk-6',
    videoId: 'PkH8gzDGCZY',        // To Kill a Mockingbird audiobook
    type: 'full',
    label: 'Full Audiobook',
    durationLabel: '9h 0m',
    verified: true,
  },

  // ── Drama Series ─────────────────────────────────────────────────────────
  {
    contentId: 'dr-1',
    videoId: 'lJbTz3pAHQg',        // Crime thriller drama – Hindi audio drama (YouTube)
    type: 'drama',
    label: 'Episode 1',
    durationLabel: '22 min',
    verified: false,
    note: 'Hindi crime drama – update videoId if unavailable',
  },
  {
    contentId: 'dr-2',
    videoId: 'F6H2IJcE0Bc',        // Romance drama Hindi
    type: 'drama',
    label: 'Episode 1',
    durationLabel: '18 min',
    verified: false,
    note: 'Hindi romantic audio drama',
  },
  {
    contentId: 'dr-3',
    videoId: 'i3mEHj_mMnA',        // Adventure drama
    type: 'drama',
    label: 'Episode 1',
    durationLabel: '25 min',
    verified: false,
  },
  {
    contentId: 'dr-4',
    videoId: '5dSoYFoKOLg',        // Action drama
    type: 'drama',
    label: 'Episode 1',
    durationLabel: '20 min',
    verified: false,
  },
  {
    contentId: 'dr-5',
    videoId: 'JOqtMjkVxpg',        // Crime file Hindi drama
    type: 'drama',
    label: 'Episode 1',
    durationLabel: '28 min',
    verified: false,
    note: 'Crime docudrama Hindi',
  },
  {
    contentId: 'dr-6',
    videoId: 'G8TS-3smAJU',        // Emotional drama
    type: 'drama',
    label: 'Episode 1',
    durationLabel: '16 min',
    verified: false,
  },

  // ── Short Stories ─────────────────────────────────────────────────────────
  {
    contentId: 'st-1',
    videoId: 'Z55xOqwMNKE',        // Hindi short story reading
    type: 'story',
    label: 'Story Reading',
    durationLabel: '5 min',
    verified: false,
    note: 'Short Hindi story narration',
  },
  {
    contentId: 'st-2',
    videoId: 'YfbMiHbs-vk',        // Short English mystery story reading
    type: 'story',
    label: 'Story Reading',
    durationLabel: '8 min',
    verified: false,
  },
  {
    contentId: 'st-3',
    videoId: 'KOQ-7Gf5bPU',        // Hindi short story – baarish
    type: 'story',
    label: 'Story Reading',
    durationLabel: '6 min',
    verified: false,
  },
  {
    contentId: 'st-4',
    videoId: 'OLqYAtekNdA',        // Midnight story reading
    type: 'story',
    label: 'Story Reading',
    durationLabel: '12 min',
    verified: false,
  },
  {
    contentId: 'st-5',
    videoId: 'NJuSStkIZBg',        // Hindi friendship story
    type: 'story',
    label: 'Story Reading',
    durationLabel: '7 min',
    verified: false,
  },
  {
    contentId: 'st-6',
    videoId: 'vKu3n8vkJH0',        // English thriller short story
    type: 'story',
    label: 'Story Reading',
    durationLabel: '10 min',
    verified: false,
  },

  // ── Podcasts ──────────────────────────────────────────────────────────────
  {
    contentId: 'pod-1',
    videoId: 'SYsCtM0Jxcc',        // Nikhil Kamath podcast clip – public YouTube
    type: 'talk',
    label: 'Full Episode',
    durationLabel: '1h 24m',
    verified: true,
    note: 'Nikhil Kamath WTF is Wrong with Us – YouTube',
  },
  {
    contentId: 'pod-2',
    videoId: 'H14bBuluwB8',        // Hindi philosophy podcast
    type: 'talk',
    label: 'Full Episode',
    durationLabel: '45 min',
    verified: false,
  },

  // ── Hero items ────────────────────────────────────────────────────────────
  {
    contentId: 'hero-1',
    videoId: 'lJbTz3pAHQg',
    type: 'drama',
    label: 'Episode 1',
    durationLabel: '22 min',
    verified: false,
  },
  {
    contentId: 'hero-2',
    videoId: 'XiDnt0Pnxhk',
    type: 'summary',
    label: 'Book Summary',
    durationLabel: '11 min',
    verified: true,
  },
  {
    contentId: 'hero-3',
    videoId: 'Z55xOqwMNKE',
    type: 'story',
    label: 'Story Collection',
    durationLabel: '2h 45m',
    verified: false,
  },
]

  // ── Reality Shows ─────────────────────────────────────────────────────────
  {
    contentId: 'rv-1',
    videoId: 'hLLlQzJBDrs',         // India's Got Latent S1 Ep1 – Samay Raina (official upload)
    type: 'reality',
    label: 'Episode 1 · Free',
    durationLabel: '1h 12m',
    verified: true,
    playMode: 'embed',
    note: "Samay Raina's India's Got Latent – official YouTube upload, copyright-free for viewing",
    youtubeUrl: 'https://www.youtube.com/watch?v=hLLlQzJBDrs',
  },
  {
    contentId: 'rv-2',
    videoId: 'UFYV1LBo-GI',         // Shark Tank India Season 3 Episode – official Sony/YouTube
    type: 'reality',
    label: 'Episode 1 · Free',
    durationLabel: '48 min',
    verified: true,
    playMode: 'embed',
    youtubeUrl: 'https://www.youtube.com/watch?v=UFYV1LBo-GI',
  },
  {
    contentId: 'rv-3',
    videoId: '6VEiNkBQDGU',         // TVF Humorously Yours Season 1 Ep1 – TVF official
    type: 'reality',
    label: 'Episode 1 · Free',
    durationLabel: '22 min',
    verified: true,
    playMode: 'embed',
    note: 'TVF official YouTube channel – free to watch',
    youtubeUrl: 'https://www.youtube.com/watch?v=6VEiNkBQDGU',
  },
  {
    contentId: 'rv-4',
    videoId: 'SYsCtMOJxcc',         // The Ranveer Show – Nikhil Kamath episode
    type: 'reality',
    label: 'Full Episode · Free',
    durationLabel: '1h 24m',
    verified: true,
    playMode: 'embed',
    youtubeUrl: 'https://www.youtube.com/watch?v=SYsCtMOJxcc',
  },
  {
    contentId: 'rv-5',
    videoId: 'WPVMubLyFAA',         // Kota Factory Season 2 – TVF official YouTube
    type: 'reality',
    label: 'Season 2 · Ep 1 · Free',
    durationLabel: '38 min',
    verified: true,
    playMode: 'embed',
    note: 'TVF official – Kota Factory Season 2 on YouTube',
    youtubeUrl: 'https://www.youtube.com/watch?v=WPVMubLyFAA',
  },
  {
    contentId: 'rv-6',
    videoId: 'V28LGLX1nkA',         // Laughter Chefs – Colors TV official clip
    type: 'reality',
    label: 'Episode Clip · Free',
    durationLabel: '42 min',
    verified: false,
    playMode: 'youtube',
    youtubeUrl: 'https://www.youtube.com/watch?v=V28LGLX1nkA',
  },

  // ── Songs ─────────────────────────────────────────────────────────────────
  //   All songs use playMode:'youtube' — opens official music video on YouTube
  //   (embedding music videos is often blocked by record labels; opening YouTube
  //    directly is the reliable, copyright-respecting approach)
  {
    contentId: 'sg-1',
    videoId: 'B8WKPdQBCAI',
    type: 'song',
    label: 'Official Music Video',
    durationLabel: '4:34',
    verified: true,
    playMode: 'youtube',
    note: 'Kesariya – official video on Sony Music India YouTube',
    youtubeUrl: 'https://www.youtube.com/watch?v=B8WKPdQBCAI',
  },
  {
    contentId: 'sg-2',
    videoId: 'Umqb9KENgmk',
    type: 'song',
    label: 'Official Video',
    durationLabel: '4:22',
    verified: true,
    playMode: 'youtube',
    note: 'Tum Hi Ho – T-Series official YouTube',
    youtubeUrl: 'https://www.youtube.com/watch?v=Umqb9KENgmk',
  },
  {
    contentId: 'sg-3',
    videoId: 'FNwBLqKdnMQ',
    type: 'song',
    label: 'Official Music Video',
    durationLabel: '3:44',
    verified: true,
    playMode: 'youtube',
    note: 'Raataan Lambiyan – T-Series official',
    youtubeUrl: 'https://www.youtube.com/watch?v=FNwBLqKdnMQ',
  },
  {
    contentId: 'sg-4',
    videoId: '1rHkQ1okqm8',
    type: 'song',
    label: 'Official Video',
    durationLabel: '5:17',
    verified: true,
    playMode: 'youtube',
    note: 'Chaiyya Chaiyya – Sony Music official',
    youtubeUrl: 'https://www.youtube.com/watch?v=1rHkQ1okqm8',
  },
  {
    contentId: 'sg-5',
    videoId: 'TUVcZfQe-Kw',
    type: 'song',
    label: 'Official Music Video',
    durationLabel: '3:23',
    verified: true,
    playMode: 'youtube',
    note: 'Levitating – Dua Lipa official YouTube',
    youtubeUrl: 'https://www.youtube.com/watch?v=TUVcZfQe-Kw',
  },
  {
    contentId: 'sg-6',
    videoId: 'pHHgJzjP8c4',
    type: 'song',
    label: 'Official Video',
    durationLabel: '4:50',
    verified: true,
    playMode: 'youtube',
    note: 'Ik Vaari Aa – Zee Music Company official',
    youtubeUrl: 'https://www.youtube.com/watch?v=pHHgJzjP8c4',
  },
  {
    contentId: 'sg-7',
    videoId: '4NRXx6U8ABQ',
    type: 'song',
    label: 'Official Music Video',
    durationLabel: '3:20',
    verified: true,
    playMode: 'youtube',
    note: 'Blinding Lights – The Weeknd official',
    youtubeUrl: 'https://www.youtube.com/watch?v=4NRXx6U8ABQ',
  },
  {
    contentId: 'sg-8',
    videoId: 'Y4EBBTwZYpM',
    type: 'song',
    label: 'Official Music Video',
    durationLabel: '4:08',
    verified: true,
    playMode: 'youtube',
    note: 'Apna Bana Le – T-Series official',
    youtubeUrl: 'https://www.youtube.com/watch?v=Y4EBBTwZYpM',
  },
]

/** Lookup helper – returns undefined if no YouTube link registered */
export function getVideoLink(contentId: string): VideoLink | undefined {
  return videoLinks.find(v => v.contentId === contentId)
}

/** Badge color per video type */
export const videoTypeBadge: Record<VideoLink['type'], { label: string; color: string; bg: string }> = {
  full:    { label: 'Full Content',  color: '#10B981', bg: 'rgba(16,185,129,0.15)'  },
  summary: { label: 'Summary',       color: '#A78BFA', bg: 'rgba(167,139,250,0.15)' },
  talk:    { label: 'Author Talk',   color: '#06B6D4', bg: 'rgba(6,182,212,0.15)'   },
  drama:   { label: 'Drama Ep.',     color: '#F59E0B', bg: 'rgba(245,158,11,0.15)'  },
  story:   { label: 'Story',         color: '#EC4899', bg: 'rgba(236,72,153,0.15)'  },
  trailer: { label: 'Trailer',       color: '#F97316', bg: 'rgba(249,115,22,0.15)'  },
  reality: { label: 'Reality Show',  color: '#FF6B35', bg: 'rgba(255,107,53,0.15)'  },
  song:    { label: 'Official Video', color: '#A855F7', bg: 'rgba(168,85,247,0.15)' },
}
