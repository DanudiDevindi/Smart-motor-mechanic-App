import React from 'react';
import { Text, View, Image } from 'react-native';
import imgUrl from '../../api/imageURL';
import Chat from '../../component/Chat'

const ChatScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { name } = route.params;
  const { image } = route.params;
  console.log(item)
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20}}>
        <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: imgUrl + image }} />
        <Text style={{ color: 'black', marginLeft: 20, fontSize: 25 }}>{name}</Text>
        
      </View>
      <Chat
              serviceProviderID={item.serviceProvider.id}
              serviceProviderName={item.serviceProvider.name}
              serviceProviderImage={item.serviceProvider.image}
              userId={item.user.id}
              userName={item.user.name}
              userImage={item.user.image}
            />
      <View style={{ marginTop: 30 }} />
    </View>
  )
}

export default ChatScreen;