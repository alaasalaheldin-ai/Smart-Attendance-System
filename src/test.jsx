import { useState } from "react";
import "./index.css";

// Common components
import Button from "./Components/common/Button/Button";
import Input from "./Components/common/Input/Input";
import SearchInput from "./Components/common/SearchInput/SearchInput";
import Select from "./Components/common/Select/Select";
import PageHeader from "./Components/common/PageHeader/PageHeader";
import StatusBadge from "./Components/common/StatusBadge/StatusBadge";
import FormField from "./Components/common/FormField/FormField";
import Modal from "./Components/common/Modal/Modal";
import DataTable from "./Components/common/DataTable/DataTable";
import EmptyState from "./Components/common/EmptyState/EmptyState";
import LoadingState from "./Components/common/LoadingState/LoadingState";
import ConfirmDialog from "./Components/common/ConfirmDialog/ConfirmDialog";

// Students module
import Students from "./Pages/Students/Students";
import StudentForm from "./Pages/Students/StudentForm";
import { mockStudents } from "./Pages/Students/mockStudents"; // أو default حسب التصدير

export default function TestSuite() {
  const [tab, setTab] = useState("common"); // "common" | "students" | "form"
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [q, setQ] = useState("");
  const [course, setCourse] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const [showLoadingState, setShowLoadingState] = useState(false);
  const [targetToDelete, setTargetToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const sampleRows = Array.isArray(mockStudents) && mockStudents.length
    ? mockStudents
    : [{ id: 1, name: "طالب تجريبي", status: "present" }];

  const handleSave = () => {
    if (!name.trim()) {
      setErrors({ name: "الاسم مطلوب" });
      return;
    }
    setErrors({});
    setSaving(true);
    setTimeout(() => setSaving(false), 500);
  };

  const handleConfirmDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      setTargetToDelete(null);
    }, 500);
  };

  return (
    <div style={{ padding: "24px", display: "grid", gap: "20px" }}>
      <div style={{ display: "flex", gap: "8px" }}>
        <Button
          variant={tab === "common" ? "primary" : "secondary"}
          onClick={() => setTab("common")}
        >
          Common Components
        </Button>
        <Button
          variant={tab === "students" ? "primary" : "secondary"}
          onClick={() => setTab("students")}
        >
          Students Page
        </Button>
        <Button
          variant={tab === "form" ? "primary" : "secondary"}
          onClick={() => setTab("form")}
        >
          StudentForm
        </Button>
      </div>

      {tab === "common" && (
        <div style={{ display: "grid", gap: "16px" }}>
          <PageHeader
            title="اختبار الكمبوننتس"
            description="تجربة العناصر المشتركة"
            actions={
              <Button variant="primary" onClick={() => setModalOpen(true)}>
                فتح Modal
              </Button>
            }
          />

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Button loading={saving} onClick={handleSave}>
              حفظ
            </Button>
            <StatusBadge status="present" />
            <Button onClick={() => setLoadingTable((v) => !v)}>
              تبديل تحميل الجدول
            </Button>
            <Button onClick={() => setShowEmpty((v) => !v)}>
              تبديل EmptyState
            </Button>
            <Button onClick={() => setShowLoadingState((v) => !v)}>
              تبديل LoadingState
            </Button>
          </div>

          <Input
            label="الاسم"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            required
          />

          <SearchInput
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onClear={() => setQ("")}
          />

          <Select
            label="المادة"
            options={[
              { value: "1", label: "قواعد البيانات" },
              { value: "2", label: "نظم التشغيل" },
            ]}
            placeholder="اختار المادة"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />

          <FormField label="ملاحظات" helperText="اختياري">
            {({ field }) => <textarea {...field} className="form-control" />}
          </FormField>

          {showLoadingState && <LoadingState message="جاري تحميل الطلاب..." />}

          {showEmpty ? (
            <EmptyState
              title="مفيش بيانات"
              description="لا توجد سجلات للعرض حالياً"
              icon="bi-calendar"
              action={<Button onClick={() => setShowEmpty(false)}>إعادة ضبط</Button>}
            />
          ) : (
            <DataTable
              columns={[{ key: "name", header: "الاسم" }]}
              data={sampleRows}
              loading={loadingTable}
              emptyMessage="مفيش بيانات"
              rowActions={(row) => (
                <Button size="small" onClick={() => setTargetToDelete(row)}>
                  حذف
                </Button>
              )}
            />
          )}

          <Modal
            open={modalOpen}
            title="نافذة تجريبية"
            size="medium"
            onClose={() => setModalOpen(false)}
            footer={<Button onClick={() => setModalOpen(false)}>إغلاق</Button>}
          >
            محتوى المودال التجريبي
          </Modal>

          <ConfirmDialog
            open={!!targetToDelete}
            title="تأكيد الحذف"
            message={`هل أنتِ متأكدة من حذف ${targetToDelete?.name ?? "العنصر"}؟`}
            loading={deleting}
            onConfirm={handleConfirmDelete}
            onCancel={() => setTargetToDelete(null)}
          />
        </div>
      )}

      {tab === "students" && <Students />}

      {tab === "form" && (
        <StudentForm
          onSubmit={(values) => console.log("StudentForm submit:", values)}
          onCancel={() => setTab("common")}
        />
      )}
    </div>
  );
}