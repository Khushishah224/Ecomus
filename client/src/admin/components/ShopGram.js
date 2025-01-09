import React, { useState } from 'react';
import { Edit, Save, X, Upload } from 'lucide-react';
import Sidebar from './Sidebar';
import img1 from '../../assets/IMAGES/gallery-7.jpg';
import img2 from '../../assets/IMAGES/gallery-3.jpg';
import img3 from '../../assets/IMAGES/gallery-5.jpg';
import img4 from '../../assets/IMAGES/gallery-8.jpg';
import img5 from '../../assets/IMAGES/gallery-6.jpg';

const ShopGramAdmin = () => {
  const [products, setProducts] = useState([
    { id: 1, image: img1, name: "Sunglasses", price: "99.99", category: "Accessories", isEditing: false },
    { id: 2, image: img2, name: "Tote Bag", price: "149.99", category: "Bags", isEditing: false },
    { id: 3, image: img3, name: "Summer Hat", price: "45.99", category: "Accessories", isEditing: false },
    { id: 4, image: img4, name: "Casual Boots", price: "129.99", category: "Footwear", isEditing: false },
    { id: 5, image: img5, name: "Casual Boots", price: "129.99", category: "Footwear", isEditing: false },
  ]);

  const categories = ["Accessories", "Bags", "Footwear", "Clothing"];

  const toggleEdit = (index) => {
    const newProducts = products.map((product, i) => ({
      ...product,
      isEditing: i === index ? !product.isEditing : false
    }));
    setProducts(newProducts);
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newProducts = [...products];
        newProducts[index] = {
          ...newProducts[index],
          image: event.target.result
        };
        setProducts(newProducts);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index] = {
      ...newProducts[index],
      [field]: value
    };
    setProducts(newProducts);
  };

  const handleSave = (index) => {
    console.log('Saving product:', products[index]);
    toggleEdit(index);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar className="flex-shrink-0 w-64 bg-white shadow-lg" />
      
      <main className="flex-1 overflow-y-auto">
        <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Shop Gram Admin</h1>
            <p className="mt-2 text-gray-600">Manage your product catalog</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4">
                  {!product.isEditing ? (
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                        <p className="text-gray-600 font-medium">${product.price}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <button 
                        onClick={() => toggleEdit(index)}
                        className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Product
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <label className="block">
                          <button
                            className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            onClick={() => document.getElementById(`file-${index}`).click()}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Change Image
                          </button>
                          <input
                            id={`file-${index}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(index, e)}
                            className="hidden"
                          />
                        </label>

                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => handleProductChange(index, "name", e.target.value)}
                          placeholder="Product Name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                        
                        <input
                          type="number"
                          value={product.price}
                          onChange={(e) => handleProductChange(index, "price", e.target.value)}
                          placeholder="Price"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                        
                        <select
                          value={product.category}
                          onChange={(e) => handleProductChange(index, "category", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(index)}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </button>
                        <button
                          onClick={() => toggleEdit(index)}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShopGramAdmin;