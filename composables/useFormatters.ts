export const useFormatters = () => {
  const { locale } = useI18n()

  const formatDate = (iso: string): string => {
    try {
      return new Date(iso).toLocaleDateString(locale.value, {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    } catch {
      return iso
    }
  }

  return { formatDate }
}
