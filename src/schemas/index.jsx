import * as Yup from "yup";

export const signUpSchema = Yup.object({
    name: Yup.string().min(3).max(30).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(5).required("Please enter your password"),
    confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), null], "Passwords do not match"),
    age: Yup.number().required("Age must not be empty")
    .min(18, "You must be at least 18 years old to be an eligible user"),
    gender: Yup.string().required("Gender needs to be selected")
});

export const loginSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().required("Please enter your password")
});

export const creditcardSchema = Yup.object({
    number: Yup.string().required("Card Number is required").max(16, "Card Number should not contain more than 16 digits"),
    name: Yup.string().required("Name is required"),
    expiry: Yup.number().required("Expiry date is required"),
    cvc: Yup.number().required("CVC is required")
});