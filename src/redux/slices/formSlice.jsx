import {createSlice} from '@reduxjs/toolkit';
const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);

const validatePhone = phone => /^[6-9]\d{9}$/.test(phone);
const formSlice = createSlice({
  name: 'form',
  initialState: {
    email: '',
    emailError: '',
    phone: '',
    phoneError: '',
    password: '',
    passwordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    userName: '',
    userNameError: '',
    isUppercase: false,
    isLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isPasswordLongEnough: false,
  },
  reducers: {
    checkEmail: (state, action) => {
      const email = action.payload;
      console.log(email);

      state.email = email;
      state.emailError = validateEmail(email)
        ? ''
        : 'Please enter a valid email';
    },
    checkPhone: (state, action) => {
      const phone = action.payload;
      state.phone = phone.trim();
      state.phoneError = validatePhone(phone)
        ? ''
        : 'Please enter a valid Phone Number';
    },
    checkPassword: (state, action) => {
      const password = action.payload;
      const isUppercase = /[A-Z]/.test(password); // Checks for at least one uppercase letter
      const isLowercase = /[a-z]/.test(password); // Checks for at least one lowercase letter
      const hasNumber = /[0-9]/.test(password); // Checks for at least one digit
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Checks for at least one special character
      const isPasswordLongEnough = password.length >= 8; // Checks if password is at least 8 characters long

      // Update the state based on the validation results
      state.password = password;
      state.isUppercase = isUppercase;
      state.isLowercase = isLowercase;
      state.hasNumber = hasNumber;
      state.hasSpecialChar = hasSpecialChar;
      state.isPasswordLongEnough = isPasswordLongEnough;
    },
    matchPassword: (state, action) => {
      const confirmPassword = action.payload;
      state.confirmPassword = confirmPassword;
      state.confirmPasswordError =
        state.password === confirmPassword ? '' : 'Passwords do not match.';
    },
    checkUserName: (state, action) => {
      const userName = action.payload;
      state.userName = userName;
      state.userNameError =
        userName.length >= 6 ? '' : 'Username must be 6 characters long';
    },
    resetFields: state => {
      state.email = '';
      state.emailError = '';
      state.phone = '';
      state.phoneError = '';
      state.password = '';
      state.passwordError = '';
      state.confirmPassword = '';
      state.confirmPasswordError = '';
      state.userName = '';
      state.userNameError;
    },
  },
});

export const {
  checkPhone,
  checkPassword,
  // matchPassword,
  checkUserName,
  checkEmail,
  resetFields,
} = formSlice.actions;
export default formSlice;
