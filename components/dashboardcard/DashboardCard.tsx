'use client'

import Link from 'next/link'

type Props = {
  title: string
  value: number | string
  href: string
}

export function DashboardCard({ title, value, href }: Props) {
  return (
    <Link href={href} className="rounded-xl border p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </Link>
  )
}
