import { useState } from "react";

function App() {
    const [nome, setNome] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [specializzazione, setSpecializzazione] = useState("");
    const [anni, setAnni] = useState("");
    const [descrizione, setDescrizione] = useState("");
    const [error, setError] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [descrizioneError, setDescrizioneError] = useState("");

    const isUsernameValid = /^[a-zA-Z0-9]{6,}$/.test(username);
    const isPasswordValid =
        password.length >= 8 &&
        /[A-Za-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password);
    const descrizioneTrimmed = descrizione.trim();
    const isDescrizioneValid =
        descrizioneTrimmed.length >= 100 && descrizioneTrimmed.length <= 1000;

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        if (!/^[a-zA-Z0-9]{6,}$/.test(value)) {
            setUsernameError(
                "Username: solo lettere e numeri, minimo 6 caratteri."
            );
        } else {
            setUsernameError("");
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (
            value.length < 8 ||
            !/[A-Za-z]/.test(value) ||
            !/[0-9]/.test(value) ||
            !/[^A-Za-z0-9]/.test(value)
        ) {
            setPasswordError(
                "Password: min 8 caratteri, 1 lettera, 1 numero, 1 simbolo."
            );
        } else {
            setPasswordError("");
        }
    };

    const handleDescrizioneChange = (e) => {
        const value = e.target.value;
        setDescrizione(value);
        const trimmed = value.trim();
        if (trimmed.length < 100 || trimmed.length > 1000) {
            setDescrizioneError("Descrizione: tra 100 e 1000 caratteri.");
        } else {
            setDescrizioneError("");
        }
    };

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
        if (usernameError || passwordError || descrizioneError) {
            setError("Correggi gli errori nei campi evidenziati.");
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
                    onChange={handleUsernameChange}
                />
                {username &&
                    (isUsernameValid ? (
                        <p style={{ color: "green" }}>Username valido!</p>
                    ) : (
                        <p style={{ color: "red" }}>{usernameError}</p>
                    ))}
                <input
                    type="password"
                    placeholder="Password..."
                    value={password}
                    onChange={handlePasswordChange}
                />
                {password &&
                    (isPasswordValid ? (
                        <p style={{ color: "green" }}>Password valida!</p>
                    ) : (
                        <p style={{ color: "red" }}>{passwordError}</p>
                    ))}
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
                    onChange={handleDescrizioneChange}
                />
                {descrizione &&
                    (isDescrizioneValid ? (
                        <p style={{ color: "green" }}>Descrizione valida!</p>
                    ) : (
                        <p style={{ color: "red" }}>{descrizioneError}</p>
                    ))}
                <button type="submit">Registrati</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </>
    );
}

export default App;
