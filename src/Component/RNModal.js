import {Pressable, StyleProp, StyleSheet, View, ViewProps, ViewStyle} from 'react-native';
import React from 'react';
import {
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
  ModalProps,
} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../utils/colors';
import {deviceWidth} from '../utils/constant';
import { ScrollView } from 'react-native';

type Props = {
  visible: boolean;
  setVisible: (val: boolean) => void;
  modalProps?: ModalProps;
  title:string;
  children: React.ReactNode;
  innnerContainerStyle?: StyleProp<ViewStyle>
  childContainerStyle?:  StyleProp<ViewStyle>
};

const RNModal = (props: Props) => {
  const {setVisible, visible, children, title, innnerContainerStyle, childContainerStyle, ...modalProps} = props;
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const {container, innerContainer, childContainer} = styles;

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={container}
      {...modalProps}>
      <View style={[innerContainer, innnerContainerStyle]}>
        <Text
          style={{
            color: Colors.white,
            fontSize: 17,
            fontWeight: '600',
            lineHeight: 20,
          }}>
          {title}
        </Text>
        <Pressable onPress={hideModal}>
          <Ionicons name="close" size={22} color={Colors.white} />
        </Pressable>
      </View>
      <View style={[childContainer, childContainerStyle]}>{children}</View>
    </Modal>
  );
};

export default RNModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 30,
    borderRadius: 20,
    position:'relative',
    zIndex:9999
  },
  innerContainer: {
    backgroundColor: Colors.primary,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow:'hidden',
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
  childContainer: {
    marginHorizontal: deviceWidth * 0.04,
    marginTop: deviceWidth * 0.045,
    marginBottom: deviceWidth * 0.06,
  },
});
