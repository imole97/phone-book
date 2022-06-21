import ContactProvider from "./context/contact-context";
import ContactList from "./components/contact-list/contact-list.component";


function App() {

  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <ContactProvider>
            <ContactList />
          </ContactProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
