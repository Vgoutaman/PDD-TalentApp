import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const GeneratedCandidatesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { candidates } = route.params || {}; // Get the generated candidates

  const handleProfileClick = (candidate) => {
    const userId = candidate.user_id; // Ensure this is correctly referencing the user_id
    navigation.navigate('CandidateDetailsScreen', {
      userId: userId,
    });
  };

  const handleSaveClick = (candidate) => {
    Alert.alert('Saved', `You have saved ${candidate.Name}`);
  };

  const handleChatClick = (candidate) => {
    Alert.alert('Chat', `Starting chat with ${candidate.Name}`);
  };

  const renderCandidate = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => handleProfileClick(item)} style={styles.profileContainer}>
        <Text style={styles.name}>{item['Name']}</Text>
        <Text style={styles.details}>{item['Job Title']}</Text>
        <Text style={styles.location}>{item['Location']}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={() => handleSaveClick(item)}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatButton} onPress={() => handleChatClick(item)}>
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground source={require('../assets/homepagebackground.jpg')} style={styles.container}>
      {candidates && candidates.length > 0 ? (
        <FlatList
          data={candidates}
          renderItem={renderCandidate}
          keyExtractor={(item) => item.user_id.toString()}
        />
      ) : (
        <Text style={styles.noCandidatesText}>No candidates found.</Text>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 12,
    backgroundColor: '#f4f4f4',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  profileContainer: {
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
  location: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  chatButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  noCandidatesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});

export default GeneratedCandidatesScreen;