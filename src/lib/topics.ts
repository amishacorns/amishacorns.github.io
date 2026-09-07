export const TOPICS = ["Consciousness", "Ethics", "AI", "Health", "Other"] as const
export type Topic = (typeof TOPICS)[number]

export function getPostTopics(topics: readonly Topic[]): readonly Topic[] {
  return topics.length > 0 ? topics : ["Other"]
}
