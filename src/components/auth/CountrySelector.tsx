import React, { useState, useEffect, useRef } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    TextInput,
    Dimensions,
    Animated,
    Keyboard,
    Platform,
    findNodeHandle,
    UIManager,
    LayoutChangeEvent,
    TouchableWithoutFeedback,
} from 'react-native';

interface Country {
    code: string;
    label: string;
    flag: string;
    dialCode: string;
}

const countries: Country[] = [
    { code: 'US', label: 'United States', flag: '🇺🇸', dialCode: '+1' },
    { code: 'GB', label: 'United Kingdom', flag: '🇬🇧', dialCode: '+44' },
    { code: 'IN', label: 'India', flag: '🇮🇳', dialCode: '+91' },
    { code: 'CA', label: 'Canada', flag: '🇨🇦', dialCode: '+1' },
    { code: 'AU', label: 'Australia', flag: '🇦🇺', dialCode: '+61' },
    { code: 'DE', label: 'Germany', flag: '🇩🇪', dialCode: '+49' },
    { code: 'FR', label: 'France', flag: '🇫🇷', dialCode: '+33' },
    { code: 'IT', label: 'Italy', flag: '🇮🇹', dialCode: '+39' },
    { code: 'ES', label: 'Spain', flag: '🇪🇸', dialCode: '+34' },
    { code: 'BR', label: 'Brazil', flag: '🇧🇷', dialCode: '+55' },
    { code: 'JP', label: 'Japan', flag: '🇯🇵', dialCode: '+81' },
    { code: 'KR', label: 'South Korea', flag: '🇰🇷', dialCode: '+82' },
    { code: 'CN', label: 'China', flag: '🇨🇳', dialCode: '+86' },
    { code: 'RU', label: 'Russia', flag: '🇷🇺', dialCode: '+7' },
    { code: 'SG', label: 'Singapore', flag: '🇸🇬', dialCode: '+65' },
];

interface CountrySelectorProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (country: Country) => void;
    anchorPosition?: { x: number; y: number };
}

const defaultPosition = { x: 50, y: 50 };

const CountrySelector: React.FC<CountrySelectorProps> = ({
    visible,
    onClose,
    onSelect,
    anchorPosition = defaultPosition,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCountries, setFilteredCountries] = useState(countries);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (anchorPosition) {
            setDropdownPosition({
                top: anchorPosition.y + 10,
                left: anchorPosition.x
            });
        }
    }, [anchorPosition]);

    useEffect(() => {
        if (visible) {
            setSearchQuery('');
            setFilteredCountries(countries);
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }),
            ]).start();
        }
    }, [visible]);

    const sanitizeSearchInput = (input: string) => {
        // First handle the plus sign case
        if (input.startsWith('+')) {
            // If starts with +, only allow numbers after it
            const numbers = input.slice(1).replace(/[^\d]/g, '');
            return numbers ? `+${numbers}` : '+';
        }
        // Otherwise only allow letters, numbers, and spaces
        return input.replace(/[^\w\s]/g, '');
    };

    const handleSearch = (text: string) => {
        const sanitized = sanitizeSearchInput(text);
        setSearchQuery(sanitized);
        
        const searchTerm = sanitized.toLowerCase().trim();
        if (!searchTerm) {
            setFilteredCountries(countries);
            return;
        }

        // Handle numeric search (with or without +)
        if (/^\+?\d+$/.test(searchTerm)) {
            const numericPart = searchTerm.replace('+', '');
            const filtered = countries.filter(country => 
                country.dialCode.includes(numericPart) ||
                country.label.toLowerCase().includes(numericPart)
            );
            setFilteredCountries(filtered);
            return;
        }

        // Handle text search
        const filtered = countries.filter(country => 
            country.label.toLowerCase().includes(searchTerm) ||
            country.code.toLowerCase().includes(searchTerm)
        );
        setFilteredCountries(filtered);
    };

    const renderItem = ({ item }: { item: Country }) => (
        <TouchableOpacity
            style={styles.countryItem}
            onPress={() => onSelect(item)}
        >
            <Text style={styles.flag}>{item.flag}</Text>
            <Text style={styles.countryName}>{item.label}</Text>
            <Text style={styles.dialCode}>{item.dialCode}</Text>
        </TouchableOpacity>
    );

    if (!visible) return null;

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <Animated.View
                            style={[
                                styles.container,
                                {
                                    top: dropdownPosition.top,
                                    left: dropdownPosition.left,
                                    opacity: slideAnim,
                                    transform: [{
                                        translateY: slideAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [-20, 0],
                                        }),
                                    }],
                                },
                            ]}
                        >
                            <View style={styles.header}>
                                <Text style={styles.headerText}>Select Country</Text>
                                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                    <Text style={styles.closeButtonText}>×</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.searchContainer}>
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Search country or code..."
                                    placeholderTextColor="rgba(183, 138, 93, 0.5)"
                                    value={searchQuery}
                                    onChangeText={handleSearch}
                                />
                            </View>
                            <FlatList
                                data={filteredCountries}
                                renderItem={renderItem}
                                keyExtractor={item => item.code}
                                style={styles.listContainer}
                                keyboardShouldPersistTaps="handled"
                            />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        position: 'absolute',
        width: 320,
        maxHeight: 400,
        backgroundColor: 'rgba(35, 35, 35, 0.85)',
        borderRadius: 15,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        zIndex: 1000,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    headerText: {
        color: '#B78A5D',
        fontSize: 18,
        fontWeight: '600',
    },
    closeButton: {
        padding: 5,
    },
    closeButtonText: {
        color: '#B78A5D',
        fontSize: 24,
        fontWeight: '600',
    },
    searchContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    searchInput: {
        backgroundColor: '#1a1a1a',
        color: '#B78A5D',
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
    },
    listContainer: {
        maxHeight: 300,
    },
    countryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    flag: {
        fontSize: 24,
        marginRight: 10,
    },
    countryName: {
        color: '#B78A5D',
        fontSize: 16,
        flex: 1,
    },
    dialCode: {
        color: '#B78A5D',
        fontSize: 14,
        opacity: 0.8,
    },
});

export default CountrySelector;
