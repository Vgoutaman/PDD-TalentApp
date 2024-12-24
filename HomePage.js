import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Animated,
  ImageBackground,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const suggestions = [
  { text: 'Discover top candidates in marketing', icon: 'work' },
  { text: 'Discover developers', icon: 'code' },
  { text: 'Discover designers', icon: 'brush' },
  { text: 'Find your next top hire', icon: 'star' },
];

const HomePage = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [fadeAnim]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ImageBackground
        source={require('../assets/homepagebackground.jpg')} // Ensure the image path is correct
        style={styles.container}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Dynamic Auto-Switching Container */}
          <View style={styles.dynamicContainer}>
            <Animated.View style={{ opacity: fadeAnim }}>
              <Icon
                name={suggestions[currentIndex].icon}
                size={36}
                color="#FFFFFF"
                style={styles.dynamicIcon}
              />
              <Text style={styles.dynamicText}>
                {suggestions[currentIndex].text}
              </Text>
            </Animated.View>
          </View>

          {/* Upcoming Events Section */}
          <View style={styles.eventsContainer}>
            <Text style={styles.sectionHeader}>Upcoming Events</Text>
            <TouchableOpacity
              style={styles.eventButton}
              onPress={() => navigation.navigate('EventDetailsScreen', { eventId: 1 })}
            >
              <Image
                source={require('../assets/homepagebuttons.jpg')}
                style={styles.buttonImage}
                resizeMode="cover"
              />
              <View style={styles.textOverlay}>
                <Text style={styles.eventTitle}>Webinar: Build a Strong Profile</Text>
                <Text style={styles.eventDate}>Nov 30, 2024</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* For You Section */}
          <View style={styles.forYouContainer}>
            <Text style={styles.sectionHeader}>For You</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={styles.forYouButton}
                onPress={() => navigation.navigate('SavedCandidatesScreen')}
              >
                <Image
                  source={require('../assets/savedcandidatebutton.png')}
                  style={styles.buttonImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.forYouButton}
                onPress={() => navigation.navigate('ChatBoxScreen')}
              >
                <Image
                  source={require('../assets/openchatbutton.png')}
                  style={styles.buttonImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.forYouButton}
                onPress={() => navigation.navigate('GeneratedCandidatesScreen')}
              >
                <Image
                  source={require('../assets/suggestedcandidatebutton.png')}
                  style={styles.buttonImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Build Profile Button */}
          <View style={styles.buildProfileButtonContainer}>
            <TouchableOpacity
              style={styles.buildProfileButton}
              onPress={() =>
                navigation.navigate('CandidateProfileScreen', {
                  candidate: {
                    name: 'John Doe',
                    designation: 'Software Developer',
                    profileImage: 'https://example.com/profile.jpg',
                    experience: '5 years',
                    skills: 'JavaScript, React Native, Node.js',
                    portfolio: 'https://johnsportfolio.com',
                  },
                })
              }
            >
              <Text style={styles.buildProfileButtonText}>Build Your Profile</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, padding: width * 0.05 },
  dynamicContainer: {
    alignItems: 'center',
    marginVertical: height * 0.03,
    padding: height * 0.03,
    borderRadius: 15,
    backgroundColor: '#08A045',
    opacity: 0.85,
  },
  dynamicIcon: { marginBottom: height * 0.01 },
  dynamicText: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  eventsContainer: { marginTop: height * 0.03 },
  buttonImage: {
    width: '100%',
    height: height * 0.2,
    borderRadius: 10,
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
    padding: width * 0.05,
  },
  eventTitle: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  eventDate: {
    fontSize: width * 0.035,
    color: '#FFFFFF',
    marginTop: height * 0.005,
    textAlign: 'center',
  },
  forYouContainer: { marginTop: height * 0.03 },
  sectionHeader: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: height * 0.02,
  },
  forYouButton: {
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: width * 0.04,
    width: width * 0.6,
  },
  buildProfileButtonContainer: {
    marginTop: height * 0.03,
    alignItems: 'center',
  },
  buildProfileButton: {
    backgroundColor: '#08A045',
    borderRadius: 10,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.2,
    alignItems: 'center',
  },
  buildProfileButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: '600',
  },
});

export default HomePage;
