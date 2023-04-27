// 메인 페이지
import React, { useState, useEffect, useContext } from "react";
import AxiosApi from "../api/AxiosApi";
import { useNavigate} from "react-router-dom";
import { UserContext } from "../context/UserInfo";

const Home = () => {
  const [memberInfo, setMemberInfo] = useState("");

  // 🔥 로컬 스토리지 2번
  const navigate = useNavigate();
  const isLogin = window.localStorage.getItem("isLogin");
  // const userId = window.localStorage.getItem("userId");
  // const pwd = window.localStorage.getItem("password");

  // 🔥 Context에서 값 읽기
  const context = useContext(UserContext);
  const {userId, password} = context;

  if(isLogin !== "TRUE") navigate("/");
  
  useEffect(() => {
    const memberInfo = async() => {
      const response = await AxiosApi.memberGet("ALL"); // 전체 조회
      if(response.status === 200) setMemberInfo(response.data);
      console.log(response.data);
    };
    memberInfo();
  }, []);

  return (
    <>
      {memberInfo && memberInfo.map(member => (
        <div key={member.id}>
          <p>{member.id}</p>
          <p>{member.name}</p>
          <p>{member.email}</p>
          <p>{member.join}</p>
        </div>
      ))}
      <p>아이디 : {userId}</p>
      <p>비밀번호 : {password}</p>
    </>
  );
}

export default Home;