import { v4 as uuidv4 } from 'uuid'

const VISITOR_KEY = 'misa_visitor_id'

export function getVisitorId(): string {
  if (typeof window === 'undefined') return ''
  const existing = localStorage.getItem(VISITOR_KEY)
  if (existing) return existing
  const id = uuidv4()
  localStorage.setItem(VISITOR_KEY, id)
  return id
}
