import { shuffled } from './shuffle'

test('shuffled vrátí pole stejné délky', () => {
  const arr = [1, 2, 3, 4, 5]
  expect(shuffled(arr)).toHaveLength(5)
})

test('shuffled obsahuje stejné prvky', () => {
  const arr = ['a', 'b', 'c', 'd']
  expect(shuffled(arr).sort()).toEqual([...arr].sort())
})

test('shuffled nezmění originální pole', () => {
  const arr = [1, 2, 3]
  const copy = [...arr]
  shuffled(arr)
  expect(arr).toEqual(copy)
})

test('shuffled prázdné pole vrátí prázdné pole', () => {
  expect(shuffled([])).toEqual([])
})
