import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { databaseService } from '../services/database.service';

const UserProfile = () => {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        preferences: {
            defaultCurrency: 'USD',
            theme: 'dark',
            notifications: {
                priceAlerts: true,
                newsAlerts: true,
                tradingUpdates: true
            },
            tradingPreferences: {
                defaultLeverage: '1x',
                riskLevel: 'medium',
                tradingPairs: []
            }
        }
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUserProfile();
    }, [user]);

    const loadUserProfile = async () => {
        try {
            const userProfile = await databaseService.getUserProfile(user.$id);
            setProfile(userProfile);
        } catch (error) {
            console.error('Error loading profile:', error);
            Alert.alert('Error', 'Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            setLoading(true);
            await databaseService.updateUserProfile(user.$id, profile);
            setIsEditing(false);
            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error logging out:', error);
            Alert.alert('Error', 'Failed to logout');
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading profile...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setIsEditing(!isEditing)}
                >
                    <Text style={styles.editButtonText}>
                        {isEditing ? 'Cancel' : 'Edit'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <TextInput
                    style={styles.input}
                    value={profile.name}
                    onChangeText={(text) => setProfile({ ...profile, name: text })}
                    placeholder="Name"
                    editable={isEditing}
                />
                <TextInput
                    style={styles.input}
                    value={profile.email}
                    placeholder="Email"
                    editable={false}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Trading Preferences</Text>
                <View style={styles.preference}>
                    <Text style={styles.preferenceLabel}>Default Currency</Text>
                    <TextInput
                        style={styles.input}
                        value={profile.preferences.defaultCurrency}
                        onChangeText={(text) => setProfile({
                            ...profile,
                            preferences: {
                                ...profile.preferences,
                                defaultCurrency: text
                            }
                        })}
                        editable={isEditing}
                    />
                </View>
                <View style={styles.preference}>
                    <Text style={styles.preferenceLabel}>Default Leverage</Text>
                    <TextInput
                        style={styles.input}
                        value={profile.preferences.tradingPreferences.defaultLeverage}
                        onChangeText={(text) => setProfile({
                            ...profile,
                            preferences: {
                                ...profile.preferences,
                                tradingPreferences: {
                                    ...profile.preferences.tradingPreferences,
                                    defaultLeverage: text
                                }
                            }
                        })}
                        editable={isEditing}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notifications</Text>
                {Object.entries(profile.preferences.notifications).map(([key, value]) => (
                    <TouchableOpacity
                        key={key}
                        style={styles.notification}
                        onPress={() => {
                            if (isEditing) {
                                setProfile({
                                    ...profile,
                                    preferences: {
                                        ...profile.preferences,
                                        notifications: {
                                            ...profile.preferences.notifications,
                                            [key]: !value
                                        }
                                    }
                                });
                            }
                        }}
                    >
                        <Text style={styles.notificationLabel}>
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Text>
                        <View style={[styles.toggle, value ? styles.toggleOn : styles.toggleOff]} />
                    </TouchableOpacity>
                ))}
            </View>

            {isEditing && (
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleUpdateProfile}
                >
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1b23',
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1b23',
    },
    loadingText: {
        color: '#ffffff',
        fontSize: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    editButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#2a2b33',
    },
    editButtonText: {
        color: '#3b82f6',
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 12,
    },
    input: {
        backgroundColor: '#2a2b33',
        padding: 12,
        borderRadius: 8,
        color: '#ffffff',
        marginBottom: 8,
    },
    preference: {
        marginBottom: 12,
    },
    preferenceLabel: {
        color: '#B2B5BE',
        marginBottom: 4,
    },
    notification: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#2a2b33',
    },
    notificationLabel: {
        color: '#ffffff',
    },
    toggle: {
        width: 40,
        height: 24,
        borderRadius: 12,
        padding: 2,
    },
    toggleOn: {
        backgroundColor: '#3b82f6',
    },
    toggleOff: {
        backgroundColor: '#4b4d5a',
    },
    saveButton: {
        backgroundColor: '#3b82f6',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
    },
    saveButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: '#ef4444',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 24,
    },
    logoutButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default UserProfile;
