import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu } from '@/components/ui/icons';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/industries', label: 'Industries' },
  { href: '/resources', label: 'Resources' },
  { href: '/career', label: 'Careers' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

interface HeaderProps {
  currentPath: string;
}

export default function Header({ currentPath }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'border-b border-border bg-background/70 backdrop-blur-xl'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img
            src="/markosh-logo.png"
            alt="Markosh Logo"
            width={36}
            height={36}
            className="object-contain"
          />
          <span className="text-2xl font-bold font-headline text-foreground">
            Markosh
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium text-muted-foreground underline-offset-8 transition-colors hover:text-foreground',
                currentPath === link.href && 'text-primary underline decoration-2'
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="/contact"
            className="btn-gradient inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
          >
            Get Free Consulting
          </a>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            data-testid="mobile-menu-button"
            aria-label="Open mobile menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </button>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
              onClick={closeMobileMenu}
            >
              <div
                className="fixed right-0 top-0 h-full w-full bg-background"
                data-testid="mobile-menu"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col items-center justify-center h-full p-6">
                  <button
                    onClick={closeMobileMenu}
                    className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground"
                    aria-label="Close menu"
                  >
                    <span className="text-3xl">&times;</span>
                  </button>

                  <a
                    href="/"
                    className="mb-10 flex items-center gap-2"
                    onClick={closeMobileMenu}
                  >
                    <img
                      src="/markosh-logo.png"
                      alt="Markosh Logo"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                    <span className="text-2xl font-bold font-headline">Markosh</span>
                  </a>

                  <nav className="flex flex-col items-center gap-6">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={closeMobileMenu}
                        className={cn(
                          'font-headline text-2xl font-bold text-muted-foreground transition-colors hover:text-foreground',
                          currentPath === link.href && 'text-primary'
                        )}
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>

                  <a
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="btn-gradient mt-10 inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-8 font-semibold"
                  >
                    Get Free Consulting
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
