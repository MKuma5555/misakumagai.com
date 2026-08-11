/* 散らばるアイコンの一覧と座標。
   PC と SP で配置が違うので、それぞれ持つ。 */

export type Skill = {
  id: string
  label: string
  level: 'professional' | 'academic'
  pc: { x: number; y: number }
  sp: { x: number; y: number }
}

export const skills: Skill[] = [] // TODO
