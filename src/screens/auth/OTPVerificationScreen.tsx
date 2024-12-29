import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '../../lib/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors } from '../../constants';


const BACKGROUND_IMAGE = require('../../../assets/background.png');
const COFFEE_IMAGE = require('../../../assets/coffee.png');

const OTPVerificationScreen: React.FC = ({ route, navigation }: any) => {
  const { phone } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: 'sms',
      });

      if (error) throw error;

      Alert.alert('Success', 'Phone number verified successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'), // Navigate to your home screen
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
    <KeyboardAwareScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" extraScrollHeight={25}>
      <StatusBar style="light" />
      <View style={styles.content}>
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

        <Text style={styles.subText}>Verify Your Phone</Text>
        <Text style={styles.subtitle}>
          Enter the verification code sent to {phone}
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter verification code"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleVerifyOTP}
          disabled={loading || otp.length < 6}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify Code</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resendButton}
          onPress={handleResendOTP}
          disabled={loading}
        >
          <Text style={styles.resendButtonText}>Resend Code</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
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
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 0.3,
    borderColor: Colors.white,
    borderRadius: 8,
    padding: 10,
    color: Colors.white,
    fontSize: 25,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    alignItems: 'center',
  },
  resendButtonText: {
    color: '#2563eb',
    fontSize: 16,
  },
}); 

export default  OTPVerificationScreen;