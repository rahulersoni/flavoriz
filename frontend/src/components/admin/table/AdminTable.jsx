import TableBody from "./TableBody";
import TableEmpty from "./TableEmpty";
import TableHeader from "./TableHeader";

export default function AdminTable({
    data = [],
    columns = [],
    rowKey = "id",
    selectable = false,
    selectedIds = [],
    onToggleRow,
    onToggleAll,
    allSelected = false,
    sort,
    onSort,
    actions,
    emptyTitle,
    emptyDescription,
}) {
    return (
        <div className="w-full overflow-hidden rounded-[26px] border border-admin-border bg-admin-card shadow-admin dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
            <div className="w-full overflow-x-auto overflow-y-clip">
                <table className="w-full min-w-[900px] border-collapse">
                    <TableHeader
                        columns={columns}
                        selectable={selectable}
                        allSelected={allSelected}
                        onToggleAll={onToggleAll}
                        sort={sort}
                        onSort={onSort}
                    />

                    {data.length > 0 && (
                        <TableBody
                            data={data}
                            columns={columns}
                            rowKey={rowKey}
                            selectable={selectable}
                            selectedIds={selectedIds}
                            onToggleRow={onToggleRow}
                            actions={actions}
                        />
                    )}
                </table>

                {data.length === 0 && (
                    <TableEmpty title={emptyTitle} description={emptyDescription} />
                )}
            </div>
        </div>
    );
}