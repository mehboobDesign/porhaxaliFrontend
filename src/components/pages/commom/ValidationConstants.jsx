const VALID_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const VALID_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const VALID_NAME = /^[a-zA-Z\s'-]{2,50}$/;

const VALID_MOBILE = /^\d{10}$/;

const VALID_OTP = /^\d{6}$/;

export { VALID_EMAIL, VALID_PASSWORD, VALID_NAME, VALID_MOBILE, VALID_OTP };