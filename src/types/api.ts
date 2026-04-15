// Raw row from GET /messages 
export type MessageDto = {
  id?: string | number
  _id?: string | number
  message?: string
  text?: string
  body?: string
  author?: string
  createdAt?: string
  created_at?: string
  timestamp?: string
}
