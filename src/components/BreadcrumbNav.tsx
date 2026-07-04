import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export interface BreadcrumbItem {
  label: string
  path?: string
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function BreadcrumbNav({ items, className = '' }: BreadcrumbNavProps) {
  const schemaItems = items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.label,
    item: item.path ? `https://frothycarwash.com${item.path}` : undefined
  })).filter(item => item.item || item.position === items.length)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: schemaItems
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <nav aria-label="Breadcrumb" className={`${className}`}>
        <ol className="flex items-center gap-1 flex-wrap">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1
            return (
              <li key={`${item.path || item.label}-${idx}`} className="flex items-center gap-1">
                {item.path ? (
                  <Link to={item.path} className="text-frothy-blue hover:text-frothy-blue/80 transition-colors text-sm font-medium">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-frothy-navy/70 text-sm font-medium">{item.label}</span>
                )}
                {!isLast && <ChevronRight className="w-4 h-4 text-frothy-navy/40 flex-shrink-0" />}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
