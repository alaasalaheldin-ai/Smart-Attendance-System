import './EmptyState.css'

// icon: اسم من bootstrap-icons زي "bi-people"
export default function EmptyState({ title, description, icon = 'bi-inbox', action }) {
  return (
    <div className="ui-empty">
      {icon && <i className={`bi ${icon} ui-empty__icon`} aria-hidden="true" />}
      <h2 className="ui-empty__title">{title}</h2>
      {description && <p className="ui-empty__description">{description}</p>}
      {action}
    </div>
  )
}
