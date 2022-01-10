import React, {useState, useRef, useCallback, useEffect} from 'react';
import ReactDOM from 'react-dom';
import useArticleSearch from './useArticleSearch';

function Select2() {
    const [query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [openList, setOpenList] = useState(false);
    const [activeId, setActiveId] = useState(0);

    const {articles, hasMore, loading, error} = useArticleSearch(query, pageNumber);
    const wrapper = useRef();

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if(openList && wrapper.current && !wrapper.current.contains(e.target)){
               setOpenList(false);
            }
        };
        document.addEventListener("click",checkIfClickedOutside);
        return () => {
            document.removeEventListener("click",checkIfClickedOutside);
        };
    }, [openList])
    const observer = useRef();
    const lastArticle = useCallback((node) => {
        if (loading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPage => prevPage +1)
            }
        });
        if(node) observer.current.observe(node);
        // console.log(node)
    },[loading, hasMore]);

    const articleList = articles && articles.map( (article , index) => {
        if(articles.length === index+1){
            return (
                <li key={article.id} ref={lastArticle}  className={activeId === article.id ? "active list-group-item list-group-item-action" : "list-group-item list-group-item-action"}  onClick={(e) => handleSelect(e, article.id)}>
                {article.title}
                </li>
            );
        } else {
            return (
            <li className={activeId === article.id ? "active list-group-item list-group-item-action" : "list-group-item list-group-item-action"} key={article.id} onClick={(e) => handleSelect(e, article.id)}>
                {article.title}
            </li>
            );
        }
    });

    const handleSearch = (e) =>{
        setQuery(e.target.value)
        setPageNumber(1)
    }

    const handleSelect = (e, id) => {
        e.preventDefault();
        setActiveId(id);
        setQuery(e.target.textContent)
        // console.log(e.target.textContent)
    }
    return (
        <div className="container" >
            <div className="row justify-content-center">
            <h1>Custom Select 2 with Searchable and infinite scroll</h1>
                <div className="col-md-8">
                    <div className="card p-2" ref={wrapper}>
                        <div className="card-body">
                            <div className="form-group">
                                <input type="text" className="form-control" id="exampleFormControlInput1" onChange={handleSearch} onFocus={() => setOpenList(true)}
                                value={query} placeholder="Select  Title"></input>
                            </div>
                            {openList && <ul className="list-group" >
                            {articleList}

                            </ul>
                            }
                            <div>{openList && loading && <h4 className="text-center mt-2">Loading....</h4>}</div>
                            <div>{openList && error && error}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Select2;

if (document.getElementById('root')) {
    ReactDOM.render(<Select2 />, document.getElementById('root'));
}
