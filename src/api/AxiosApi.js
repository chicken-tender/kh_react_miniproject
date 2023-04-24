import axios from "axios";
const KH_DOMAIN = "http://localhost:8111";

const AxiosApi = {
  // ✨ 로그인
  memberLogin : async(id, pw) => {
    const login = {
      id : id,
      pwd : pw
    };
    return await axios.post(KH_DOMAIN + "/login", login);
  },
  // ✨ 회원 조회
  memberGet : async(id) => {
    return await axios.get(KH_DOMAIN + `/member/?name=${id}`);
  },
  // ✨ 회원 가입
  memberReg : async(id, pwd, name, email) => {
    const member = {
      id: id,
      pwd: pwd,
      name: name,
      email: email
    };
    return await axios.post(KH_DOMAIN + "/new", member);
  }
};

export default AxiosApi;