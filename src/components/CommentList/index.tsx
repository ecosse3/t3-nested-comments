import type { Comment as IComment } from '#types/comment';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Comment } from '../Comment';

interface CommentListProps {
  comments: IComment[];
}


export const CommentList = ({ comments }: CommentListProps) => {
  const [parent] = useAutoAnimate<HTMLDivElement>();

  return (
    <div ref={parent}>
      {comments?.map((comment: IComment) => (
        <div key={comment.id} className="my-2 last:mb-0">
          <Comment comment={comment} />
        </div>
      ))}
    </div>)
}
