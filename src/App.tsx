import Button from "./components/Button/Button"
import Link from "./components/Link/Link"


function App() {
  return(
    <div style={{display:'flex', gap:'10px'}}>
      <Button variant="primary">Connexion</Button>
      <Link  href='#'variant="primary">Connexion</Link>
    </div>
  )
}

export default App
