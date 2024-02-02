import './input.css'

type Props = {
    inputType: string,
    idInput: string,
}
function Input({inputType, idInput}: Props) {
    return ( 
        <input id={idInput}type={inputType} placeholder='firstName'/>
     );
}

export default Input;