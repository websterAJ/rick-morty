import React from 'react';

function Card({id,onClose,name,status,species,gender,origin,image}) {
    return (
       <div id={id} class="">
          <button onClick={onClose} class="">X</button>
          <div class="px-6 py-3">
             <h2 class="text-2xl font-semibold text-gray-800">{name}</h2>
          </div>
          <div class="py-4 px-6">
             <h2 class="py-2 text-lg text-gray-700">{status}</h2>
             <h2 class="py-2 text-lg text-gray-700">{species}</h2>
             <h2 class="py-2 text-lg text-gray-700">{gender}</h2>
             <h2 class="py-2 text-lg text-gray-700">{origin}</h2>
          </div>
          <div class="text-center">
             <img src={image}  class="h-56"/>
          </div>
       </div>
    );
 }

 export default Card;