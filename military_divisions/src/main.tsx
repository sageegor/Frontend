import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './api/store';
import App from './App';

// Находим корневой элемент
const container = document.getElementById('root');

// Проверяем, что элемент существует
if (container) {
  // Создаем корень
  const root = createRoot(container);
  
  // Рендерим приложение
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}