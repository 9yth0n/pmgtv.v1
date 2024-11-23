import { account } from '../../config/appwrite';
import { ID } from 'appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthService {
  // Email/Password Sign In
  async signInWithEmail(email, password) {
    try {
      const session = await account.createEmailSession(email, password);
      const user = await account.get();
      await this.setUserData(user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  // OAuth Sign In (e.g., with Google)
  async signInWithOAuth(provider) {
    try {
      await account.createOAuth2Session(provider);
      const user = await account.get();
      await this.setUserData(user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Register with Email/Password
  async registerWithEmail(email, password, name) {
    try {
      const user = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      await this.signInWithEmail(email, password);
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Sign Out
  async signOut() {
    try {
      await account.deleteSession('current');
      await AsyncStorage.removeItem('@user_data');
    } catch (error) {
      throw error;
    }
  }

  // Get Current User
  async getCurrentUser() {
    try {
      return await account.get();
    } catch {
      return null;
    }
  }

  // Store User Data
  async setUserData(user) {
    try {
      const userData = {
        $id: user.$id,
        email: user.email,
        name: user.name,
        preferences: user.prefs,
      };
      await AsyncStorage.setItem('@user_data', JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  }

  // Get Stored User Data
  async getUserData() {
    try {
      const userData = await AsyncStorage.getItem('@user_data');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  // Check Authentication State
  async isAuthenticated() {
    try {
      await this.getCurrentUser();
      return true;
    } catch {
      return false;
    }
  }

  // Reset Password
  async resetPassword(email) {
    try {
      await account.createRecovery(email, 'http://localhost:3000/reset-password');
    } catch (error) {
      throw error;
    }
  }

  // Update Profile
  async updateProfile(data) {
    try {
      const user = await account.updatePrefs(data);
      await this.setUserData(user);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
