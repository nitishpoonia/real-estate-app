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
      state.password = password;

      // Check if password meets criteria
      // state.isUppercase = /[A-Z]/.test(password);
      // state.isLowercase = /[a-z]/.test(password);
      // state.hasNumber = /\d/.test(password);
      // state.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      // state.isPasswordLongEnough = password.length >= 8;
      // if (
      //   state.isPasswordLongEnough &&
      //   state.isUppercase &&
      //   state.isLowercase &&
      //   state.hasNumber &&
      //   state.hasSpecialChar
      // ) {
      //   state.passwordError = '';
      // } else {
      //   state.passwordError =
      //     'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.';
      // }
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
  },
});

export const {
  checkPhone,
  checkPassword,
  // matchPassword,
  checkUserName,
  checkEmail,
} = formSlice.actions;
export default formSlice;
