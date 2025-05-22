
import React, { useState, useEffect } from 'react';
import { Table } from '@/components/ui/table';
import { IceCreamForm } from '@/components/IceCreamForm';
import { IceCreamTable } from '@/components/IceCreamTable';
import { toast } from '@/hooks/use-toast';

// Define the IceCream interface
export interface IceCream {
  id?: number;
  name: string;
  flavor: string;
  price: number;
  stock: number;
  expiryDate: string;
  category: string;
}

const API_URL = 'http://localhost:3001/api';

const Index = () => {
  const [iceCreams, setIceCreams] = useState<IceCream[]>([]);
  const [selectedIceCream, setSelectedIceCream] = useState<IceCream | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all ice creams
  const fetchIceCreams = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/icecreams`);
      if (!response.ok) {
        throw new Error('Failed to fetch ice creams');
      }
      const data = await response.json();
      setIceCreams(data);
      setError('');
    } catch (err) {
      setError('Could not connect to the server. Please make sure the backend is running.');
      console.error('Error fetching ice creams:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new ice cream
  const addIceCream = async (iceCream: IceCream) => {
    try {
      const response = await fetch(`${API_URL}/icecreams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(iceCream),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add ice cream');
      }
      
      toast({
        title: "Success",
        description: "Ice cream added successfully!",
      });
      
      fetchIceCreams();
      return true;
    } catch (err) {
      console.error('Error adding ice cream:', err);
      toast({
        title: "Error",
        description: "Failed to add ice cream",
        variant: "destructive",
      });
      return false;
    }
  };

  // Update an existing ice cream
  const updateIceCream = async (id: number, iceCream: IceCream) => {
    try {
      const response = await fetch(`${API_URL}/icecreams/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(iceCream),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update ice cream');
      }
      
      toast({
        title: "Success",
        description: "Ice cream updated successfully!",
      });
      
      setSelectedIceCream(null);
      fetchIceCreams();
      return true;
    } catch (err) {
      console.error('Error updating ice cream:', err);
      toast({
        title: "Error",
        description: "Failed to update ice cream",
        variant: "destructive",
      });
      return false;
    }
  };

  // Delete an ice cream
  const deleteIceCream = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/icecreams/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete ice cream');
      }
      
      toast({
        title: "Success",
        description: "Ice cream deleted successfully!",
      });
      
      fetchIceCreams();
    } catch (err) {
      console.error('Error deleting ice cream:', err);
      toast({
        title: "Error",
        description: "Failed to delete ice cream",
        variant: "destructive",
      });
    }
  };

  // Handle edit button click
  const handleEdit = (iceCream: IceCream) => {
    setSelectedIceCream(iceCream);
    window.scrollTo(0, 0);
  };

  // Effect to fetch ice creams on component mount
  useEffect(() => {
    fetchIceCreams();
  }, []);

  return (
    <div className="min-h-screen bg-white p-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Ice Cream Shop</h1>
        <p className="text-gray-600 mb-4">Manage your ice cream inventory</p>
      </header>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {selectedIceCream ? 'Edit Ice Cream' : 'Add New Ice Cream'}
        </h2>
        <IceCreamForm
          iceCream={selectedIceCream}
          onSubmit={(iceCream) => {
            if (selectedIceCream && selectedIceCream.id) {
              return updateIceCream(selectedIceCream.id, iceCream);
            } else {
              return addIceCream(iceCream);
            }
          }}
          onCancel={() => setSelectedIceCream(null)}
        />
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Ice Cream Inventory</h2>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4">Loading ice creams...</p>
          </div>
        ) : iceCreams.length === 0 && !error ? (
          <div className="text-center py-10">
            <p>No ice cream items found. Add your first ice cream item above!</p>
          </div>
        ) : (
          <IceCreamTable 
            iceCreams={iceCreams} 
            onEdit={handleEdit} 
            onDelete={deleteIceCream} 
          />
        )}
      </div>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Ice Cream Shop</p>
      </footer>
    </div>
  );
};

export default Index;
