import type { Article } from '@core/domain/entities/Article'

type LocalizedArticles = Record<string, readonly Article[]>

const ptCustoComplexidade = `## Complexidade cobrada com juros compostos

Complexidade é a maior causa de falência técnica que já vi de perto. Cada
abstração "por precaução" é um contrato implícito com o futuro — e o futuro
sempre cobra a conta.

> "A única coisa mais cara que resolver o problema errado é resolver o
> problema certo com três camadas de indireção que ninguém pediu."

### Sinais de alerta

- Abstrações que existem para um único caso de uso.
- Frameworks internos para coisas que o ecossistema já resolve.
- "Vamos deixar plugável" **antes** de existirem dois plugs.
- Configuração dinâmica para algo que muda uma vez por ano.
- Camadas de mapeamento entre objetos idênticos.

### Heurística prática

Antes de criar uma abstração, pergunte:

1. Existem **dois** clientes reais hoje?
2. O custo de extrair depois é proibitivo?
3. O comportamento realmente varia, ou só o nome?

Se a resposta for "não" para as três, **inline é a resposta certa**.

### Um exemplo concreto

\`\`\`java
// Antes — flexibilidade que ninguém pediu
public interface UserNotifier {
    void notify(User user, NotificationPayload payload);
}
public class EmailUserNotifier implements UserNotifier { /* ... */ }

// Depois — o sistema só manda email, ponto
public class EmailService {
    public void sendWelcome(User user) { /* ... */ }
}
\`\`\`

Quando o segundo canal aparecer, você extrai a interface em **cinco minutos**,
com testes verdes e com a cabeça clara sobre o que realmente muda.

### Resumo

Comece pela dor real, não pela elegância teórica. Clean Code é sobre **custo
de manutenção**, não sobre quantidade de interfaces por megabyte.`

const ptOutbox = `## O problema

Publicar eventos de forma confiável junto de uma transação de banco é uma das
armadilhas clássicas de sistemas distribuídos. Se você grava no Postgres e
depois publica no Kafka:

\`\`\`java
@Transactional
public void confirm(Order order) {
    orderRepository.save(order);       // ✅ transação do banco
    kafkaTemplate.send("orders", order); // ❌ fora da transação
}
\`\`\`

Basta um crash entre as duas chamadas para o banco dizer *"confirmado"* e o
mundo nunca saber.

## Outbox pattern

A ideia é gravar o evento na **mesma transação** do banco, em uma tabela
\`outbox\`. Um relay lê a tabela e publica de fato.

### Schema mínimo

\`\`\`sql
CREATE TABLE outbox (
    id           UUID PRIMARY KEY,
    aggregate    VARCHAR(64)  NOT NULL,
    event_type   VARCHAR(128) NOT NULL,
    payload      JSONB        NOT NULL,
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT now(),
    published_at TIMESTAMPTZ
);
CREATE INDEX outbox_unpublished_idx
    ON outbox (created_at) WHERE published_at IS NULL;
\`\`\`

### Relay

Um job simples lê eventos não publicados, envia ao broker e marca como
publicado. O importante é:

1. **Idempotência do consumidor** — o relay vai republicar em caso de falha.
2. **Monitoramento do lag** — alerta se \`outbox\` crescer mais rápido que
   consumir.
3. **Batch controlado** — não trave o DB puxando 10k de uma vez.

### Gotchas

- Nunca dependa de ordem estrita do broker; use \`aggregate_id\` no particionamento.
- Não faça *dead-letter* dentro da mesma tabela — crie \`outbox_failed\`.
- Sempre grave o schema version do payload.

## Quando evitar

Se o seu sistema não precisa de garantia at-least-once, o outbox é overkill.
Um \`@TransactionalEventListener\` do Spring resolve 80% dos casos.`

const enCustoComplexidade = `## Complexity on compound interest

Complexity is the biggest cause of technical bankruptcy I've seen up close.
Every "just in case" abstraction is an implicit contract with the future —
and the future always cashes in.

> "The only thing more expensive than solving the wrong problem is solving
> the right one with three layers of indirection nobody asked for."

### Warning signs

- Abstractions that exist for a single use case.
- In-house frameworks for problems the ecosystem already solves.
- "Let's make it pluggable" **before** two plugs exist.
- Dynamic config for something that changes once a year.
- Mapping layers between identical objects.

### Practical heuristic

Before creating an abstraction, ask:

1. Are there **two** real consumers today?
2. Is the cost of extracting later prohibitive?
3. Does the behaviour actually vary, or just the name?

If the answer is "no" to all three, **inline is the right answer**.

### A concrete example

\`\`\`java
// Before — flexibility nobody asked for
public interface UserNotifier {
    void notify(User user, NotificationPayload payload);
}
public class EmailUserNotifier implements UserNotifier { /* ... */ }

// After — the system only sends email, period
public class EmailService {
    public void sendWelcome(User user) { /* ... */ }
}
\`\`\`

When the second channel appears, you extract the interface in **five minutes**,
green tests and a clear head about what actually changes.

### Summary

Start from real pain, not theoretical elegance. Clean Code is about
**maintenance cost**, not interfaces per megabyte.`

