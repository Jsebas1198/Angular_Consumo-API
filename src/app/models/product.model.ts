export interface Product {
  id: string;
  title: string;
  price: number;
  images: string [];
  description: string;
  category: Category;
}

export interface Category{
  id: string;
  name: string;
}

//Interfaz para crear un producto, se omiten los campos que no se utilizan con Omit
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}
