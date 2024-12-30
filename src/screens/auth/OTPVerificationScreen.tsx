import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../../lib/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors } from '../../constants';
import { CustomTextInput, CustomButton } from '../../components';

const BACKGROUND_IMAGE = require('../../../assets/background.png');
const COFFEE_IMAGE = require('../../../assets/coffee.png');

const OTPVerificationScreen: React.FC = ({ route, navigation }: any) => {
  const { phone } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      const { error, data } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: 'sms',
      });

      //console.log(data);

      if (error) throw error;

      Alert.alert('Success', 'Phone number verified successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('App')
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        phone,
      });

      if (error) throw error;

      Alert.alert('Success', 'New verification code sent!');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" extraScrollHeight={20}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <Image
            style={styles.image}
            source={BACKGROUND_IMAGE}
            contentFit="cover"
            transition={750}
        />
        <Image
            style={styles.coffee}
            source={COFFEE_IMAGE}
            contentFit="cover"
            transition={250}
        />
        <Text style={styles.header}>COFFEE TASTE !</Text>
        <Text style={styles.subText}>We've already met!</Text>
        <Text style={styles.subtitle}>
          Enter the verification code sent to {phone}
        </Text>

        <View style={styles.inputContainer}>
          <CustomTextInput
            value={otp}
            placeholder="Enter verification code"
            onChangeText={setOtp}
            keyboardType="phone-pad"
            style={styles.input}
            maxLength={6}
          />
        </View>

        <CustomButton
            title='Verify Code'
            onPress={handleVerifyOTP}
            buttonStyle={{ alignSelf: 'center', marginBottom: 15 }} 
            disabled={loading || otp.length < 6}
            loading={loading}
        />

        <TouchableOpacity
          style={styles.resendButton}
          onPress={handleResendOTP}
          disabled={loading}
        >
          <Text style={styles.resendButtonText}>Resend Code</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6
  },
  coffee: {
      width: 75,
      height: 75,
      alignSelf: 'center',
      marginTop: 50,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center'
  },
  inputContainer: {
    gap: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  subText: {
      fontSize: 20,
      color: Colors.white,
      opacity: 0.8,
      textAlign: 'center',
      marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 25,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    color: Colors.white,
    fontSize: 25,
    textAlign: 'center'
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    alignItems: 'center',
  },
  resendButtonText: {
    color: Colors.warning,
    fontSize: 18,
  },
}); 

export default  OTPVerificationScreen;