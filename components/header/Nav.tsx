import Link from 'next/link';

interface NavProps {
  isOpen: boolean;
  onLinkClick?: () => void;
}

export default function Nav({ isOpen, onLinkClick }: NavProps) {
  return (
    <ul
      className={[
        'flex gap-4 list-none m-0 p-0',
        'max-md:flex-col max-md:absolute max-md:top-full max-md:left-0',
        'max-md:w-full max-md:bg-white max-md:shadow-md max-md:px-8 max-md:py-4',
        isOpen ? 'max-md:flex' : 'max-md:hidden',
        'md:flex',
      ].join(' ')}
    >
      <li>
        <Link
          href="/"
          className="text-primary no-underline px-2 py-2 transition-colors duration-300 hover:text-secondary focus:text-secondary focus:outline-2 focus:outline-secondary focus:outline-offset-2"
          aria-label="Home"
          onClick={onLinkClick}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="#products"
          className="text-primary no-underline px-2 py-2 transition-colors duration-300 hover:text-secondary focus:text-secondary focus:outline-2 focus:outline-secondary focus:outline-offset-2"
          aria-label="Products"
          onClick={onLinkClick}
        >
          Products
        </Link>
      </li>
      <li>
        <Link
          href="#contact"
          className="text-primary no-underline px-2 py-2 transition-colors duration-300 hover:text-secondary focus:text-secondary focus:outline-2 focus:outline-secondary focus:outline-offset-2"
          aria-label="Contact"
          onClick={onLinkClick}
        >
          Contact
        </Link>
      </li>
    </ul>
  );
}
