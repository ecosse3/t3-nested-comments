export type Comment = {
  id: string
  message: string
  createdAt: Date
  parentId: string | null
  user: {
    id: string
    name: string
  }
  // likeCount: number
  likedByMe?: boolean
}
