import { Route, Routes } from "react-router-dom";
import Agenda from "./routes/Agenda";
import PersonDetails from "./routes/PersonDetails";
import Error from "./routes/Error";
import PersonEdit from "./routes/PersonEdit";
import PersonCreate from "./routes/PersonCreate";

function App() {
    return (
        <main className="flex h-full w-full flex-col items-center justify-center bg-[#BBC2FF] px-6">
            <section className="h-full max-h-[80vh] w-full max-w-xs rounded-3xl">
                <Routes>
                    <Route path="/" element={<Agenda />} />
                    <Route path="/person" element={<PersonCreate />} />
                    <Route path="/person/:id" element={<PersonDetails />} />
                    <Route path="/person/edit/:id" element={<PersonEdit />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </section>
        </main>
    );
}

export default App;