const enOutbox = `## The problem

Reliably publishing events next to a database transaction is one of the classic
pitfalls in distributed systems. If you write to Postgres and then publish to
Kafka:

\`\`\`java
@Transactional
public void confirm(Order order) {
    orderRepository.save(order);       // ✅ inside DB transaction
    kafkaTemplate.send("orders", order); // ❌ outside the transaction
}
\`\`\`

A crash between the two calls is enough for the DB to say *"confirmed"* while
the rest of the world never hears about it.

## Outbox pattern

The idea is to write the event in the **same transaction**, in an \`outbox\`
table. A relay reads the table and actually publishes it.

### Minimal schema

\`\`\`sql
CREATE TABLE outbox (
    id           UUID PRIMARY KEY,
    aggregate    VARCHAR(64)  NOT NULL,
    event_type   VARCHAR(128) NOT NULL,
    payload      JSONB        NOT NULL,
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT now(),
    published_at TIMESTAMPTZ
);
CREATE INDEX outbox_unpublished_idx
    ON outbox (created_at) WHERE published_at IS NULL;
\`\`\`

### Relay

A simple job reads unpublished events, ships them to the broker and marks them
as published. What matters:

1. **Consumer idempotency** — the relay will republish on failure.
2. **Lag monitoring** — alert if \`outbox\` grows faster than it drains.
3. **Controlled batches** — don't lock the DB pulling 10k rows at a time.

### Gotchas

- Never rely on strict broker ordering; partition by \`aggregate_id\`.
- Don't dead-letter into the same table — create \`outbox_failed\`.
- Always record the payload schema version.

## When to avoid

If your system doesn't need at-least-once guarantees, outbox is overkill.
Spring's \`@TransactionalEventListener\` covers 80% of cases.`

const ptTestes = `## Suites verdes, código frágil

Um suite verde sem confiança é pior do que nenhum suite — ela te dá licença
pra dar deploy enquanto o sistema queima.

### O padrão que funciona

1. **TestContainers** para dependências reais (Postgres, Kafka, Redis).
2. **Fixtures determinísticos** — nada de \`@Sql\` + random.
3. **Um seed por teste**, sem estado compartilhado.
4. **Assertions em dados**, não em número de chamadas de mock.

\`\`\`java
@Testcontainers
@SpringBootTest
class OrderConfirmationIT {
    @Container
    static PostgreSQLContainer<?> db = new PostgreSQLContainer<>("postgres:16")
        .withInitScript("db/init.sql");

    @DynamicPropertySource
    static void props(DynamicPropertyRegistry reg) {
        reg.add("spring.datasource.url", db::getJdbcUrl);
    }
}
\`\`\`

### O que isso compra

- Testes que **viram verdes junto do código**, não depois.
- Refactors sem medo.
- Conversas objetivas em code review.`

const enTestes = `## Green suites, fragile code

A green suite without confidence is worse than no suite — it gives you license
to ship while the system burns.

### The pattern that works

1. **TestContainers** for real dependencies (Postgres, Kafka, Redis).
2. **Deterministic fixtures** — no \`@Sql\` + random.
3. **One seed per test**, no shared state.
4. **Assert on data**, not on mock invocation counts.

\`\`\`java
@Testcontainers
@SpringBootTest
class OrderConfirmationIT {
    @Container
    static PostgreSQLContainer<?> db = new PostgreSQLContainer<>("postgres:16")
        .withInitScript("db/init.sql");

    @DynamicPropertySource
    static void props(DynamicPropertyRegistry reg) {
        reg.add("spring.datasource.url", db::getJdbcUrl);
    }
}
\`\`\`

### What that buys

- Tests that **turn green with the code**, not after.
- Fearless refactors.
- Objective conversations at code review.`

const ptDecisoes = `## Seniority é contexto

O trabalho muda de *"resolver o problema certo"* para *"escolher qual problema
resolver"*. Isso exige pouco sobre como codar e muito sobre **saber dizer não**.

### O peso do legado

Código herdado é o custo que você **não pagou** quando o sistema nasceu.
Cada atalho do passado virou uma dívida a juros altos. O trabalho do senior
não é reescrever tudo — é escolher *qual pedaço* da dívida merece ser quitado
neste trimestre.

### O mapa que uso

- **Alta dor + alto risco** → refatoração cirúrgica com testes novos.
- **Alta dor + baixo risco** → substitui e segue.
- **Baixa dor + alto risco** → monitora e documenta o perigo.
- **Baixa dor + baixo risco** → **deixa em paz**.`

