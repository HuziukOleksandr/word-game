import { generate } from 'random-words'

export function generateWord (letters: number) {
  return generate({ minLength: letters, maxLength: letters }) as string
}