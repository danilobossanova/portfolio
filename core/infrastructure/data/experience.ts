import type { ExperienceStack } from '@core/domain/entities/Experience'

type LocalizedExperience = Record<string, readonly ExperienceStack[]>

export const experienceData: LocalizedExperience = {
  'pt-BR': [
    {
      id: 'backend',
      title: 'Backend',
      items: [
        { name: 'Java (8, 11, 17)', level: 'Senior' },
        { name: 'Spring Boot / Data / Security', level: 'Expert' },
        { name: 'APIs RESTful', level: 'Expert' },
      ],
    },
    {
      id: 'architecture',
      title: 'Arquitetura e Qualidade',
      items: [
        { name: 'Clean / Hexagonal', level: 'Daily' },
        { name: 'JUnit / Mockito / TDD', level: 'Standard' },
        { name: 'Microserviços & Eventos', level: 'Advanced' },
      ],
    },
    {
      id: 'data-infra',
      title: 'Dados e Infra',
      items: [
        { name: 'PostgreSQL / Oracle / MySQL', level: 'Proficient' },
        { name: 'Redis / Caching', level: 'Advanced' },
        { name: 'Docker / K8s / CI-CD', level: 'Practitioner' },
      ],
    },
    {
      id: 'frontend-other',
      title: 'Frontend e Outros',
      items: [
        { name: 'Angular / Vue (TypeScript)', level: 'Capable' },
        { name: 'Cloud (AWS/Azure)', level: 'Basics' },
        { name: 'Kafka / RabbitMQ', level: 'Advanced' },
      ],
    },
  ],
  en: [
    {
      id: 'backend',
      title: 'Backend',
      items: [
        { name: 'Java (8, 11, 17)', level: 'Senior' },
        { name: 'Spring Boot / Data / Security', level: 'Expert' },
        { name: 'RESTful APIs', level: 'Expert' },
      ],
    },
    {
      id: 'architecture',
      title: 'Architecture & Quality',
      items: [
        { name: 'Clean / Hexagonal', level: 'Daily' },
        { name: 'JUnit / Mockito / TDD', level: 'Standard' },
        { name: 'Microservices & Events', level: 'Advanced' },
      ],
    },
    {
      id: 'data-infra',
      title: 'Data & Infra',
      items: [
        { name: 'PostgreSQL / Oracle / MySQL', level: 'Proficient' },
        { name: 'Redis / Caching', level: 'Advanced' },
        { name: 'Docker / K8s / CI-CD', level: 'Practitioner' },
      ],
    },
    {
      id: 'frontend-other',
      title: 'Frontend & Others',
      items: [
        { name: 'Angular / Vue (TypeScript)', level: 'Capable' },
        { name: 'Cloud (AWS/Azure)', level: 'Basics' },
        { name: 'Kafka / RabbitMQ', level: 'Advanced' },
      ],
    },
  ],
}
