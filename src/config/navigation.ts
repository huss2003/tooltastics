export interface NavItem {
  labelKey: string
  href: string
  children?: NavItem[]
}

export interface NavSection {
  headingKey: string
  items: NavItem[]
}

export const NAVIGATION: NavSection[] = [
  {
    headingKey: 'nav.tools',
    items: [
      { labelKey: 'nav.ruler', href: '/online-ruler' },
      { labelKey: 'nav.pixelRuler', href: '/pixel-ruler' },
      { labelKey: 'nav.protractor', href: '/protractor' },
      { labelKey: 'nav.printableRuler', href: '/printable-ruler' },
      { labelKey: 'nav.ringSizer', href: '/ring-sizer' },
      { labelKey: 'nav.lSquare', href: '/l-square' },
      { labelKey: 'nav.measureImage', href: '/measure-image' },
      { labelKey: 'nav.unitConverter', href: '/unit-converter' },
    ],
  },
]
