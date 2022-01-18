import Firebase from './firebaseSDK';
// import database from '@react-native-firebase/database';

export const SenderMessage=async(serviceProviderID,serviceProviderName,serviceProviderImage,userId,userName,userImage,message)=>{
    try{
        return await Firebase.
        database().
        ref('messages/'+ userId).
        child(serviceProviderID).
        push({
            user:{
                id:userId,
                name:userName,
                image:userImage
            },
            serviseProvider:{
                id:serviceProviderID,
                name:serviceProviderName,
                image:serviceProviderImage
            },
            msg:message
        })
    }catch(error){
        return error;
    }
}

export const ReceiverMessage=async(serviceProviderID,serviceProviderName,serviceProviderImage,userId,userName,userImage,message)=>{
    try{
        return await Firebase.
        database().
        ref('messages/'+ serviceProviderID).
        child(userId).
        push({
            user:{
                id:userId,
                name:userName,
                image:userImage
            },
            serviseProvider:{
                id:serviceProviderID,
                name:serviceProviderName,
                image:serviceProviderImage
            },
            msg:message
        })
        // push({
        //     currentUID:uid,
        //     guestUID:senderID,
        //     message:{
        //         msg:message,
        //         guestName:name,
        //         guestImage:image
        //     }
        // })
    }catch(error){
        return error;
    }
}