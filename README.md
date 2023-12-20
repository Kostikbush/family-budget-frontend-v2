# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

User
А может с начало с массив данных который представляет собой объекты с суммой и цветом, преобразовать в массив с необходимыми дынными для отрисовки каждой дольки диаграммы, и потом повесить обработчик onClick на канвас, и отслеживать клик выясняя по созаднному массиву, в какую долу попал клик, с анимацикй менять данные конкретного объекта с анимацией?
ChatGPT
Да, такой подход вполне возможен. Давайте разделим это на несколько шагов:

Шаг 1: Преобразование данных
Преобразуем исходный массив с данными, представляющими общую сумму и цвет каждой доли, в массив данных, необходимых для отрисовки и управления анимацией:

javascript
Copy code
const data = [
{ value: 500, color: '#56a' },
{ value: 1000, color: '#221816' },
// ... остальные данные
];

const total = data.reduce((acc, item) => acc + item.value, 0);
const angles = data.map(item => (item.value / total) \* 360);

const chartData = data.map((item, index) => ({
startAngle: index === 0 ? 0 : angles.slice(0, index).reduce((acc, angle) => acc + angle, 0),
endAngle: angles.slice(0, index + 1).reduce((acc, angle) => acc + angle, 0),
color: item.color,
}));
Шаг 2: Отрисовка диаграммы
Теперь у вас есть массив chartData, который содержит данные для каждой доли диаграммы. Можете использовать его для отрисовки диаграммы.

Шаг 3: Добавление обработчика события клика
Добавьте обработчик события клика на канвас, чтобы отслеживать, в какую долю попал клик:

javascript
Copy code
canvas.addEventListener('click', handleChartClick);

function handleChartClick(event) {
const rect = canvas.getBoundingClientRect();
const x = event.clientX - rect.left;
const y = event.clientY - rect.top;

const clickedData = chartData.find(item => {
const angle = Math.atan2(y - centerY, x - centerX) \* (180 / Math.PI);
return angle >= item.startAngle && angle <= item.endAngle;
});

if (clickedData) {
// Обработка клика на конкретной доле
// Например, изменение данных и запуск анимации
animateChartData(clickedData);
}
}

function animateChartData(clickedData) {
// Ваш код анимации, например, изменение данных и запуск requestAnimationFrame
}
При клике вы можете использовать chartData для определения, в какую долю попал клик, и затем запустить анимацию для изменения данных этой доли.
