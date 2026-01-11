import type { Artwork } from "../type/ArtWork";
import {DataTable, type DataTableSelectionMultipleChangeEvent} from "primereact/datatable";
import { Column } from "primereact/column";

interface Props{
    data:Artwork[];
    total:number;
    page:number;
    rows:number;
    loading:boolean;
    selectedIds:Set<number>;
    onPageChange:(page:number)=>void;
    onSelectionUpdate:(ids:Set<number>) => void;
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
}: Props){
  const selectedRows = data.filter(item => selectedIds.has(item.id));

  const handleSelectionChange=(e:DataTableSelectionMultipleChangeEvent<Artwork[]>)=>{
    
    onSelectionUpdate(new Set(e.value.map(row =>row.id )));
  };

  return(
    <DataTable
      value={data}
      paginator
      lazy
      loading={loading}
      rows={rows}
      totalRecords={total}
      first={page*rows}
      onPage={(e)=>onPageChange(e.page ?? 0)}
      dataKey="id"
      selectionMode="multiple"
      selection={selectedRows}
      onSelectionChange={handleSelectionChange}
    >
      <Column selectionMode="multiple" headerStyle={{width:"3rem "}}/>
      <Column field="title" header="title" />
      <Column field="place_of_origin" header="Origin"/>
      <Column field="artist_display" header="Artist"/>
      <Column field="incriptions" header="Incriptions"/>
      <Column field="date_start" header="Start Year" />
      <Column field="date_end" header="End Year"/>
    </DataTable>
  );
}
