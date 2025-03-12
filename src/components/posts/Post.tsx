export default function Post({
  id,
  title,
  author,
  onClick,
}: {
  id: number;
  title: string;
  author: string;
  onClick: (id: number) => void;
}) {
  return (
    <div
      onClick={() => onClick(id)}
      className="p-4 border border-white rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
    >
      <h1 className="text-2xl font-bold text-gray-100">{title}</h1>
    </div>
  );
}
