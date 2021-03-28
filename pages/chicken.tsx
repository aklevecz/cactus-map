 import * as contentful from "contentful"
import { useEffect, useState } from "react";
 
 export async function getStaticProps(context) {
console.log(context)
    return {
          props: {space: process.env.SPACE_ID, accessToken:process.env.CONTENTFUL_API_KEY}
      }
 }
 
 const Chicken =({space, accessToken}) => {
     const [imgSrc, setImgSrc] = useState("")
     useEffect(() => {
        const client = contentful.createClient({
            space,
            accessToken
          });
          client.getEntries().then(e => {
              setImgSrc((e.items[0].fields as any).img.fields.file.url);
          })
     },[])
    return (<div><img src={imgSrc}/></div>)
 }

export default Chicken