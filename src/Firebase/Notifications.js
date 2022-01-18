import Firebase from './firebaseSDK';
// import database from '@react-native-firebase/database';

export const SendNotification=async(userId,userName,title,category)=>{
    console.log("Notication")
    try{
        return await Firebase
        .database()
        .ref('notifications/'+ category)
        // .child(serviceProviderID)
        .push({
            userID:userId,
            userName:userName,
            title:title,
            category:category            
        })
    }catch(error){
        return error;
    }
}

// export const ReceiveNotification=async(serviceProviderID,serviceProviderName,userId,userName,title)=>{
//     try{
//         return await Firebase
//         .database()
//         .ref('notifications/'+ serviceProviderID)
//         .child(userId)
//         .push({
//             userID:userId,
//             userName:userName,
//             serviceProviderID:serviceProviderID,
//             serviceProviderName:serviceProviderName,
//             title:title
//         })
//     }catch(error){
//         return error;
//     }
// }