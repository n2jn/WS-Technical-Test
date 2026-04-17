import { useState } from "react";
import { ActivityIndicator, Text, TextInput, View, Button } from "react-native";
interface LoginFormProps {
    onSubmit: (email: string, password: string) => Promise<void>;
}
export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        if (!email || !password) { setError('Champs obligatoires'); return; }
        setLoading(true);
        try { await onSubmit(email, password); }
        catch (e) { setError('Identifiants incorrects'); }
        finally { setLoading(false); }
    };
    return (
        <View>
            <TextInput testID="email-input" value={email} onChangeText={setEmail} />
            <TextInput testID="password-input" value={password} onChangeText={setPassword}
                secureTextEntry />
            {error ? <Text testID="error-msg">{error}</Text> : null}
            {loading ? <ActivityIndicator testID="loader" /> : null}
            <Button testID="submit-btn" title="Connexion" onPress={handleSubmit} />
        </View>
    );
};