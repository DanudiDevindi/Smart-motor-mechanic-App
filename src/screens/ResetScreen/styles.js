import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { styles } from './styles';
import BigButton from '../../component/BigButton';
import { AuthContext } from '../../context/context';
import api from '../../api/jsonServer';
import ErrorMsg from '../../component/ErrorMsg';
import LoadingIndicator from '../../component/LocationIndicator';

