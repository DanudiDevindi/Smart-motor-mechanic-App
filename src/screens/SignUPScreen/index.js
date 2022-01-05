import React, { useContext } from 'react';
import { Text, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { AuthContext } from '../../context/context';
import WelComeMsg from '../../component/WelComeMsg';
import InputField from '../../component/InputField';
import BigButton from '../../component/BigButton';
import CheckBoxx from '../../component/CheckBoxx';
import BottomMsg from '../../component/BottomMsg';
import api from '../../api/jsonServer';
import ErrorMsg from '../../component/ErrorMsg';
import Feather from "react-native-vector-icons/Feather";
import moment from "moment";
import LoadingIndicator from '../../component/LocationIndicator';
import { SignUpUser } from '../../Firebase/SignUp';
import {AddUser} from '../../Firebase/Users';
import Firebase from '../../Firebase/firebaseSDK'

const SignINScreen = ({ navigation }) => {
    const [data, setData] = React.useState({
        email: '',
        password: '',
        contact_no: '',
        username: '',
        contact_no_error: '',
        confirm_password: '',
        username_error: '',
        email_error: '',
        password_error: '',
        confirm_password_error: '',
        server_err: '',
        secureTextEntry: true,
        showIndicator:false,
        createAt:Date.now()
    });

    const { signUp } = React.useContext(AuthContext);

}
export default SignINScreen;

