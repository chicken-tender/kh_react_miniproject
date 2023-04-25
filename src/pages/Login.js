// 로그인 페이지
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import imgLogo from "../images/tier_logo.png";
import AxiosApi from "../api/AxiosApi";
import Modal from "../utils/Modal";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  .item1 {
    margin-top: 100px;
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item2 {
    margin: 10px;
    display: flex;
    align-items: center;
  }

  .item3 {
    margin-top: 10px;
    margin-left: 40px;
    margin-right: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999;
    font-size: 14px;
  }

  .hint {
    display: flex;
    margin-top: -5px;
    margin-bottom: 10px;
    margin-right: 40px;
    justify-content:right;
    align-items:center;
    font-size: 12px;
    color: #999;
  }
  .success {
    color: royalblue;
  }
  .error {
    color: red;
  }

  .enable-button {
    margin-top: 100px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 100%; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: orange;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: orange;
    font-weight: 700;
  }
  .enable-button:active {
    margin-top: 100px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 100%; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: #999;
    font-size: 15px;
    font-weight: 400;
    border-radius: 18px;
    border: #999;
    font-weight: 700;
  }
  .disable-button {
    margin-top: 100px;
    margin-left: 30px;
    margin-right: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 26px;
    font-weight: bold;
    width: 100%; /* 원하는 너비 설정 */
    height: 50px;
    color: white;
    background-color: #999;
    font-size: 13px;
    font-weight: 400;
    border-radius: 18px;
    border: orange;
  }
`;

const Input = styled.input`
  margin-left: 30px;
  margin-right: 30px;
  width: 100%; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height : normal; /* line-height 초기화 */
  padding: .8em .5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  font-family: inherit; /* 폰트 상속 */
  border: 1px solid #999;
  border-radius: 18px; /* iSO 둥근모서리 제거 */
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
`;

const Login = () => {
  const navigate = useNavigate();

  // 키보드 입력 받기
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  // 오류 메세지
  const [idMessage, setIdMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);

  // 팝업 처리(모달)
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  }

  const confirmBtn = () => {
    console.log("확인 버튼 눌렸을 때 Test");
  }

  const onChangeId = e => {
    // 5 ~ 20 자리의 영문자, 숫자, _로 이루어진 문자열 체크
    const regexId = /^\w{5,20}$/;
    setInputId(e.target.value);
    if(regexId.test(e.target.value)) { // ⭐️ 정규식은 반드시 e.target.value로 비교해야 함.
      setIdMessage("올바른 형식 입니다.");
      setIsId(true);
    } else {
      setIdMessage("5자리 이상 20자리 미만으로 입력해 주세요.");
      setIsId(false);
    }
  }

  // 8 ~ 25자 미만 + 숫자,영문자 조합
  const onChangePw = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value;
    setInputPw(passwordCurrent)
    if (!passwordRegex.test(passwordCurrent)) {
        setPwMessage('숫자+영문자 조합으로 8자리 이상 입력해주세요!')
        setIsPw(false)
    } else {
        setPwMessage('안전한 비밀번호에요. 😁');
        setIsPw(true);
    }
  }

  const onClickLogin = async() => {
    // 로그인을 위해 axios 호출
    const response = await AxiosApi.memberLogin(inputId, inputPw);
    console.log(response.data); // 디버깅 할 때는 data로 찍으면 보기 편함.
    if(response.data === true) {
      navigate("/home");
    } else {
      console.log("로그인 에러!"); // 모달창 구현 후 호출
      setModalOpen(true);
    }
  }

  return (
    <Container>
      <div className="item1">
        <img src={imgLogo} alt="로고" />
      </div>
      <div className="item2">
        <Input placeholder="아이디" value ={inputId} onChange={onChangeId}/>
      </div>
      <div className="hint">
        {inputId.length > 0 && <span className={`${isId ? "success" : "error"}`}>{idMessage}</span>}
      </div>
      <div className="item2">
        <Input placeholder="패스워드" type="password" value ={inputPw} onChange={onChangePw}/>
      </div>
      <div className="hint">
        {inputPw.length > 0 && (
          <span className={`${isPw ? 'success' : 'error'}`}>{pwMessage}</span>)}
      </div>
      <div className="item2">
        {(isId && isPw) ? 
        <button className="enable-button" onClick={onClickLogin}>LOGIN</button>  :
        <button className="disable-button">LOGIN</button>}
      </div>
      {/* 여기 안에 들어가는게 children */}
      <Modal open={modalOpen} close={closeModal} type={true} confirm={confirmBtn} header="오류">아이디 및 패스워드가 맞지 않습니다. 다시 확인 해주세요. 🥹</Modal>
    </Container>
  );
}

export default Login;