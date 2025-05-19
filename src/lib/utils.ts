
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getEmotionEmoji(emotion: string): string {
  switch(emotion) {
    case 'Happy': return '😄';
    case 'Sleepy': return '😴';
    case 'Excited': return '🤩';
    case 'Playful': return '🎮';
    case 'Curious': return '🧐';
    case 'Hungry': return '🍖';
    default: return '😊';
  }
}

export function generateRandomId(): number {
  return Math.floor(Math.random() * 10000);
}
