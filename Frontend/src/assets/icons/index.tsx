import { FaWarehouse } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import ReactDOMServer from 'react-dom/server';

const iconColors = {
  depot: '#2563eb', // blue-600
  bin: '#059669',   // emerald-600
};

export const icons = {
  depot: () => ({
    path: 'M12 2L2 7v13h20V7L12 2z',
    fillColor: '#2563eb',
    fillOpacity: 1,
    strokeWeight: 1,
    scale: 1.5,
  }),
  bin: () => ({
    path: 'M3 6l3 12h8l3-12H3z',
    fillColor: '#059669',
    fillOpacity: 1,
    strokeWeight: 1,
    scale: 1.2,
  }),
}; 