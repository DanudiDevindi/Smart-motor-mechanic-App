import Firebase from './firebaseSDK';


export const AddUser=async(name,email,image,uid)=>{
    console.log("name "+name+" email "+email+ " uid "+uid)
    try{
        return await Firebase.database().ref('users/ '+uid).set({
            name:name,
            email:email,
            image:image,
            position:'Software Engineer'
        })
    }catch(error){
        return error;
    }
}