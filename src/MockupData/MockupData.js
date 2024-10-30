export const responseArray = [
    {
        key: "category",
        name: "Product Category",
        value: ["Electronics", "Clothing", "Groceries"],
      },
      {
        key: "brand",
        name: "Brand",
        options: {
          Electronics: ["Apple", "Samsung", "Sony"],
          Clothing: ["Nike", "Adidas", "Puma"],
          Groceries: ["Whole Foods", "Trader Joe's", "Kroger"],
        },
      },
      {
        key: "model",
        name: "Model",
        options: {
          Apple: ["iPhone 13", "iPhone 14", "iPad Pro"],
          Samsung: ["Galaxy S21", "Galaxy Note", "Galaxy A52"],
          Sony: ["Xperia 5", "Xperia 1", "Alpha"],
          Nike: ["Air Max", "React", "Pegasus"],
          Adidas: ["Ultra Boost", "NMD", "Stan Smith"],
          Puma: ["RS-X", "Suede", "Ignite"],
          "Whole Foods": ["Organic Apple", "Organic Banana", "Organic Carrot"],
          "Trader Joe's": ["Frozen Pizza", "Cereal", "Pasta"],
          Kroger: ["Milk", "Bread", "Cheese"],
        },
      },
  ];

  // Sample data for subcategories and items based on selections
export const subCategories = {
    Electronics: ["Phones", "Laptops", "Cameras"],
    Clothing: ["Shirts", "Pants", "Shoes"],
    Groceries: ["Fruits", "Vegetables", "Beverages"],
  };

  export const items = {
    Phones: ["iPhone", "Samsung Galaxy", "OnePlus"],
    Laptops: ["MacBook", "Dell XPS", "HP Spectre"],
    Cameras: ["Canon", "Nikon", "Sony"],
    Shirts: ["T-Shirt", "Dress Shirt", "Sweater"],
    Pants: ["Jeans", "Trousers", "Shorts"],
    Shoes: ["Sneakers", "Boots", "Sandals"],
    Fruits: ["Apple", "Banana", "Orange"],
    Vegetables: ["Carrot", "Broccoli", "Spinach"],
    Beverages: ["Soda", "Juice", "Water"],
  };