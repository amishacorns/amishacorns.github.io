export const TOPICS = ["Consciousness", "Ethics", "AI", "Health"] as const

export function tagHref(tag: string): string {
  return `/transmissions/?${new URLSearchParams({ tag }).toString()}`
}
