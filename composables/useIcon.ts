import {
  Layout,
  Network,
  FileText,
  Brain,
  MessageSquare,
  TrendingUp,
  ShieldCheck,
  Users,
  ClipboardList,
  BarChart3,
  Scale,
  Mail,
  Linkedin,
  Github,
  Globe,
  Twitter,
} from 'lucide-vue-next'
import type { Component } from 'vue'

const ICON_MAP: Record<string, Component> = {
  Layout,
  Network,
  FileText,
  Brain,
  MessageSquare,
  TrendingUp,
  ShieldCheck,
  Users,
  ClipboardList,
  BarChart3,
  Scale,
  Mail,
  Linkedin,
  Github,
  Globe,
  Twitter,
}

/** Resolve an icon name (pure string in the domain) to a concrete Vue component. */
export const useIcon = (name: string): Component => ICON_MAP[name] ?? FileText
