import React from 'react'

function useProyectos() {
  
    const proyectos = [
      {
        name : "Serpiente",
        short_description : "Producción del beat de la canción serpiente de Wide P, JLop y Sane.",
        image : "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/b0/0e/c7/b00ec770-050f-d37b-d526-2828b9ae457b/artwork.jpg/1200x1200bf-60.jpg",
        url : "https://www.youtube.com/watch?v=-olYAGm35Bc",
      },
      {
        name: "33/19 (Remix)",
        short_description: "Producción del remix de 33/19, de Wide P.",
        image: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/7a/49/18/7a491804-bc22-f8db-d5de-18e200711b41/artwork.jpg/1200x1200bb.jpg", 
        url : "https://www.youtube.com/watch?v=FwfgPvu6Q3k"
      },
      {
        name: "Gunship",
        short_description: "Producción de dos canciones del EP Gunship de JLop.",
        image:"https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/c8/a1/0c/c8a10c5c-02d8-670b-dac4-85fed2765a5d/artwork.jpg/486x486bb.png",
        url : "https://www.youtube.com/watch?v=4Yw9Y4n5GpA"
      },
      {
        name: "CNI",
        short_description: "Producción del single CNI de Wide P.",
        image: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/96/ea/18/96ea187b-8524-5dff-d2ce-a3b0f0248a96/artwork.jpg/1200x1200bb.jpg",
        url: "https://www.youtube.com/watch?v=NVjWHqfIGO4"
      },
      {
        name: "Muerto en vida",
        short_description: "Producción del single Muerto en Vida de Percless.",
        image: "https://i1.sndcdn.com/artworks-2zB8wDqzCMsU-0-t500x500.png",
        url: "https://www.youtube.com/watch?v=Plmtidd0lD0"
      },
      {
        name: "Angels (Remix)",
        short_description: "Producción del remix de Angels, single de Wide P, JLop y Sane.",
        image: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/3a/2c/de/3a2cde06-042d-82a9-d511-4f7d5f6ad55b/artwork.jpg/1200x1200bb.jpg",
        url: "https://www.youtube.com/watch?v=kKne-or3P14"

      }
    ]
  
  
    return [proyectos]
}

export default useProyectos