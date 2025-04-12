export function resetGrid(width: number, height: number) {
  const array = []
  for (let y = 0; y < height; y++) {
    const row: any[] = []
    for (let x = 0; x < width; x++) {
      row.push(null)
    }
    array.push(row)
  }
  return array
}