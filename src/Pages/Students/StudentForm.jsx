import { useState } from 'react'
import Input from '../../Components/common/Input/Input'
import Select from '../../Components/common/Select/Select'

const EMPTY = { name: '', code: '', year: '', major: '', email: '' }

const CODE_LENGTH = 14    //زي الكود بتاعنا 

// to english
const toEnglishDigits = (text) => text.replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))

// للربط
export default function StudentForm({ id, initial, takenCodes, yearOptions, majorOptions, onSubmit }) {
  const [values, setValues] = useState(initial ?? EMPTY)
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
    setErrors({ ...errors, [name]: undefined })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const clean = {
      ...values,
      name: values.name.trim().replace(/\s+/g, ' '),
      code: toEnglishDigits(values.code.trim()),
      email: values.email.trim(),
    }
    const next = {}
    if (!clean.name) next.name = 'اكتب اسم الطالب'
    else if (clean.name.split(' ').length < 2) next.name = 'الاسم لازم يكون ثنائي على الأقل'
    if (!clean.code) next.code = 'اكتب الكود الجامعي'
    else if (!new RegExp(`^\\d{${CODE_LENGTH}}$`).test(clean.code)) next.code = `الكود الجامعي لازم يكون ${CODE_LENGTH} رقم`
    else if (takenCodes.includes(clean.code)) next.code = 'الكود ده متسجل لطالب تاني'
    if (!clean.year) next.year = 'اختار الفرقة'
    if (!clean.major) next.major = 'اختار التخصص'
    if (clean.email && !/^\S+@\S+\.\S+$/.test(clean.email)) next.email = 'الإيميل مش مكتوب صح'
    setErrors(next)
    if (Object.keys(next).length === 0) onSubmit(clean)
  }

  return (
    <form id={id} onSubmit={handleSubmit} noValidate>
      <Input label="الاسم الكامل" name="name" value={values.name} onChange={handleChange} error={errors.name} required data-autofocus />
      <Input label="الكود الجامعي" name="code" value={values.code} onChange={handleChange} error={errors.code} required dir="ltr" inputMode="numeric" placeholder="20412029502147" />
      <div className="row g-2">
        <div className="col-sm-6">
          <Select label="الفرقة" name="year" options={yearOptions} placeholder="اختار الفرقة" value={values.year} onChange={handleChange} error={errors.year} required />
        </div>
        <div className="col-sm-6">
          <Select label="التخصص" name="major" options={majorOptions} placeholder="اختار التخصص" value={values.major} onChange={handleChange} error={errors.major} required />
        </div>
      </div>
      <Input label="الإيميل" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} helperText="اختياري" dir="ltr" />
    </form>
  )
}
