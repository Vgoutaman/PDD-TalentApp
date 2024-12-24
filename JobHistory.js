import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { API_URL } from './config';

const JobHistory = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${API_URL}/getJobs.php`);
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success') {
          setJobs(data.data);
        } else {
          setErrorMessage(data.message || 'Failed to fetch jobs.');
        }
      } else {
        setErrorMessage('Failed to fetch jobs. Server returned an error.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while fetching jobs.');
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderJob = ({ item }) => (
    <TouchableOpacity style={styles.jobContainer}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.companyName}>{item.company_name}</Text>
      <Text style={styles.location}>{`Location: ${item.job_location}`}</Text>
      <Text style={styles.requiredSkills}>{`Skills: ${item.skills}`}</Text>
      <Text style={styles.experienceLevel}>{`Experience: ${item.level}`}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../assets/homepagebackground.jpg')} // Same background as the previous screen
      style={styles.container}
      resizeMode="cover"
    >
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={jobs}
          renderItem={renderJob}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.errorText}>No jobs posted yet.</Text>}
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  jobContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  jobTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  companyName: { fontSize: 16, color: '#555', marginVertical: 5 },
  location: { fontSize: 14, color: '#777' },
  requiredSkills: { fontSize: 14, color: '#777' },
  experienceLevel: { fontSize: 14, color: '#777' },
  errorText: { fontSize: 16, color: 'red', textAlign: 'center', marginTop: 20 },
});

export default JobHistory;
