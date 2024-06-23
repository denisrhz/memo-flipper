import logo from "./logo.svg"
import "./App.css"
import TableComponent from "./components/TableComponent"
import { useState } from "react"

function App() {
  const [service, setService] = useState(false)
  return (
    <>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <TableComponent service={service} setService={setService} />
    </>
  )
}

export default App
