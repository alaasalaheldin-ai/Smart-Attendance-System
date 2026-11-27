import './LoadingState.css'

export default function LoadingState({ message = 'جاري التحميل...' }) {
  return (
    <div className="ui-loading" role="status">
      <span className="spinner-border ui-loading__spinner" aria-hidden="true" />
      <p className="ui-loading__message">{message}</p>
    </div>
  )
}
