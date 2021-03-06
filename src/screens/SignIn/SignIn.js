import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, Alert} from 'react-native';
import SignInForm from './SignInForm/SignInForm';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAuthError,
  getAuthIsLoading,
} from '../../store/selectors/authSelector';
import {clearError, signIn} from '../../store/routines/authRoutines';
import CustomButton from '../../components/CustomButton/CustomButton';
import PropTypes from 'prop-types';
import {
  backgroundColor,
  fontColor,
  fontFamily,
  headerFontSize,
  paddingHorizontal,
} from '../../styles';
import Splash from '../Splash/Splash';

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getAuthIsLoading);
  const error = useSelector(getAuthError);

  useEffect(() => {
    if (error) {
      Alert.alert(
        'Error message',
        error,
        [{text: 'OK', onPress: () => dispatch(clearError.success())}],
        {cancelable: false},
      );
    }
  }, [dispatch, error]);

  const handleSubmit = (values) => {
    dispatch(signIn(values));
  };

  const handleOnClickSignUp = () => {
    navigation.navigate('Sign Up');
  };

  return isLoading ? (
    <Splash />
  ) : (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Sign In</Text>
      <SignInForm onSubmit={handleSubmit} />
      <CustomButton label={'Sign Up'} onPress={handleOnClickSignUp} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: headerFontSize,
    fontFamily: fontFamily,
    fontWeight: 'bold',
    color: fontColor,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    paddingHorizontal: paddingHorizontal,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

SignIn.propTypes = {
  navigation: PropTypes.object,
};

export default SignIn;
