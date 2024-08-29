export interface Product {
    productId: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    productPriceCurrency: string;
    productCategory: string;
    productImageUrl: string;
}

export interface ProductRequest {
    productId: number;
    productQuantity: number;
    productPrice: number;
    productName: string;
}
  
  export interface CustomerDTO {
    customerId: string;
    customerName: string;
    customerEmail: string;
  }
  
  export interface CartRequest {
    productRequest: ProductRequest[];
    customerDTO: CustomerDTO;
    currencyEnum: string;
    total: number;
    mode: string;
  }
  
  export interface CheckoutFormProps {
    cartRequest: CartRequest;
    onPaymentSuccess: () => void;
    onPaymentError: (error: string) => void;
  }
  