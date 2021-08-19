import "../styles/globals.css";
import { supabase } from "../utils/supabaseClient";
import { basePath } from "../utils/siteConfig";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);

  useEffect(async () => {
    setSession(await supabase.auth.session());

    supabase.auth.onAuthStateChange((event, session) => {
        setSession(session);
        handleAuthChange(event, session);
    });
  }, [])

  const handleAuthChange = async (event, session) => {
    await fetch(`${basePath}/api/auth`, {
      body: JSON.stringify({event, session}),
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      credentials: "same-origin",
      method: "POST"
    })
  }

  return <Component {...pageProps} />
}

export default MyApp
