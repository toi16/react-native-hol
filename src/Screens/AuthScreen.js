import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Dimensions, StyleSheet, ImageBackground } from 'react-native';
import { Button, Input } from 'react-native-elements';
import BG_IMAGE from "../assets/images/bg_screen4.jpg";
import { emailChanged, passwordChanged, loginUser } from '../Actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class AuthScreen extends Component {
    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete(props) {
        if (props.user) {
            this.props.navigation.navigate('holidays');
        }
    }

    onEmailChange = (text) => { this.props.emailChanged(text); }

    onPasswordChange = (text) => { this.props.passwordChanged(text); }

    onButtonPress = () => {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }

    renderButton() {
        return (
            <Button
                title='LOG IN'
                activeOpacity={1}
                underlayColor="transparent"
                onPress={this.onButtonPress}
                loading={this.props.loading}
                loadingProps={{ size: 'small', color: 'white' }}
                buttonStyle={{
                    height: 50,
                    width: 250,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius: 30
                }}
                containerStyle={{ marginVertical: 10 }}
                titleStyle={{ fontWeight: 'bold', color: 'white' }}
            />
        );
    }

    renderError() {
        if (this.props.error) {
            return (
                <View>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={BG_IMAGE}
                    style={styles.bgImage}
                >
                    <View style={styles.loginView}>
                        <View style={styles.loginTitle}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.travelText}>TRAVEL</Text>
                                <Text style={styles.plusText}>+</Text>
                            </View>
                            <View style={{ marginTop: -10 }}>
                                <Text style={styles.travelText}>LEISURE</Text>
                            </View>
                        </View>

                        <View style={styles.loginInput}>
                            <Input
                                containerStyle={{ marginVertical: 10 }}
                                placeholder="email@gmail.com"
                                onChangeText={this.onEmailChange}
                                value={this.props.email}
                                inputStyle={{ marginLeft: 10, color: 'white' }}
                                keyboardAppearance="light"
                                autoFocus={false}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                returnKeyType="next"
                                blurOnSubmit={false}
                                placeholderTextColor="white"
                            />
                            <Input
                                containerStyle={{ marginVertical: 10 }}
                                onChangeText={this.onPasswordChange}
                                value={this.props.password}
                                inputStyle={{ marginLeft: 10, color: 'white' }}
                                secureTextEntry
                                keyboardAppearance="light"
                                placeholder="Password"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="default"
                                returnKeyType="done"
                                blurOnSubmit
                                placeholderTextColor="white"
                            />
                        </View>
                        {this.renderError()}
                        {this.renderButton()}
                    </View>
                </ImageBackground>
            </View >




        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginView: {
        marginTop: 10,
        backgroundColor: 'transparent',
        width: 250,
        height: 400,
    },
    loginTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    travelText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'bold'
    },
    plusText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'regular'
    },
    loginInput: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    errorTextStyle: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading, user } = auth;

    return { email, password, error, loading, user };
};

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginUser
})(AuthScreen);
