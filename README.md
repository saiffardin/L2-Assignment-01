# Blog-01: Explaining the difference between `any`, `unknown`, and `never` types in TypeScript.

To learn the differences amongst these 3, first we need to understand that `any` turns off all the typescript type-checker feature. Thus using `any` is considered as very bad practice. So we should avoid `any` as long as possible. But yes it has some the use cases, for example - if we're migrating a JavaScript project to TypeScript, in this case using `any` makes a bit of sense.

Now we're left with `unknown` and `never`.

We can consider this image for better understanding the differences between these two. 

![The San Juan Mountains are beautiful!](/imgs/types-typescript-logo.png)

To understand this image we need to revisit some of the aspects of set theory.

In set theory, the *universal set* and the *empty set* are two fundamental concepts. 

The *universal set* is the set that contains all elements under consideration for a particular discussion or problem. All other sets are subsets of the universal set.

The *empty set* is the set that contains no elements, but it is a subset of every set, including the universal set.

We can treat `unknown` as *universal set*. So, `unknown` is the set of all possible values, and any value can be assigned to a variable of type unknown.

And we can treat `never` as *empty set*, which means there is no value that can be assigned to variable of type `never`.

---

# Blog-02: Use of the `keyof` keyword in TypeScript

Typescript is a superset of JavaScript, plays a vital role in writing less buggy and rigid code for production. TS uses a lot of tools to achieve this. One of the tools in it's arsenal is name as `keyof`, this operator was introduced in TS version 2.1

`keyof` operator in TS is **almost** similar to the `Object.keys()` method. Both of them gives us an idea about the *keys* of a respective object/type/interface. Though `Object.keys()` works with *objects* only, but `keyof` goes beyond to that. For example: 

```ts
type Developer = {
  dept: string;
  stack: string;
};

console.log(keyof Developer) // Output: "dept" | "stack"
```

We can only know the actual importance of `keyof`, when we're working with components that receive dynamic props, and TS throws errors for type-safety while working with those props. To resolve those type-errors, `keyof` could be useful.

Let me give a real life example so that it is easier for us to grasp the power of `keyof` keyword in TS.

Let's say your team is developing an *UI component library*, and it has a reusable `Table` component. In this component you pass the *columns* and *rows* as props, and this component generates the table view for you.

You are assigned with the task to add **sorting** functionality in it across the columns. 

While going through the existing code, you found that it has a `Column` type, and an interface named `TableProps`. 

```ts
export type Column<T> = {
  key: string;
  label: string;
  render?: (rowData: T) => ReactNode;
};
```

```ts
export interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
}
```
---
The Table component kind of looks like the following:
```ts
const Table = <T,>(props: TableProps<T>) => {
  // code
}
```
---
Let's say we want to render a table that has 2 columns - **Name** and **Age**.

```ts
  export const cols = [
    {
      key: "name",
      label: "Name",
    },

    {
      key: "age",
      label: "Age",
    },
  ];
```
---

And we've 3 rows in that table

```ts
  export const rows = [
    {
      name: "Saif",
      age: 28,
    },

    {
      name: "Fardin",
      age: 25,
    },

    {
      name: "Ishra",
      age: 26,
    },
  ];
```

---

To render the table with that data we've to do things like this:

```ts
const App = () => {
  return (
    <Table
      columns={cols}
      rows={tableData}
    />
  );
}
```

---
Now to add the sorting feature to your column you've added the `sortable` property to `Column` type. After adding this the `Column` type looks like this

```ts
export type Column<T> = {
  key: string;
  label: string;
  render?: (rowData: T) => ReactNode;
  sortable?: boolean; // newly added property, 
  // if this is 'true', means the column is sortable
};
```
---

The requirement is we can only sort one column at a time.

So we need a state to hold the name of the column, by which we're going to sort.

To make sure our state holds exactly the column's name, not just any other string. We can use `keyof` operator.

Here is the type of the state going to look like:

```ts
type typeSortConfig<T> = keyof T | null;
```

Here's our state in the Table component:

```ts
const Table = <T,>(props: TableProps<T>) => {
  const { columns, rows, } = props;
  const [sortConfig, setSortConfig] = useState<typeSortConfig<T>>(null);

  const sortedRows = [...rows];

  return (
    // code

    <td>
      {String(row[col.key as keyof T] ?? "")}
    </td>

    // code
  )
}
```
Here `row[col.key as keyof T]` ensures that `col.key` a valid key of the row object. 

The above example clearly demonstrates the importance and usefulness of `keyof` operator.
