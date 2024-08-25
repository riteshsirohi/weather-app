

// eslint-disable-next-line react/prop-types
export default function Search({Search, setSearch, handleSearch}){

     return(
        <div className="search-engine">
           <input 
           type="text" 
            placeholder="Enter city name"
            name="search"
            value={Search}
            onChange={(e)=> setSearch(e.target.value)}
           />
           <button onClick={handleSearch}> search</button>
        </div>
     )
}