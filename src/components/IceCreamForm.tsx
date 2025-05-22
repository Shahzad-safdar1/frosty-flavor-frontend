
import React, { useState, useEffect } from 'react';
import { IceCream } from '@/pages/Index';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface IceCreamFormProps {
  iceCream: IceCream | null;
  onSubmit: (iceCream: IceCream) => Promise<boolean>;
  onCancel: () => void;
}

export const IceCreamForm: React.FC<IceCreamFormProps> = ({ iceCream, onSubmit, onCancel }) => {
  const initialFormState: IceCream = {
    name: '',
    flavor: '',
    price: 0,
    stock: 0,
    expiryDate: '',
    category: ''
  };

  const [formData, setFormData] = useState<IceCream>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof IceCream, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when iceCream prop changes
  useEffect(() => {
    if (iceCream) {
      // Format date to YYYY-MM-DD for input
      const formattedIceCream = {
        ...iceCream,
        expiryDate: new Date(iceCream.expiryDate).toISOString().split('T')[0]
      };
      setFormData(formattedIceCream);
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [iceCream]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Convert number inputs to numbers
    if (type === 'number') {
      setFormData({ ...formData, [name]: value === '' ? '' : Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when field is modified
    if (errors[name as keyof IceCream]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors: Partial<Record<keyof IceCream, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.flavor.trim()) {
      newErrors.flavor = 'Flavor is required';
    }
    
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (formData.stock < 0) {
      newErrors.stock = 'Stock cannot be negative';
    }
    
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      const success = await onSubmit(formData);
      setIsSubmitting(false);
      
      if (success) {
        setFormData(initialFormState);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Vanilla Delight"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="flavor">Flavor</Label>
          <Input
            id="flavor"
            name="flavor"
            value={formData.flavor}
            onChange={handleChange}
            placeholder="e.g. Vanilla"
            className={errors.flavor ? 'border-red-500' : ''}
          />
          {errors.flavor && <p className="text-red-500 text-sm mt-1">{errors.flavor}</p>}
        </div>

        <div>
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 3.99"
            className={errors.price ? 'border-red-500' : ''}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            placeholder="e.g. 50"
            className={errors.stock ? 'border-red-500' : ''}
          />
          {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
        </div>

        <div>
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            name="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={handleChange}
            className={errors.expiryDate ? 'border-red-500' : ''}
          />
          {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Dairy, Non-dairy, Sorbet"
            className={errors.category ? 'border-red-500' : ''}
          />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        {iceCream && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded shadow-sm hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded shadow-sm hover:bg-green-700 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : iceCream ? 'Update Ice Cream' : 'Add Ice Cream'}
        </button>
      </div>
    </form>
  );
};
