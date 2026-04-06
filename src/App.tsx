import { AuthContextProvider } from "./contexts/auth"
import { ProfileContextProvider } from "./contexts/profile"
import { BrowserRouter } from "react-router";
import { Router } from "./Router";

function App() {

  return (
    <>
      <AuthContextProvider>
        <ProfileContextProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ProfileContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
