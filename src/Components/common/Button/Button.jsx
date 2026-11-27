import './Button.css'

export default function Button({
  children,
  variant = 'primary', // primary | secondary | danger | outline
  size = 'medium', // small | medium | large
  type = 'button',
  loading = false,
  disabled = false,
  className = '',
  ...rest // onClick, form, aria-label ...
}) {
  return (
    <button
      {...rest}
      type={type}
      className={`btn ui-btn ui-btn--${variant} ui-btn--${size} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading && <span className="spinner-border spinner-border-sm" aria-hidden="true" />}
      {children}
    </button>
  )
}
