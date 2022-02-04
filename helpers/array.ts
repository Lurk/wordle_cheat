export function set<T>(arr: T[], index: number, val: T): T[] {
  return [...arr.slice(0, index), val, ...arr.slice(index + 1)];
}
