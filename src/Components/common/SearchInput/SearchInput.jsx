import { useRef } from 'react'
import './SearchInput.css'

export default function SearchInput({
  value,
  onChange,
  onClear, // اختياري: لو اتبعت يظهر زرار المسح
  placeholder = 'ابحث...',
  ariaLabel,
  className = '',
  ...rest
}) {
  const inputRef = useRef(null)

  function handleClear() {
    onClear()
    inputRef.current.focus()
  }

  return (
    <div className={`ui-search ${className}`}>
      <i className="bi bi-search ui-search__icon" aria-hidden="true" />
      <input
        {...rest}
        ref={inputRef}
        type="search"
        className="form-control ui-search__input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
      />
      {onClear && value && (
        <button type="button" className="ui-search__clear" onClick={handleClear} aria-label="مسح البحث">
          <i className="bi bi-x-lg" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
