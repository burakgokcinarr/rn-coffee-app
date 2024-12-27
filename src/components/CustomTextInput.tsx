import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '../constants';
import { Eye, EyeOff } from 'lucide-react-native';

interface CustomTextInputProps extends TextInputProps {
    placeholder: string;
    onChangeText: (event?: any) => void;
    value?: string;
    iconLeft?: React.ReactNode;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ placeholder, onChangeText, value, iconLeft, ...props }) => {

    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);

    return (
        <View style={styles.container}>
            {iconLeft && iconLeft}
            <TextInput
                value={value}
                placeholder={placeholder}
                secureTextEntry={(placeholder === 'Password' || placeholder === 'Re-Password') && !isPasswordVisible}
                autoCorrect={false}
                placeholderTextColor={Colors.white}
                style={styles.input}
                textContentType='oneTimeCode'
                onChangeText={onChangeText}
                {...props}
            />
            {
                (placeholder === 'Password' || placeholder === 'Re-Password') && (
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        {
                            isPasswordVisible
                                ?
                                <Eye size={20} color={Colors.white} />
                                :
                                <EyeOff size={20} color={Colors.white} />
                        }
                    </TouchableOpacity>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '90%',
        height: 60,
        padding: 10,
        borderRadius: 8,
        borderWidth: 0.3,
        borderColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    input: {
        flex: 1,
        color: Colors.white,
        fontSize: 16,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomTextInput;