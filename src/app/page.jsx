"use client"
import { useState } from "react"

export default function Home() {
  const [file , setFile] = useState(null)
  const [imageUrl , setImageUrl] = useState(null)

  return (
    <div className="bg-slate-500">
      <form onSubmit={async(e)=>{
        e.preventDefault();
        const formData =  new FormData();
        formData.append("image" , file)

        const resopnse = await fetch('/api/upload', {
          method:"POST",
          body: formData,
        
        })
        const data = await resopnse.json();
        console.log(data)
        setImageUrl(data.url)
      }}>
        <input type="file"  onChange={(e)=> {
          setFile(e.target.files[0])
        }}/>
        <button> Subir Archivo</button>
      </form>
      {
        imageUrl && (
          <img src={imageUrl} alt="imagen"/>
        )
      }
    </div>
  )
}
