import "./NasaForm.css"
export interface INasaFormProps {

}

export function NasaForm (props: INasaFormProps) {
  return (
    <form action="/" className="myForm">
        <p>Digite sua data de nascimento:</p>
        <input type="date"/>
        <button type="button">Buscar</button>
    </form>
  );
}
