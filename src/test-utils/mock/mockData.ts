export const mockProduct = [
  {
    title: "Taurus X",
    description:
      "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
    price: 5,
    quantity: 44,
    picture: "http://dummyimage.com/129x100.png/5fa2dd/ffffff",
  },
  {
    title: "RX-7",
    description:
      "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    price: 67,
    quantity: 9,
    picture: "http://dummyimage.com/115x100.png/dddddd/000000",
  },
  {
    title: "850",
    description:
      "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
    price: 6,
    quantity: 7,
    picture: "http://dummyimage.com/172x100.png/5fa2dd/ffffff",
  },
  {
    title: "Yukon",
    description:
      "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    price: 71,
    quantity: 68,
    picture: "http://dummyimage.com/166x100.png/5fa2dd/ffffff",
  },
  {
    title: "80",
    description:
      "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    price: 32,
    quantity: 76,
    picture: "http://dummyimage.com/224x100.png/ff4444/ffffff",
  },
];

export const mockOrderPayload = {
  customerEmail: "customer@example.com",
  products: [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 },
  ],
};
