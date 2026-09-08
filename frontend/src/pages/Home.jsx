import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {
    const [message, setMessage] = useState("Connecting to SkillScout API...");

    useEffect(() => {
        const checkBackend = async () => {
            try {
                const response = await api.get("/health");
                setMessage(response.data.message);
            } catch (error) {
                console.error("Backend connection failed:", error);
                setMessage("Unable to connect to SkillScout API");
            }
        };

        checkBackend();
    }, []);

    return (
        <main>
            <h1>SkillScout</h1>
            <p>Skill-first job discovery platform</p>
            <p>{message}</p>
        </main>
    );
}

export default Home;