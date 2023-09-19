import { NextResponse} from "next/server"
import {writeFile} from "fs/promises"
import path from "path"

import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'dlksgzxkt', 
  api_key: '229575442137766', 
  api_secret: 'xxwkL4NVA-tuqz5kYCjJpccnB5Q' 
});

export async function POST(request){
    const data = await request.formData();
    const image = data.get("image")

    if (!image){
        return NextResponse.json("no se ha subido ninguna imagen", {status:400})
    };
    const bytes = await  image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const response = await new Promise((resolve, reject)=>{
        cloudinary.uploader.upload_stream({},(err, result)=>{
            if(err){
                reject(err)
            };
            resolve(result)
        }).end(buffer)
    })


    return NextResponse.json({
        message:"imagen subida",
        url: response.secure_url
    })
}