import { login, regist, logout, reset } from "../../actions/users/actionTypes";

const initialState = {
  user: {},
  isLogin: false,
  errorLogin: undefined,
  isLoginPending: false,
  isLoginFulfilled: false,
  isLoginRejected: false,

  dataRegist: {},
  errorRegist: undefined,
  isRegistPending: false,
  isRegistFulfilled: false,
  isRegistRejected: false,

  isLogout: undefined,
};

const authReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case login.pending:
      return {
        ...prevState,
        isLoginPending: true,
      };
    case login.fulfilled:
      return {
        ...prevState,
        isLoginPending: false,
        isLoginRejected: false,
        isLoginFulfilled: true,
        user: action.payload,
        isLogin: true,
      };
    case login.rejected:
      return {
        ...prevState,
        isLoginPending: false,
        isLoginRejected: true,
        isLoginFulfilled: false,
        errorLogin: action.payload,
      };
    case regist.pending:
      return {
        ...prevState,
        isRegistPending: true,
      };
    case regist.fulfilled:
      return {
        ...prevState,
        isRegistPending: false,
        isRegistFulfilled: true,
        isRegistRejected: false,
        dataRegist: action.payload,
      };
    case regist.rejected:
      return {
        ...prevState,
        isRegistPending: false,
        isRegistRejected: true,
        isRegistFulfilled: false,
        errorRegist: action.payload,
      };
    case logout.logout:
      return {
        ...prevState,
        user: {},
        isLogin: false,
        errorLogin: undefined,
        isLoginPending: false,
        isLoginFulfilled: false,
        isLoginRejected: false,

        dataRegist: {},
        errorRegist: undefined,
        isRegistPending: false,
        isRegistFulfilled: false,
        isRegistRejected: false,
        isLogout: true,
      };
    case reset.error:
      return {
        ...prevState,
        isLoginRejected: false,
        isRegistRejected: false,
      };
    case reset.fulfilledRegist:
      return {
        ...prevState,
        isRegistFulfilled: false,
      };
    default:
      return prevState;
  }
};

export default authReducer;
