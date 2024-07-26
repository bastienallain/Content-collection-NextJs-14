export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-2xl mx-auto">{children}</div>;
}
