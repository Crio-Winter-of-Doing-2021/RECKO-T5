import LoginForm from "../LoginForm";


export interface LoginPageProps {
  
}
 
const LoginPage: React.FC<LoginPageProps> = () => {
  return (
    <div style={{height:"80vh"}}>
    <LoginForm />
    </div>
  );
}
 
export default LoginPage;