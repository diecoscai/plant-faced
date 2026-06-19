import { navLinks, type SectionId } from '@/lib/navigation';

interface NavProps {
  isOpen: boolean;
  activeSection: SectionId | null;
  onNavigate: (sectionId: SectionId) => void;
  onLinkClick?: () => void;
}

export default function Nav({
  isOpen,
  activeSection,
  onNavigate,
  onLinkClick,
}: NavProps) {
  return (
    <ul
      id="primary-navigation"
      className={[
        'flex gap-4 list-none m-0 p-0',
        'max-md:flex-col max-md:absolute max-md:top-full max-md:left-0',
        'max-md:w-full max-md:bg-white max-md:shadow-md max-md:px-8 max-md:py-4',
        isOpen ? 'max-md:flex' : 'max-md:hidden',
        'md:flex',
      ].join(' ')}
    >
      {navLinks.map((link) => (
        <li key={link.id}>
          <a
            href={`#${link.id}`}
            className={[
              'text-primary no-underline px-2 py-2 rounded-md',
              'transition-colors duration-300',
              'hover:text-primary/60 focus:text-primary',
              'focus:outline-2 focus:outline-primary focus:outline-offset-2',
              activeSection === link.id ? 'text-primary font-semibold underline underline-offset-4' : '',
            ].join(' ')}
            aria-label={link.label}
            aria-current={activeSection === link.id ? 'location' : undefined}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(link.id);
              onLinkClick?.();
            }}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
