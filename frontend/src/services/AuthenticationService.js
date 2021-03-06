import SprintsAxiosClient from "./clients/SprintsAxiosClient";
import { TokenService } from "./TokenService";

export const AuthenticationService = {
  login,
  logout,
  getRole,
};

async function login(userCredentials) {
  try {
    const response = await SprintsAxiosClient.post(
      "users/auth",
      userCredentials
    );
    const decoded_token = TokenService.decodeToken(response.data);
    if (decoded_token) {
      TokenService.setToken(response.data);
      window.location.assign("/");
    } else {
      console.error("Invalid token");
    }
  } catch (error) {
    console.error(error);
  }
}

function logout() {
  TokenService.removeToken();
  window.location.assign("/");
}

function getRole() {
  const token = TokenService.getToken();
  const decoded_token = token ? TokenService.decodeToken(token) : null;
  if (decoded_token) {
    return decoded_token.role.authority;
  } else {
    return null;
  }
}
