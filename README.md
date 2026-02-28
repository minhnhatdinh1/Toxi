# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Project-specific Features

The TOXI application builds on the base template with several custom UI components designed to improve usability:

- **Breadcrumbs Navigation** – guides users through product, course and dashboard pages for better UX.
- **Star Rating Component** – used to display ratings on items and within filter controls for products and courses.
- **Filter Sidebar** – provides category, price, rating and topic filters on product/course listing pages.

These features are implemented across the codebase and can be extended as needed.

### Usage examples

## API helper hook

To centralize loading and error handling for network requests the project now includes a `useApi` hook
and a shared Axios instance (`ApiService`).

```js
import { useApi } from './src/Layouts/service/useApi';
import { createExam } from './src/Layouts/admin/api/apiExam';

function MyForm() {
  const { call, loading, error } = useApi();

  const submit = async (data) => {
    try {
      await call(createExam, data);
      // toast is shown automatically
    } catch (e) {
      // additional handling if needed
    }
  };

  return <button onClick={() => submit({ /*...*/ })} disabled={loading}>Save</button>;
}
```

Errors will display via toasts and the `loading` state can be used to disable buttons or show spinners.

### Usage examples

```jsx
// list page (products or courses)
import StarRating from './src/components/StarRating';
import FilterSidebar from './src/components/FilterSidebar';

function ListingPage() {
  const [selectedRatings, setSelectedRatings] = useState([]);
  // other filter state...

  return (
    <div className="flex">
      <FilterSidebar
        categories={[...]} /* props as needed */
        ratingOptions={[5,4,3,2,1]}
        selectedRatings={selectedRatings}
        onRatingChange={(r,checked)=>{/*update*/}}
      />

      <div className="grid">
        {items.map(item => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <StarRating value={item.rating} showCount />
          </div>
        ))}
      </div>
    </div>
  );
}
```
