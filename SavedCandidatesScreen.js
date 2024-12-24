import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SavedCandidatesScreen = () => {
  const route = useRoute();
  const { savedCandidates } = route.params || [];

  const handleViewProfile = (candidate) => {
    // Logic to navigate to candidate profile screen
  };

  const handleChat = (candidate) => {
    // Logic to navigate to chat screen
  };

  const renderSavedCandidate = ({ item }) => (
    <View style={styles.card}>
      {/* Profile Image */}
      <Image source={{ uri: item.profileImage }} style={styles.profileImage} />

      {/* Candidate Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.experience}>{item.experience}</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, styles.viewButton]}
            onPress={() => handleViewProfile(item)}
          >
            <MaterialIcons name="visibility" size={16} color="#FFF" />
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.messageButton]}
            onPress={() => handleChat(item)}
          >
            <MaterialIcons name="chat" size={16} color="#FFF" />
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {savedCandidates && savedCandidates.length > 0 ? (
        <FlatList
          data={savedCandidates}
          renderItem={renderSavedCandidate}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noSavedMessage}>No saved candidates yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 12,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  experience: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  viewButton: {
    backgroundColor: '#4CAF50',
  },
  messageButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  noSavedMessage: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SavedCandidatesScreen;
