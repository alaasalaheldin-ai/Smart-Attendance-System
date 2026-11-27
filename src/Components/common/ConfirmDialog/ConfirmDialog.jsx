import Modal from '../Modal/Modal'
import Button from '../Button/Button'
import './ConfirmDialog.css'

export default function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  loading = false,
  confirmLabel = 'تأكيد',
  cancelLabel = 'إلغاء',
  variant = 'danger',
}) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
      size="small"
      dismissible={!loading}
      footer={
        <>
          {/* الـ focus يبدأ على إلغاء عشان Enter ميمسحش بالغلط */}
          <Button variant="outline" onClick={onCancel} disabled={loading} data-autofocus>{cancelLabel}</Button>
          <Button variant={variant} onClick={onConfirm} loading={loading}>{confirmLabel}</Button>
        </>
      }
    >
      <p className="ui-confirm__message">{message}</p>
    </Modal>
  )
}
