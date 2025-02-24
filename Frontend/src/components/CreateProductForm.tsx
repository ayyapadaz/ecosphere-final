import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export function CreateProductForm() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');
  const [materials, setMaterials] = useState<string[]>([]);
  const [newMaterial, setNewMaterial] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await addDoc(collection(db, 'products'), {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        creatorId: user?.uid,
        creatorName: user?.email?.split('@')[0] || 'Anonymous',
        type: 'creator',
        category,
        isRecycled: true,
        materials,
        available: true,
        createdAt: new Date().toISOString()
      });

      // Clear form
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
      setCategory('');
      setMaterials([]);
      setNewMaterial('');
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <div>
        <label className="block text-gray-700 mb-2">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
          rows={4}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Price ($)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
          min="0"
          step="0.01"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Image URL</label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">Select a category</option>
          <option value="furniture">Furniture</option>
          <option value="accessories">Accessories</option>
          <option value="clothing">Clothing</option>
          <option value="homeware">Homeware</option>
          <option value="art">Art</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Materials Used</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newMaterial}
            onChange={(e) => setNewMaterial(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Add a material"
          />
          <button
            type="button"
            onClick={() => {
              if (newMaterial.trim()) {
                setMaterials([...materials, newMaterial.trim()]);
                setNewMaterial('');
              }
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {materials.map((material, index) => (
            <span 
              key={index} 
              className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-sm flex items-center"
            >
              {material}
              <button
                type="button"
                onClick={() => setMaterials(materials.filter((_, i) => i !== index))}
                className="ml-2 text-green-700 hover:text-green-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Product'}
      </button>
    </form>
  );
} 