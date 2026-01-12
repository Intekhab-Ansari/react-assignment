import { useState } from "react"
import { useArtWorks } from "./hooks/useArtWork";
import { ArtWorkTable } from "./components/ArtWorkTable";

const App = () => {

  const [page, setPage] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const{artworks, total, loading, page_size} = useArtWorks(page);

  return (
    <div style={{padding:24}}>
      <p style={{marginTop:10}}>
        Selected: {selectedIds.size} rows
      </p>

      

      <ArtWorkTable
        data={artworks}
        total={total}
        page={page}
        rows={page_size}
        loading={loading}
        selectedIds={selectedIds}
        onPageChange={setPage}
        onSelectionUpdate={setSelectedIds}
      />

      
    </div>
  )
}

export default App