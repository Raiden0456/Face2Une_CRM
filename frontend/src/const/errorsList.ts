// Error List Descriptopn From the BackEnd
export const errorsList = (error: string | null) => {
  switch (error) {
    case 'unauthorized':
      return 'unauthorized';
    default:
      return 'Default Error';
  }
};
