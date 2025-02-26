import { Button } from '@/Components/shadcn/ui/button'
import { Icon } from '@iconify/react'
import { Link, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Fonctionnalités', href: '/#features', external: false },
  /* { label: 'Tarifs', href: '/#pricing', external: false },
  { label: 'Docs', href: 'https://docs.larasonic.com/introduction', external: true }, */
]

const githubUrl = 'https://github.com/shipfastlabs/larasonic-react'
const twitterUrl = 'https://x.com/pushpak1300?ref=larasonic'

export default function WebLayout({ children }) {
  const { props } = usePage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark')
  }, [mode])

  const toggleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-xs supports-backdrop-filter:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a className="flex items-center space-x-2" href="/" aria-label={props.name}>
              <Icon icon="lucide:rocket" className="h-6 w-6" aria-hidden="true" />
              <span className="hidden font-bold sm:inline-block">{props.name}</span>
            </a>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium sm:ml-4">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`transition-colors hover:text-foreground/80 ${
                    !link.external ? 'text-foreground/60' : ''
                  }`}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex space-x-2">
              {!props.auth.user
                ? (
                    <>
                      <Button variant="outline" asChild>
                        <Link href="/login" prefetch="mount">Login</Link>
                      </Button>
                      {/*  <Button variant="outline" asChild>
                        <Link href="/register" prefetch="mount">Register</Link>
                      </Button> */}
                    </>
                  )
                : (
                    <Button variant="outline" asChild>
                      <Link href="/dashboard" prefetch="mount">Dashboard</Link>
                    </Button>
                  )}
            </div>
            <Button variant="ghost" size="icon" aria-label="Toggle Theme" onClick={toggleMode}>
              <Icon
                className="text-muted-foreground h-6 w-6"
                icon={mode === 'dark' ? 'lucide:sun' : 'lucide:moon'}
              />
            </Button>
            {/* <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-block"
              aria-label="GitHub"
            >
              <Icon icon="mdi:github" className="h-5 w-5" />
            </a> */}
            <Button
              className="md:hidden"
              variant="ghost"
              size="icon"
              aria-label="Toggle menu"
              onClick={toggleMenu}
            >
              <Icon icon={isMenuOpen ? 'lucide:x' : 'lucide:menu'} className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="flex flex-col p-4 space-y-4">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-foreground/80"
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  onClick={toggleMenu}
                >
                  {link.label}
                </a>
              ))}
              {!props.auth.user
                ? (
                    <>
                      <Button variant="outline" asChild className="w-full" onClick={toggleMenu}>
                        <Link href="/login" prefetch="mount">Login</Link>
                      </Button>
                      {/*      <Button variant="outline" asChild className="w-full" onClick={toggleMenu}>
                        <Link href="/register" prefetch="mount">Register</Link>
                      </Button> */}
                    </>
                  )
                : (
                    <Button variant="outline" asChild className="w-full" onClick={toggleMenu}>
                      <Link href="/dashboard" prefetch="mount">Dashboard</Link>
                    </Button>
                  )}
              {/*  <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 text-sm font-medium"
                onClick={toggleMenu}
              >
                <Icon icon="mdi:github" className="h-5 w-5" />
                <span>GitHub</span>
              </a> */}
            </nav>
          </div>
        )}
      </header>

      {children}

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm flex items-center gap-2 text-center sm:text-left">
              <Icon icon="lucide:rocket" className="size-6" aria-hidden="true" />
              Powerd by
              <a className="underline" href="#" target="_blank" rel="noopener noreferrer">
                OXILYUM
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
