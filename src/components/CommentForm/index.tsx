import { useState } from "react";
import type { Comment } from '@prisma/client';
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface CommentFormProps {
  autoFocus?: boolean;
  buttonText?: string;
  initialValue?: string;
  loading: Boolean;
  error?: string;
  onSubmit: (message: string) => Promise<Comment | void>;
}

export const CommentForm = ({ autoFocus = false, buttonText = "Post", error, initialValue = "", loading, onSubmit }: CommentFormProps) => {
  const [message, setMessage] = useState(initialValue)

  const [parent] = useAutoAnimate<HTMLDivElement>({ duration: 50 });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSubmit(message).then(() => {
      setMessage("")
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row mt-4">
        <textarea
          autoFocus={autoFocus}
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="grow resize-none h-20 rounded-lg p-2 border-2 border-purple-300 leading-6 mr-2"
        />
        <button className="text-white bg-purple-600 hover:bg-purple-400 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-purple-400" type="submit" disabled={!!loading}>
          {loading ? "..." : buttonText}
        </button>
      </div>
      <div ref={parent} className="pt-2 font-medium text-sm text-red-500">{error}</div>
    </form>
  );
};
