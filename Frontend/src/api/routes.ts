const API_BASE_URL = 'http://localhost:8000';

export const api = {
  optimizeRoutes: async (bins: any[]) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getRouteData/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bins),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error optimizing routes:', error);
      throw error;
    }
  },

  getBins: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bins/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching bins:', error);
      throw error;
    }
  }
}; 