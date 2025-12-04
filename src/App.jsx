import { useState } from "react";

function App() {
    const [nome, setNome] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [specializzazione, setSpecializzazione] = useState("");
    const [anni, setAnni] = useState("");
    const [descrizione, setDescrizione] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !nome.trim() ||
            !username.trim() ||
            !password.trim() ||
            !specializzazione ||
            !anni ||
            !descrizione.trim()
        ) {
            setError("Compila tutti i campi!");
            return;
        }
        if (isNaN(anni) || Number(anni) <= 0) {
            setError("Anni di esperienza deve essere un numero positivo!");
            return;
        }

        setError("");

        console.log({
            nome,
            username,
            password,
            specializzazione,
            anni: Number(anni),
            descrizione,
        });
    };

    return (
        <>
            <h1>Compila il form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome completo..."
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <select
                    value={specializzazione}
                    onChange={(e) => setSpecializzazione(e.target.value)}
                >
                    <option value="">Seleziona specializzazione</option>
                    <option value="Full Stack">Full Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                </select>
                <input
                    type="number"
                    placeholder="Anni di esperienza..."
                    value={anni}
                    onChange={(e) => setAnni(e.target.value)}
                />
                <textarea
                    placeholder="Descriviti in minimo 100 caratteri..."
                    value={descrizione}
                    onChange={(e) => setDescrizione(e.target.value)}
                />
                <button type="submit">Registrati</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </>
    );
}

export default App;
