
import React from 'react';
import { IceCream } from '@/pages/Index';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

interface IceCreamTableProps {
  iceCreams: IceCream[];
  onEdit: (iceCream: IceCream) => void;
  onDelete: (id: number) => void;
}

export const IceCreamTable: React.FC<IceCreamTableProps> = ({ iceCreams, onEdit, onDelete }) => {
  // Format price to display as currency
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  // Format date to more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Flavor</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {iceCreams.map((iceCream) => (
            <TableRow 
              key={iceCream.id} 
              className="animate-fade-in"
            >
              <TableCell>{iceCream.id}</TableCell>
              <TableCell>{iceCream.name}</TableCell>
              <TableCell>{iceCream.flavor}</TableCell>
              <TableCell>{formatPrice(iceCream.price)}</TableCell>
              <TableCell>{iceCream.stock}</TableCell>
              <TableCell>{formatDate(iceCream.expiryDate)}</TableCell>
              <TableCell>{iceCream.category}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => onEdit(iceCream)} 
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => iceCream.id && onDelete(iceCream.id)} 
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
