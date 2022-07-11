import { React, useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as jose from 'jose';


import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import { signIn, signUp } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', comfirmPassword: '' };

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isSignup) {
            // sign up
            dispatch(signUp(formData, history));
        } else {
            // sign in
            dispatch(signIn(formData, history));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const switchMode = () => {
        // switch from between signin and sign up
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
    };

    const decodeJwtResponse = async (credential) => {
        const claims = jose.decodeJwt(credential);
        return claims;
    };

    const handleCredentialResponse = async (response) => {
        // decodeJwtResponse() is a custom function defined by you
        // to decode the credential response.
        const responsePayload = await decodeJwtResponse(response.credential);

        return responsePayload;
    };

    const googleSuccess = async (res) => {

        const payload = await handleCredentialResponse(res).then((payload) => {
            return payload;
        })
            .catch((error) => console.log(error.message));

        const result = payload; // profile
        const token = res?.credential; // token

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleError = (error) => {
        console.log(error);
        console.log('Google Sign In was unsuccessful. Try Again Later');
    };


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autocomplete half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="comfirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item className={classes.googleButton}>
                            <GoogleLogin
                                theme='filled_black'
                                onSuccess={googleSuccess}
                                onError={googleError}
                                cookiePolicy="single_host_origin"
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth