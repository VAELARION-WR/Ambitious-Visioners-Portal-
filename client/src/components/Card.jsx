export default function Card({ title, children, footer }) {
  return (
    <div className="rounded-2xl shadow-sm border border-gray-200 bg-white p-5">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="prose max-w-none">{children}</div>
      {footer && <div className="mt-3 text-sm text-gray-600">{footer}</div>}
    </div>
  )
}
