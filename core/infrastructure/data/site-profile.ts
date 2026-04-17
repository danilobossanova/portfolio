import type { SiteProfile } from '@core/domain/entities/SiteProfile'

type LocalizedProfile = Record<string, SiteProfile>

export const siteProfileData: LocalizedProfile = {
  'pt-BR': {
    brandName: 'Danilo Fernando',
    fullName: 'Danilo Fernando - Engenheiro de Software',
    headline:
      'Software bem construído, integrações confiáveis e arquitetura pensada para durar.',
    manifesto: [
      'Minha jornada é guiada pela crença de que código é apenas uma ferramenta para resolver problemas de negócio complexos. Com sólida experiência em ecossistemas Java e Spring, dedico meus esforços a sistemas que não apenas funcionam, mas que são fáceis de manter e evoluir.',
      'Especialista em APIs robustas e integrações críticas, acredito que maturidade técnica se reflete na capacidade de tomar decisões ponderadas, equilibrando inovação com as necessidades reais da organização.',
      'Busco impacto real: Clean Code não é estética, é necessidade econômica para garantir a sustentabilidade do produto a longo prazo.',
    ],
    contactIntro:
      'Estou sempre aberto a novas oportunidades profissionais, troca de experiências técnicas ou discussões sobre arquitetura e desenvolvimento de software.',
    avatar: '/images/profile/danilo.webp',
    manifestoImage: '/images/profile/danilo_manifesto.webp',
    social: [
      { kind: 'email', label: 'E-mail', href: 'mailto:danilo.bossanova@hotmail.com' },
      { kind: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/danilo-fernando-dev/' },
      { kind: 'github', label: 'GitHub', href: 'https://github.com/danilobossanova' },
    ],
  },
  en: {
    brandName: 'Danilo Fernando',
    fullName: 'Danilo Fernando - Senior Software Engineer',
    headline: 'Well-built software, reliable integrations, and architecture designed to last.',
    manifesto: [
      'My journey is guided by the belief that code is just a tool to solve complex business problems. With solid experience in the Java and Spring ecosystems, I focus on systems that work AND are easy to maintain and evolve.',
      'Specialised in robust APIs and critical integrations, I believe technical maturity shows up in balanced decisions that weigh innovation against real business needs.',
      'I chase real impact: Clean Code is not aesthetics, it is an economic necessity for long-term product sustainability.',
    ],
    contactIntro:
      "I'm always open to new professional opportunities, technical exchange, or conversations about architecture and software engineering.",
    avatar: '/images/profile/danilo.webp',
    manifestoImage: '/images/profile/danilo_manifesto.webp',
    social: [
      { kind: 'email', label: 'Email', href: 'mailto:danilo.bossanova@hotmail.com' },
      { kind: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/danilo-fernando-dev/' },
      { kind: 'github', label: 'GitHub', href: 'https://github.com/danilobossanova' },
    ],
  },
}
