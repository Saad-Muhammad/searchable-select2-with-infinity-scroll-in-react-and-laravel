import Axios from 'axios'
import {useEffect, useState} from 'react'

export default function useArticleSearch(query, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [articles, setArticles] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setArticles([])
    },[query])
    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        Axios({
            method: 'GET',
            url: `http://localhost:8000/articles?query=${query}&page=${pageNumber}`,
            // params: {query: query, page: pageNumber}
            cancelToken: new Axios.CancelToken(c => cancel = c)
        }).then(res => {
             console.log(res.data.data);
             setArticles((prevArticles) => [...new Set([...prevArticles, ...res.data.data])] );
             setHasMore(res.data.data.length > 0)
             setLoading(false)
        }).catch(e => {
            if (Axios.isCancel(e)) return;
            setError(true)
        })
        return () => cancel();
    }, [query, pageNumber])
    return {loading, error, articles,hasMore}
}
