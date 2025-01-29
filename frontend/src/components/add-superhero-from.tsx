import React, { useState } from 'react';
import { useCreateSuperhero } from '@/api/superhero';

export function AddSuperheroForm() {
  const { mutate: createSuperhero, isPending } = useCreateSuperhero()
  const [name, setName] = useState('');
  const [superpower, setSuperpower] = useState('');
  const [humilityScore, setHumilityScore] = useState(5);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await createSuperhero({ name, superpower, humilityScore });
      // Reset form
      setName('');
      setSuperpower('');
      setHumilityScore(5);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add superhero');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <div>
        <label htmlFor="name" className="block text-base font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm text-center focus:border-blue-500 focus:ring-blue-500 text-lg p-2"
        />
      </div>

      <div>
        <label htmlFor="superpower" className="block text-base font-medium">
          Superpower
        </label>
        <input
          type="text"
          id="superpower"
          value={superpower}
          onChange={(e) => setSuperpower(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm text-center focus:border-blue-500 focus:ring-blue-500 text-lg p-2"
        />
      </div>

      <div>
        <label htmlFor="humilityScore" className="block text-base font-medium">
          Humility Score (0-10)
        </label>
        <input
          type="number"
          id="humilityScore"
          min="0"
          max="10"
          value={humilityScore}
          onChange={(e) => setHumilityScore(Number(e.target.value))}
          required
          className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm text-center focus:border-blue-500 focus:ring-blue-500 text-lg p-2"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        {isPending ? 'Adding...' : 'Add Superhero'}
      </button>
    </form>
  );
}
