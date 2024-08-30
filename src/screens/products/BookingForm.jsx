import React, {useState} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setDate, setName, setNumber} from '../../redux/slices/bookingSlice';
import CustomTextInput from '../../components/CustomTextInput';
import DatePicker from 'react-native-date-picker';
import CustomButton from '../../components/CustomButton';
import Toast from 'react-native-toast-message';
const BookingForm = ({navigation}) => {
  const [submitError, setSubmitError] = useState('');
  const [open, setOpen] = useState(false);

  const {date, name, number} = useSelector(state => state.booking);
  const dispatch = useDispatch();

  const isNumberValid = num => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(num);
  };

  const handleSubmit = () => {
    if (!name) {
      setSubmitError('Name is required');
      return;
    }

    if (!isNumberValid(number)) {
      setSubmitError('Please enter a valid 10-digit phone number');
      return;
    }

    if (!date) {
      setSubmitError('Date is required');
      return;
    }

    const formattedDate = new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    // If validation passes, clear error and navigate to next screen or perform booking logic
    setSubmitError('');
    Toast.show({
      type: 'success',
      text1: 'Appointment Submitted',
      text2: `${name}, ${number}, ${formattedDate}`,
    });
    // navigation.navigate('ConfirmationScreen');
  };

  return (
    <View className="justify-center flex-1">
      <Text className="text-black text-2xl font-psemibold text-center mb-4">
        Booking Form
      </Text>

      <View>
        <CustomTextInput
          value={name}
          placeholder={'Enter Your Name'}
          onChangeText={text => dispatch(setName(text))}
        />
      </View>
      <View>
        <CustomTextInput
          value={number}
          placeholder={'Enter Your Number'}
          onChangeText={text => dispatch(setNumber(text))}
          keyboardType="phone-pad"
        />
      </View>
      <View>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date || new Date()}
          onConfirm={selectedDate => {
            setOpen(false);
            dispatch(setDate(selectedDate));
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        {date && (
          <Text className="text-black text-base mb-5 bg-white px-4 py-2 mx-3 rounded-xl border-gray-300 border shadow-lg font-pregular">
            {date.toLocaleDateString('en-IN')}
          </Text>
        )}

        <CustomButton
          title="Pick a Date"
          handlePress={() => setOpen(true)}
          containerStyles={'mx-2'}
        />
      </View>

      {submitError ? <Text style={{color: 'red'}}>{submitError}</Text> : null}

      <CustomButton
        title="Submit"
        handlePress={handleSubmit}
        containerStyles={'mx-2 mt-4'}
      />
    </View>
  );
};

export default BookingForm;
