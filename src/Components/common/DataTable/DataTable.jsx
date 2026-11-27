import EmptyState from '../EmptyState/EmptyState'
import LoadingState from '../LoadingState/LoadingState'
import './DataTable.css'

// columns: [{ key, header, render?(row), className? }]
export default function DataTable({
  columns,
  data = [],
  rowKey = 'id', // اسم الخاصية أو function(row)
  loading = false,
  loadingMessage,
  emptyMessage = 'لا توجد بيانات',
  rowActions, // function(row)
  actionsHeader = 'إجراءات',
  rowClassName, // function(row)
  caption,
}) {
  if (loading) return <div className="ui-table"><LoadingState message={loadingMessage} /></div>
  if (data.length === 0) return <div className="ui-table"><EmptyState title={emptyMessage} /></div>

  const getKey = typeof rowKey === 'function' ? rowKey : (row) => row[rowKey]

  return (
    <div className="ui-table table-responsive">
      <table className="table table-hover align-middle mb-0">
        {caption && <caption className="visually-hidden">{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => <th key={c.key} scope="col" className={c.className}>{c.header}</th>)}
            {rowActions && <th scope="col">{actionsHeader}</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={getKey(row)} className={rowClassName?.(row)}>
              {columns.map((c) => (
                <td key={c.key} className={c.className}>
                  {c.render ? c.render(row) : (row[c.key] ?? '') === '' ? '—' : row[c.key]}
                </td>
              ))}
              {rowActions && <td><div className="ui-table__actions">{rowActions(row)}</div></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
