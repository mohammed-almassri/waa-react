import Post from "./Post";
import PostModel from "../../types/Post";

export default function Posts({
  posts,
  onClick,
}: {
  posts: PostModel[];
  onClick: (id: number) => void;
}) {
  return (
    <div className="flex justify-around w-full">
      {posts.map((post) => (
        <Post onClick={onClick} key={post.id} {...post} />
      ))}
    </div>
  );
}
