import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

export default function Signup()
{
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [verify, setVerify] = useState(false);
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        try
        {
          setLoading(true);
          const { error, data } = await supabase.auth.signUp({
            email,
            password
          });

          if(error)
            throw error;
            
          setVerify(true);
        }
        catch(error)
        {
          alert(error.message);
        }
        finally
        {
          setLoading(false);
        }
    }
    return (
        <>
            {verify ?
              <>
                {!loading ?
                    <>
                        <h1>Signup</h1>
                        <form onSubmit={handleSignup}>
                            <input type="text" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)}/>
                            <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
                            <button type="submit">Sign up</button>
                        </form>
                    </>
                :
                    <div>Please wait..</div>
                }
              </>
            :
              <>
                <h1>Please check your email to complete signing up!</h1>
              </>
            }
        </>
    )
}

// Only no sessions protection
export async function getServerSideProps({ req })
{
  // Get user
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if(user != null || user != undefined)
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }

  return {
    props: {
      authenticated: true
    }
  }
}
