import { useId, useLayoutEffect, useRef } from 'react'
import './Modal.css'

// <dialog> الأصلي: بيحبس الـ focus جواه، و Esc بيقفله، وبيرجع الـ focus بعد القفل
function ModalDialog({ title, children, footer, onClose, size, dismissible }) {
  const dialogRef = useRef(null)
  const titleId = useId()

  // useLayoutEffect عشان close() يتنفذ والعنصر لسه في الصفحة، فالـ focus يرجع صح
  useLayoutEffect(() => {
    const dialog = dialogRef.current
    dialog.showModal()
    dialog.querySelector('[data-autofocus]')?.focus()
    return () => dialog.close()
  }, [])

  function handleCancel(e) {
    e.preventDefault() // القفل بيتم من خلال open بس
    if (dismissible) onClose()
  }

  // Chromium ممكن يقفل الـ dialog من غير cancel لو Esc اتضغط مرتين
  function handleNativeClose(e) {
    if (e.target.open || !e.target.isConnected) return
    if (dismissible) onClose()
    else e.target.showModal()
  }

  return (
    <dialog
      ref={dialogRef}
      className={`ui-modal ui-modal--${size}`}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onClose={handleNativeClose}
      onMouseDown={(e) => { if (e.target === e.currentTarget && dismissible) onClose() }}
    >
      <div className="ui-modal__content">
        <div className="ui-modal__header">
          <h2 id={titleId} className="ui-modal__title">{title}</h2>
          <button type="button" className="btn-close" onClick={onClose} disabled={!dismissible} aria-label="إغلاق" />
        </div>
        <div className="ui-modal__body">{children}</div>
        {footer && <div className="ui-modal__footer">{footer}</div>}
      </div>
    </dialog>
  )
}

export default function Modal({ open, size = 'medium', dismissible = true, ...props }) {
  if (!open) return null
  return <ModalDialog size={size} dismissible={dismissible} {...props} />
}
