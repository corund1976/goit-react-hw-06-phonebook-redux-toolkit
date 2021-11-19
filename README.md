1. Redux Toolkit
   npm install @reduxjs/toolkit

2. Функия configureStore()
   Redux Toolkit содержит функцию configureStore(),
   которая оборачивает оригинальный createStore(),
   и настраивает некоторые полезные инструменты разработки
   как часть процесса создания хранилища.

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
timer,
});

const store = configureStore({
reducer: rootReducer,
});

На первый вгляд практически одно и тоже, тем не менее,
после рефакторинга, под капотом сразу были настроены
инструменты разработчика (Redux DevTools) и некоторые другие полезные функции.

3. Функция createAction()
   Функция createAction() в качестве аргумента принимает строку
   описывающую тип действия и возвращает action creator.

import { createAction } from '@reduxjs/toolkit';

const increment = createAction('timer/increment');
console.log(increment(5)); // {type: "timer/increment", payload: 5}

Метод toString() функции increment был переопределен
и возвращает строку типа действия.
Значение типа действия можно получить обратившись
к свойству type функции increment

const increment = createAction('INCREMENT');

console.log(increment.toString()); // "timer/increment"
console.log(increment.type); // "timer/increment"

4. Функция createReducer()
   Наиболее распространенным подходом создания редюсера
   является проверка свойства action.type внутри switch
   и выполнение определенной логики для каждого типа действия.
   К тому же редюсер определяет начальное значение состояния
   и возвращает полученное состояние,
   если он не должен обрабатывать дейтсвие такого типа.

Используя функцию createReducer() можно создавать редюсеры
передав объект свойств специального формата,
где каждый ключ это тип действия,
а значение - это редюсер для этого типа.

import { createReducer } from '@reduxjs/toolkit';

const increment = createAction('timer/increment');
const decrement = createAction('timer/decrement');

const timer = createReducer(0, {
[increment.type]: (state, action) => state + action.payload,
[decrement.type]: (state, action) => state - action.payload,
});

Так как синтаксис вычисляемых свойств объекта вызывает
метод toString() указанной переменной, можно просто использовать
имя функции без указания свойства type,
ведь метод toString() наших action creators был переопределен так,
чтобы возвращать тип дейсвтвия.

const timer = createReducer(0, {
[increment]: (state, action) => state + action.payload,
[decrement]: (state, action) => state - action.payload,
});
