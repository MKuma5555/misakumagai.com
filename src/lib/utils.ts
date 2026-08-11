/* class 名を条件付きで足すだけの道具。
   clsx を入れるほどでもないのでこれで足りる。 */
export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}
