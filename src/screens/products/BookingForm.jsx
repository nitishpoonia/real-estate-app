// TODO: Add property id to booking form
import React, {useState} from 'react';
import {View, Text, Button, Alert, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setDate, setName, setNumber} from '../../redux/slices/bookingSlice';
import CustomTextInput from '../../components/CustomTextInput';
import DatePicker from 'react-native-date-picker';
import CustomButton from '../../components/CustomButton';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
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
    setSubmitError('');
    Toast.show({
      type: 'success',
      text1: 'Appointment Submitted',
      text2: `${name}, ${number}, ${formattedDate}`,
    });
    dispatch(setDate(null));
    dispatch(setName(''));
    dispatch(setNumber(''));
    navigation.goBack();
    // navigation.navigate('ConfirmationScreen');
  };

  return (
    <SafeAreaView className="flex-1 ">
      <View className="flex-row items-center justify-between mx-2 my-2">
        <Pressable
          onPress={() => navigation.goBack()}
          className="bg-[#16a34a] rounded-full">
          <Icon name={'chevron-left'} color="white" size={30} />
        </Pressable>
        <View>
          <Text className="text-[#16a34a] font-psemibold text-lg">
            Booking Form
          </Text>
        </View>
        <Pressable>
          <Text className="text-[#16a34a] font-pmedium text-base"></Text>
        </Pressable>
      </View>
      <View className="bg-white rounded-lg py-2 mx-2">
        <View className="mx-3">
          <Text className="text-black font-pmedium text-lg">Name</Text>
          <CustomTextInput
            value={name}
            placeholder={'Enter Your Name'}
            onChangeText={text => dispatch(setName(text))}
          />
        </View>
        <View className="mx-3">
          <Text className="text-black font-pmedium text-lg">Phone Number</Text>

          <CustomTextInput
            value={number}
            placeholder={'Enter Your Number'}
            onChangeText={text => dispatch(setNumber(text))}
            keyboardType="phone-pad"
          />
        </View>
        <View>
          <Pressable className="flex-row ml-3 items-center">
            <Icon name={'calendar-month'} color="black" size={25} />
            <Text className="text-black font-pmedium text-xl">Pick Date</Text>
          </Pressable>
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

          {date ? (
            <Pressable onPress={() => setOpen(true)}>
              <Text className="text-black text-base bg-white px-4 py-1 mb-1 mx-3 rounded-xl border-gray-300 border shadow-lg font-pregular">
                {date.toLocaleDateString('en-IN')}
              </Text>
            </Pressable>
          ) : (
            <Pressable onPress={() => setOpen(true)}>
              <Text className="text-black text-base bg-white px-4 py-1 mb-1 mx-3 rounded-xl border-gray-300 border shadow-lg font-pregular">
                dd/mm/yyyy
              </Text>
            </Pressable>
          )}
        </View>
      </View>
      {submitError ? (
        <Text className="text-red-500 ml-3 mt-2">{submitError}</Text>
      ) : null}

      <CustomButton
        title="Submit"
        handlePress={handleSubmit}
        containerStyles={'mx-2 mt-4'}
      />
    </SafeAreaView>
  );
};

export default BookingForm;
