import { ActivityIndicator, Dimensions, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'
const { height, width } = Dimensions.get('window');

const Loader = ({ modal, uploading }) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modal}>
            <View style={{
                width: width,
                height: height,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.light,
                opacity: .9
            }}>
                <ActivityIndicator size="large" color={COLORS.main} animating={uploading} />
            </View>
        </Modal>
    )
}

export default Loader

const styles = StyleSheet.create({})