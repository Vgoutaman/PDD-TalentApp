import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { API_URL } from './config';

const CandidateProfileScreen = ({ route }) => {
  const { candidateId, readOnly = false } = route.params || {};
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    job_title: '',
    portfolio: '',
    skills: '',
    experience: '',
    job_history: '',
    social_media: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch candidate data from backend
  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${API_URL}/getCandidateProfile.php?candidateId=${candidateId}`);
      const data = await response.json();
      if (response.ok) {
        setFormData({
          name: data.Name || '',
          location: data.Location || '',
          job_title: data['Job Title'] || '',
          portfolio: data.Portfolio || '',
          skills: data.Skills || '',
          experience: data.Experience || '',
          job_history: data['Job History'] || '',
          social_media: data['Social Media'] || '',
        });
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch profile data');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while fetching profile data');
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [candidateId]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/storeCandidateProfile.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, candidateId }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Profile saved successfully!');
        setIsEditing(false); // Switch back to view mode
        fetchProfileData(); // Refresh data
      } else {
        Alert.alert('Error', data.message || 'Failed to save profile');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while saving the profile');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Candidate Profile</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter full name"
        value={formData.name}
        onChangeText={(value) => handleInputChange('name', value)}
        editable={isEditing && !readOnly}
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={formData.location}
        onChangeText={(value) => handleInputChange('location', value)}
        editable={isEditing && !readOnly}
      />

      <Text style={styles.label}>Job Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter job title"
        value={formData.job_title}
        onChangeText={(value) => handleInputChange('job_title', value)}
        editable={isEditing && !readOnly}
      />

      <Text style={styles.label}>Portfolio</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter portfolio URL"
        value={formData.portfolio}
        onChangeText={(value) => handleInputChange('portfolio', value)}
        editable={isEditing && !readOnly}
      />

      <Text style={styles.label}>Skills</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter skills (comma-separated)"
        value={formData.skills}
        onChangeText={(value) => handleInputChange('skills', value)}
        editable={isEditing && !readOnly}
      />

      <Text style={styles.label}>Experience</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter years of experience"
        value={formData.experience}
        onChangeText={(value) => handleInputChange('experience', value)}
        editable={isEditing && !readOnly}
      />

      <Text style={styles.label}>Job History</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe job history"
        value={formData.job_history}
        onChangeText={(value) => handleInputChange('job_history', value)}
        editable={isEditing && !readOnly}
      />

      <Text style={styles.label}>Social Media</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter social media links"
        value={formData.social_media}
        onChangeText={(value) => handleInputChange('social_media', value)}
        editable={isEditing && !readOnly}
      />

      {!readOnly && (
        <TouchableOpacity
          style={styles.button}
          onPress={isEditing ? handleSubmit : () => setIsEditing(true)}
        >
          <Text style={styles.buttonText}>{isEditing ? 'Save Profile' : 'Edit Profile'}</Text>
        </TouchableOpacity>
      )}
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
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CandidateProfileScreen;
