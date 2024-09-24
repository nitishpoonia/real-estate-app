import ProductApiManager from '../api/ProductApiManager';
const PropertyService = {
  getAllProperties: () => {
    return ProductApiManager.get('/all-property');
  },

  getPropertyById: id => {
    return ProductApiManager.get(`/single-property/${id}`);
  },

  createproperty: (propertyData, onUploadProgress) => {
    return ProductApiManager.post('/register-property', propertyData, {
      headers: {'Content-Type': 'multipart/form-data'},
      onUploadProgress: progressEvent => {
        if (onUploadProgress) {
          onUploadProgress(progressEvent);
        }
      },
    });
  },

  updateProperty: (id, updatedData) => {
    return ProductApiManager.put(`/update-property/${id}`, updatedData);
  },

  deleteProperty: id => {
    return ProductApiManager.delete(`/delete-property/${id}`);
  },
  getPropertyListedByUser: id => {
    return ProductApiManager.get(`/property-by-user/${id}`);
  },
};

export default PropertyService;
