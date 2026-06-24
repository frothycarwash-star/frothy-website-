import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export interface RelatedLink {
  label: string
  to: string
}

export default function RelatedLinks({ heading = 'Explore More', links }: { heading?: string; links: RelatedLink[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-card p-6 lg:p-8 mt-10">
      <h3 className="font-heading text-xl text-frothy-navy mb-4">{heading}</h3>
      <ul className="grid sm:grid-cols-2 gap-3">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="flex items-center gap-2 text-frothy-blue text-sm font-semibold hover:text-frothy-navy transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
