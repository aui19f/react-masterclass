import { useForm } from "react-hook-form";
import styled from "styled-components";

const Contents = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(222, 222, 222, 0.2);
  display: flex;
  flex-direction: column;
  > div {
    flex: 1;
    width: 480px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: auto;
    > div,
    > header {
      width: 100%;
    }
  }
`;
const Header = styled.header`
  height: 80px;
  text-align: center;
  color: blue;
`;
const Content = styled.div``;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  height: 48px;
  padding: 4px 8px;
  border: 1px solid lightgray;
  margin: 4px;
`; // 이름, 핸드폰번호, 비밀번호
const Button = styled.button`
  height: 48px;
  padding: 4px;
  border: 0;
  margin: 4px;
  background-color: lightblue;
  color: #ffffff;
`;

const Footer = styled.footer`
  /* height: 80px; */
  padding: 24px;
  font-size: 75%;
  color: gray;
`;
const Err = styled.p`
  padding: 2px 8px 8px;
  color: red;
  font-size: 75%;
`;
interface IForm {
  name: string;
  phone?: string;
  pw?: string;
  pw2?: string;
  extraError?: string;
}

export default function Join() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit = ({ name, phone, pw, pw2 }: IForm) => {
    console.log("", name);
    console.log("", phone);
    console.log("", pw);
    console.log("", pw2);
  };
  return (
    <Contents>
      <div>
        <Header>
          <h1>회원가입</h1>
        </Header>

        <Content>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("name")} placeholder="Name" />
            <Input
              {...register("phone", {
                required: "핸드폰번호를 입력해주세요.",
                minLength: {
                  value: 6,
                  message: "6글자 이상으로 입력해주세요.",
                },
              })}
              placeholder="Phone"
            />
            {errors?.phone?.message ? (
              <Err>{errors?.phone?.message}</Err>
            ) : null}

            <Input {...register("pw")} placeholder="Password" />
            <Input {...register("pw2")} placeholder="Password Check" />

            <Button>가입하기</Button>
          </Form>
        </Content>
      </div>
      <Footer>
        <p>
          전체서비스 | 이용약관 | 개인정보처리방침 | 검색 | 고객센터 | © aui19f
          Corp.
        </p>
      </Footer>
    </Contents>
  );
}
