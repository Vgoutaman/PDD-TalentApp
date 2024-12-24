import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const HamburgerMenu = ({ navigation }) => {
  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.menuContainer}>
        {/* Header */}
        <LinearGradient
          colors={['#FFFFFF', '#08A045']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerText}>Menu</Text>
        </LinearGradient>

        {/* Menu Items */}
        <View style={styles.menuItems}>
          <TouchableOpacity onPress={() => handleNavigate('HomePage')} style={styles.menuItem}>
            <Icon name="home" size={20} color="#051367" />
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleNavigate('JobHistory')} style={styles.menuItem}>
            <Icon name="history" size={20} color="#051367" />
            <Text style={styles.menuText}>Posted Job History</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleNavigate('SettingsScreen')} style={styles.menuItem}>
            <Icon name="settings" size={20} color="#051367" />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleNavigate('TestimonialScreen')} style={styles.menuItem}>
            <Icon name="star" size={20} color="#051367" />
            <Text style={styles.menuText}>Testimonials</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleNavigate('AboutUsScreen')} style={styles.menuItem}>
            <Icon name="info" size={20} color="#051367" />
            <Text style={styles.menuText}>About Us</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Talent App</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'flex-start', // Align menu to the left
  },
  menuContainer: {
    width: '70%', // Menu width
    height: '100%', // Full height of the screen
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
    elevation: 100, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  menuItems: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1, // Allows the menu to expand to fill the screen
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  menuText: {
    fontSize: 16,
    color: '#051367',
    marginLeft: 10,
  },
  footer: {
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
  },
});

export default HamburgerMenu;
