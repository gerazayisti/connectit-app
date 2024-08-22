import { supabase } from "../lib/supabase";
import { uploadFile } from "./imageService";

export const creatorUpdatePost = async (post) => {
try {
    //chargement d'image
    if(post.file && typeof post.file=='object'){
        let isImage= post?.file?.type=='image';
        let FolderName= isImage? 'PostImage': 'PostVideo';
        let fileResult= await uploadFile(FolderName, post?.file?.uri, isImage);
        if(fileResult.success){
            post.file= fileResult.data;
        }else{
            return fileResult;
        }

    }

    const {data,error}= await supabase
    .from('post')
    .upsert(post)
    .select('*')
    .single();
    if(error){
        return {success: false, msg: 'Nous ne pouvons pas creer votre post', error};
    }
    return {success: true, data:data};
    
} catch (error) {
    console.log('creationPost error', error);
    return { success: false, msg: 'Nous ne pouvons creer votre Post connexion surrement', error};
}
}

export const fetchPost=async(limit=10)=>{
    try {
        const {data,error}=await supabase
        .from ('post')
        .select(`
        *,
        user:users (id, name, image)
    `)
        .order('created_at',{ascending:false})
        .limit(limit);

        if(error){
            console.log("fetchpost error: ", error)
            return{success:false, msg:"imposte de colleter les post"};
        }

        return{success:true, data};
    } catch (error) {
        console.log("fetchpost error: ", error)
        return{success:false, msg:"imposte de colleter les post"};
    }
}