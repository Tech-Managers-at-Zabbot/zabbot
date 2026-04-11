export const clean = {
  str: (v: string | null | undefined) => v ?? undefined,
  num: (v: number | null | undefined) => v ?? 0,
  arr: <T>(v: T[] | null | undefined) => v ?? [],
};