import ProductApiManager from '../api/ProductApiManager';
const PropertyService = {
  getAllProperties: () => {
    return ProductApiManager.get('/all-property');
  },

  getPropertyById: id => {
    return ProductApiManager.get(`/single-property/${id}`);
  },

  createProperty: propertyData => {
    return ProductApiManager.post('/register-property', propertyData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateProperty: (id, updatedData) => {
    return ProductApiManager.put(`/update-property/${id}`, updatedData);
  },

  deleteProperty: id => {
    return ProductApiManager.delete(`/delete-property/${id}`);
  },
};

export default PropertyService;
