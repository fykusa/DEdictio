import { LANG_PAIRS, QUIZ_SIZE } from './word'

test('LANG_PAIRS má 6 párů (všechny kombinace CZ/EN/DE)', () => {
  expect(LANG_PAIRS).toHaveLength(6)
})

test('QUIZ_SIZE je 15', () => {
  expect(QUIZ_SIZE).toBe(15)
})

test('každý pár má srcFlag a tgtFlag', () => {
  for (const pair of LANG_PAIRS) {
    expect(pair.srcFlag).toBeTruthy()
    expect(pair.tgtFlag).toBeTruthy()
  }
})
