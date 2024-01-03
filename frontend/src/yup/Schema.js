import * as yup from 'yup'

export const register = yup.object({
    name:yup.string().min(2).max(20).required("Please Enter Name"),
    email:yup.string().email().required("Please Enter E-mail"),
    phone:yup.number().min(6).required("Please Enter Phone No."),
    password:yup.string().min(6).max(16).required("Please Enter Password")
})

export const login = yup.object({
    username:yup.string().required("Please Enter E-mail "),
    userpass:yup.string().required("PLease Enter Password")
})

export const infoform = yup.object({
    email: yup.string().email().required("Please Enter E-mail"),
    f_name: yup.string().min(2).max(15).required("Please Enter First Name"),
    l_name: yup.string().min(3).max(10).required("Please Enter Last Name"),
    bob: yup.date().required("Please Enter DOB"),
    phone: yup.number().min(10).required("Please Enter Phone NO."),
    address: yup.string().required("Please Enter Address"),
    city: yup.string().required("Please Enter city"),
    state: yup.string().required("Please Enter state"),
    postal_code: yup.number().min(6).required("Please Enter Postal Code")
    
})