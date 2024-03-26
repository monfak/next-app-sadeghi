
export interface LoginFormValuesInterface {
    phone: string,
    password: string,
}

export interface RegisterFormValuesInterface {
    name: string,
    email: string,
    password: string,
    phone: string
}

export interface PhoneVerifyFormValuesInterface {
    code : string
    token : string
}