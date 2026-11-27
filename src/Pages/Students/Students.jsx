import { useState } from 'react'
import Button from '../../Components/common/Button/Button'
import ConfirmDialog from '../../Components/common/ConfirmDialog/ConfirmDialog'
import DataTable from '../../Components/common/DataTable/DataTable'
import Modal from '../../Components/common/Modal/Modal'
import PageHeader from '../../Components/common/PageHeader/PageHeader'
import SearchInput from '../../Components/common/SearchInput/SearchInput'
import Select from '../../Components/common/Select/Select'
import StatusBadge from '../../Components/common/StatusBadge/StatusBadge'
import StudentForm from './StudentForm'
import { mockStudents } from './mockStudents'

const YEARS = ['1', '2', '3', '4'].map((y) => ({ value: y, label: y }))
const MAJORS = ['عام', 'حاسب', 'رياضيات'].map((m) => ({ value: m, label: m }))

const COLUMNS = [
  { key: 'name', header: 'الطالب' },
  { key: 'code', header: 'الكود الجامعي' },
  { key: 'year', header: 'الفرقة' },
  { key: 'major', header: 'التخصص' },
  { key: 'email', header: 'الإيميل' },
  { key: 'status', header: 'الحالة', render: (s) => <StatusBadge status={s.status} /> },
]

export default function Students() {
  const [students, setStudents] = useState(mockStudents)
  const [search, setSearch] = useState('')
  const [major, setMajor] = useState('')
  const [editing, setEditing] = useState(null) // null: مقفول، {}: طالب جديد
  const [deleting, setDeleting] = useState(null)

  const query = search.trim().toLowerCase()
  const visible = students.filter((s) =>
    (!major || s.major === major) &&
    (s.name.includes(query) || s.code.toLowerCase().includes(query)))

  function handleSave(values) {
    setStudents(editing?.id
      ? students.map((s) => (s.id === editing?.id ? { ...s, ...values } : s))
      : [...students, { ...values, id: Date.now(), status: 'active' }])
    setEditing(null)
  }

  function handleDelete() {
    setStudents(students.filter((s) => s.id !== deleting?.id))
    setDeleting(null)
  }

  return (
    <div className="students">
      <PageHeader
        title="الطلاب"
        description={`${students.length} طالب`}
        actions={<Button onClick={() => setEditing({})}><i className="bi bi-plus-lg" aria-hidden="true" />إضافة طالب</Button>}
      />

      <div className="row g-2">
        <div className="col-md-8">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
            placeholder="ابحث بالاسم أو الكود الجامعي"
          />
        </div>
        <div className="col-md-4">
          <Select aria-label="التخصص" options={MAJORS} placeholder="كل التخصصات" value={major} onChange={(e) => setMajor(e.target.value)} />
        </div>
      </div>

      <DataTable
        caption="قائمة الطلاب"
        columns={COLUMNS}
        data={visible}
        emptyMessage="مفيش طلاب مطابقين"
        rowActions={(s) => (
          <>
            <Button variant="outline" size="small" onClick={() => setEditing(s)} aria-label={`تعديل ${s.name}`}>تعديل</Button>
            <Button variant="danger" size="small" onClick={() => setDeleting(s)} aria-label={`حذف ${s.name}`}>حذف</Button>
          </>
        )}
      />

      <Modal
        open={editing !== null}
        title={editing?.id ? 'تعديل طالب' : 'إضافة طالب'}
        onClose={() => setEditing(null)}
        footer={
          <>
            <Button variant="outline" onClick={() => setEditing(null)}>إلغاء</Button>
            <Button type="submit" form="student-form">حفظ الطالب</Button>
          </>
        }
      >
        <StudentForm
          id="student-form"
          initial={editing?.id ? editing : null}
          takenCodes={students.filter((s) => s.id !== editing?.id).map((s) => s.code)}
          yearOptions={YEARS}
          majorOptions={MAJORS}
          onSubmit={handleSave}
        />
      </Modal>

      <ConfirmDialog
        open={deleting !== null}
        title="حذف طالب"
        message={`متأكد إنك عايز تحذف ${deleting?.name ?? ''}؟`}
        confirmLabel="حذف"
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  )
}
