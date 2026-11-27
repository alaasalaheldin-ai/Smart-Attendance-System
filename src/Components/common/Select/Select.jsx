import FormField from '../FormField/FormField'
import './Select.css'

// options: [{ value, label, disabled? }]
export default function Select({
  id, label, error, helperText, required, className = '',
  options = [],
  placeholder,
  ...rest // name, value, onChange, disabled, aria-label ...
}) {
  return (
    <FormField id={id} label={label} error={error} helperText={helperText} required={required} className={className}>
      {(field) => (
        <select {...rest} {...field} className={`form-select ui-select${error ? ' is-invalid' : ''}`}>
          {/* لو الحقل مطلوب مينفعش يرجع للـ placeholder، ولو فلتر ينفع */}
          {placeholder && <option value="" disabled={required}>{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
          ))}
        </select>
      )}
    </FormField>
  )
}
