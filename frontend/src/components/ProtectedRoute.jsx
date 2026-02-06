import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "/supabaseClient";

export default function ProtectedRoute({children}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const chceckSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
                navigate("/");
                console.log("No active session, redirecting to homepage.");
            } else {
                setLoading(false);
            }
        };

        chceckSession();    
    }, []);

    if (loading) return null;

    return children;
}