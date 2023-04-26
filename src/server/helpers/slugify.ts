export function createFromText(text: string) {
  const slugText = text
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Removes whitespace
    .replace(/[^\w-]+/g, '') // Removes non-words
    .replace(/_/g, '-') // Replace underlines
    .replace(/--+/g, '-') // Replace doble hyphens
    .replace(/-$/g, '') // Remove hyphen at the end

  return slugText
}
