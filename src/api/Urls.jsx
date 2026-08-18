const REGISTER = 'api/auth/register';
const VERIFYOTP = 'api/auth/otp/verify';
const RESENDOTP = 'api/auth/otp/resend';
const LOGIN = 'api/auth/login';
const LOGOUT = 'api/auth/logout';
const FORCE_LOGOUT = 'api/auth/force-logout-requests';

//admin api
const GET_SUBJECTS = 'api/subjects/';
const POST_SUBJECTS = 'api/subjects/';
const GET_FORCE_LOGOUT_REQUEST = 'api/admin/users/force-logout-requests';

//student api
const COMPLETE_PROFILE = 'api/student/profiles';
const GET_STUDENTS = 'api/student/all';


export {
    REGISTER,VERIFYOTP,RESENDOTP,LOGIN,LOGOUT,FORCE_LOGOUT,GET_SUBJECTS,POST_SUBJECTS,
    COMPLETE_PROFILE,GET_FORCE_LOGOUT_REQUEST,GET_STUDENTS
}