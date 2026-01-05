export function isUsageLimitError(err: any): boolean {
  return err?.status === 429;
}