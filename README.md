1. Redux Toolkit

2.1. Установка
Библиотека доступна как стандартный NPM-пакет.

npm install @reduxjs/toolkit

2.2. Функия configureStore()
Обычно хранилище создается вызовом createStore(), в который передается корневой редюсер. Redux Toolkit содержит функцию configureStore(), которая оборачивает оригинальный createStore(), и настраивает некоторые полезные инструменты разработки как часть процесса создания хранилища.

Документация configureStore()

Заменим вызов createStore() на configureStore(), который ожидает один аргумент - объект с набором строго именованных свойств.

// До
import { createStore } from 'redux';

const store = createStore(timer);

// После
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  timer,
});

const store = configureStore({
  reducer: rootReducer,
});
Copy
На первый вгляд практически одно и тоже, тем не менее, после рефакторинга, под капотом сразу были настроены инструменты разработчика (Redux DevTools) и некоторые другие полезные функции.

Можно передать больше одного редюсера, и configureStore() сам создаст корневой редюсер. Для этого в свойство reducer передается объект.

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    timer,
  },
});
Copy
Теперь Redux-код таймера выглядит следующим образом.

import { configureStore, combineReducers } from '@reduxjs/toolkit';

// Action types
const INCREMENT = 'timer/increment';
const DECREMENT = 'timer/decrement';

// Action creators
function increment(value) {
  return {
    type: INCREMENT,
    payload: value,
  };
}

function decrement(value) {
  return {
    type: DECREMENT,
    payload: value,
  };
}

// Reducer
function timer(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.payload;
    case DECREMENT:
      return state - action.payload;
    default:
      return state;
  }
}

// Store
const store = configureStore({
  reducer: {
    timer,
  },
});
Copy
2.3. Функция createAction()
Функция createAction() в качестве аргумента принимает строку описывающую тип действия и возвращает action creator.

Документация createAction()

// До
const INCREMENT = 'timer/increment';

function increment(value) {
  return {
    type: INCREMENT,
    payload: value,
  };
}
console.log(increment(5)); // {type: "timer/increment", payload: 5}

// После
import { createAction } from '@reduxjs/toolkit';

const increment = createAction('timer/increment');
console.log(increment(5)); // {type: "timer/increment", payload: 5}
Copy
А где взять тип действия, например для использования внутри редюсера? Есть два способа.

Метод toString() функции increment был переопределен и возвращает строку типа действия.
Значение типа действия можно получить обратившись к свойству type функции increment
const increment = createAction('INCREMENT');

console.log(increment.toString()); // "timer/increment"
console.log(increment.type); // "timer/increment"
Copy
Продолжим рефакторить Redux-код таймера. Использование createAction() избавит нас от нескольких строк кода.

import { configureStore, createAction } from '@reduxjs/toolkit';

// Action creators
const increment = createAction('timer/increment');
const decrement = createAction('timer/decrement');

// Reducer
function timer(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.payload;

    case DECREMENT:
      return state - action.payload;

    default:
      return state;
  }
}

// Store
const store = configureStore({
  reducer: {
    timer,
  },
});
Copy
2.4. Функция createReducer()
Наиболее распространенным подходом создания редюсера является проверка свойства action.type внутри switch и выполнение определенной логики для каждого типа действия. К тому же редюсер определяет начальное значение состояния и возвращает полученное состояние, если он не должен обрабатывать дейтсвие такого типа.

Документация createReducer()

Используя функцию createReducer() можно создавать редюсеры передав объект свойств специального формата, где каждый ключ это тип действия, а значение - это редюсер для этого типа.

import { createReducer } from '@reduxjs/toolkit';

const increment = createAction('timer/increment');
const decrement = createAction('timer/decrement');

const timer = createReducer(0, {
  [increment.type]: (state, action) => state + action.payload,
  [decrement.type]: (state, action) => state - action.payload,
});
Copy
Так как синтаксис вычисляемых свойств объекта вызывает метод toString() указанной переменной, можно просто использовать имя функции без указания свойства type, ведь метод toString() наших action creators был переопределен так, чтобы возвращать тип дейсвтвия.

const timer = createReducer(0, {
  [increment]: (state, action) => state + action.payload,
  [decrement]: (state, action) => state - action.payload,
});
Copy
Применим этот синтаксис к коду таймера.

import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

// Action creators
const increment = createAction('timer/increment');
const decrement = createAction('timer/decrement');

// Reducer
const timer = createReducer(0, {
  [increment]: (state, action) => state + action.payload,
  [decrement]: (state, action) => state - action.payload,
});

// Store
const store = configureStore({
  reducer: {
    timer,
  },
});
Copy
3. Пример
В интерактивном редакторе можно посмотреть код и живую версию таймера.


