export function idValidator (id: string): boolean {
  return isNaN(Number(id));
}
