import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ChatScreen = ({ route, navigation }) => {
  const candidate = route?.params?.candidate || {
    name: 'Unknown Candidate',
    profilePicture: 'https://via.placeholder.com/40',
  };

  const profilePicture = candidate?.profilePicture;

  // Messages state
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi, I’m interested in your profile!', sender: 'user', timestamp: '10:00 AM', date: 'Today' },
    { id: '2', text: 'Thank you! Let me know how I can assist.', sender: 'candidate', timestamp: '10:01 AM', date: 'Today' },
  ]);

  // New message state
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const messageTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const messageDate = new Date().toDateString() === new Date().toDateString() ? 'Today' : 'Yesterday';

    setMessages([
      ...messages,
      {
        id: (messages.length + 1).toString(),
        text: newMessage,
        sender: 'user',
        timestamp: messageTimestamp,
        date: messageDate,
      },
    ]);

    setNewMessage('');
  };

  const renderMessage = ({ item, index }) => {
    const isUser = item.sender === 'user';
    const showDateHeader = index === 0 || messages[index - 1]?.date !== item.date;

    return (
      <>
        {showDateHeader && (
          <View style={styles.dateHeader}>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        )}
        <View style={[styles.messageRow, isUser ? styles.userRow : styles.candidateRow]}>
          {!isUser && <Image source={{ uri: profilePicture }} style={styles.chatProfilePicture} />}
          <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.candidateMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ChatBoxScreen')}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        <Text style={styles.contactName}>{candidate.name}</Text>
        <MaterialIcons name="more-vert" size={24} color="#fff" style={styles.moreIcon} />
      </View>

      {/* Chat History */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatHistory}
        inverted
      />

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="emoji-emotions" size={24} color="#888" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={sendMessage}>
          <MaterialIcons
            name={newMessage.trim() === '' ? 'mic' : 'send'}
            size={24}
            color="#075E54"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECE5DD',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#075E54',
    padding: 10,
    height: 60,
  },
  backButton: {
    marginRight: 10,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  contactName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  moreIcon: {
    marginLeft: 10,
  },
  chatHistory: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  dateHeader: {
    alignSelf: 'center',
    backgroundColor: '#DCF8C6',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginVertical: 8,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  candidateRow: {
    justifyContent: 'flex-start',
  },
  chatProfilePicture: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  messageContainer: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  candidateMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#ECE5DD',
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    marginHorizontal: 10,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
});

export default ChatScreen;
