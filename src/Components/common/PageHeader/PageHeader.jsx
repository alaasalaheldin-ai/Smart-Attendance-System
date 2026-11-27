import PageTitle from '../../PageTitle'
import './PageHeader.css'

// بيبني على PageTitle الموجود، وبيضيف أزرار اختيارية
export default function PageHeader({ title, description, actions }) {
  return (
    <header className="ui-page-header">
      <PageTitle title={title} subtitle={description} />
      {actions && <div className="ui-page-header__actions">{actions}</div>}
    </header>
  )
}
