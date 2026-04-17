import type { Principle } from '@core/domain/entities/Principle'

type LocalizedPrinciples = Record<string, readonly Principle[]>

export const principlesData: LocalizedPrinciples = {
  'pt-BR': [
    {
      id: 'clean-architecture',
      title: 'Arquitetura limpa',
      description:
        'Sistemas desacoplados que isolam lógica de negócio de infraestrutura e frameworks.',
      icon: 'Layout',
    },
    {
      id: 'robust-integrations',
      title: 'Integrações robustas',
      description: 'Conexões entre sistemas focadas em resiliência, falhas e consistência de dados.',
      icon: 'Network',
    },
    {
      id: 'readable-code',
      title: 'Código legível',
      description: 'Código que prioriza comunicação entre humanos e facilita revisão.',
      icon: 'FileText',
    },
    {
      id: 'decisions-with-context',
      title: 'Decisões com contexto',
      description: 'Escolhas baseadas em fatos, necessidades do negócio e restrições reais.',
      icon: 'Brain',
    },
    {
      id: 'clear-communication',
      title: 'Comunicação clara',
      description: 'Tradução de complexidade técnica em linguagem acessível a stakeholders.',
      icon: 'MessageSquare',
    },
    {
      id: 'continuous-evolution',
      title: 'Evolução contínua',
      description: 'Aprendizado constante aplicado à melhoria técnica e de processos.',
      icon: 'TrendingUp',
    },
  ],
  en: [
    {
      id: 'clean-architecture',
      title: 'Clean architecture',
      description: 'Decoupled systems that isolate business logic from infrastructure and frameworks.',
      icon: 'Layout',
    },
    {
      id: 'robust-integrations',
      title: 'Robust integrations',
      description: 'System connections focused on resilience, failure handling, and data consistency.',
      icon: 'Network',
    },
    {
      id: 'readable-code',
      title: 'Readable code',
      description: 'Code that prioritises human communication and easy reviews.',
      icon: 'FileText',
    },
    {
      id: 'decisions-with-context',
      title: 'Decisions with context',
      description: 'Choices based on facts, business needs and real constraints.',
      icon: 'Brain',
    },
    {
      id: 'clear-communication',
      title: 'Clear communication',
      description: 'Translating technical complexity into language every stakeholder understands.',
      icon: 'MessageSquare',
    },
    {
      id: 'continuous-evolution',
      title: 'Continuous evolution',
      description: 'Constant learning applied to technical and process improvement.',
      icon: 'TrendingUp',
    },
  ],
}
