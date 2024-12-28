import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'] // Corregido el plural
})
export class ProductosComponent implements OnInit {

  productForm: FormGroup;
  categories: string[] = ['Electrónica', 'Ropa', 'Alimentos', 'Hogar'];

  constructor(private fb: FormBuilder) {
    // Inicialización del formulario en el constructor
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    // No es necesario inicializar el formulario nuevamente en ngOnInit()
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct = this.productForm.value;
      console.log('Producto agregado:', newProduct);
      // Aquí puedes enviar el producto a un servicio o API para agregarlo al inventario
    }
  }
}
