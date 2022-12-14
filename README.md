# Online Shop Graphql API

Graphql server application for an online stop

## Features

- Create a product
- Search product based on title and description
- Sort product based on price
- Get product by id
- Create order
- Get order by email
- Unit test for each feature

## Tech Stack

- Express
- Apollo graphql server
- Typeorm
- Type-graphql
- Typescript
- Postgresql

### Devops

- Docker
- Docker compose

## Installation

Use the env.example file to know which variable is needed.

```bash
cp .env.example .env
```

```bash
yarn then yarn dev
```

App runs by default at `http://localhost:4000/graphql`

## Sample Query and Mutations

_check schema docs for more_

```graphql
mutation CreateProduct($input: ProductInput!) {
  createProduct(input: $input) {
    id
    title
    description
    price
    description
    quantity
    picture
  }
}
```

```graphql
mutation CreateOrder($input: OrderInput!) {
  createOrder(input: $input) {
    status
    customerEmail
  }
}
```

```graphql
query SearchProducts($input: ProductSearchInput!) {
  searchProduct(input: $input) {
    title
    description
    price
    description
    quantity
    picture
  }
}
```

```graphql
query GetProductById($productId: Int!) {
  getProductById(productId: $productId) {
    title
    description
    price
    description
    quantity
    picture
  }
}
```

```graphql
query GetOrderByEmail($email: String!) {
  getOrderByEmail(email: $email) {
    customerEmail
    orderItem {
      productId
      product {
        title
      }
    }
  }
}
```

## Notes

- For resolver testing, it runs on a testdb instance
- App db url `postgresql://postgres:postgres_password@localhost:5432/postgres`
- Test db url `postgresql://postgres:postgres_password@localhost:5431/testdb`

## Helpers

Install [lazydocker](https://github.com/jesseduffield/lazydocker). This tool can help visualise container logs.

## License

[MIT](https://choosealicense.com/licenses/mit/)
