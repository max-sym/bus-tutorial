/**
 * As prisma doesn't have similar function out of the box now, we have to implement it ourselves as per their official docs:
 * @link https://www.prisma.io/docs/concepts/components/prisma-client/excluding-fields
 */
export const trimSensitiveData = <T, Key extends keyof T>(
  model: T,
  ...keys: Key[]
): Omit<T, Key> => {
  for (let key of keys) {
    delete model[key]
  }
  return model
}
