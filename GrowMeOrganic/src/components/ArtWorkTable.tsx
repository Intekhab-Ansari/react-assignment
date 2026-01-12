import type { Artwork } from "../type/artWork";
import { DataTable, type DataTableSelectionMultipleChangeEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

interface Props {
  data: Artwork[];
  total: number;
  page: number;
  rows: number;
  loading: boolean;
  selectedIds: Set<number>;
  onPageChange: (page: number) => void;
  onSelectionUpdate: (ids: Set<number>) => void;
}

export function ArtWorkTable({
  data,
  total,
  page,
  rows,
  loading,
  selectedIds,
  onPageChange,
  onSelectionUpdate,
}: Props) {
  const selectedRows = data.filter(item => selectedIds.has(item.id));

  // for n number of page
  const overlayRef = useRef<OverlayPanel | null>(null);
  const [selectCount, setSelectCount] = useState<number | null>(null);

  const handleSelectionChange = (e: DataTableSelectionMultipleChangeEvent<Artwork[]>) => {
    const updated = new Set(selectedIds);

    // Add selected rows
    e.value.forEach(row => {
      updated.add(row.id);
    });

    // Remove deselected rows 
    data.forEach((row) => {
      const stillSelected = e.value.some((s) => s.id === row.id);
      if (!stillSelected) {
        updated.delete(row.id);
      }
    });
    onSelectionUpdate(updated)
  };

  // for arrow 
  const applySelectN = () => {
    if (!selectCount || selectCount <= 0) return;

    const updated = new Set(selectedIds);

    data.slice(0, selectCount).forEach((item) => updated.add(item.id));

    onSelectionUpdate(updated);
    // close panel and reset input
    overlayRef.current?.hide();
    setSelectCount(null);
  };

  const titleHeader = (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {/* small button that looks like the down-arrow in demo */}
      <Button
        type="button"
        icon="pi pi-chevron-down"
        className="p-button-text p-button-plain"
        onClick={(e) => overlayRef.current?.toggle(e)}
        aria-haspopup
        aria-controls="select-multiple-panel"
        style={{ marginRight: 4, padding: "0.375rem" }}
      />
      <span>TITLE</span>

      {/* OverlayPanel placed next to header button */}
      <OverlayPanel
        ref={overlayRef}
        id="select-multiple-panel"
        style={{ width: 320 }}
        className="p-shadow-5"
      >
        <div style={{ padding: 12 }}>
          <h4 style={{ margin: "0 0 8px 0" }}>Select Multiple Rows</h4>
          <div style={{ fontSize: 13, marginBottom: 10 }}>
            Enter number of rows to select from the <strong>current page</strong>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <InputNumber
              value={selectCount ?? undefined}
              onChange={(e) => setSelectCount(Number(e.value))}
              min={1}
              max={data.length}
              placeholder={`e.g., 2`}
              showButtons
              inputStyle={{ width: 100 }}
            />

            <Button
              label="Select"
              onClick={applySelectN}
              disabled={!selectCount || selectCount < 1}
            />
          </div>
        </div>
      </OverlayPanel>
    </div>
  );

  return (
    <div className="card">
      <DataTable
        value={data}
        paginator
        lazy
        loading={loading}
        rows={rows}
        totalRecords={total}
        first={page * rows}
        onPage={(e) => onPageChange(e.page ?? 0)}
        dataKey="id"
        selectionMode="multiple"
        selection={selectedRows}
        onSelectionChange={handleSelectionChange}

        
        // footer
        paginatorTemplate={{
          layout: "CurrentPageReport PrevPageLink PageLinks NextPageLink",

          CurrentPageReport: (o) => (
            <span style={{ marginRight: "auto" }}>
              Showing {o.first} to {o.last} of {o.totalRecords} entries
            </span>
          ),
        }}
        pageLinkSize={5}
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem " }} bodyStyle={{ textAlign: "center" }} />
        <Column field="title" header={titleHeader} />
        <Column field="place_of_origin" header="PLACE OF ORIGIN" />
        <Column field="artist_display" header="ARTIST" />
        <Column field="inscriptions" header="INCRIPTIONS" />
        <Column field="date_start" header="START DATE" />
        <Column field="date_end" header="END DATE" />
      </DataTable>
    </div>
  );
}
