import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, TextStyle, ViewStyle } from 'react-native';
import { Colors, Fonts } from '../constants';

interface CustomButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
    icon?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, buttonStyle, textStyle, ...props }) => {
    return (
        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress} {...props}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
            {
                props.icon && props.icon
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        width: '90%',
        height: 55,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomButton;