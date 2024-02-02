import Input from "../../components/Input/Input";

function Login() {
    return ( 
        <form>
            <label htmlFor='firstname'> FirstName</label>
            <Input inputType="text" idInput="firstname" />
        </form>
     );
}

export default Login;