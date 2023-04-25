// 메인 페이지
import React, { useState, useEffect } from "react";
import AxiosApi from "../api/AxiosApi";

const Home = () => {
  const [memberInfo, setMemberInfo] = useState("");
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
    </>
  );
}

export default Home;