import './StatusBadge.css'

const STATUSES = {
  present: { label: 'حاضر', tone: 'success' },
  late: { label: 'متأخر', tone: 'warning' },
  absent: { label: 'غائب', tone: 'danger' },
  rejected: { label: 'مرفوض', tone: 'danger' },
  pending: { label: 'لم يُحسم', tone: 'neutral' },
  active: { label: 'نشط', tone: 'success' },
  inactive: { label: 'موقوف', tone: 'danger' },
  open: { label: 'مفتوحة', tone: 'success' },
  closed: { label: 'مغلقة', tone: 'neutral' },
  scheduled: { label: 'مجدولة', tone: 'info' },
  holiday: { label: 'إجازة', tone: 'neutral' },
}

// status مش حساس لحالة الحروف، و label بيغير النص الافتراضي
export default function StatusBadge({ status, label }) {
  const found = STATUSES[String(status).toLowerCase()]
  return (
    <span className={`ui-badge ui-badge--${found?.tone ?? 'neutral'}`}>
      {label ?? found?.label ?? status}
    </span>
  )
}
