import RegisterForm from '../RegisterForm'

export interface RegisterPageProps {
  
}
 
const RegisterPage: React.FC<RegisterPageProps> = () => {
  return (
    <div style={{height:"80vh"}}>
      <RegisterForm />
    </div>
  );
}
 
export default RegisterPage;