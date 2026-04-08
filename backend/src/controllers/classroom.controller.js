import { generateSessionId } from '../utils/id';
import { supabase } from '../lib/supabaseClient';

export const classroomCreate = async (req, res) => {
    const session_code = generateSessionId();
    const { 
        name, 
        description } = req.body;

    const { data, error } = await supabase
        .from('session')
        .insert({id: session_code})
}