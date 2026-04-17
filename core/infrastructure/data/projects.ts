import type { Project } from '@core/domain/entities/Project'

type LocalizedProjects = Record<string, readonly Project[]>

export const projectsData: LocalizedProjects = {
  'pt-BR': [
    {
      slug: 'motor-liquidacao-tempo-real',
      title: 'Motor de Liquidação em Tempo Real',
      summary:
        'Processamento de grandes volumes de transações financeiras com latência sub-segundo.',
      tags: ['Fintech', 'Scalability', 'Event-Driven'],
      context:
        'O sistema existente não sustentava picos de volumetria, gerando filas e conciliações atrasadas.',
      solution:
        'Arquitetura orientada a eventos com Spring Boot, Kafka e idempotência por chaves naturais.',
      result:
        'Redução de 40% no tempo de conciliação e 99,9% de disponibilidade operacional sob carga pesada.',
      stack: ['Java 17', 'Spring Cloud', 'Kafka', 'PostgreSQL'],
      coverImage: 'https://picsum.photos/seed/fintech/1200/800',
      publishedAt: '2024-11-03',
      metrics: [
        { label: 'Conciliação', value: '-40%' },
        { label: 'Disponibilidade', value: '99,9%' },
        { label: 'Throughput', value: '12k tps' },
      ],
      body: `## Contexto\nO core de liquidação legado não escalava horizontalmente e acumulava filas durante picos de movimento...\n\n## Decisões técnicas\n- Kafka como backbone de eventos.\n- Outbox pattern para garantias at-least-once.\n- Idempotência por chave natural no consumidor.\n\n## Resultado\nEm três meses, o tempo médio de conciliação caiu 40%, com throughput estável acima de 12k transações por segundo.`,
    },
    {
      slug: 'gateway-integracao-multicanal',
      title: 'Gateway de Integração Multicanal',
      summary: 'Centralização de marketplaces para estoque e pedidos unificados.',
      tags: ['E-commerce', 'Integration'],
      context:
        'Cada marketplace possuía particularidades de API, causando retrabalho e inconsistência de estoque.',
      solution:
        'Camada de abstração com Adapter Pattern e orquestração por filas para desacoplar produtores e consumidores.',
      result:
        'Integração de 5 novos parceiros em menos de 1 mês, com zero conflitos de sincronismo de estoque.',
      stack: ['Spring Boot', 'Redis', 'Docker', 'JUnit 5'],
      coverImage: 'https://picsum.photos/seed/ecommerce/1200/800',
      publishedAt: '2024-08-12',
      metrics: [
        { label: 'Parceiros integrados', value: '+5' },
        { label: 'Tempo por parceiro', value: '<1 mês' },
      ],
      body: `## Contexto\nA operação dependia de scripts individuais por marketplace...\n\n## Solução\nUm adapter por canal, cache em Redis e testes de contrato por provider.\n\n## Impacto\nCinco marketplaces novos integrados em menos de um mês, sem inconsistência de estoque.`,
    },
    {
      slug: 'modernizacao-core-bancario',
      title: 'Modernização de Core Bancário',
      summary: 'Migração controlada de um monólito legado para microserviços.',
      tags: ['Legacy Recovery', 'Clean Arch'],
      context:
        'Monólito legado de alto acoplamento, deploys demorados e alto índice de incidentes em produção.',
      solution:
        'Strangler Fig Pattern extraindo domínios gradualmente com Arquitetura Hexagonal.',
      result: 'Melhoria de 60% no tempo de deploy e redução significativa da dívida técnica.',
      stack: ['Java', 'Spring Boot', 'Oracle', 'Kubernetes'],
      coverImage: 'https://picsum.photos/seed/banking/1200/800',
      publishedAt: '2024-03-22',
      metrics: [
        { label: 'Deploy time', value: '-60%' },
        { label: 'Incidentes críticos', value: '-45%' },
      ],
      body: `## Contexto\nCore bancário monolítico com 10+ anos...\n\n## Estratégia\nStrangler Fig + Hexagonal para isolar domínios.\n\n## Resultado\nDeploys 60% mais rápidos e queda expressiva em incidentes.`,
    },
  ],
  en: [
    {
      slug: 'motor-liquidacao-tempo-real',
      title: 'Real-Time Settlement Engine',
      summary: 'High-volume financial transaction processing with sub-second latency.',
      tags: ['Fintech', 'Scalability', 'Event-Driven'],
      context: 'The existing system could not handle volume peaks, causing queues and reconciliation delays.',
      solution: 'Event-driven architecture with Spring Boot, Kafka, and natural-key idempotency.',
      result: '40% reduction in reconciliation time and 99.9% operational availability under heavy load.',
      stack: ['Java 17', 'Spring Cloud', 'Kafka', 'PostgreSQL'],
      coverImage: 'https://picsum.photos/seed/fintech/1200/800',
      publishedAt: '2024-11-03',
      metrics: [
        { label: 'Reconciliation', value: '-40%' },
        { label: 'Availability', value: '99.9%' },
        { label: 'Throughput', value: '12k tps' },
      ],
      body: `## Context\nThe legacy settlement core did not scale horizontally...\n\n## Technical decisions\n- Kafka as the event backbone.\n- Outbox pattern for at-least-once guarantees.\n- Natural-key idempotency on consumers.\n\n## Result\nWithin three months reconciliation time dropped 40% with stable throughput above 12k tps.`,
    },
    {
      slug: 'gateway-integracao-multicanal',
      title: 'Multi-Channel Integration Gateway',
      summary: 'Marketplace centralisation for unified stock and orders.',
      tags: ['E-commerce', 'Integration'],
      context: 'Each marketplace had its own API quirks, causing rework and inventory drift.',
      solution: 'Abstraction layer using the Adapter pattern and queue-based orchestration.',
      result: 'Five new partners integrated in under a month, with zero stock sync conflicts.',
      stack: ['Spring Boot', 'Redis', 'Docker', 'JUnit 5'],
      coverImage: 'https://picsum.photos/seed/ecommerce/1200/800',
      publishedAt: '2024-08-12',
      metrics: [
        { label: 'Integrated partners', value: '+5' },
        { label: 'Time per partner', value: '<1 month' },
      ],
      body: `## Context\nOperations depended on one-off scripts per marketplace...\n\n## Solution\nOne adapter per channel, Redis cache and provider contract tests.\n\n## Impact\nFive new marketplaces integrated in under a month, with no stock inconsistency.`,
    },
    {
      slug: 'modernizacao-core-bancario',
      title: 'Banking Core Modernisation',
      summary: 'Controlled migration from a legacy monolith into microservices.',
      tags: ['Legacy Recovery', 'Clean Arch'],
      context: 'Highly coupled legacy monolith with slow deploys and frequent incidents.',
      solution: 'Strangler Fig pattern extracting domains progressively with Hexagonal Architecture.',
      result: '60% faster deploys and a significant drop in technical debt.',
      stack: ['Java', 'Spring Boot', 'Oracle', 'Kubernetes'],
      coverImage: 'https://picsum.photos/seed/banking/1200/800',
      publishedAt: '2024-03-22',
      metrics: [
        { label: 'Deploy time', value: '-60%' },
        { label: 'Critical incidents', value: '-45%' },
      ],
      body: `## Context\n10+ year old banking core monolith...\n\n## Strategy\nStrangler Fig + Hexagonal to isolate domains.\n\n## Result\n60% faster deploys and a sharp drop in incidents.`,
    },
  ],
}
