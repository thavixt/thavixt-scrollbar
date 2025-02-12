export function removeFalsyEntriesFromObject<T extends Record<string, unknown>>(object: T): Partial<T> {
  return Object.keys(object).reduce((acc, key) => {
    if (!(object[key])) {
      return {
        ...acc,
        [key]: object[key],
      }
    }
    return acc;
  }, {} as Partial<T>);
}

export function filterTruthyValues<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.keys(obj).reduce((acc, key) => {
    if (!!obj[key]) {
      return {
        ...acc,
        [key]: obj[key],
      }
    }
    return acc;
  }, {} as Partial<T>);
}