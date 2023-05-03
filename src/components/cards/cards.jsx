import React from 'react';
import Card from '../card/card';

export default function Cards({characters}) {
   //mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8
   return (
      <div class="text-center tracking-wide grid grid-cols-3 gap-6">
         {
            characters.map(items=>(
               <Card
                  key={items.id}
                  id={items.id}
                  onClose={() => window.alert('Emulamos que se cierra la card')}
                  name={items.name}
                  status={items.status}
                  species={items.species}
                  gender={items.gender}
                  origin={items.origin.name}
                  image={items.image} /> 
            ))
         }
      </div>
   );
}