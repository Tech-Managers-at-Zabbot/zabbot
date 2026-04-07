export interface Agent {
  id: string;
  name: string;
  description: string;
  mascot: string;
  xp: number;
  route: string;
  color: string;
  tag: string;
  userXP?: number; // optional: user's earned XP
}