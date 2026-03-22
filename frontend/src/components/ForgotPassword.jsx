import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            const { error } = await resetPassword(email);

            if (error) {
                setError(error.message);
            } else {
                setMessage("Password reset email sent. Check your inbox.");
                setEmailSent(true);
            }
        } catch {
            setError("An unexpected error ouccured");
        } finally {
            setLoading(false);
        }
    };
}