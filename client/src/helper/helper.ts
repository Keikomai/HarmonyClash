export function getRandomUsername() {
  const adjectives = ['Red', 'Blue', 'Green', 'Happy', 'Silly', 'Clever']
  const nouns = ['Cat', 'Dog', 'Elephant', 'Fish', 'Monkey', 'Penguin']
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
  return `${randomAdjective}${randomNoun}`
}
