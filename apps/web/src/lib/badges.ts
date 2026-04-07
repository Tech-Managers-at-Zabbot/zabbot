export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string; // Emoji or SVG path
    requirement: (stats: any) => boolean;
}

export const HERITAGE_BADGES: Badge[] = [
    {
        id: 'first_lesson',
        name: 'The First Step',
        description: 'Completed your first Yorùbá lesson.',
        icon: '👣',
        requirement: (stats) => stats.lessonsCompleted >= 1,
    },
    {
        id: 'drummer',
        name: 'Gangan Master',
        description: 'Reached a 7-day learning streak.',
        icon: '🪘',
        requirement: (stats) => stats.streakCount >= 7,
    },
    {
        id: 'royalty',
        name: 'Oba / Olori',
        description: 'Earned over 5,000 total XP.',
        icon: '👑',
        requirement: (stats) => stats.totalXp >= 5000,
    }
];