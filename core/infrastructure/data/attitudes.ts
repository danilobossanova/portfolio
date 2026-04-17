import type { Attitude } from '@core/domain/entities/Attitude'

type LocalizedAttitudes = Record<string, readonly Attitude[]>

export const attitudesData: LocalizedAttitudes = {
  'pt-BR': [
    { id: 'responsibility', name: 'Responsabilidade', icon: 'ShieldCheck' },
    { id: 'communication', name: 'Comunicação', icon: 'MessageSquare' },
    { id: 'collaboration', name: 'Colaboração', icon: 'Users' },
    { id: 'discipline', name: 'Disciplina', icon: 'ClipboardList' },
    { id: 'analytical', name: 'Pensamento Analítico', icon: 'BarChart3' },
    { id: 'context', name: 'Respeito ao Contexto', icon: 'Scale' },
  ],
  en: [
    { id: 'responsibility', name: 'Responsibility', icon: 'ShieldCheck' },
    { id: 'communication', name: 'Communication', icon: 'MessageSquare' },
    { id: 'collaboration', name: 'Collaboration', icon: 'Users' },
    { id: 'discipline', name: 'Discipline', icon: 'ClipboardList' },
    { id: 'analytical', name: 'Analytical Thinking', icon: 'BarChart3' },
    { id: 'context', name: 'Context Awareness', icon: 'Scale' },
  ],
}
