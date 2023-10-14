import { Provider } from "react-redux";
import { store } from "./app/core/store/store";
import Navigation from "./app/shared/navigation/Navigation";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
