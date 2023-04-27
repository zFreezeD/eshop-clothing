import { useState, useContext } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import { UserContext } from "../../contexts/user.context";
import './sign-in-form.style.scss';
import Button from "../button/button.component";
import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();




        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            
            setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            console.log(error);

            switch (error.code) {
                case 'auth/wrong-password':
                    alert("wrong password");
                    break;
                case 'auth/user-not-found':
                    alert("user not found");
                    break;
                default:
                    console.log(error);
            }
            alert("wrong password");
            if (error.code == 'auth/user-not-found')
                alert("user not found");
            if (error.code == 'auth/wrong-password')
                alert("wrong password");
        }


    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email} />
                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password} />
                <div className="buttons-container">
                    <Button type="submit" >Sign In</Button>
                    <Button type="button" onClick={signInWithGoogle} buttonType={'google'}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;