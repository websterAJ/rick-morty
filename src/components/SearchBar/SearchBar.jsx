export default function SearchBar(props) {
   return (
      <div class="flex justify-center items-center">
        <div class="relative"> 
            <div class="absolute top-4 left-3">
                 <i class="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
            </div>
            <input type='search' class="h-14 w-96 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none" placeholder=""/>
            <div class="absolute top-2 right-2">
                <button class="h-10 w-20 text-white rounded-lg bg-red-500 hover:bg-red-600" onClick={props.onSearch}>Agregar</button>
            </div>
        </div>
      </div>
      
   );
}