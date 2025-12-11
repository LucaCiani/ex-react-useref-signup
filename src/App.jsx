import { useState, useRef, useMemo } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

function App() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [descrizione, setDescrizione] = useState("");

    const [error, setError] = useState("");

    const nomeRef = useRef();
    const specializzazioneRef = useRef();
    const anniRef = useRef();

    const isUsernameValid = useMemo(() => {
        const charsValid = username
            .split("")
            .every(
                (char) =>
                    letters.includes(char.toLocaleLowerCase()) ||
                    numbers.includes(char)
            );
        return charsValid && username.length >= 0;
    }, [username]);

    const isPasswordValid = useMemo(() => {
        return (
            password.length >= 8 &&
            password.split("").some((char) => letters.includes(char)) &&
            password.split("").some((char) => numbers.includes(char)) &&
            password.split("").some((char) => symbols.includes(char))
        );
    }, [password]);

    const isDescrizioneValid = useMemo(() => {
        return (
            descrizione.trim().length >= 100 && descrizione.trim().length < 1000
        );
    }, [descrizione]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const nome = nomeRef.current.value;
        const specializzazione = specializzazioneRef.current.value;
        const anni = anniRef.current.value;

        if (
            !nome.trim() ||
            !username.trim() ||
            !password.trim() ||
            !specializzazione ||
            !anni ||
            anni < 0 ||
            !descrizione.trim() ||
            !isUsernameValid ||
            !isPasswordValid ||
            !isDescrizioneValid
        ) {
            setError("Compila tutti i campi!");
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
                    ref={nomeRef}
                />
                <input
                    type="text"
                    placeholder="Username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {username &&
                    (isUsernameValid ? (
                        <p style={{ color: "green" }}>Username valido!</p>
                    ) : (
                        <p style={{ color: "red" }}>
                            6 caratteri alfanumerici.
                        </p>
                    ))}
                <input
                    type="password"
                    placeholder="Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {password &&
                    (isPasswordValid ? (
                        <p style={{ color: "green" }}>Password valida!</p>
                    ) : (
                        <p style={{ color: "red" }}>
                            8 caratteri, 1 lettera, 1 numero, 1 simbolo.
                        </p>
                    ))}
                <select ref={specializzazioneRef} defaultValue="">
                    <option value="">Seleziona specializzazione</option>
                    <option value="Full Stack">Full Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                </select>
                <input
                    type="number"
                    placeholder="Anni di esperienza..."
                    ref={anniRef}
                />
                <textarea
                    placeholder="Descriviti in minimo 100 caratteri..."
                    value={descrizione}
                    onChange={(e) => setDescrizione(e.target.value)}
                />
                {descrizione &&
                    (isDescrizioneValid ? (
                        <p style={{ color: "green" }}>
                            Descrizione valida! ({descrizione.trim().length})
                        </p>
                    ) : (
                        <p style={{ color: "red" }}>
                            Minimo 100 caratteri, massimo 1000 (
                            {descrizione.trim().length})
                        </p>
                    ))}
                <button type="submit">Registrati</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </>
    );
}

export default App;
