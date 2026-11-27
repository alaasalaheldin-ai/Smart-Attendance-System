import { useId } from 'react'
import './FormField.css'

// children: عنصر جاهز، أو function بتاخد { id, required, aria-* } وترجع الـ control
export default function FormField({ id, label, error, helperText, required = false, className = '', children }) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const errorId = `${fieldId}-error`
  const helpId = `${fieldId}-help`
  const describedBy = error ? errorId : helperText ? helpId : undefined

  const control = typeof children === 'function'
    ? children({ id: fieldId, required, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy })
    : children

  return (
    <div className={`ui-field ${className}`}>
      {label && (
        <label htmlFor={fieldId} className="form-label ui-field__label">
          {label}
          {required && <span className="ui-field__required" aria-hidden="true"> *</span>}
        </label>
      )}
      {control}
      {error && <div id={errorId} className="ui-field__error" role="alert">{error}</div>}
      {!error && helperText && <div id={helpId} className="ui-field__help">{helperText}</div>}
    </div>
  )
}
