import { Connection } from "typeorm";
import { Product } from "../entities/Product.entities";
import { graphqlTestCall } from "../test-utils/graphqlTestCall";
import { mockOrderPayload, mockProduct } from "../test-utils/mock/mockData";
import { createTestConn } from "../test-utils/mockDB";
import { Sorting } from "./product.resolver";

const createProductMutation = `
  mutation CreateProduct($input: ProductInput!){
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
`;

const createOrderMutation = `
  mutation CreateOrder($input: OrderInput!){
    createOrder(input: $input) {
      status,
      customerEmail
    }
  }
`;

const searchProductQuery = `
  query SearchProducts($input: ProductSearchInput!){
     searchProduct(input: $input) {
      title
      description
      price
      description
      quantity
      picture
    }
  }
`;

const getProductByIdQuery = `
  query GetProductById($productId: Int!){
    getProductById(productId: $productId) {
      title
      description
      price
      description
      quantity
      picture
    }
  }
`;

const getOrderByEmailQuery = `
  query GetOrderByEmail($email: String!){
    getOrderByEmail(email: $email) {
      customerEmail,
      orderItem {
        productId,
        product{
          title
        }
      }
    }
  }
`;

let conn: Connection;

beforeAll(async () => {
  conn = await createTestConn();
});

afterAll(async () => {
  await conn.close();
});

describe("resolvers", () => {
  it("create Product: test if productResponse match and 1 product is in db", async () => {
    const tmp = mockProduct.map(async (testProduct) => {
      const result = await graphqlTestCall({
        source: createProductMutation,
        variableValues: {
          input: {
            title: testProduct.title,
            description: testProduct.description,
            price: testProduct.price,
            quantity: testProduct.quantity,
            picture: testProduct.picture,
          },
        },
      });
      return result;
    });
    const productResponse = await Promise.all(tmp);

    expect(productResponse[0]).toMatchObject({
      data: {
        createProduct: {
          ...mockProduct[0],
        },
      },
    });

    const dbProduct = await Product.findOne({
      where: { title: mockProduct[0].title },
    });

    expect(dbProduct).toBeDefined();
  });

  it("should return the product with the specified ID", async () => {
    const result = await graphqlTestCall({
      source: getProductByIdQuery,
      variableValues: {
        productId: 1,
      },
    });

    expect(result.data!.getProductById as typeof mockProduct).toEqual(
      mockProduct[0]
    );
  });

  it("should sort products in decending order", async () => {
    const result = await graphqlTestCall({
      source: searchProductQuery,
      variableValues: {
        input: {
          title: "",
          description: "",
          sort: Sorting.DESC,
        },
      },
    });

    const sortedProduct = mockProduct.sort(
      (a: { price: number }, b: { price: number }) => b.price - a.price
    );

    expect(result.data!.searchProduct as typeof mockProduct).toEqual(
      sortedProduct
    );
  });

  it("should return products that match the given title and description when they are provided", async () => {
    const result = await graphqlTestCall({
      source: searchProductQuery,
      variableValues: {
        input: {
          title: "RX-7",
          description: "",
        },
      },
    });

    expect(result.data!.searchProduct as typeof mockProduct).toHaveLength(1);
    expect(result.data!.searchProduct[0].title as typeof mockProduct).toEqual(
      "RX-7"
    );
  });

  it("should create an order with the specified input", async () => {
    const result = await graphqlTestCall({
      source: createOrderMutation,
      variableValues: {
        input: {
          ...mockOrderPayload,
        },
      },
    });

    expect(result.data!.createOrder.customerEmail).toEqual(
      mockOrderPayload.customerEmail
    );
    expect(result.data!.createOrder.status).toEqual("pending");
  });
  it("should return the order based on valid email provided", async () => {
    const result = await graphqlTestCall({
      source: getOrderByEmailQuery,
      variableValues: {
        email: mockOrderPayload.customerEmail,
      },
    });

    expect(result.data!.getOrderByEmail.customerEmail).toEqual(
      mockOrderPayload.customerEmail
    );
    expect(result.data!.getOrderByEmail.orderItem).toHaveLength(
      mockOrderPayload.products.length
    );
  });
});
