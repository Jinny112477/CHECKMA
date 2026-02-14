import { supabase } from '../lib/supabaseClient.js'

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.sub;

        const { data, error } = await supabase
        .from("users")
        .select("id, email, role, avatar_url")
        .eq("id", userId)
        .single();

        if (error) {
            return res.status(500).json({ error: "Failed to fetch user profile" });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};