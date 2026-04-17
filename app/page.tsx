import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function Home() {
  const headersList = await headers()
  const acceptLang = headersList.get('accept-language') ?? ''
  const lang = acceptLang.toLowerCase().startsWith('pt') ? 'pt' : 'en'
  redirect(`/${lang}`)
}
