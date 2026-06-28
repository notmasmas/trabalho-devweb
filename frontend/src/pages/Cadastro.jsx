import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { Button, InputSenha, Input, Card } from '../components'
import { LeftPanel } from './Login'
import Login from './Login'

export default function Cadastro() {
	const navigate = useNavigate();
  const [name, setName] = useState("")
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [confirmTouched, setConfirmTouched] = useState(false)
	const [error, setError] = useState("");

	//para gerar a mensagem de mismatch entre senhas, o segundo inputsenha precisa mudar o state de confirmTouched (assim a gente sabe que só vai aparecer depois que sair do campo de entrada)
	const passwordMismatch = confirmTouched && password !== confirmPassword;


  async function handleSubmit() {
    if (password !== confirmPassword) {
			setError("As senhas não coincidem");
			return; //impede de enviar pro back se as senhas não batem
		}
		try {
      await api.post("/auth/register", { name, email, password });
      navigate("/login"); //redireciona
    } catch (err) {
			console.log(err.response);
      const msg = err.response?.data?.msg;
      setError(msg === "Authentication has failed" || "users validation failed" ? "Erro ao cadastrar" : msg);
    }
  }
    
    
  return (
		<div className="main-wrapper">
			<Card>
			<LeftPanel />
			<div className="right-panel">
				<h2 style={{margin: '0 0 2px'}}>Faça seu cadastro</h2>

				<Input
					type="text"
					placeholder="Nome Completo"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<Input
					type="email"
					placeholder="E-mail"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					validate
				/>

				<InputSenha
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					validate
				/>

				<InputSenha
					placeholder="Confirme sua senha"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					onBlur={() => setConfirmTouched(true)}
				/>
				
				{passwordMismatch && <span className="error">As senhas não coincidem</span>}
				{error && <span className="error">{error}</span>}

				<Button onClick={handleSubmit} style={{ marginTop: "16px" }}> Cadastrar </Button>
				
				<div className="divider">  
        <p className="sign-in-text">
          Ou <Link to="/login"> faça login </Link>
        </p>
      </div>
			</div>
			</Card>	
		</div>
  );
}