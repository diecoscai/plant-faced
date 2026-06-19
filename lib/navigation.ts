export type SectionId = 'home' | 'products' | 'contact';

export interface NavLink {
  id: SectionId;
  label: string;
}

export const navLinks: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'products', label: 'Products' },
  { id: 'contact', label: 'Contact' },
];

export function isSectionId(value: string): value is SectionId {
  return navLinks.some((link) => link.id === value);
}

export function scrollToSection(sectionId: SectionId) {
  const target = document.getElementById(sectionId);

  if (!target) return false;

  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.pushState(null, '', `#${sectionId}`);

  if (target instanceof HTMLElement) {
    target.focus({ preventScroll: true });
  }

  return true;
}

export function getProductDetailPath(urlName: string) {
  return `/products/${encodeURIComponent(urlName)}`;
}