const enDecisoes = `## Seniority is context

The job shifts from *"solving the right problem"* to *"picking which problem
to solve"*. That requires little about how to code and a lot about **knowing
how to say no**.

### The weight of legacy

Legacy code is the cost you **didn't pay** when the system was born. Every
shortcut from the past became high-interest debt. The senior's job isn't to
rewrite everything — it's to pick *which piece* of debt is worth paying off
this quarter.

### The map I use

- **High pain + high risk** → surgical refactor with new tests.
- **High pain + low risk** → replace and move on.
- **Low pain + high risk** → monitor and document the danger.
- **Low pain + low risk** → **leave it alone**.`

export const articlesData: LocalizedArticles = {
  'pt-BR': [
    {
      slug: 'custo-real-da-complexidade',
      title: 'O custo real da complexidade desnecessária',
      excerpt:
        'Por que over-engineering costuma ser o caminho mais rápido para o fracasso de um projeto.',
      category: 'Arquitetura',
      tags: ['clean-architecture', 'decisões-técnicas'],
      readTimeMinutes: 5,
      publishedAt: '2025-02-10',
      author: 'Danilo Fernando',
      coverImage: 'https://picsum.photos/seed/complexity/1200/600',
      body: ptCustoComplexidade,
    },
    {
      slug: 'testes-integracao-que-nao-mentem',
      title: 'Testes de integração que não mentem',
      excerpt:
        'Estratégias com TestContainers para manter CI/CD rápida sem sacrificar a confiança no código.',
      category: 'Spring Boot',
      tags: ['testes', 'spring-boot', 'testcontainers'],
      readTimeMinutes: 8,
      publishedAt: '2025-01-18',
      author: 'Danilo Fernando',
      coverImage: 'https://picsum.photos/seed/tests/1200/600',
      body: ptTestes,
    },
    {
      slug: 'decisoes-tecnicas-peso-do-legado',
      title: 'Decisões técnicas e o peso do legado',
      excerpt:
        'Ser senior tem menos a ver com "como codar" e mais a ver com "quando não codar".',
      category: 'Carreira',
      tags: ['carreira', 'liderança-técnica'],
      readTimeMinutes: 6,
      publishedAt: '2024-12-05',
      author: 'Danilo Fernando',
      coverImage: 'https://picsum.photos/seed/career/1200/600',
      body: ptDecisoes,
    },
    {
      slug: 'outbox-pattern-na-pratica',
      title: 'Outbox pattern na prática com Spring Boot',
      excerpt: 'Como garantir entregas at-least-once sem depender de transações distribuídas.',
      category: 'Arquitetura',
      tags: ['eventos', 'spring-boot', 'kafka'],
      readTimeMinutes: 9,
      publishedAt: '2025-03-01',
      author: 'Danilo Fernando',
      coverImage: 'https://picsum.photos/seed/outbox/1200/600',
      body: ptOutbox,
    },
  ],
  en: [
    {
      slug: 'custo-real-da-complexidade',
      title: 'The real cost of unnecessary complexity',
      excerpt: 'Why over-engineering is often the fastest path to project failure.',
      category: 'Architecture',
      tags: ['clean-architecture', 'technical-decisions'],
      readTimeMinutes: 5,
      publishedAt: '2025-02-10',
      author: 'Danilo Fernando',
      coverImage: 'https://picsum.photos/seed/complexity/1200/600',
      body: enCustoComplexidade,
    },
    {
      slug: 'testes-integracao-que-nao-mentem',
      title: "Integration tests that don't lie",
      excerpt: 'TestContainers strategies to keep CI/CD fast without losing confidence in your code.',
      category: 'Spring Boot',
      tags: ['testing', 'spring-boot', 'testcontainers'],
      readTimeMinutes: 8,
      publishedAt: '2025-01-18',
      author: 'Danilo Fernando',
      coverImage: 'https://picsum.photos/seed/tests/1200/600',
      body: enTestes,
    },
    {
      slug: 'decisoes-tecnicas-peso-do-legado',
      title: 'Technical decisions and the weight of legacy',
      excerpt: 'Being senior is less about "how to code" and more about "when not to code".',
      category: 'Career',
      tags: ['career', 'tech-leadership'],
      readTimeMinutes: 6,
      publishedAt: '2024-12-05',
      author: 'Danilo Fernando',
      coverImage: 'https://picsum.photos/seed/career/1200/600',
      body: enDecisoes,
    },
    {
      slug: 'outbox-pattern-na-pratica',
      title: 'Outbox pattern in practice with Spring Boot',
      excerpt: 'How to guarantee at-least-once delivery without distributed transactions.',
      category: 'Architecture',
      tags: ['events', 'spring-boot', 'kafka'],
      readTimeMinutes: 9,
      publishedAt: '2025-03-01',
      author: 'Danilo Fernando',
      coverImage: 'https://picsum.photos/seed/outbox/1200/600',
      body: enOutbox,
    },
  ],
}
