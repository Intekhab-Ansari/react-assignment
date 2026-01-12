import { useEffect, useState } from "react";
import type { Artwork } from "../type/artWork";

const page_size = 12;

export function useArtWorks(page:number){
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);

        fetch(`https://api.artic.edu/api/v1/artworks?page=${page+1}&limit=${page_size}`)
            .then(res => res.json())
            .then(result =>{
                setArtworks(result.data)
                setTotal(result.pagination.total);
            })
            .finally(()=>setLoading(false));
    },[page]);
    return{artworks,total,loading,page_size};
}

// seperat api fetch so code get clean and easy to understand