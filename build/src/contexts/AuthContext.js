var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            var _a;
            setSession(session);
            setUser((_a = session === null || session === void 0 ? void 0 : session.user) !== null && _a !== void 0 ? _a : null);
        });
        supabase.auth.getSession().then(({ data: { session } }) => {
            var _a;
            setSession(session);
            setUser((_a = session === null || session === void 0 ? void 0 : session.user) !== null && _a !== void 0 ? _a : null);
            setLoading(false);
        });
        return () => subscription.unsubscribe();
    }, []);
    const signIn = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { error } = yield supabase.auth.signInWithPassword({ email, password });
            if (error)
                throw error;
            navigate("/dashboard");
        }
        catch (error) {
            console.error("Error signing in:", error);
            throw error;
        }
    });
    const signUp = (email, password, metadata) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { error } = yield supabase.auth.signUp({
                email,
                password,
                options: {
                    data: metadata
                }
            });
            if (error)
                throw error;
        }
        catch (error) {
            console.error("Error signing up:", error);
            throw error;
        }
    });
    const signOut = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { error } = yield supabase.auth.signOut();
            if (error)
                throw error;
            navigate("/");
        }
        catch (error) {
            console.error("Error signing out:", error);
        }
    });
    return (_jsx(AuthContext.Provider, { value: { session, user, signIn, signUp, signOut, loading }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
