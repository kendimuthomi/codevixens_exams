import MyComponent from './StyledComponent';
import './App.css';

function App() {
  return (
    <div>
      <MyComponent status="success" />
      <MyComponent status="warning" />
      <MyComponent status="error" />
      <MyComponent status="default" />
    </div>
  );
}

export default App;
