import {createSlice} from '@reduxjs/toolkit';

const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = password => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    password,
  );
};

const formSlice = createSlice({
  name: 'form',
  initialState: {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    userName: '',
    userNameError: '',
    fullName: '',
    fullNameError: '',
  },
  reducers: {
    checkEmail: (state, action) => {
      const email = action.payload;
      state.email = email;
      state.emailError = validateEmail(email)
        ? ''
        : 'Please enter a valid email address.';
    },
    checkPassword: (state, action) => {
      const password = action.payload;
      state.password = password;
      state.passwordError = validatePassword(password)
        ? ''
        : 'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, and one number.';
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
    checkFullName: (state, action) => {
      const fullName = action.payload;
      state.fullName = fullName;
      state.fullNameError =
        fullName.length >= 4 ? '' : 'Full name must be 4 characters long';
    },
  },
});

export const {
  checkEmail,
  checkPassword,
  matchPassword,
  checkFullName,
  checkUserName,
} = formSlice.actions;
export default formSlice;
