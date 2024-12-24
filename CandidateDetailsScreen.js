import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { API_URL } from './config';

const CandidateDetailsScreen = ({ route }) => {
  const { userId } = route.params;  // Get userId passed from the previous screen
  console.log('Received userId:', userId);  // Debugging log

  const [profileData, setProfileData] = useState(null);

  // Fetch candidate data from the backend using the received userId
  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${API_URL}/getProfile.php?user_id=${userId}`);
      const data = await response.json();

      if (response.ok) {
        setProfileData(data);  // Save the fetched data to state
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch profile data');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while fetching profile data');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfileData();  // Fetch profile data when the component is mounted
    }
  }, [userId]);  // Trigger the fetch when userId changes

  if (!profileData) {
    return <Text>Loading...</Text>;  // Show loading message until data is fetched
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
     

      <Text style={styles.label}>Name</Text>
      <Text style={styles.text}>{profileData.Name || 'N/A'}</Text>

      <Text style={styles.label}>Location</Text>
      <Text style={styles.text}>{profileData.Location || 'N/A'}</Text>

      <Text style={styles.label}>Job Title</Text>
      <Text style={styles.text}>{profileData['Job Title'] || 'N/A'}</Text>

      <Text style={styles.label}>Portfolio</Text>
      <Text style={styles.text}>{profileData.Portfolio || 'N/A'}</Text>

      <Text style={styles.label}>Skills</Text>
      <Text style={styles.text}>{profileData.Skills || 'N/A'}</Text>

      <Text style={styles.label}>Experience</Text>
      <Text style={styles.text}>{profileData.Experience || 'N/A'}</Text>

      <Text style={styles.label}>Job History</Text>
      <Text style={styles.text}>{profileData['Job History'] || 'N/A'}</Text>

      <Text style={styles.label}>Social Media</Text>
      <Text style={styles.text}>{profileData['Social Media'] || 'N/A'}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f5f7',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#444',
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
});

export default CandidateDetailsScreen;
