const users = [
  {
    id: 1,
    name: "João Silva",
    cpf: "123.456.789-00",
    email: "joao.silva@example.com",
    birthDate: "1990-05-15",
    password: "senha123",
    orderHistory: [
      {
        orderId: 101,
        date: "2025-05-01",
        total: 150.75,
        items: [
          { productId: 1, name: "Pizza de Calabresa", quantity: 2, price: 50.25 },
          { productId: 2, name: "Refrigerante", quantity: 1, price: 50.25 }
        ]
      },
      {
        orderId: 102,
        date: "2025-05-10",
        total: 200.00,
        items: [
          { productId: 3, name: "Hambúrguer", quantity: 4, price: 50.00 }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Maria Oliveira",
    cpf: "987.654.321-00",
    email: "maria.oliveira@example.com",
    birthDate: "1985-10-20",
    password: "senha456",
    orderHistory: []
  },
  {
    id: 3,
    name: "Carlos Santos",
    cpf: "456.789.123-00",
    email: "carlos.santos@example.com",
    birthDate: "1995-03-10",
    password: "senha789",
    orderHistory: []
  },
  {
    id: 4,
    name: "Ana Costa",
    cpf: "321.654.987-00",
    email: "ana.costa@example.com",
    birthDate: "2000-12-25",
    password: "senha321",
    orderHistory: []
  }
];

export default users;