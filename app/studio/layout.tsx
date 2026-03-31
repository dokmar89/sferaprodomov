export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-screen w-screen fixed inset-0 z-50">{children}</div>
}
