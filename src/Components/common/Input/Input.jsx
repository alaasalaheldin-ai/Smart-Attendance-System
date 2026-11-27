import FormField from '../FormField/FormField'
import './Input.css'

export default function Input({
  id, label, error, helperText, required, className = '',
  type = 'text',
  ...rest // name, value, onChange, placeholder, disabled ...
}) {
  return (
    <FormField id={id} label={label} error={error} helperText={helperText} required={required} className={className}>
      {(field) => (
        <input {...rest} {...field} type={type} className={`form-control ui-input${error ? ' is-invalid' : ''}`} />
      )}
    </FormField>
  )
}
