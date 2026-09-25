// Renders "plain [[highlighted]] plain" -> spans with .hl on the bracketed parts.
export function Marked({ text, as: Tag = 'span', className }) {
  const parts = String(text).split(/\[\[(.+?)\]\]/)
  return (
    <Tag className={className}>
      {parts.map((p, i) =>
        i % 2 ? (
          <mark key={i} className="hl">
            {p}
          </mark>
        ) : (
          p
        ),
      )}
    </Tag>
  )
}
