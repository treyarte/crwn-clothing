import React, {useState} from "react"; 
import {connect} from "react-redux";
import FormInput from  "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {googleSignInStart, emailSignInStart} from "../../redux/user/user.actions";
import {SignInTitle, SignInContainer, ButtonBarContainer} from "./sign-in.styles";

const SignIn =({emailSignInStart, googleSignInStart}) =>{
    const [userCredentials, setCredentials] = useState({email: "", password: ""});
    const {email, password} = userCredentials;

    const handleSubmit = async (e) =>{
        e.preventDefault();


        emailSignInStart(email, password);
    
        
    }

    const handleChange = (e) =>{
        const {value, name} = e.target;
        setCredentials({...userCredentials, [name]: value})
    }
    
        return(
            <SignInContainer>
                <SignInTitle>I already have an account</SignInTitle>
                <span>Sign in with your email and password</span>

                <form onSubmit={handleSubmit}>
                    <FormInput name="email" value={email} type="email" handleChange={handleChange} label="email" required/>
                    <FormInput name="password" value={password} type="password" handleChange={handleChange} label="password" required/>

                    <ButtonBarContainer>
                        <CustomButton type="submit">SIGN IN</CustomButton>
                        <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </ButtonBarContainer>
                    
                    </form>
            </SignInContainer>

            
        );
}
const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);